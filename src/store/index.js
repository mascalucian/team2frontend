import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./auth";

const authState = createPersistedState({
  paths: ["auth"],
});

const store = createStore({
  modules: {
    auth,
  },
  plugins: [authState],
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});

export default store;
