<template>
  <div class="home" @scroll="onScrollChange" ref="home">
    <navigation :isBack="false" :navStyle="navBarStyle">
      <template v-slot:left>
        <img :src="navBarCurrentSlotStyle.leftIcon" alt />
      </template>
      <template v-slot:center>
        <search
          :icon="navBarCurrentSlotStyle.search.icon"
          :background="navBarCurrentSlotStyle.search.background"
          :hint="navBarCurrentSlotStyle.search.hint"
        />
      </template>
      <template v-slot:right>
        <img :src="navBarCurrentSlotStyle.rightIcon" alt />
      </template>
    </navigation>
    <div class="home-content">
      <!-- 轮播图 -->
      <div class="home-content-swiper" ref="swiper">
        <swiper :height="swiperHeight" :datas="swiperData.map(item => {return item.icon})" />
      </div>
      <!-- 520活动 -->
      <activity>
        <div class="activity-520">
          <img v-for="(item, index) of activityData" :key="index" :src="item.icon" alt />
        </div>
      </activity>
      <!-- 活动分类入口 -->
      <category />
      <!-- 秒杀 -->
      <flash-sale :datas="secondData" />
      <!-- 拼购街活动 -->
      <activity>
        <div class="activity-pinGouStreet">
          <img src="@img/pinGouJie.gif" alt />
        </div>
      </activity>
      <goods :layout="3" :isScroll="false" />
    </div>
  </div>
</template>

<script>
import Navigation from '@cpm/currency/NavigationBar.vue'
import Search from '@cpm/currency/Search.vue';
import Swiper from '@cpm/currency/Swiper.vue';
import Activity from '@cpm/currency/Activity.vue';
import Category from '@cpm/currency/Category.vue';
import FlashSale from '@cpm/seconds/FlashSale.vue';
import Goods from '@cpm/goods/Goods.vue';

export default {
  components: {
    Navigation,
    Search,
    Swiper,
    Activity,
    Category,
    FlashSale,
    Goods
  },
  data() {
    return {
      // 轮播高度
      swiperHeight: this.$store.state.isIphoneX ? '228px' : '184px',
      // 轮播图片数据源
      swiperData: [],
      // 520活动宣传图图片
      activityData: [],
      // 秒杀数据源
      secondData: [],
      // 导航栏特有样式
      navBarStyle: {
        position: 'fixed',
        backgroundColor: ''
      },
      // 导航栏插槽样式，包含未开始滑动时样式（默认）和滑动到指定锚点样式（高亮）
      navBarSlotStyle: {
        // 默认
        normal: {
          // 左侧
          leftIcon: require('@img/more-white.svg'),
          search: {
            icon: require('@img/search.svg'),
            hint: '#999999',
            background: 'rgba(255, 255, 255, 0.8)'
            // background: '#ffffff'
          },
          rightIcon: require('@img/message-white.svg')
        },
        // 高亮
        highlight: {
          // 左侧
          leftIcon: require('@img/more.svg'),
          search: {
            icon: require('@img/search-white.svg'),
            hint: '#ffffff',
            background: '#d7d7d7'
          },
          rightIcon: require('@img/message.svg')
        }
      },
      // 当前页面滚动距离
      scrollTop: 0,
      // 导航栏插槽当前样式
      navBarCurrentSlotStyle: {},
      // 锚点值
      ANCHOR_SCROLL_TOP: 0
    };
  },
  created() {
    this.initHomeData();
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
  },
  /**
   * 当<keep-alive>被激活时,则会触发当前activated方法
   */
  activated() {
    this.$refs.home.scrollTop = this.scrollTop;
  },
  methods: {
    /**
     * 获取首页数据（轮播图，520活动图片）
     */
    initHomeData() {
      this.$http
        .all([
          this.$http.get('/swiper'),
          this.$http.get('/activitys'),
          this.$http.get('/seconds')
        ])
        .then(this.$http.spread((swiperData, activityData, secondData, goodListData) => {
          this.swiperData = swiperData.list;
          this.activityData = activityData.list;
          this.secondData = secondData.list;
          // 待dom渲染完数据后执行的回调
          this.$nextTick(() => {
            this.getNavAnchor();
          });
        }));
    },
    /**
     * 获取锚点值
     */
    getNavAnchor() {
      this.ANCHOR_SCROLL_TOP = this.$refs.swiper.getBoundingClientRect().height;
    },
    /**
     * 界面滑动监听事件
     */
    onScrollChange({ target }) {
      this.scrollTop = target.scrollTop;
      // 计算导航栏的opacity值
      let opacity = this.scrollTop / this.ANCHOR_SCROLL_TOP;
      // 指定导航栏插槽样式
      if (opacity >= 1) {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight;
      } else {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
      }
      // 根据opacity透明比例来设置导航栏的实时背景样式
      this.navBarStyle.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // 当容器内内容超过容器固定高度，则y轴上自动可滚动
  overflow-y: auto;

  &-content {
    height: 100%;

    &-swiper {
      width: 100%;
    }

    .activity-520 {
      margin-top: px2rem(-8);
      border-top-left-radius: px2rem(8);
      border-top-right-radius: px2rem(8);

      img {
        display: inline-block;
        width: 33.33%;
      }
    }

    .activity-pinGouStreet {
      background-color: white;

      img {
        width: 100%;
      }
    }
  }
}
</style>
