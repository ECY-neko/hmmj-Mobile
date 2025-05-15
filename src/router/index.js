import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@/views/Login.vue";
import Detail from "@/views/Detail.vue";
import Register from "@/views/Register.vue";
import Home from "@/views/Home.vue";

import Article from "@/views/Layout/Article.vue";
import Like from "@/views/Layout/Like.vue";
import Collect from "@/views/Layout/Collect.vue";
import User from "@/views/Layout/User.vue";
Vue.use(VueRouter);

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  // 动态路由传参router设置 “ :id ”
  { path: "/detail/:id", component: Detail },
  {
    path: "/",
    redirect: "/article",
    component: Home,
    children: [
      { path: "article", component: Article },
      { path: "like", component: Like },
      { path: "collect", component: Collect },
      { path: "user", component: User },
    ],
  },
];

const router = new VueRouter({
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // 访问任何地址，都会执行此函数。
  // - to表示到哪去（要访问的页面）   to.path 表示跳转的路由地址
  // - from 表示从哪里来（从哪个页面来的）
  // - next() -- 允许通过  next('/login') -- 表示不允许通过，并跳转到/login
  if (
    !localStorage.getItem("mobile-token") &&
    to.path !== "/login" &&
    to.path !== "/register"
  ) {
    next("/login");
    return
  }
  next()
});

export default router;
