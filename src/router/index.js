import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 如果目标地址是登录页面，放行
  if (to.path === '/login') return next()
  // 否则验证当前浏览器存储的token
  const tokenStr = window.sessionStorage.getItem('token')
  // 如果当前没有token，直接进入登录页面
  if (!tokenStr) return next('/login')
  // 如果当前有token但path是'/'，进入主页
  if (to.path === '/') return next('/home')
  // 否则直接放行
  next()
})

export default router
