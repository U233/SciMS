import Vue from 'vue'
import VueRouter from 'vue-router'
import NotLogin from '../components/NotLogin.vue'
import Home from '../components/Home.vue'
import axios from 'axios'
import Login from '../components/logins/Login.vue'
import Register from '../components/logins/Register.vue'

Vue.use(VueRouter)
axios.defaults.baseURL = 'http://localhost:8080/'

const routes = [
  {
    path: '/notlogin',
    component: NotLogin,
    redirect: '/login',
    children: [
      { path: '/login', component: Login },
      { path: '/register', component: Register }
    ]
  },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach(async (to, from, next) => {
  // 如果目标地址是登录页面，放行
  if (to.path === '/notlogin') return next()
  if (to.path === '/login') return next()
  if (to.path === '/register') return next()
  // 否则验证当前浏览器存储的token
  const tokenStr = window.sessionStorage.getItem('token')
  // 如果当前没有token，直接进入登录页面
  if (!tokenStr) return next('/notlogin')
  // 如果当前有token但path是'/'，进入主页
  if (to.path === '/') return next('/home')
  // 否则直接放行
  next()
})

export default router
