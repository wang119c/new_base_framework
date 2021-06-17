import Vue from 'vue'
// 初始化样式
import 'normalize.css/normalize.css'
// 加载全局样式
import '@/assets/css/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载ui组件
import './plugins/element.js'
// 加载全局的过滤函数
import * as filters from './filters'
// 加载svg格式的icon,统一icon使用svg格式
import './icons'
// 加载错误上报日志
import './utils/errors-log'
// 加上权限控制
import './permission'

// 注册全局过滤函数
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
