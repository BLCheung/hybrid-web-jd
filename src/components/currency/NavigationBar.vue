<template>
  <div class="navigation-bar z-index-max" :style="navStyle" :class="{'bottom-line': title}">
    <!-- 左 -->
    <div class="left" @click="onLeftClick">
      <!-- 默认状态 -->
      <img v-if="isBack" src="@img/back.svg" alt />
      <slot name="left"></slot>
    </div>
    <!-- 中 -->
    <div class="center">
      <!-- 默认状态 -->
      <span v-if="title" class="center-title">{{title}}</span>
      <slot name="center"></slot>
    </div>
    <!-- 右 -->
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navStyle: {
      type: Object,
      default() {
        return {
          backgroundColor: '#ffffff'
        }
      }
    },
    title: {
      type: String,
      default: ''
    },
    isBack: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    onLeftClick() {
      // 触发事件，相当于微信小程序的this.triggerEvent()触发一个事件给父组件去接受
      this.$emit('left');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
$navigationRootHeight: px2rem(44);
$leftAndRightWidth: px2rem(26);

.navigation-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: $navigationRootHeight;
  width: 100%;
  box-sizing: border-box;

  .left,
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: $leftAndRightWidth;
    height: 100%;
    padding: 0 $marginSize;

    img {
      width: 100%;
    }
  }

  .center {
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
    justify-content: center;

    &-title {
      font-size: $titleFontSize;
    }
  }
}

.bottom-line {
  border-bottom: px2rem(1) solid $lineColor;
}
</style>
