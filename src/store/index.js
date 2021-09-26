import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { vuexOidcCreateStoreModule } from 'vuex-oidc'
import { oidcSettings } from '../config/oidc'
import auth from "./auth";

// const authState = createPersistedState({
//   paths: ["auth"],
// });
const publicRoutes = ['/', '/about', '/user/:id', '/skills', '/results/:query/:page', '/results/:query/0']

const store = createStore({
  modules: {
    oidcStore: vuexOidcCreateStoreModule(oidcSettings , { namespaced: true, publicRoutePaths: publicRoutes })
  },
  // plugins: [authState],
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});

export default store;
