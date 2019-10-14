<template>
  <div class="home">
    <div class="home-content">
      <!-- 轮播图 -->
      <div class="home-swiper">
        <swiper :height="swiperHeight" :datas="swiperData.map(item => {return item.icon})" />
      </div>
      <!-- 520活动宣传 -->
      <activity>
        <div class="activity-wrapper">
          <img v-for="(item, index) of activityData" :key="index" :src="item.icon" alt />
        </div>
      </activity>
      <!-- 活动分类入口 -->
      <category />
      <!-- 秒杀 -->
      <flash-sale :datas="secondData" />
    </div>
  </div>
</template>

<script>
import swiper from '@cpm/currency/Swiper.vue';
import activity from '@cpm/currency/Activity.vue';
import category from '@cpm/currency/Category.vue';
import flashSale from '@cpm/seconds/FlashSale.vue';

export default {
  components: {
    swiper,
    activity,
    category,
    flashSale
  },
  data() {
    return {
      // 轮播高度
      swiperHeight: '184px',
      // 轮播图片数据源
      swiperData: [],
      // 520活动宣传图图片
      activityData: [],
      // 秒杀数据源
      secondData: []
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
          this.$http.get('/activitys'),
          this.$http.get('/seconds')
        ])
        .then(this.$http.spread((swiperData, activityData, secondData) => {
          console.log('首页轮播data:', swiperData);
          this.swiperData = swiperData.list;
          console.log('首页520活动data:', activityData);
          this.activityData = activityData.list;
          console.log('首页秒杀data:', secondData);
          this.secondData = secondData.list;
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
