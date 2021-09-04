import { createApp } from "vue";
import App from "./App.vue";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import router from "./router";

const app = createApp(App);

app.use(router);
app.use(
  VueLoading,
  {
    color: "#5624d0",
    backgroundColor: "white",
  },
  {
    // slots
  }
);
app.mount("#app");
