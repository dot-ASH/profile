import IconGithub from '@iconify/icons-fa-brands/github';
import IconDiscord from '@iconify/icons-fa-brands/discord';
import IconInstagram from '@iconify/icons-ri/instagram-fill';
import IconMail from '@iconify/icons-mdi/email';
import IconReddit from '@iconify/icons-fa-brands/reddit-alien';
import IconLinkedIn from '@iconify/icons-mdi/linkedin';
import IconFacebook from '@iconify/icons-fa-brands/facebook-square';
import IconTwitter from '@iconify/icons-fa-brands/twitter-square';
import IconSnapchat from '@iconify/icons-fa-brands/snapchat-square';
import IconTiktok from '@iconify/icons-fa-brands/tiktok';
import IconTwitch from '@iconify/icons-fa-brands/twitch';
import IconCircleFillRaw from '@iconify/icons-ri/circle-fill';
import IconCircleLineRaw from '@iconify/icons-ri/circle-line';
import IconVueJsRaw from '@iconify/icons-fa-brands/vuejs';

import type { IconData } from './profile';

/**
 * These packages are CommonJS (`exports.__esModule = true; exports.default`).
 * `__esModule` is a bundler convention, so Node's ESM interop hands back the
 * whole module object rather than the icon — unwrap it explicitly so the icon
 * data is the same shape however the import was resolved.
 */
const unwrap = (mod: unknown): IconData => {
  const m = mod as { default?: IconData } & IconData;
  return (m?.default ?? m) as IconData;
};

/** Social platform name (lowercased) -> icon data, inlined at build time. */
export const socialsMap: Record<string, IconData> = {
  facebook: unwrap(IconFacebook),
  twitter: unwrap(IconTwitter),
  snapchat: unwrap(IconSnapchat),
  tiktok: unwrap(IconTiktok),
  github: unwrap(IconGithub),
  discord: unwrap(IconDiscord),
  instagram: unwrap(IconInstagram),
  mail: unwrap(IconMail),
  reddit: unwrap(IconReddit),
  linkedin: unwrap(IconLinkedIn),
  twitch: unwrap(IconTwitch),
};

export const IconCircleFill = unwrap(IconCircleFillRaw);
export const IconCircleLine = unwrap(IconCircleLineRaw);
export const IconVueJs = unwrap(IconVueJsRaw);
