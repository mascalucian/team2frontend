import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../components/Home.vue";
import Results from "../components/Results.vue";
import EditSkills from "../components/EditSkills.vue";
import Recommend from "../components/Recommend.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

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
    path: "/login",
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
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

export default router;
