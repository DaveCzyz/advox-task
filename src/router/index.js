import { createRouter, createWebHistory } from "vue-router";

import IndexComponent from "../components/IndexComponent.vue";
import NotFoundComponent from "../components/NotFoundComponent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: IndexComponent,
    },
    {
      path: "/:pathMatch(.*)",
      component: NotFoundComponent,
    },
  ],
});

export default router;
