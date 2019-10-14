<template>
  <div class="flash">
    <div class="flash-count">
      <p class="flash-count-title">京东秒杀</p>
      <!-- 倒计时模块控件 -->
      <count-down :endHours="16" />
    </div>
    <div class="flash-goods">
      <div class="flash-goods-item" v-for="(item, index) of datas" :key="index">
        <img class="flash-goods-item-img" :src="item.icon" alt />
        <p class="flash-goods-item-price">￥{{item.price | price2Fixed}}</p>
        <p class="flash-goods-item-old-price">￥{{item.oldPrice | price2Fixed}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import countDown from '@cpm/seconds/CountDown.vue';
export default {
  components: {
    countDown
  },
  props: {
    datas: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.flash {
  display: flex;
  flex-direction: column;
  margin: $marginSize;
  border-radius: $radiusSize;
  background-color: white;
  overflow: hidden;

  &-count {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: $marginSize;

    &-title {
      font-size: $titleFontSize;
      margin-right: $marginSize;
    }
  }

  &-goods {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
    overflow-x: scroll;
    padding: px2rem(6);

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 0 px2rem(8);
      box-sizing: border-box;

      &-img {
        width: px2rem(66);
        height: px2rem(66);
        margin-bottom: $marginSize;
      }

      &-price {
        width: fit-content;
        font-size: $titleFontSize;
        color: $mainColor;
      }

      &-old-price {
        width: fit-content;
        font-size: $infoFontSize;
        color: $hintColor;
        text-decoration: line-through;
        margin-top: $marginSize;
      }
    }
  }
}
</style>
