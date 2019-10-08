<template>
  <div class='home'>
    <h1 class='test'>Hello World!</h1>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "home",
  components: {
    // HelloWorld
  }
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.test {
  font-size: px2rem(16);
}
</style>
