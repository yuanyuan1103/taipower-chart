import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
const ChartView = () => import("../views/Chart.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/chart",
    name: "chart",
    component: ChartView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
