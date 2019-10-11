<template>
  <!-- 1.需要一个swiper -->
  <!-- 2.swiper里面的滑动模块-swiperSlide -->
  <!-- 3.通过slot插槽配置分页器 -->
  <swiper :options="swiperOptions">
    <swiper-slide v-for="(item, index) of datas" :key="index">
      <img class="swiper-slide-img" :style="{height: height}" :src="item" alt srcset />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination" />
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  // 相当于小程序component内的properties对象，指定当前组件需要接受的参数或对象
  props: {
    // 轮播高度
    height: {
      // 该属性的类型
      type: String,
      // 默认值
      default: 'auto'
    },
    datas: {
      type: Array,
      // 设置该属性为必须要传的值
      required: true,
      default: function() {
        return [];
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOptions: {
        // 自动滚动
        autoplay: true,
        // swiper高度跟随slide高度变化
        autoHeight: true,
        // 分页器样式
        pagination: {
          // 分页器样式
          el: '.swiper-pagination',
          type: 'bullets',
          bulletClass: 'my-bullet'
        }
      }
    };
  }
};
</script>

<style lang="scss">
@import '@css/style.scss';
.swiper-pagination {
  // 距离底部12px
  bottom: px2rem(12);

  .my-bullet {
    display: inline-block;
    width: px2rem(6);
    height: px2rem(6);
    border: px2rem(1) solid #ffffff;
    border-radius: 100%;
    margin: 0 px2rem(4);
    opacity: 1;
  }
  // 分页器小圆点处于激活状态下的样式
  .swiper-pagination-bullet-active {
    background-color: #ffffff;
  }
}
</style>
