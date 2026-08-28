import { openWithInterstitial } from '../stores/ui';

/**
 * Outbound links flash the loading overlay before opening. Delegated from the
 * document so the links themselves stay plain anchors — they work with JS off,
 * and none of them needs a hydrated component to be clickable.
 */
document.addEventListener('click', (event) => {
  const target = event.target as Element | null;
  const link = target?.closest<HTMLAnchorElement>('a[data-interstitial]');
  if (!link) return;
  // let modified clicks (new tab, download, middle click) behave normally
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;

  event.preventDefault();
  openWithInterstitial(link.href);
});
