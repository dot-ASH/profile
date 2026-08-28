import { atom } from 'nanostores';

/**
 * The full-screen loading overlay. Shared between ScreenLoader (which renders
 * it) and every island that opens an external link behind a short interstitial.
 * Nanostores implements the Svelte store contract, so `$loading` works directly.
 */
export const loading = atom(true);

/** Flash the overlay, then open `url` in a new tab. Preserves the original 700ms feel. */
export function openWithInterstitial(url: string) {
  loading.set(true);
  setTimeout(() => {
    loading.set(false);
    window.open(url, '_blank', 'noopener');
  }, 700);
}
