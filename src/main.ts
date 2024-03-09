import "./assets/style.css";
import { MotionPlugin } from "@vueuse/motion";
import App from "./App.vue";

import { createApp } from "vue";

const app = createApp(App);

app.use(MotionPlugin);
app.mount("#app");
