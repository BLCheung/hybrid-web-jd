<template>
  <div id="app">
    <transition :name="transitionName">
      <!-- 所有通过router-view加载的页面都会被缓存(相关的状态数据等),也可以缓存组件 -->
      <keep-alive :include="taskStacks">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: 'trans-left',
      taskStacks: ['main']
    }
  },
  created() {
    // 判断当前设备是否为iPhoneX设备
    this.$store.commit('setIsIphoneX', window.isIphoneX);
    // 给window对象指定原生端调用的方法
    window.nativeSetUserName = this.onNativeAutoLogin;
    // 获取Android顶部状态栏高度
    if (window.android) {
      this.$store.commit('getStatusBarHeight', window.android.getStatusBarHeight());
    }
  },
  methods: {
    /**
     * 保存自动登录用户名给Vuex状态管理器
     * 提供给原生端调用的方法，把userName传进
     */
    onNativeAutoLogin(userName) {
      this.$store.commit('setUserName', userName);
    }
  },
  watch: {
    /**
     * 监听vue原型链上的route路由对象
     * @param to 即将要进入的目标路由对象
     * @param from 当前导航正要离开的路由
     */
    '$route'(to, from) {
      const type = to.params.routerType;
      if (type === 'push') {
        // 把目标跳转的页面保存进任务栈
        this.taskStacks.push(to.name);
        // 跳转新界面
        this.transitionName = 'trans-left';
      } else {
        // 把任务栈最后一个页面移出任务栈
        this.taskStacks.pop();
        // 后退界面
        this.transitionName = 'trans-right';
      }

      // 重置任务栈
      if (to.params.clearTask) {
        this.taskStacks = ['main'];
      }
    }
  }
}
</script>

<style lang="scss">
@import '@css/style.scss';
#app {
  width: 100%;
  height: 100%;
}
// 新页面进入时动画
.trans-left-enter-active {
  animation: left-in 0.4s;
}
// 当前页面离开动画
.trans-left-leave-active {
  animation: left-out 0.4s;
}
// 上一个页面进入时动画
.trans-right-enter-active {
  animation: right-in 0.4s;
}
// 当前页面返回上一个界面时动画
.trans-right-leave-active {
  animation: right-out 0.4s;
}

@keyframes left-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes left-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}

@keyframes right-in {
  0% {
    transform: translate(-100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes right-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100%, 0);
  }
}
</style>
