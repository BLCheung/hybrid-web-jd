<template>
  <div class="search" :style="{backgroundColor: background}">
    <img class="search-img" :src="icon" alt />
    <span class="search-hint" :style="{color: hint}">请输入关键词</span>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: require('@img/search.svg')
    },
    background: {
      type: String,
      default: '#ffffff'
    },
    hint: {
      type: String,
      default: '#999999'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.search {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: px2rem(6);
  border-radius: px2rem(22);
  background-color: white;

  &-img {
    width: px2rem(16);
    margin-right: $marginSize;
  }

  &-hint {
    font-size: $miniFontSize;
    color: $hintColor;
  }
}
</style>
