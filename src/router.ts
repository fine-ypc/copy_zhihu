import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from '@/views/CreatePost.vue'
import store from '@/store'
const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/column/:id', // url匹配 /column/1
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/post/create',
      name: 'create',
      component: CreatePost,
      meta: { requiredLogin: true } // 需要登录
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      // 已登录用户访问/login 重定向到首页/home
      meta: { redirectAlreadyLogin: true } // 路由元信息(用于细粒度的 权限控制 比如某些页面需要登录 某些页面不登陆也能看)
    }]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.user.isLogin) { // 如果要去的url是requiredLogin的 并且 用户未登录
    next({ name: 'login' }) // 那么跳转/login
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next() // 否则继续
  }
})
export default router
