# Profile

Share a comprehensive overview of your online presence in one place, making it easier for others to discover and connect with you across various social media platforms.

## Features

- Professional self-branding site
- Centralized platform for a brief introduction.
- Customizable Profiles
- Social Media Integration
- Responsive Design

## Build

- make sure node and pnpm are installed

- clone this repo.

```sh
git clone https://github.com/dot-ASH/profile.git
```

```sh
cd profile && pnpm install
```

- make changes to config.json file — it is the single source of content for the
  whole page, read at build time.
- replace `public/icon.png` and the images in `public/img/` with your own.

```sh
pnpm dev      # dev server
pnpm build    # type-check + static build to dist/
pnpm preview  # serve the built site
```

## Stack

Astro (`output: 'static'`) with Svelte 5 islands, Tailwind 4 and GSAP/ScrollTrigger.
The page is static HTML; client JS ships only for the four islands under
`src/components/islands/` — the loading splash, the music player, the theme
switch, and the desktop cursor (pointer-only, never sent to touch devices).

```
src/
  pages/index.astro        the one route
  layouts/Base.astro       <head>, fonts, script entry
  components/              .astro — render to HTML, ship no JS
    islands/               .svelte — the only source of client JS
  data/                    config.json + build-time icon data
  styles/                  tokens.css (themes) + global.css
  scripts/                 scroll reveals, outbound-link interstitial
```

Themes are CSS custom properties switched by `data-theme` on `<html>`; add one
in `src/styles/tokens.css` and to the swatch list in `src/components/About.astro`.

## Future

- [ ] Views Count
- [ ] Social media online presence
