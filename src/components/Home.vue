<template>
  <div class="home">
    <div class="home-content">
      <div class="home-swiper">
        <swiper :height="swiperHeight" :datas="swiperData.map(item => {return item.icon})" />
      </div>
      <activity>
        <div class="activity-wrapper">
          <img v-for="(item, index) of activityData" :key="index" :src="item.icon" alt />
        </div>
      </activity>
      <category></category>
    </div>
  </div>
</template>

<script>
import swiper from '@cpm/currency/Swiper.vue';
import activity from '@cpm/currency/Activity.vue';
import category from '@cpm/currency/Category.vue';

export default {
  components: {
    swiper,
    activity,
    category
  },
  data() {
    return {
      // 轮播高度
      swiperHeight: '184px',
      // 轮播图片数据源
      swiperData: [],
      // 520活动宣传图图片
      activityData: []
    };
  },
  created() {
    this.initHomeData();
  },
  methods: {
    /**
     * 获取首页数据（轮播图，520活动图片）
     */
    initHomeData() {
      this.$http
        .all([
          this.$http.get('/swiper'),
          this.$http.get('/activitys')
        ])
        .then(this.$http.spread((swiperData, activityData) => {
          console.log('首页轮播data:', swiperData);
          this.swiperData = swiperData.list;
          console.log('首页520活动data:', activityData);
          this.activityData = activityData.list;
        }));
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  // font-size: 32px;

  &-content {
    height: 100%;

    .activity-wrapper {
      margin-top: px2rem(-8);
      border-top-left-radius: px2rem(8);
      border-top-right-radius: px2rem(8);

      img {
        display: inline-block;
        width: 33.33%;
      }
    }
  }
}
</style>
