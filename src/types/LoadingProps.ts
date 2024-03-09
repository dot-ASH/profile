import type { Ref } from "vue";

export interface LoadingProps {
  loading: Ref<boolean>;
  updateLoading: (loadingValue: boolean) => void;
}
