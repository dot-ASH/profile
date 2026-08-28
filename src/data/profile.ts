import config from '../../config.json';

export interface IconData {
  body: string;
  width?: number;
  height?: number;
}

export type ThemeName = 'light' | 'mint' | 'brown';

export const { profile, images, socials, quotes, randomKeys, dev } = config;

/**
 * `music` holds two differently-shaped entries: the playable track and the
 * Spotify playlist. Naming them keeps the union out of every call site.
 */
export const track = config.music[0] as {
  id: number;
  type: string;
  title: string;
  src: string;
  url: string;
};

export const playlist = config.music[1] as {
  id: number;
  name: string;
  title: string;
  url: string;
};

/**
 * The name is rendered on two lines. Two words split one-per-line; four words
 * pair up; anything else collapses to the first word. Build-time in Astro —
 * this used to run on every render in Display.vue.
 */
export function splitSentence(sentence: string | undefined, index: number): string | undefined {
  if (!sentence) return sentence;
  const words = sentence.split(' ');
  if (words.length === 2) return words[index];
  if (words.length === 4) return index === 0 ? words[0] + words[1] : words[2] + words[3];
  return words[0];
}
