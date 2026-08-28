import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

/**
 * All scroll motion lives here, outside the component tree, driving the DOM
 * directly. Elements opt in with `data-reveal="<preset>"`; nothing in an
 * island routes scroll progress through reactive state.
 */

type Preset = { x?: number; y?: number; scale?: number };

/** Transform-and-opacity only. The Vue version animated left/top/right. */
const PRESETS: Record<string, Preset> = {
  fade: {},
  left: { x: -120 },
  right: { x: 120 },
  up: { y: 40 },
  down: { y: -40 },
  scale: { scale: 1.5 },
};

/** The two cubic-beziers the old @vueuse/motion config used. */
const EASES: Record<string, string> = {
  expo: 'expo.out', // [0.16, 1, 0.3, 1]
  circ: 'circ.in', //  [0.7, 0, 0.84, 0]
};

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

function init() {
  if (reduced.matches) {
    root.classList.add('motion-off');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Hand Lenis' RAF loop to GSAP's ticker so the two don't fight over frames.
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    const preset = PRESETS[el.dataset.reveal || 'fade'] ?? PRESETS.fade;
    const duration = Number(el.dataset.revealDuration ?? 1);
    const delay = Number(el.dataset.revealDelay ?? 0);
    const ease = EASES[el.dataset.revealEase ?? 'expo'] ?? EASES.expo;
    // `once` mirrors v-motion's :visible-once; :visible replayed on re-entry.
    const once = el.dataset.revealOnce !== 'false';

    gsap.set(el, { ...preset, opacity: 0 });
    gsap.to(el, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: el,
        start: 'top 92%',
        once,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    });
  });

  // Anything that changes document height invalidates the trigger positions.
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  window.addEventListener('load', refresh);
}

// `js` is set by the blocking inline script in Base.astro, before first paint.
init();
reduced.addEventListener('change', () => location.reload());
