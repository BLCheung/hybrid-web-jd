<template>
  <div class="category">
    <div class="category-item" v-for="item of categories" :key="item.id">
      <img class="category-item-img" :src="item.icon" />
      <p class="category-item-title">{{item.title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          id: '1',
          icon: require('@img/jingDongChaoShi.png'),
          title: '京东超市'
        },
        {
          id: '2',
          icon: require('@img/haiTunQuanQiu.png'),
          title: '海屯全球'
        },
        {
          id: '3',
          icon: require('@img/jingDongFuShi.png'),
          title: '京东服饰'
        },
        {
          id: '4',
          icon: require('@img/jingDongShengXian.png'),
          title: '京东生鲜'
        },
        {
          id: '5',
          icon: require('@img/jingDongDaoJia.png'),
          title: '京东到家'
        },
        {
          id: '6',
          icon: require('@img/chongZhiJiaoFei.png'),
          title: '充值缴费'
        },
        {
          id: '7',
          icon: require('@img/jingDongPinGou.png'),
          title: '9.9元拼'
        },
        {
          id: '8',
          icon: require('@img/lingJuan.png'),
          title: '领劵'
        },
        {
          id: '9',
          icon: require('@img/zhuanQian.png'),
          title: '赚钱'
        },
        {
          id: '10',
          icon: require('@img/quanBu.png'),
          title: '全部'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.category {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  background-color: white;

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 20%;
    margin-top: px2rem(8);

    &-img {
      width: px2rem(40);
      height: px2rem(40);
      margin-bottom: px2rem(6);
    }

    &-title {
      font-size: $miniFontSize;
    }
  }
}
</style>
