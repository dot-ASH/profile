import "./assets/style.css";
import { MotionPlugin } from "@vueuse/motion";
import App from "./App.vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { createApp } from "vue";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        // dark: false,
        colors: {
          primary: "white", // #E53935
          secondary: "white", // #FFCDD2
          background: "white",
          surface: "white",
          success: "white",
          warning: "white",
          error: "white",
          info: "white",
        },
      },
    },
  },
});

const app = createApp(App);

app.use(MotionPlugin);
app.use(vuetify);
app.mount("#app");
