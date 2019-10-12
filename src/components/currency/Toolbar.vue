<template>
  <div class="toolBar">
    <div
      class="toolBar-item"
      v-for="(item, index) of toolBarData"
      :key="index"
      @click="onChangeFragment(item, index)"
    >
      <img
        class="toolBar-item-img"
        :src="selectedTabIndex === index ? item.selecedSrc : item.nonSelectedSrc"
        alt
        srcset
      />
      <p
        class="toolBar-item-name"
        :class="{'toolBar-item-name-selected': selectedTabIndex === index}"
      >{{item.name}}</p>
    </div>
  </div>
</template>

<script>
/**
 * ToolBar主要功能:
 * 1.永远位于底部
 * 2.按钮分为默认和选中状态
 * 3.点击对应按钮切换对应界面
 */
export default {
  data() {
    return {
      toolBarData: [
        {
          selecedSrc: require('@img/tab_home@selected.svg'),
          nonSelectedSrc: require('@img/tab_home@nonSelected.svg'),
          name: '首页',
          componentName: 'home'
        },
        {
          selecedSrc: require('@img/tab_shopping@selected.svg'),
          nonSelectedSrc: require('@img/tab_shopping@nonSelected.svg'),
          name: '购物车',
          componentName: 'shopping'
        },
        {
          selecedSrc: require('@img/tab_my@selected.svg'),
          nonSelectedSrc: require('@img/tab_my@nonSelected.svg'),
          name: '我的',
          componentName: 'my'
        }
      ],
      // 默认的tab选中下标
      selectedTabIndex: 0
    };
  },
  methods: {
    onChangeFragment(item, index) {
      // 改变当前tab下标
      this.selectedTabIndex = index;
      // 相当于小程序this.triggerEvent('事件名称', Object),发送事件给父组件
      this.$emit('onChange', item.componentName);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.toolBar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  border-top: 1px solid $lineColor;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0 0 px2rem(16) rgba(0, 0, 0, 0.2);

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: px2rem(4) px2rem(12);

    &-img {
      width: px2rem(22);
      height: px2rem(22);
    }

    &-name {
      font-size: $infoFontSize;
      line-height: $infoFontSize;
      margin-top: px2rem(4);

      &-selected {
        color: $mainColor;
      }
    }
  }
}
</style>
