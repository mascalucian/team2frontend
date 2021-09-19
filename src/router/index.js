import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../components/Home.vue";
import Results from "../components/Results.vue";
import EditSkills from "../components/EditSkills.vue";
import Recommend from "../components/Recommend.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import UserPage from "../components/UserPage.vue";

import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/results/:query/0",
    redirect: "/",
  },
  {
    path: "/results/:query/:page",
    name: "Results",
    component: Results,
    query: "?skillId",
  },
  {
    path: "/skills",
    component: EditSkills,
  },
  {
    path: "/login/:returnUrl?",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/recommend/:courseId",
    name: "Recommend",
    component: Recommend,
    query: {
      skillId: "?skillId",
    },
  },
  {
    path: "/userpage",
    component: UserPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresLogin)) {
    if (!store.getters.isLoggedin)
      next({
        name: "Login",
        params: { returnUrl: to.fullPath },
      });
    else next();
  } else {
    next();
  }
});

export default router;
