<template>
  <div class="counter">
    <span
      class="counter-reduce"
      :class="{'counter-disabled': number === 1}"
      @click="onReduceClick"
    >-</span>
    <span class="counter-num">{{number}}</span>
    <span class="counter-add" @click="onAddClick">+</span>
  </div>
</template>

<script>
export default {
  props: {
    // 计数器默认数量
    value: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      // 数量数据源
      number: 1
    }
  },
  watch: {
		/**
		 * 监听value属性
		 */
    value(newVal) {
      this.number = newVal;
    },
		/**
		 * 监听data内number属性
		 * 数据发生变化，发送事件
		 */
    number(newVal) {
      this.$emit('change', newVal);
    }
  },
  methods: {
		/**
		 * 递减方法
		 */
    onReduceClick() {
      if (this.number === 1) {
        return;
      }
      this.number -= 1;
    },
		/**
		 * 自增方法
		 */
    onAddClick() {
      this.number += 1;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.counter {
  display: flex;
  font-size: $infoFontSize;
  height: px2rem(20);
  line-height: px2rem(20);

  span {
    display: inline-block;
    width: px2rem(30);
    font-size: $infoFontSize;
    font-weight: 500;
    text-align: center;
  }

  &-num {
    background-color: $bgColor;
    padding: 0 px2rem(4);
  }

  &-disabled {
    color: $hintColor;
  }
}
</style>
