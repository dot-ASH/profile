<script lang="ts">
  import { onMount } from 'svelte';
  import { loading } from '../../stores/ui';

  /** Minimum time the splash stays up, so it reads as a beat rather than a flicker. */
  const MIN_MS = 750;

  onMount(() => {
    const started = performance.now();
    const dismiss = () => {
      const remaining = Math.max(0, MIN_MS - (performance.now() - started));
      setTimeout(() => loading.set(false), remaining);
    };

    if (document.readyState === 'complete') dismiss();
    else window.addEventListener('load', dismiss, { once: true });
  });
</script>

{#if $loading}
  <div class="loading-screen" role="status" aria-live="polite" aria-label="Loading">
    <img class="loading-logo" src="/icon.png" alt="" width="160" height="160" />
  </div>
{/if}

<style>
  .loading-screen {
    position: fixed;
    inset: 0;
    display: flex;
    height: 100vh;
    width: 100vw;
    z-index: 5000;
    background-color: #dcdcdcdf;
    align-items: center;
  }

  .loading-logo {
    margin: auto auto;
    width: 10em;
    height: auto;
    animation: loading infinite 15s linear;
  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
