import IconGithub from "@iconify/icons-fa-brands/github";
import IconDiscord from "@iconify/icons-fa-brands/discord";
import IconInstagram from "@iconify/icons-ri/instagram-fill";
import IconMail from "@iconify/icons-mdi/email";
import IconReddit from "@iconify/icons-fa-brands/reddit-alien";
import IconLinkedIN from "@iconify/icons-mdi/linkedin";
import IconFacebook from "@iconify/icons-fa-brands/facebook-square";
import IconTwitter from "@iconify/icons-fa-brands/twitter-square";
import IconSnapChat from "@iconify/icons-fa-brands/snapchat-square";
import IconTiktok from "@iconify/icons-fa-brands/tiktok";
import IconTwitch from "@iconify/icons-fa-brands/twitch";
import type { SocialMapType } from "./SocialTypes";

export const socialsMap: SocialMapType = {
  facebook: IconFacebook,
  twitter: IconTwitter,
  snapchat: IconSnapChat,
  tiktok: IconTiktok,
  github: IconGithub,
  discord: IconDiscord,
  instagram: IconInstagram,
  gmail: IconMail,
  reddit: IconReddit,
  linkedin: IconLinkedIN,
  twitch: IconTwitch,
};

export const TooltipMap: { [Key: number]: "top" | "end" | "bottom" | "start" } =
  {
    0: "top",
    1: "top",
    2: "top",
    3: "bottom",
    4: "bottom",
    5: "bottom",
  };
