<template>
  <div class="shopping">
    <navigation :title="'购物车'" :isBack="false">
      <template v-slot:right>
        <p class="navi-right" @click="onManagerClick">管理</p>
      </template>
    </navigation>
    <div class="shopping-content">
      <!-- 购物车列表 -->
      <ul class="shopping-content-list">
        <li class="shopping-content-list-item" v-for="(item, index) of cartsData" :key="index">
          <img
            class="shopping-content-list-item-check"
            :src="checkImg(item.isCheck)"
            @click="onItemCheck(item)"
            alt
          />
          <img class="shopping-content-list-item-img" :src="item.img" alt />
          <div class="shopping-content-list-item-desc">
            <p class="shopping-content-list-item-desc-title text-line-2">
              <!-- 直营 -->
              <direct v-if="item.isDirect" />
              {{item.name}}
            </p>
            <div class="shopping-content-list-item-desc-data">
              <div class="shopping-content-list-item-desc-data-price">
                <p>
                  ￥
                  <span>{{item.price | price2Fixed}}</span>
                </p>
              </div>
              <count :value="item.num" @change="onChangeNum(arguments, item, index)" />
            </div>
          </div>
        </li>
      </ul>
      <div class="shopping-content-total">
        <div class="shopping-content-total-check" @click="onAllCheckClick">
          <img :src="checkImg(totalData.isAll)" alt />
          <p>全选</p>
        </div>
        <div class="shopping-content-total-price">
          <span class="shopping-content-total-price-total">合计:</span>
          <p>
            ￥
            <span>{{totalData.totalPrice | price2Fixed}}</span>
          </p>
        </div>
        <div v-if="isDelete" class="shopping-content-total-delete" @click="onDeleteGoods">
          <p>删除</p>
        </div>
        <div v-else class="shopping-content-total-commit">
          <p>去结算({{totalData.totalNum}})</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@cpm/currency/NavigationBar.vue';
import Direct from '@cpm/goods/Direct.vue';
import Count from '@cpm/goods/Counter.vue';

export default {
  components: {
    Navigation,
    Direct,
    Count
  },
  data() {
    return {
      cartsData: this.$store.state.carts,
      totalData: {
        // 是否全选
        isAll: false,
        // 总价格
        totalPrice: 0,
        // 总数量
        totalNum: 0
      },
      isDelete: false
    };
  },
  methods: {
    /**
     * 商品数量变化监听
     * arguments可以获取到方法的参数
     * 这里的args获取到的是这个方法监听事件传递过来的参数
     * 也就是可以获取到子组件传递过来的参数
     */
    onChangeNum(args, item, index) {
      let num = args[0];
      // 修改状态管理器下的购物车指定商品的数量
      this.$store.commit('changeGoodsNum', {
        index,
        num
      });
      // 计算已选中商品的总数量与总价
      if (item.isCheck) {
        this.computeGoodsTotal();
      }
    },
    /**
     * 商品点击事件
     */
    onItemCheck(item) {
      item.isCheck = !item.isCheck;
      // 计算总数量与总价
      this.computeGoodsTotal();
    },
    /**
     * 全选点击事件
     */
    onAllCheckClick() {
      this.totalData.isAll = !this.totalData.isAll;
      // 遍历所有商品，并设置为选中
      this.cartsData.forEach(item => {
        item.isCheck = this.totalData.isAll;
      });
      this.computeGoodsTotal();
    },
    /**
     * 购物车管理点击事件
     */
    onManagerClick() {
      this.isDelete = !this.isDelete;
    },
    /**
     * 删除购物车商品
     */
    onDeleteGoods() {
      this.$store.commit('deleteGoods');
      this.cartsData = this.$store.state.carts;
      this.computeGoodsTotal();
      console.log('购物车数据源:', this.cartsData);
    },
    /**
     * 勾选图标
     */
    checkImg(isCheck) {
      return isCheck ? require('@img/check.svg') : require('@img/no-check.svg');
    },
    /**
     * 计算当前所有选中的商品数量和总价
     */
    computeGoodsTotal() {
      // 先初始化
      this.totalData = {
        isAll: true,
        totalPrice: 0,
        totalNum: 0
      }

      if (this.cartsData.length === 0) {
        this.totalData.isAll = false;
      } else {
        // 遍历所有商品，并计算被选中的
        this.cartsData.forEach(item => {
          if (item.isCheck) {
            this.totalData.totalPrice += parseFloat(item.price) * parseInt(item.num);
            this.totalData.totalNum += parseInt(item.num);
          } else {
            // 如果存在为选中的商品，则把全选值为false
            this.totalData.isAll = false;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
$priceSize: 12;

.shopping {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;

    &-list {
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
      padding-bottom: $marginSize;

      &-item {
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: px2rem(16) 0;
        margin-top: $marginSize;
        box-sizing: border-box;
        border-radius: $radiusSize;
        overflow: hidden;
        background-color: white;
        box-shadow: px2rem(4) px2rem(4) px2rem(20) rgba(0, 0, 0, 0.1);

        &-check {
          width: $checkSize;
          align-self: center;
          padding: px2rem(12);
          overflow: hidden;
        }

        &-img {
          width: $listGoodImgSize;
          height: $listGoodImgSize;
          border-radius: $radiusSize;
          overflow: hidden;
          box-shadow: px2rem(4) px2rem(10) px2rem(20) rgba(0, 0, 0, 0.1);
        }

        &-desc {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          margin: 0 $marginSize;

          &-title {
            font-size: $infoFontSize;
            line-height: px2rem(18);
          }

          &-data {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            &-price {
              font-weight: bold;
              color: $mainColor;

              p {
                line-height: $infoFontSize;
                font-size: $infoFontSize;

                span {
                  font-size: $maxFontSize;
                  line-height: $maxFontSize;
                }
              }
            }
          }
        }
      }
    }

    &-total {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: px2rem(52);
      padding: 0 px2rem(16);
      box-sizing: border-box;
      background-color: white;

      &-check {
        display: flex;
        align-items: center;
        height: 100%;
        font-size: $miniFontSize;
        margin-right: $marginSize;

        img {
          width: $checkSize;
          height: $checkSize;
          margin-right: px2rem(10);
        }
      }

      &-price {
        display: inline-flex;
        flex: 1;
        height: 100%;
        align-items: center;

        &-total {
          font-size: $infoFontSize;
        }

        p {
          font-size: px2rem(10);
          font-weight: bold;

          span {
            font-size: px2rem(16);
          }
        }
      }

      &-commit {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: px2rem(72);
        height: px2rem(36);
        color: white;
        background-color: $mainColor;
        border-radius: px2rem(30);

        p {
          font-size: px2rem(12);
        }
      }

      &-delete {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #333333;
        padding: px2rem(10) px2rem(14);
        border: px2rem(1) solid #d5d5d5;
        border-radius: px2rem(18);

        p {
          font-size: px2rem(12);
        }
      }
    }
  }
}

.navi-right {
  font-size: $miniFontSize;
  color: #333333;
  font-weight: bold;
}
</style>
