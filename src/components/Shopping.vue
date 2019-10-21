<template>
  <div class="shopping">
    <navigation :title="'购物车'" :isBack="false"></navigation>
    <h1>Shopping</h1>
  </div>
</template>

<script>
import navigation from '@cpm/currency/NavigationBar.vue'
export default {
  components: {
    navigation
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.shopping {
  width: 100%;
  height: 100%;
  font-size: 32px;
}
</style>
