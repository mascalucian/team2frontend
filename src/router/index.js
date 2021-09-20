import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../components/Home.vue";
import Results from "../components/Results.vue";
import EditSkills from "../components/EditSkills.vue";
import Recommend from "../components/Recommend.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import UserPage from "../components/UserPage.vue";
import About from "../components/About.vue";

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
    query: {
      skillId: "?skillId",
    },
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
      courseTitle: "?courseTitle",
    },
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: "/user/:id",
    name: "UserPage",
    component: UserPage,
  },
  {
    path: "/about",
    component: About,
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
