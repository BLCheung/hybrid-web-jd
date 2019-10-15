<template>
  <div class="goods goods-waterfall" :style="{height: listHeightTotal}">
    <div
      class="goods-item goods-waterfall-item"
      :style="waterFallStyles[index]"
      v-for="(item, index) of goodListData"
      :key="index"
      ref="goodsItem"
    >
      <img class="goods-item-img" :style="imgStyles[index]" :src="item.img" alt />
      <div class="goods-item-desc">
        <!-- TODO:直营 -->
        <!-- TODO:缺货 -->
        <span class="text-line-2">{{item.name}}</span>
        <div class="goods-item-desc-data">
          <p class="goods-item-desc-data-price">￥: {{item.price}}</p>
          <p class="goods-item-desc-data-sales">销量: {{item.volume}}件</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      // 商品列表数据
      goodListData: [],
      // 图片最大可接受高度
      MAX_IMG_SIZE: 236,
      // 图片最小可接受高度
      MIN_IMG_SIZE: 186,
      // 已进行随机生成的图片高度集合
      imgStyles: [],
      // 瀑布流图片样式集合
      waterFallStyles: [],
      // list容器总体高度
      listHeightTotal: 0
    }
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.$http
        .get('/goods')
        .then((data) => {
          console.log('商品列表data:', data);
          this.goodListData = data.list;
          this.initImgStyle();
          this.$nextTick(() => {
            // 当dom渲染数据完成时则回调此方法(因为created()时dom还未渲染出来)
            // 该方法相当于微信小程序this.setData({}, () => {})更新视图后的回调
            this.initWaterFallStyle();
          });
        });
    },
    /**
     * 对图片生成随机高度
     */
    initImgHeight() {
      return this.MIN_IMG_SIZE + Math.floor((this.MAX_IMG_SIZE - this.MIN_IMG_SIZE) * Math.random());
    },
    /**
     * 把随机生成的高度转换成样式数据
     */
    initImgStyle() {
      let i = 0;
      while (i < this.goodListData.length) {
        let height = this.initImgHeight() + 'px';
        this.imgStyles.push({
          height
        });
        i++;
      }
    },
		/**
		 * 瀑布流布局
		 * 计算出瀑布流每个图片距离list顶部容器的top高度距离
     * 1.获取list容器所有子元素
     * 2.把列表分两列 leftTopTotal rightTopTotal，用于保存左右两列各自的所有item元素距离顶部的top高度
     * 3.遍历并计算每个item元素的总体高度，如果左边item的总体高度小于或等于右边的，则把高度值添加到leftTopTotal然后给left:0，否则反之给right:0
     * 4.递增更新左右两边的数组总高度，计算出左右两边最高的高度并给list容器设置这个高度
		 */
    initWaterFallStyle() {
      // 1.获取list容器所有子元素
      let $goodsItem = this.$refs.goodsItem;
      if (!$goodsItem) return;
      // 2.把列表分两列 leftTopTotal rightTopTotal，用于保存左右两列各自的所有item元素的整体高度
      let [leftTopTotal, rightTopTotal] = [0, 0];
      // 3.遍历并计算每个item元素距离顶部的top，如果左边item的top小于右边，则添加到leftTopArr，否则反之
      for (let i = 0; i < $goodsItem.length; i++) {
        const item = $goodsItem[i];
        let elHeight = item.clientHeight;
        // item样式
        let itemStyle = {};
        // 对比左右两边每个item的top值
        if (leftTopTotal <= rightTopTotal) {
          // 左边item距离顶部比较小的放在左侧，距离顶部的top值为当前leftTopTotal值
          itemStyle = {
            // top为当前左列总高度值
            top: leftTopTotal + 'px',
            // 贴左
            left: '0px'
          }
          // 递增更新左列的高度值
          leftTopTotal += elHeight;
        } else {
          // 右边item距离顶部比较小的放在右侧，距离顶部的top值为当前rightTopTotal值
          itemStyle = {
            // top为当前右列总高度值
            top: rightTopTotal + 'px',
            // 贴右
            right: '0px'
          }
          // 递增更新右列的高度值
          rightTopTotal += elHeight;
        }
        // 配置进item样式集合
        this.waterFallStyles.push(itemStyle);
      }
      // 4.计算左右两侧的最高高度作为容器高度
      this.listHeightTotal = (leftTopTotal > rightTopTotal ? leftTopTotal : rightTopTotal) + 'px';
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
$itemBorderRadius: px2rem(3);
$itemDescPadding: px2rem(6);
$itemWaterFallRootPadding: px2rem(2);
$itemDescTitleSize: 15;

.goods {
  box-sizing: border-box;
  background-color: $bgColor;

  &-item {
    width: 50%;
    box-sizing: border-box;
    overflow: hidden;

    &-img {
      width: 100%;
      border-top-left-radius: $itemBorderRadius;
      border-top-right-radius: $itemBorderRadius;
    }

    &-desc {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: $itemDescPadding;
      background-color: white;
      box-sizing: border-box;
      border-bottom-left-radius: $itemBorderRadius;
      border-bottom-right-radius: $itemBorderRadius;

      span {
        font-size: px2rem($itemDescTitleSize);
        font-weight: 600;
        height: fit-content;
        line-height: px2rem($itemDescTitleSize + 3);
        max-height: px2rem(($itemDescTitleSize + 2) * 2);
        color: #333333;
        letter-spacing: px2rem(1);
        margin-bottom: $itemDescPadding;
      }

      &-data {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        &-price {
          font-size: $infoFontSize;
          color: $mainColor;
        }

        &-sales {
          font-size: $infoFontSize;
          color: $hintColor;
        }
      }
    }
  }
}

.goods-waterfall {
  position: relative;
  margin: $itemWaterFallRootPadding;
  box-sizing: border-box;

  &-item {
    position: absolute;
    width: 50%;
    padding: $itemWaterFallRootPadding;
  }
}
</style>
