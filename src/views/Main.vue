<template>
  <div id="main">
    <!-- 动态切换组件 -->
    <component :is="currentComponent"></component>
    <!-- 底部tab栏 -->
    <tool-bar @onChange="onChangeFragment" />
  </div>
</template>

<script>
// @ is an alias to /src
import Toolbar from '@cpm/currency/Toolbar.vue';
export default {
  components: {
    toolBar: Toolbar,
    // 异步组件引入，只有在需要展示该组件的时候才去进行渲染
    home: () => import('@cpm/Home.vue'),
    shopping: () => import('@cpm/Shopping.vue'),
    my: () => import('@cpm/My.vue')
  },
  data() {
    return {
      // 当前动态组件的Id
      currentComponent: 'home'
    };
  },
  methods: {
    /**
     * 动态切换页面
     * 接收从子组件发送的事件，参数为从子组件传递过来的数据
     */
    onChangeFragment(name) {
      console.log('toolBar组件name', name);
      this.currentComponent = name;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
#main {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $bgColor;

  tool-bar {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
