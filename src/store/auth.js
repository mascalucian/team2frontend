import axios from "axios";
import router from "../router";
const auth = {
  state: {
    userData: null,
    token: "",
    errorMessage: "",
  },
  mutations: {
    setUser(state, payload) {
      state.userData = payload;
    },
    clearUser(state) {
      state.userData = null;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    clearToken(state) {
      state.token = "";
    },
    setErrorMessage(state, payload) {
      state.errorMessage = payload;
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      await axios
        .post("/auth/login", {
          username,
          password,
        })
        .then((response) => {
          commit("setUser", response.data.user);
          commit("setToken", response.data.token);
          commit("setErrorMessage", "");
        })
        .catch((error) => {
          console.log(error.response);
          switch (error.response.data.title) {
            case "Unauthorized":
              commit(
                "setErrorMessage",
                "Username and password combination does not exist."
              );
              break;
            default:
              console.log(error.title);
          }
        });
    },
    async register({ commit, dispatch }, { username, email, password }) {
      await axios
        .post("/auth/register", {
          username,
          email,
          password,
        })
        .then(() => {})
        .catch((error) => {
          console.log(error);
          commit("setErrorMessage", error.response.data.message);
        });
    },
    async logout({ commit }) {
      commit("clearUser");
      commit("clearToken");
      let route = router.currentRoute;
      if (route._value.meta.requiresLogin === true) {
        router.push({ name: "Home" });
      }
    },
  },
  getters: {
    isLoggedin: (state) => state.userData !== null,
    getUserData: (state) => state.userData,
    getToken: (state) => state.token,
    getErrorMessage: (state) => state.errorMessage,
  },
};
export default auth;
