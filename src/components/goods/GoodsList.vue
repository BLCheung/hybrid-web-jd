<template>
  <div class="goodlist">
    <navigation :isBack="true" :title="'商品列表'" @left="onLeftClick">
      <template v-slot:right>
        <img :src="currentLayoutType.icon" alt @click="onSwitchLayoutTypeClick()" />
      </template>
    </navigation>
    <div class="goodlist-content z-index-2">
      <!-- 价格筛选 -->
      <filter-option></filter-option>
      <!-- 商品列表 -->
      <goods :layout="currentLayoutType.type" />
    </div>
  </div>
</template>

<script>
import Navigation from '@cpm/currency/NavigationBar.vue';
import FilterOption from '@cpm/goods/GoodsFilter.vue';
import Goods from '@cpm/goods/Goods.vue';

export default {
  components: {
    Navigation,
    FilterOption,
    Goods
  },
  data() {
    return {
      layoutTypeDatas: [
        {
          // 垂直列表
          type: 1,
          icon: require('@img/list-type.svg')
        },
        {
          // 网格布局
          type: 2,
          icon: require('@img/grid-type.svg')
        },
        {
          // 瀑布流
          type: 3,
          icon: require('@img/waterfall-type.svg')
        }
      ],
      currentLayoutType: {}
    }
  },
  created() {
    // 默认第一项(垂直列表)
    this.currentLayoutType = this.layoutTypeDatas[0];
  },
  methods: {
    /**
     * 返回上一级
     */
    onLeftClick() {
      // 相当于微信小程序的wx.navigationBack()，回退栈
      this.$router.go(-1);
    },
    /**
     * 切换布局类型
     */
    onSwitchLayoutTypeClick() {
      if (this.currentLayoutType.type === 1) {
        this.currentLayoutType = this.layoutTypeDatas[1];
      } else if (this.currentLayoutType.type === 2) {
        this.currentLayoutType = this.layoutTypeDatas[2];
      } else {
        this.currentLayoutType = this.layoutTypeDatas[0];
      }
      console.log(this.currentLayoutType);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.goodlist {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: $bgColor;

  &-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
}
</style>
