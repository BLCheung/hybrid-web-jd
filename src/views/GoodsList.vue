<template>
  <div class="goodlist">
    <navigation :isBack="true" :title="'商品列表'" @left="onLeftClick">
      <template v-slot:right>
        <img :src="currentLayoutType.icon" alt @click="onSwitchLayoutTypeClick()" />
      </template>
    </navigation>
    <div class="goodlist-content z-index-2">
      <!-- 价格筛选 -->
      <filter-option @change="onFilterChange" />
      <!-- 商品列表 -->
      <goods :layout="currentLayoutType.type" :sort="currentSortType" />
    </div>
  </div>
</template>

<script>
import Navigation from '@cpm/currency/NavigationBar.vue';
import FilterOption from '@cpm/goods/GoodsFilter.vue';
import Goods from '@cpm/goods/Goods.vue';

export default {
  name: 'goodsList',
  components: {
    Navigation,
    FilterOption,
    Goods
  },
  props: {},
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
      // 当前的布局视图方式
      currentLayoutType: {},
      // 当前的筛选排序方式
      currentSortType: '1'
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
    },
    /**
     * 监听筛选组件的筛选方式变化
     */
    onFilterChange(sort) {
      this.currentSortType = sort;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.goodlist {
  display: flex;
  flex-direction: column;
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
