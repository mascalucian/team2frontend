import { createApp } from "vue";
import App from "./App.vue";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import router from "./router";
import axios from "axios";
import AuthService from './services/auth.service';

import { VueSignalR } from "@quangdao/vue-signalr";

const app = createApp(App);

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "https://localhost:5001";
}
if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "https://team-2-backend.herokuapp.com";
}
AuthService.getAcessToken().then(
  acessToken => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + acessToken
  }, err => {
    console.log(err)
  });

app.config.globalProperties.$http = axios;
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
app.use(VueSignalR, {
  url: `${app.config.globalProperties.$http.defaults.baseURL}/message-hub`,
});
// app.use(store);
app.mount("#app");

