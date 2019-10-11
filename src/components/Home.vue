<template>
  <div class="home">
    <div class="home-swiper">
      <swiper :height="swiperHeight" :datas="swiperData.map(item => {return item.icon})" />
    </div>
  </div>
</template>

<script>
import swiper from '@cpm/currency/Swiper.vue';

export default {
  components: {
    swiper
  },
  data() {
    return {
      // 轮播高度
      swiperHeight: '184px',
      // 轮播图片数据源
      swiperData: []
    };
  },
  created() {
    this.getHomeSwiper();
  },
  methods: {
    getHomeSwiper() {
      this.$http
        .get('/swiper')
        .then(data => {
          console.log('首页轮播res:', data);
          this.swiperData = data.list;
          console.log(this.swiperData);
        })
        .catch(err => {
          console.log('首页轮播err:', err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.home {
  width: 100%;
  height: 100%;
  // font-size: 32px;

  &-swiper {
    width: 100%;
    height: 100%;
  }
}
</style>
