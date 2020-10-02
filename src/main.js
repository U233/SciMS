import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入axios
import axios from 'axios'

// 配置请求的根路径
// baseURL里面是网站的根目录
axios.defaults.baseURL = ''
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
