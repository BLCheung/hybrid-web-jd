<template>
  <div class="direct">
    <span>直营</span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.direct {
  font-size: px2rem(10);
  line-height: px2rem(15);
  color: white;
  width: fit-content;
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  border-radius: px2rem(4);
  padding: px2rem(2) px2rem(4);
  margin: 0 px2rem(1);
  background-color: $mainColor;
}
</style>
