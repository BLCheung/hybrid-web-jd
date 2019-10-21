<template>
  <div class="my">
    <navigation :title="'个人中心'" :isBack="false"></navigation>
    <h1>My</h1>
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
.my {
  width: 100%;
  height: 100%;
  font-size: 32px;
}
</style>
