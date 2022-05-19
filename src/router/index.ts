import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw
} from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import storage from "@/utils/storage/index";
import Layout from "../views/layout/layout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/",
    name: "Index",
    redirect: "/database",
    component: Layout
    // component: () => import("@/views/index/index.vue")
  },
  {
    path: "/preview",
    component: Layout,
    children: [
      {
        path: "",
        name: "preview",
        component: () => import("@/views/preview/index.vue")
      }
    ]
  },
  {
    path: "/database",
    component: Layout,
    children: [
      {
        path: "",
        name: "database",
        component: () => import("@/views/database/index.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
  NProgress.start();
  const userId = storage.getUserId();
  const userName = storage.getUserName();
  const hasLoggined = userId && userId !== 0 && userName && userName !== "";

  if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else if (hasLoggined) {
    next();
  } else {
    if (to.path !== "/") {
      next(`/login?redirect=${to.path}`);
    } else {
      next("/login");
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
