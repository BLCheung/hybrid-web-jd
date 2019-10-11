/**
 * 整个项目的入口文件
 * 可以在这里导入整个项目所需模块
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@js/htmlFontSize.js'
import '@js/axios.config.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
