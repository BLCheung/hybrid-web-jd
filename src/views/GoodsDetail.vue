<template>
  <div class="detail" @scroll="onScrollChange">
    <!-- 导航栏 -->
    <navigation :isBack="false" @left="onNaviLeftClick" :navStyle="navBarStyle">
      <template v-slot:left>
        <div class="detail-nav-left">
          <img src="@img/back-white.svg" alt />
        </div>
      </template>
      <template v-slot:center>
        <span class="detail-nav-title">商品详情</span>
      </template>
    </navigation>
    <!-- 轮播 -->
    <swiper :height="SWIPER_IMG_HEIGHT + 'rem'" :datas="goodsData.detailImgs" :paginationType="2" />
    <!-- 详情 -->
    <div class="detail-content">
      <!-- 标题价格 -->
      <div class="detail-content-desc">
        <p class="detail-content-desc-price">￥{{goodsData.price | price2Fixed}}</p>
        <p class="detail-content-desc-title">
          <direct v-if="goodsData.isDirect" />
          {{goodsData.name}}
        </p>
      </div>
      <div class="detail-content-item">
        <p class="detail-content-item-selected">
          已选
          <span class="text-line-1">{{goodsData.name}}</span>
        </p>
        <!-- 附加服务 -->
        <ul class="detail-content-item-support">
          <li
            class="detail-content-item-support-item"
            v-for="(item, index) of supportsData"
            :key="index"
          >
            <img src="@img/support.svg" alt />
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
      <!-- 图片描述 -->
      <div class="detail-content-gallery">
        <img v-for="(item, index) of goodsData.detailImgs" :key="index" :src="item" alt />
      </div>
    </div>
    <!-- 购物车&购买 -->
    <div class="detail-btn">
      <div class="detail-btn-add">加入购物车</div>
      <div class="detail-btn-buy">购买</div>
    </div>
  </div>
</template>

<script>
import Navigation from '@cpm/currency/NavigationBar.vue';
import Swiper from '@cpm/currency/Swiper.vue';
import Direct from '@cpm/goods/Direct.vue';

export default {
  components: {
    Navigation,
    Swiper,
    Direct
  },
  data() {
    return {
      goodsData: {},
      SWIPER_IMG_HEIGHT: 364 / 375,
      ANCHOR_SCROLL_TOP: 310,
      scrollTop: 0,
      supportsData: [
        '可配送海外',
        '京东发货&售后',
        '京准达',
        '211限时达',
        '可自提',
        '不可使用优惠券'
      ]
    }
  },
  created() {
    this.getGoodsData();
  },
  computed: {
    navBarStyle() {
      return {
        backgroundColor: '',
        position: 'fixed'
      }
    }
    // navBarSlotStyle() {
    //   return;
    // }
  },
  methods: {
    /**
     * 获取从上一页传递过来的商品数据
     */
    getGoodsData() {
      this.goodsData = this.$route.params.goods;
      console.log('商品:', this.goodsData);
    },
    /**
     * 导航栏点击返回
     */
    onNaviLeftClick() {
      this.$router.go(-1);
    },
    /**
     * 
     */
    onScrollChange({ target }) {
      this.scrollTop = target.scrollTop;
      console.log(this.scrollTop);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
$rootBtnHeight: px2rem(46);

.detail {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  overflow-y: auto;

  &-nav-left {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
  }

  &-nav-title {
    font-size: $titleFontSize;
    font-weight: bold;
    color: white;
  }

  &-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    margin-bottom: $rootBtnHeight;

    &-desc {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: $marginSize;
      box-sizing: border-box;
      overflow: hidden;
      border-radius: 0 0 $radiusSize $radiusSize;
      box-shadow: 0 0 px2rem(16) 0 rgba(0, 0, 0, 0.2);
      background-color: white;
      margin-bottom: $marginSize;

      &-price {
        font-size: px2rem(24);
        font-weight: bold;
        color: $mainColor;
        margin-bottom: $marginSize;
      }

      &-title {
        font-size: $titleFontSize;
        font-weight: bold;
        color: #333333;
        line-height: px2rem(20);
      }
    }

    &-item {
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
      padding: $marginSize;
      margin-bottom: $marginSize;
      border-radius: $radiusSize;
      background-color: white;
      box-shadow: 0 px2rem(4) px2rem(20) 0 rgba(0, 0, 0, 0.2);

      &-selected {
        display: flex;
        align-items: center;
        font-size: $miniFontSize;
        color: $hintColor;
        padding: px2rem(6) 0;
        border-bottom: px2rem(1) solid $lineColor;

        span {
          font-size: $infoFontSize;
          font-weight: bold;
          color: #333333;
          margin-left: px2rem(2);
        }
      }

      &-support {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        margin-top: $marginSize;

        &-item {
          display: inline-flex;
          align-items: center;
          padding: px2rem(6) 0;
          margin-right: px2rem(10);

          img {
            width: px2rem(12);
            margin-right: px2rem(4);
          }

          span {
            font-size: $miniFontSize;
            color: $hintColor;
          }
        }
      }
    }

    &-gallery {
      img {
        width: 100%;
      }
    }
  }

  &-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: $rootBtnHeight;
    line-height: $rootBtnHeight;
    color: white;
    // border-top: px2rem(1) solid $lineColor;

    div {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      height: 100%;
      font-size: $infoFontSize;
    }

    &-add {
      background: linear-gradient(
        90deg,
        rgba(255, 194, 77, 1) 0%,
        rgba(255, 113, 0, 1) 100%
      );
    }

    &-buy {
      background: linear-gradient(
        90deg,
        rgba(216, 30, 6, 1) 0%,
        rgba(236, 94, 52, 1) 100%
      );
    }
  }
}
</style>
