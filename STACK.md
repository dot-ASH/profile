# profile.sakirashker.com — Stack

A single-page, static profile / social link hub. Heavy on transition and animation, light on
logic — no routing, no auth, no data fetching. Replaces the existing Vue 3 + Vuetify + Vite
site.

---

## 1. The stack

| Layer | Choice | Why |
|---|---|---|
| Site framework | **Astro**, `output: 'static'` | Almost the entire page is inert. Astro ships 0 KB JS outside islands. |
| Interactivity | **Svelte 5** islands, hydrated per-component | Only where state actually lives. |
| Scroll / timeline animation | **GSAP + ScrollTrigger** | Runs outside the component tree, straight on the DOM. |
| Smooth scroll | **Lenis** | Optional; pairs with ScrollTrigger cleanly. |
| Styling | **Plain CSS with custom properties** | Vuetify is dead weight for one page — it's what puts an entire Material palette in the current bundle. Tailwind is fine if preferred. |
| Hosting | Any static CDN — Cloudflare Pages, Netlify, Vercel | Pure static output, no server. |

---

## 2. Why not SvelteKit

**SvelteKit with `export const prerender = true`** is a good answer and more ergonomic for a
Svelte dev: one toolchain, no island boundaries, `svelte/transition` available everywhere.

The cost is concrete — it still ships the client runtime and router (~15–20 KB gzipped) to
hydrate a page that is almost entirely inert. On a link hub opened from a phone on mobile
data, take the zero.

**Switch to SvelteKit when** the site grows real routes, auth, or a dashboard. Migrating a
static Astro page at that point is cheap; carrying app-framework overhead until then isn't.

---

## 3. Why heavy animation doesn't force a framework

"Lots of transitions" is not an argument for hydrating the page. Sort the work by what it
actually needs:

| Kind of motion | Needs |
|---|---|
| Continuous loops (rotation, translation, pulse) | CSS `@keyframes` |
| Hover / focus states | CSS `:hover` + `transition` |
| Scroll-linked reveals and parallax | GSAP ScrollTrigger, or native `animation-timeline` |
| Enter / exit of conditionally rendered nodes | CSS, or `svelte/transition` inside an island |
| Media playback, timers, anything with persistent state | **A Svelte island** |

Only the last row needs a component framework. Everything above it is CSS plus a scroll
library that doesn't care what rendered the HTML.

---

## 4. Setup

```bash
npm create astro@latest -- --template minimal profile
cd profile
npx astro add svelte
npm i gsap lenis
```

`astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  output: 'static',
  integrations: [svelte()],
  site: 'https://profile.sakirashker.com',
});
```

`npx astro add svelte` writes the integration and a `svelte.config.js` for you. Svelte 5 is
the default — use runes (`$state`, `$props`, `$derived`), not the legacy `export let` API.

---

## 5. Project structure

```
src/
  pages/
    index.astro            # one route
  layouts/
    Base.astro             # <head>, global CSS, script entry
  components/              # .astro — render to HTML, ship no JS
    islands/               # .svelte — the only components that hydrate
  data/                    # plain JS/JSON, imported at build time
  styles/
    tokens.css
    global.css
  scripts/
    scroll.js              # GSAP + ScrollTrigger + Lenis
public/
  fonts/
  img/
```

The split that matters: `components/` is Astro and compiles to static HTML;
`components/islands/` is Svelte and is the only place client JS originates. Keeping them in
separate directories makes the JS budget visible in the file tree.

Anything list-shaped goes in `src/data/` as a plain array and gets imported — build-time
only, zero runtime cost, and the desktop and mobile markup render from one source.

---

## 6. Islands

Reach for one when a component owns **state that outlives a render**, or **an event loop the
page has to keep running**. Otherwise write `.astro`.

Hydration directives:

| Directive | Use for |
|---|---|
| `client:visible` | The default choice — hydrate when it scrolls into view |
| `client:idle` | Non-essential, above the fold |
| `client:load` | Needs to be interactive immediately on paint. Rare. |
| `client:media="(pointer: fine)"` | Pointer-only behaviour; never ships to touch devices |

```astro
---
import NowPlaying from '../components/islands/NowPlaying.svelte';
import { tracks } from '../data/tracks.js';
---
<NowPlaying client:visible track={tracks[0]} />
```

Props cross the island boundary as serialized JSON, so pass plain data — no functions, no
class instances, no live objects.

A media player is the canonical case: it holds play state, owns an `<audio>` element, and
needs teardown. Note that audio playback requires a user gesture in every browser, so the
control has to be an explicit affordance rather than something that starts on mount.

---

## 7. GSAP wiring

`src/scripts/scroll.js`, imported once from the layout:

```js
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.registerPlugin(ScrollTrigger);

  // hand Lenis' RAF loop to GSAP's ticker so the two don't fight
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: 40, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}
```

```astro
<!-- Base.astro -->
<script>import '../scripts/scroll.js';</script>
```

Three rules:

1. **Keep GSAP out of the component tree.** Drive the DOM directly. Don't route scroll
   progress through runes into reactive style bindings — that fights the animation loop and
   costs frames.
2. **Select by `data-` attribute, not class.** Classes are for styling; a `data-reveal` hook
   means restyling never silently breaks an animation.
3. **Call `ScrollTrigger.refresh()`** after anything that changes document height — fonts
   finishing, images loading, an island expanding.

Native `animation-timeline: view()` covers the simple reveals with no library at all.
ScrollTrigger earns its weight on scrubbed, timeline-sequenced work.

---

## 8. Animation performance

1. **Animate `transform` and `opacity` only** in anything that runs on scroll or in a loop.
   Everything else forces layout or paint per frame.
2. **`will-change` on continuously animating elements only** — it costs a compositor layer
   each, so it's a scalpel, not a default.
3. **Guard pointer-driven effects** behind `@media (pointer: fine)` and bail out in JS on
   touch. Use `client:media` so those islands never ship to phones.
4. **Honor `prefers-reduced-motion: reduce`** — the page must be fully legible and navigable
   with every animation off. Check it once at the top of the script, and mirror it in CSS.
5. **Lazy everything below the fold**: `loading="lazy" decoding="async"` on images.

---

## 9. Deploy

```bash
npm run build            # → dist/
npx wrangler pages deploy dist
```

Set long-lived immutable cache headers on `/_astro/*` and `/fonts/*` — both are
content-hashed or stable.
