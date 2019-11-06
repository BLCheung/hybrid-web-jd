import Vue from 'vue';
import index from './index.vue';

let instance;
// 继承index组件下所有选项对象，方法和生命周期过来
let ToastConstructor = Vue.extend(index);

const Toast = (option = {}) => {
  // 把它的组件下指定的data选项赋值过来
  instance = new ToastConstructor({
    // 这里的data会赋值到index组件下的data  
    data: option
  });
  // 挂载到body下，不受#app和<router-view />管控
  document.body.appendChild(instance.$mount().$el);
}

// 暴露出去
export default Toast;
