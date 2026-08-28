<script lang="ts">
  import { onMount } from 'svelte';

  /** Lerp factor — higher trails further behind the pointer. */
  const DELAY = 18;

  let dot: HTMLDivElement;

  onMount(() => {
    let endX = window.innerWidth / 2;
    let endY = window.innerHeight / 2;
    let x = endX;
    let y = endY;
    let frame = 0;

    const move = (e: PointerEvent) => {
      endX = e.pageX;
      endY = e.pageY;
      dot.style.opacity = '1';
    };
    const enlarge = () => (dot.style.scale = '1.5');
    const shrink = () => (dot.style.scale = '1');
    const show = () => (dot.style.opacity = '1');
    const hide = () => (dot.style.opacity = '0');

    const tick = () => {
      x += (endX - x) / DELAY;
      y += (endY - y) / DELAY;
      dot.style.top = '0';
      dot.style.left = '0';
      // translate rather than top/left: no layout on any frame
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };
    tick();

    document.addEventListener('pointerdown', enlarge);
    document.addEventListener('pointerup', shrink);
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerenter', show);
    document.addEventListener('pointerleave', hide);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointerdown', enlarge);
      document.removeEventListener('pointerup', shrink);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerenter', show);
      document.removeEventListener('pointerleave', hide);
    };
  });
</script>

<!--
  `hidden lg:block` keeps the original's breakpoint, and client:media
  ="(pointer: fine)" means this never hydrates on touch. Both matter: without
  the classes the un-hydrated element would sit visible in the corner on
  phones, since the rAF loop that positions it never runs there.
-->
<div bind:this={dot} class="cursor-dot-outline hidden lg:block" aria-hidden="true"></div>

<style>
  .cursor-dot-outline {
    pointer-events: none;
    position: absolute;
    /* starts centred, as before, so there is no corner flash before the
       first animation frame lands */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    scale: 1;
    border-radius: 50%;
    opacity: 1;
    transition: opacity 0.1s cubic-bezier(0.7, 0, 0.84, 0), scale 0.2s ease-out;
    width: 20px;
    height: 20px;
    background-color: rgba(232, 238, 241, 0.5);
    border: 1px solid #414141;
    z-index: 7000;
    will-change: transform;
  }
</style>
