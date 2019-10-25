<template>
  <!-- 
    视差效果：让多层背景以不同的速度去进行移动。
			1、至少需要拥有两层背景（缓慢移动区、正常移动区）
			2、将背景设置为相对布局（为缓慢移动区设置 top 来抵消掉scroll滚动，从而减缓滑动的速度）
			3、监听 Parallax 组件的滑动（需从外部传入），根据滑动来计算缓慢移动区 top 的值。
  -->
  <div class="parallax">
    <!-- 缓慢移动区 -->
    <div class="parallax-slow" :style="{top: slowTop}">
      <slot name="slow"></slot>
    </div>
    <!-- 正常移动区 -->
    <div class="parallax-normal z-index-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 父页面的滑动距离
    scrollTop: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 两倍速差，页面滑动距离为100px，速差就为100 / 2 = 50px
      VELOCITY_DIFF: 2
    }
  },
  computed: {
		/**
		 * 返回slow区域距离顶部的距离
		 */
    slowTop() {
      // 当前页面的滑动距离 / 速度差 = 缓慢移动区应该滑动的距离
      // 当前页面的滑动距离 - 缓慢移动区应该滑动的距离 = 缓慢移动区用来抵消掉 scroll 的值
      return (this.scrollTop - (this.scrollTop / this.VELOCITY_DIFF)) + 'px';
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.parallax {
  width: 100%;
  overflow: hidden;

  &-slow {
    position: relative;
    width: 100%;
  }

  &-normal {
    position: relative;
    width: 100%;
  }
}
</style>
