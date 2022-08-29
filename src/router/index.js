import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../components/HomeView.vue";
import NotFoundComponent from "../components/NotFoundComponent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:pathMatch(.*)",
      component: NotFoundComponent,
    },
  ],
});

export default router;
