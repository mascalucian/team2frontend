import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../components/Home.vue";
import Results from "../components/Results.vue";
import ViewCourse from "../components/ViewCourse.vue";
import Skills from "../components/Skills.vue";
import Recommend from "../components/Recommend.vue";

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
    //  path: "/results/:query/:course",
    path: "/course",
    name: "ViewCourse",
    component: ViewCourse,
  },
  {
    path: "/skills",
    component: Skills,
  },
  {
    path: "/recommend",
    component: Recommend,
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
