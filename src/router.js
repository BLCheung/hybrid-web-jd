import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: () => import('./views/GoodsList.vue') // 异步组件：只有在需要的时候才导入该组件
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: () => import('./views/GoodsDetail.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
