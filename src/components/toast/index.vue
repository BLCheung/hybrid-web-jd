<template>
  <div class="toast">
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      title: '',
      duration: 2000
    }
  },
  mounted() {
    setTimeout(() => {
      // duration秒后通过父级移除子元素的方式来移除该组件
      this.$el.parentNode.removeChild(this.$el);
    }, this.duration);
  }
}
</script>

<style lang="scss" scoped>
.toast {
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
	position: fixed;
	top: 50%;
	left: 50%;
	// 可以在不知道自身宽高情况使用translate下达到居中效果
  transform: translate(-50%, -50%);
  color: #ffffff;
  z-index: 99999;
  padding: 10px 16px;
  border-radius: 4px;
  background: rgba(17, 17, 17, 0.6);

  p {
    font-size: 16px;
  }
}
</style>
