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
import '@js/filters.js'
import '@js/isIphoneX.js'
import Toast from '@cpm/toast/index';

Vue.config.productionTip = false
// 把Toast挂载到Vue的原型链上，使用：this.$toast(Object option);
Vue.prototype.$toast = Toast;

// Vue实例赋值给vue导出去
var vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 导出去，可在某些Vue以外的js文件中调用Vue实例或原型链上的方法
export default vue;
