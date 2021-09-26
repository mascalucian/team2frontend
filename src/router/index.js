import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../components/Home.vue";
import Results from "../components/Results.vue";
import EditSkills from "../components/EditSkills.vue";
import Recommend from "../components/Recommend.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import UserPage from "../components/UserPage.vue";
import About from "../components/About.vue";
import AuthService from "../services/auth.service.js";

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
    path: "/recommend/:courseId",
    name: "Recommend",
    component: Recommend,
    query: {
      skillId: "?skillId",
      courseTitle: "?courseTitle",
    },
    meta: {
      expertGuard: true,
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

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.authGuard)) {
    if (!await AuthService.getSignedIn())
      AuthService.signIn();
    else next();
  } else if (to.matched.some((record) => record.meta.expertGuard)) {
    const role = await AuthService.getRole();
    console.log(role);
    if (role!=='Expert'){
      if (!await AuthService.getSignedIn()){
        AuthService.signIn();
      }
      else next({
        name: "Home"
      });
    }
    else if (to.matched.some((record) => record.meta.adminGuard)) {
      const role = await AuthService.getRole();
      if (role!=='Admin')
      if (!await AuthService.getSignedIn())AuthService.signIn();
      else next({
        path: '/'
      });
      else next();
    } else {
      next();
    }
    
  }
    else next();
});

export default router;
