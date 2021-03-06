<template>
  <div class="detail">
    <!-- 导航栏 -->
    <navigation :isBack="false" @left="onNaviLeftClick" :navStyle="navBarStyle">
      <template v-slot:left>
        <div class="detail-nav-left" :style="navBarLeftStyle">
          <img src="@img/back-white.svg" alt />
        </div>
      </template>
      <template v-slot:center>
        <span class="detail-nav-title" :style="{opacity: navBarOpacity}">商品详情</span>
      </template>
    </navigation>

    <div class="detail-content">
      <!-- 视差区域 -->
      <parallax @onScrollTop="onScrollChange">
        <!-- 缓慢区 -->
        <template v-slot:slow>
          <!-- 轮播 -->
          <swiper
            :height="SWIPER_IMG_HEIGHT + 'rem'"
            :datas="goodsData.detailImgs"
            :paginationType="2"
          />
        </template>

        <!-- 正常区 -->
        <template>
          <!-- 详情 -->
          <div class="detail-content-desc">
            <!-- 标题价格 -->
            <div class="detail-content-desc-item">
              <p class="detail-content-desc-item-price">￥{{goodsData.price | price2Fixed}}</p>
              <p class="detail-content-desc-item-title">
                <direct v-if="goodsData.isDirect" />
                {{goodsData.name}}
              </p>
            </div>
            <!-- 已选款式 -->
            <div class="detail-content-desc-item">
              <p class="detail-content-desc-item-selected">
                已选
                <span class="text-line-1">{{goodsData.name}}</span>
              </p>
              <!-- 附加服务 -->
              <ul class="detail-content-desc-item-support">
                <li
                  class="detail-content-desc-item-support-item"
                  v-for="(item, index) of supportsData"
                  :key="index"
                >
                  <img src="@img/support.svg" alt />
                  <span>{{item}}</span>
                </li>
              </ul>
            </div>
            <!-- 图片描述 -->
            <div class="detail-content-desc-gallery">
              <img v-for="(item, index) of goodsData.detailImgs" :key="index" :src="item" alt />
            </div>
          </div>
        </template>
      </parallax>
    </div>
    <!-- 购物车&购买 -->
    <div class="detail-btn z-index-max" :class="{'iphonex-bottom': $store.state.isIphoneX}">
      <div class="detail-btn-add" @click="onAddClick">加入购物车</div>
      <div class="detail-btn-buy" @click="onBuyClick">购买</div>
    </div>
  </div>
</template>

<script>
import Navigation from '@cpm/currency/NavigationBar.vue';
import Swiper from '@cpm/currency/Swiper.vue';
import Direct from '@cpm/goods/Direct.vue';
import Parallax from '@cpm/currency/Parallax.vue';

export default {
  name: 'goodsDetail',
  components: {
    Navigation,
    Swiper,
    Direct,
    Parallax
  },
  data() {
    return {
      goodsData: {},
      // 364是按照i6设计稿得到的大小 乘10是因为根元素fontSize除了10，所以要乘上去，否则结果会很小
      SWIPER_IMG_HEIGHT: 364 / 375 * 10,
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
    /**
     * 导航栏左插槽Opacity变化
     * 当前呈递减状态，scroll / ANCHOR_SCROLL_TOP初始会得到很小的小数值
     * 1 - 很小的小数值值会得到比较大的值，1会不断减去从0往1不断变大的小数值最终会变成1 - 1 = 0；
     * 所以当前为1 - 0 ~ 1不断变大的值 = 值会从1 ~ 0区间递减的值
     * Opacity为逐渐从1 ~ 0隐藏
     */
    navBarLeftOpacity() {
      return 1 - this.scrollTop / this.ANCHOR_SCROLL_TOP;
    },
    /**
     * 导航栏左侧插槽样式
     * 默认值为rgba(0, 0, 0, 0.6)
     * 呈递减
     */
    navBarLeftStyle() {
      return {
        backgroundColor: `rgba(0, 0, 0, ${this.navBarLeftOpacity - 0.4})`
      }
    },
    /**
     * 导航栏样式
     */
    navBarStyle() {
      return {
        backgroundColor: `rgba(216, 30, 6, ${this.navBarOpacity})`,
        position: 'fixed',
        top: 0
      }
    },
    /**
     * 整个导航栏Opacity变化
     * 当前呈递增状态，1减去一个不断的从1开始递减的值，最终值会为1
     * 1 - 1 ~ 0不断变小的值 = 值会从0 ~ 1区间递增的值
     * Opacity为逐渐从0 ~ 1完全显示
     */
    navBarOpacity() {
      return 1 - this.navBarLeftOpacity;
    }
  },
  methods: {
    /**
     * 获取从上一页传递过来的商品数据
     */
    getGoodsData() {
      this.$http
        .get('/goodsDetail', {
          params: {
            goodsId: this.$route.query.id
          }
        })
        .then(({ goodsData }) => {
          this.goodsData = goodsData;
        });
    },
    /**
     * 导航栏点击返回
     */
    onNaviLeftClick() {
      this.$router.go(-1);
    },
    /**
     * 添加到购物车
     */
    onAddClick() {
      this.$store.commit('add2Carts', this.goodsData);
    },
    /**
     * 立即购买
     */
    onBuyClick() {
      this.$router.push({
        name: 'buy',
        params: {
          routerType: 'push'
        },
        query: {
          id: this.$route.query.id
        }
      });
    },
    /**
     * 视差组件滑动事件
     */
    onScrollChange(value) {
      this.scrollTop = value;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
$rootBtnHeight: px2rem(46);

.detail {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: $bgColor;

  &-nav-left {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
    border-radius: 50%;
  }

  &-nav-title {
    font-size: $titleFontSize;
    font-weight: bold;
    color: white;
  }

  &-content {
    width: 100%;
    height: 100%;
    overflow: hidden;

    &-desc {
      width: 100%;
      // 加个背景遮住，否则滑动视差效果时背景会显示轮播图片在后面
      background-color: white;

      &-item {
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
            margin-left: px2rem(4);
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
  }

  &-btn {
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
