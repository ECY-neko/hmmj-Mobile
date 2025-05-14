import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import Detail from '@/views/Detail.vue'
import Register from '@/views/Register.vue'
import Home from '@/views/Home.vue'

import Article from '@/views/Layout/Article.vue'
import Like from '@/views/Layout/Like.vue'
import Collect from '@/views/Layout/Collect.vue'
import User from '@/views/Layout/User.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  // 动态路由传参router设置 “ :id ”
  { path: '/detail/:id', component: Detail },
  {
    path: '/',
    redirect: '/article',
    component: Home,
    children: [
      { path: 'article', component: Article },
      { path: 'like', component: Like },
      { path: 'collect', component: Collect },
      { path: 'user', component: User }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
