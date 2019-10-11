<template>
  <div class="home">
    <div class="home-swiper">
      <swiper :height="swiperHeight" :datas="swiperImgs"></swiper>
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
      swiperImgs: [
        require('@img/swiper-1.jpg'),
        require('@img/swiper-2.jpg'),
        require('@img/swiper-3.jpg'),
        require('@img/swiper-4.jpg'),
        require('@img/swiper-5.jpg'),
        require('@img/swiper-6.jpg'),
        require('@img/swiper-7.jpg'),
        require('@img/swiper-8.jpg')
      ]
    };
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
