import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/weather",
    },

    {
      path: "/weather",
      name: "weather",
      component: () => import("../views/WeatherView/WeatherView.vue"),
    },
    {
      path: "/weather/:key",
      name: "weatherWithKey",
      component: () => import("../views/WeatherView/WeatherView.vue"),
    },
    {
      path: "/favorites",
      name: "favorites",
      component: () => import("../views/FavoritesView/FavoritesView.vue"),
    },
  ],
  linkActiveClass: "active-menu-item",
});

export default router;
