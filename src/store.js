import Vue from 'vue'
import Vuex from 'vuex'
import vue from './main';
import {
  stat
} from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户名
    userName: undefined,
    // 购物车数据源
    carts: [],
    // 设备是否为iPhoneX
    isIphoneX: false,
    // 原生端状态栏高度
    statusBarHeight: null
  },
  mutations: {
    /**
     * 保存商品到购物车
     * @param {*} state store内需要被触发的mutations方法
     * @param {*} goods 商品数据
     */
    add2Carts(state, goods) {
      // 判断购物车中是否已包含该商品
      const isExist = state.carts.some(item => {
        if (item.id === goods.id) {
          // 已包含则对该商品数量+1
          // item.num += 1;
          console.log('该商品已在购物车');
          vue.$toast({
            title: '该商品已在购物车'
          });
          return true;
        }
      });
      // 不存在，则push进购物车内
      if (!isExist) {
        // 为商品增加可观测的新属性
        // Object.assign()也可以增加属性，但不可以被Vue观测到变化
        // 除非把原对象和需要被加入进原对象的属性一起生成一个新的对象
        // 商品是否被选中
        Vue.set(goods, 'isCheck', false);
        // 商品数量
        Vue.set(goods, 'num', 1);
        state.carts.push(goods);
        console.log('不存在，添加');
        vue.$toast({
          title: '添加成功！'
        });
      }
    },
    /**
     * 删除购物车商品
     * @param {*} state 
     */
    deleteGoods(state) {
      state.carts = state.carts.filter(item => {
        return !item.isCheck;
      });
      console.log(state.carts);
    },
    /**
     * 改变购物车内商品的数量
     * @param {*} state store内需要被触发的mutations方法
     * @param {*} goods 需要被改变数量的商品
     */
    changeGoodsNum(state, goods) {
      state.carts[goods.index].num = goods.num;
    },
    /**
     * 保存用户名
     */
    setUserName(state, name) {
      state.userName = name;
    },
    /**
     * 退出登录，清空当前用户名
     */
    clearUserName(state) {
      state.userName = undefined;
    },
    /**
     * 修改iPhoneX
     */
    setIsIphoneX(state, isIphoneX) {
      state.isIphoneX = isIphoneX;
    },
    /**
     * 获取Android原生端状态栏高度
     */
    getStatusBarHeight(state, height) {
      state.statusBarHeight = height;
    }
  },
  actions: {

  }
})
