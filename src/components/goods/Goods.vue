<template>
  <!-- 
  在同一组件中展示不同的样式
  1.html表示整个布局的结构，具体的展示样式将由css决定
  2.每种展示样式对应不同的css，也就是对应不同的类名
    垂直列表 -> goods-list
    网格布局 -> goods-grid
    瀑布流布局 -> goods-waterfall

  瀑布流布局：
    1.创建一个相对布局的父容器，让父容器内每个item相对整个容器进行排序
    2.随机生成不同高度的图片，撑起item整体的布局高度
    3.计算item的位置，来达到从上到下，从左到右依次排列
  -->
  <div
    class="goods"
    :class="[layoutClass, {'goods-scroll': isScroll}]"
    :style="{height: listHeightTotal}"
  >
    <div
      class="goods-item"
      :class="layoutItemClass"
      :style="itemStyles[index]"
      v-for="(item, index) of goodListData"
      :key="index"
      ref="goodsItem"
    >
      <img class="goods-item-img" :style="imgStyles[index]" :src="item.img" alt />
      <div class="goods-item-desc">
        <p
          class="goods-item-desc-title text-line-2"
          :class="{'goods-item-desc-title-hint': !item.isHave}"
        >
          <!-- 是否为直营 -->
          <direct v-if="item.isDirect" />
          <!-- 是否缺货 -->
          <no-have v-if="!item.isHave"></no-have>
          {{item.name}}
        </p>
        <div class="goods-item-desc-data">
          <p class="goods-item-desc-data-price">￥: {{item.price}}</p>
          <p class="goods-item-desc-data-sales">销量: {{item.volume}}件</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Direct from '@cpm/goods/Direct.vue';
import NoHave from '@cpm/goods/NoHave.vue';

export default {
  components: {
    Direct,
    NoHave
  },
  props: {
    // 布局类型：1.垂直列表；2.网格布局；3.瀑布流布局
    layout: {
      type: Number,
      default: 1
    },
    // 是否允许容器单独滚动
    isScroll: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 商品列表数据
      goodListData: [],
      // 图片最大可接受高度
      MAX_IMG_SIZE: 236,
      // 图片最小可接受高度
      MIN_IMG_SIZE: 186,
      // 已进行随机生成的item图片高度集合
      imgStyles: [],
      // item图片样式集合
      itemStyles: [],
      // list容器总体高度
      listHeightTotal: '100%',
      // 当前的父容器布局类型
      layoutClass: 'goods-list',
      // 当前的每个item的样式类型
      layoutItemClass: 'goods-list-item'
    }
  },
  created() {
    this.initData();
  },
  watch: {
    layout() {
      this.initLayoutType();
    }
  },
  methods: {
    /**
     * 初始化数据
     */
    initData() {
      this.$http
        .get('/goods')
        .then((data) => {
          console.log('商品列表data:', data);
          this.goodListData = data.list;
          this.initLayoutType();
        });
    },
    /**
     * 初始化布局类型
     * 为不同的layout类型展示不同的样式
     */
    initLayoutType() {
      // 初始化样式数据
      // this.listHeightTotal = '100%';
      this.itemStyles = [];
      this.imgStyles = [];
      // 为传进来不同的layout展示不同的样式
      switch (this.layout) {
        case 1:
          this.layoutClass = 'goods-list';
          this.layoutItemClass = 'goods-list-item';
          break;
        case 2:
          this.layoutClass = 'goods-grid';
          this.layoutItemClass = 'goods-grid-item';
          break;
        case 3:
          this.layoutClass = 'goods-waterfall';
          this.layoutItemClass = 'goods-waterfall-item';
          this.initImgStyle();
          this.$nextTick(() => {
            // 当dom渲染数据完成时则回调此方法(因为created()时dom还未渲染出来)
            // 该方法相当于微信小程序this.setData({}, () => {})更新视图后的回调
            this.initWaterFallStyle();
          });
          break;
      }
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
        this.itemStyles.push(itemStyle);
      }
      // 如果设置了容器可以单独滚动
      if (!this.isScroll) {
        // 4.计算左右两侧的最高高度作为容器高度
        this.listHeightTotal = (leftTopTotal > rightTopTotal ? leftTopTotal : rightTopTotal) + 'px';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
$itemBorderRadius: px2rem(3);
$itemWaterFallRootMargin: px2rem(2);
$itemGridRootMargin: px2rem(2);
$itemDescTitleSize: 15;

.goods {
  box-sizing: border-box;
  background-color: $bgColor;

  &-scroll {
    overflow: hidden;
    overflow-y: auto;
  }

  &-item {
    box-sizing: border-box;
    overflow: hidden;

    &-desc {
      width: 100%;

      &-title {
        display: inline-block;
        font-size: px2rem($itemDescTitleSize);
        font-weight: 500;
        line-height: px2rem($itemDescTitleSize + 3);
        max-height: px2rem(($itemDescTitleSize + 3) * 2);
        letter-spacing: px2rem(1);

        &-hint {
          color: $hintColor;
        }
      }

      &-data {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;

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

// 垂直列表
.goods-list {
  background-color: white;

  &-item {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: $marginSize;
    border-bottom: px2rem(1) solid $lineColor;

    .goods-item-img {
      width: px2rem(120);
      height: px2rem(120);
      border-radius: $itemBorderRadius;
      overflow: hidden;
      margin-right: px2rem(4);
    }

    .goods-item-desc {
      display: flex;
      // 撑满剩余空间
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}

.goods-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: $itemGridRootMargin;

  &-item {
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: $itemGridRootMargin;
    box-sizing: border-box;
    overflow: hidden;

    .goods-item-img {
      width: 100%;
      height: px2rem(160);
      border-top-left-radius: $itemBorderRadius;
      border-top-right-radius: $itemBorderRadius;
    }

    .goods-item-desc {
      width: 100%;
      height: 100%;
      padding: $marginSize;
      background-color: white;
      box-sizing: border-box;

      &-data {
        margin-top: $marginSize;
        box-sizing: border-box;
        background-color: white;
        border-bottom-left-radius: $itemBorderRadius;
        border-bottom-right-radius: $itemBorderRadius;
      }
    }
  }
}

// 瀑布流
.goods-waterfall {
  position: relative;
  margin: $itemWaterFallRootMargin;
  box-sizing: border-box;

  &-item {
    position: absolute;
    width: 50%;
    box-sizing: border-box;
    overflow: hidden;
    padding: $itemWaterFallRootMargin;

    .goods-item-img {
      width: 100%;
      border-top-left-radius: $itemBorderRadius;
      border-top-right-radius: $itemBorderRadius;
    }

    .goods-item-desc {
      width: 100%;
      height: 100%;
      padding: $marginSize;
      background-color: white;
      box-sizing: border-box;

      &-data {
        margin-top: $marginSize;
        box-sizing: border-box;
        background-color: white;
        border-bottom-left-radius: $itemBorderRadius;
        border-bottom-right-radius: $itemBorderRadius;
      }
    }
  }
}
</style>
