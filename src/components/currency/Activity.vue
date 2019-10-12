<template>
  <div class="activity">
    <!-- 插槽，从父容器决定具体展示视图 -->
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.activity {
  position: relative;
  width: 100%;
  max-height: px2rem(160);
  z-index: 9;
}
</style>
