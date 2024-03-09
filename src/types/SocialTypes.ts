import type { IconifyIcon } from "@iconify/vue/dist/iconify.js";

export interface SocialTypes {
  id: number;
  url: string;
  name: string;
  icon: IconifyIcon;
}

export interface SocialMapType {
  [key: string]: IconifyIcon;
}
