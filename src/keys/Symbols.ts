import type { InjectionKey } from "vue";
import type { LoadingProps } from "@/types/LoadingProps";
import type { ThemeProps } from "@/types/ThemeProps";

export const LoadingKeys = Symbol() as InjectionKey<LoadingProps>;
export const ThemeKeys = Symbol() as InjectionKey<ThemeProps>;
