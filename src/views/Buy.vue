<template>
  <div class="buy">
    <navigation :isBack="true" :title="'立即购买'" @left="onBackClick" />
    <div class="buy-content">
      <!-- 购买过的商品 -->
      <div class="buy-content-goods">
        <img class="buy-content-goods-img" :src="goodsData.img" alt />
        <div class="buy-content-goods-desc">
          <p class="buy-content-goods-desc-title">{{goodsData.name}}</p>
          <p class="buy-content-goods-desc-border" />
          <p class="buy-content-goods-desc-price">￥{{goodsData.price | price2Fixed}}</p>
        </div>
      </div>
      <!-- 支付方式 -->
      <ul class="buy-content-list">
        <li
          class="buy-content-list-item"
          v-for="(item, index) of payDatas"
          :key="index"
          @click="onPayItemClick(item)"
        >
          <img class="buy-content-list-item-pay" :src="item.icon" alt />
          <div class="buy-content-list-item-desc">
            <p class="buy-content-list-item-desc-name">{{item.name}}</p>
            <p class="buy-content-list-item-desc-hint">{{item.desc}}</p>
          </div>
          <img
            class="buy-content-list-item-check"
            :src="getCheckIcon(item.id === currentPay.id)"
            alt
          />
        </li>
      </ul>
      <!-- 底部立即购买按钮 -->
      <div class="buy-content-btn" @click="onPayClick">立即购买</div>
    </div>
  </div>
</template>

<script>
import Navigation from '@cpm/currency/NavigationBar.vue';
export default {
  components: {
    Navigation
  },
  data() {
    return {
      // 商品数据源
      goodsData: {},
      // 支付方式数据源
      payDatas: [
        {
          id: '1',
          name: '支付宝支付',
          desc: '数亿用户都在用，安全可信托',
          icon: require('@img/buy_pay@alipay.svg')
        },
        {
          id: '2',
          name: '微信支付',
          desc: '亿万用户选择，更快更安全',
          icon: require('@img/buy_pay@wechat.svg')
        }
      ],
      // 当前选中的支付方式
      currentPay: {}
    }
  },
  created() {
    this.currentPay = this.payDatas[0];
    this.getGoodsData();
  },
  methods: {
		/**
		 * 获取商品数据
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
		 * 支付选项点击事件
		 */
    onPayItemClick(item) {
      this.currentPay = item;
    },
    /**
		 * 支付
		 */
    onPayClick() {
      // 判断支付方式
      if (this.currentPay.id === '1') {
        this.aliPay();
      } else if (this.currentPay.id === '2') {
        this.wxPay();
      }
    },
    /**
		 * 支付宝支付
		 */
    aliPay() {
      if (window.android) {
        window.android.pay(JSON.stringify(this.goodsData));
      }
    },
    /**
     * 微信支付
     */
    wxPay() {
      if (window.android) {
        window.android.pay(JSON.stringify(this.goodsData));
      }
    },
		/**
		 * 判断当前的支付check图标选中状态
		 */
    getCheckIcon(isCheck) {
      return isCheck ? require('@img/check.svg') : require('@img/no-check.svg');
    },
		/**
		 * 返回监听
		 */
    onBackClick() {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
$goodImgWidth: 100%;
$payImgWidth: px2rem(30);
$rootShadow: px2rem(3) px2rem(12) px2rem(6) rgba(0, 0, 0, 0.1);

.buy {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: $bgColor;

  &-content {
    //   display: flex;
    //   flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0 $rootPadding;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: auto;

    &-goods {
      display: flex;
      flex-direction: column;
      width: 100%;
      border-radius: $radiusSize;
      overflow: hidden;
      box-shadow: $rootShadow;
      background-color: white;
      margin: $marginSize 0;

      &-img {
        width: $goodImgWidth;
        height: $goodImgWidth;
      }

      &-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: $marginSize;

        &-title {
          font-size: $infoFontSize;
          font-weight: bold;
          color: #333333;
          line-height: px2rem(18);
        }

        &-border {
          border-bottom: px2rem(1) solid $lineColor;
          margin: px2rem(4) 0;
        }

        &-price {
          width: fit-content;
          align-self: flex-end;
          font-size: px2rem(20);
          font-weight: bold;
          color: $mainColor;
        }
      }
    }

    &-list {
      width: 100%;
      border-radius: $radiusSize;
      overflow: hidden;
      box-shadow: $rootShadow;

      &-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        padding: $marginSize;
        box-sizing: border-box;
        border-bottom: px2rem(1) solid $lineColor;
        background-color: white;

        &-pay {
          width: $payImgWidth;
          height: $payImgWidth;
          margin-right: $marginSize;
        }

        &-desc {
          height: $payImgWidth;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          p {
            width: fit-content;
          }

          &-name {
            font-size: $infoFontSize;
          }

          &-hint {
            font-size: $miniFontSize;
            color: $hintColor;
          }
        }

        &-check {
          width: $checkSize;
          height: $checkSize;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: px2rem(1) px2rem(3) px2rem(6) rgba(0, 0, 0, 0.1);
        }
      }
    }

    &-btn {
      display: block;
      width: 100%;
      height: px2rem(46);
      margin: px2rem(46) 0 px2rem(10);
      // 在块级元素中，高度与行高一致内容可以达到垂直居中
      line-height: px2rem(46);
      font-size: $titleFontSize;
      color: white;
      text-align: center;
      border-radius: px2rem(50);
      background: linear-gradient(
        90deg,
        rgba(216, 30, 6, 1) 0%,
        rgba(236, 94, 52, 1) 100%
      );
    }
  }
}
</style>
