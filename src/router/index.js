import {
    createRouter,
    createWebHashHistory
} from "vue-router";

import Home from "../components/Home.vue";
import Results from "../components/Results.vue";
import EditSkills from "../components/EditSkills.vue";

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
        query: "?skillId",
    },
    {
        path: "/skills",
        component: EditSkills,
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