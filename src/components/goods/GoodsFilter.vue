<template>
  <div class="filter z-index-2">
    <!-- 父筛选 -->
    <ul class="filter-list">
      <li
        class="filter-list-item"
        v-for="(item, index) of filtersData"
        :key="index"
        @click="onFilterItemClick(item)"
      >
        <a class="filter-list-item-content">
          <span
            class="filter-list-item-content-name"
            :class="{'actived': currentFilter.id === item.id}"
          >{{item.name}}</span>
          <!-- 三角形 选中才展示 -->
          <span
            v-if="item.subs.length > 0"
            class="filter-list-item-content-arrow arrow"
            :class="[isShowSub && currentFilter.id === item.id ? 'filter-list-item-content-arrow-open' : 'filter-list-item-content-arrow-close']"
          />
        </a>
      </li>
    </ul>
    <!-- 子筛选 -->
    <transition name="sub-deploy">
      <div v-show="isShowSub" class="filter-sub z-index-2">
        <ul class="filter-sub-list">
          <li
            class="filter-sub-list-item"
            v-for="(item, index) of currentFilter.subs"
            :key="index"
            @click="onFilterSubItemClick(item)"
          >
            <a class="filter-sub-list-item-content">
              <span
                class="filter-sub-list-item-content-name"
                :class="{'actived': currentFilter.id === item.id}"
              >{{item.name}}</span>
              <img
                v-show="currentFilter.id === item.id"
                class="filter-sub-list-item-content-selected"
                src="@img/options-select.svg"
                alt
              />
            </a>
          </li>
        </ul>
      </div>
    </transition>
    <!-- 遮罩层 -->
    <div v-show="isShowSub" class="mask" @click="isShowSub = false" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      filtersData: [
        {
          id: '1',
          name: '默认',
          subs: [
            {
              id: '1',
              name: '默认'
            },
            {
              id: '1-2',
              name: '价格从高到低'
            },
            {
              id: '1-3',
              name: '价格从低到高'
            }
          ]
        },
        {
          id: '2',
          name: '有货优先',
          subs: []
        },
        {
          id: '3',
          name: '直营优先',
          subs: []
        }
      ],
      // 当前选中筛选项
      currentFilter: {},
      // 是否展示二级筛选
      isShowSub: false
    }
  },
  created() {
    this.initFilter();
  },
  methods: {
		/**
		 * 初始化筛选点击项
		 */
    initFilter() {
      this.currentFilter = this.filtersData[0];
    },
		/**
		 * 一级筛选项点击事件
		 */
    onFilterItemClick(item) {
      // 点击一级筛选时如果二级筛选已打开，则关闭
      if (this.isShowSub) {
        this.isShowSub = false;
        return;
      }

      // 如果点击为同一个id，并且该id对应的一级选项是有二级筛选，则展示二级筛选
      if (this.currentFilter.id === item.id && item.subs.length > 0) {
        this.isShowSub = true;
      }

      // 更新选项
      this.currentFilter = item;
    },
		/**
		 * 二级筛选项点击事件
		 */
    onFilterSubItemClick(item) {
      // 更新选中项，把选中的二级筛选项更新为当前选中的项
      this.currentFilter = item;
      // 遍历一级筛选
      this.filtersData.forEach(filters => {
        // 遍历一级筛选下的二级赛选
        filters.subs.forEach(sub => {
          // 把选中的二级筛选置顶到一级筛选
          if (this.currentFilter.id === sub.id) {
            filters.id = sub.id;
            filters.name = sub.name;
          }
        });
      });
      // 关闭子视图
      this.isShowSub = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.filter {
  width: 100%;

  &-list {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    border-bottom: px2rem(1) solid $lineColor;

    &-item {
      flex: 1;
      height: px2rem(44);
      padding: $marginSize;
      box-sizing: border-box;

      &-content {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        &-name {
          font-size: $infoFontSize;
          margin-right: $marginSize;
        }

        &-arrow {
          &-open {
            // 变形，定义样式要执行的形态变化行为 -> 平移 旋转 缩放 倾斜等
            transform: rotate(180deg);
            // 设置元素的样式过渡效果，可设置元素某个属性的也可以设置all所有属性
            // 过渡时间
            // 过渡的速度曲线 ease linear ease-out等等
            // 过渡效果延迟多久才开始执行
            transition: all 0.3s;
          }

          &-close {
            transform: rotate(0deg);
            transition: all 0.3s;
          }
        }
      }
    }
  }
  .filter-sub {
    position: absolute;
    width: 100%;
    max-height: px2rem(180);
    // 当超过最大高度时，y轴可滚动
    overflow-y: auto;
    overflow: hidden;
    background-color: white;

    &-list {
      &-item {
        &-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: $marginSize;
          box-sizing: border-box;
          border-bottom: px2rem(1) solid $lineColor;

          &-name {
            font-size: $infoFontSize;
            display: inline-block;
          }

          &-selected {
            width: px2rem(18);
            height: px2rem(18);
          }
        }
      }
    }
  }
}

.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.actived {
  color: $mainColor;
}

// v-if或v-show都会触发的过渡
.sub-deploy-enter-active {
  animation: deploy 0.3s;
}

.sub-deploy-leave-active {
  animation: deploy 0.2s reverse;
}

@keyframes deploy {
  from {
    max-height: 0;
  }
  to {
    max-height: px2rem(180);
  }
}
</style>
