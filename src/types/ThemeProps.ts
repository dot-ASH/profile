import type { Ref } from "vue";

export interface ThemeProps {
  theme: Ref<string>;
  updateTheme: (themeValue: string) => void;
}
