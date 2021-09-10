import {
    createRouter,
    createWebHashHistory
} from "vue-router";

import Home from "../components/Home.vue";
import Results from "../components/Results.vue";
import ViewCourse from "../components/ViewCourse.vue"

const routes = [{
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
    },
    {
        //  path: "/results/:query/:course",
        path: "/course",
        name: "ViewCourse",
        component: ViewCourse,
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