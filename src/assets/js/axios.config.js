/**
 * axios全局配置文件
 */
import Vue from 'vue';
import axios from 'axios';

// 设置axios的基本域名url
axios.defaults.baseURL = 'http://api.imooc.hybrid.lgdsunday.club/';

// 发起请求request -> 服务器响应请求并返回数据response

/**
 * 设置axios在request阶段的拦截器配置
 * 所有使用 axios 发送的请求，在请求发送出去之前，都会进入到方法中
 * 在这里，为所有请求添加上 token
 */
axios.interceptors.request.use((config) => {
  if (config.params) {
    // 给params加上token
    config.params.token = '请输入你的token，Please enter your token';
  } else {
    // 没有就初始化一个token
    config.params = {
      token: '请输入你的token，Please enter your token'
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * 设置axios在response阶段的拦截器配置
 * 当请求被响应后就会执行该方法
 * response为从服务器返回的数据，包括状态码，信息，业务所需数据等
 */
axios.interceptors.response.use((response) => {
  const data = response.data
  if (response.status !== 200 || data.state !== '0') {
    return Promise.reject(response);
  }
  return data.data;
}, (error) => {
  return Promise.reject(error);
});

// 绑定到Vue的原型链中，使用为this.$http
Vue.prototype.$http = axios;
