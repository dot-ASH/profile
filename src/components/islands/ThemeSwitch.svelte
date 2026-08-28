<script lang="ts">
  import { onMount } from 'svelte';
  import type { ThemeName } from '../../data/profile';

  interface Swatch {
    name: ThemeName;
    /** The dot's own colour — fixed, independent of the active theme. */
    color: string;
    label: string;
  }

  interface Props {
    swatches: Swatch[];
  }

  const { swatches }: Props = $props();

  // Islands are server-rendered, so the real value can only be read once we're
  // in the browser. The inline head script has already applied it to <html>
  // by then; this just syncs the control's own highlight.
  let active = $state<ThemeName>('brown');

  onMount(() => {
    active = (document.documentElement.dataset.theme as ThemeName | undefined) ?? 'brown';
  });

  function select(theme: ThemeName) {
    active = theme;
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // private mode — the theme just won't persist
    }
  }
</script>

<div class="swatches" role="radiogroup" aria-label="Colour theme">
  {#each swatches as swatch (swatch.name)}
    <button
      type="button"
      role="radio"
      aria-checked={active === swatch.name}
      aria-label={swatch.label}
      class="swatch"
      class:active={active === swatch.name}
      style={`--swatch: ${swatch.color}`}
      onclick={() => select(swatch.name)}
    ></button>
  {/each}
</div>

<style>
  .swatches {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .swatch {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: var(--swatch);
    border: 1px solid #373737;
    cursor: pointer;
    transition: transform 200ms ease-out, box-shadow 200ms ease-out;
  }

  .swatch:hover,
  .swatch:focus-visible {
    transform: scale(1.15);
  }

  .swatch.active {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.55);
  }
</style>
