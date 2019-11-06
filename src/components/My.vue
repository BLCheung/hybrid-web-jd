<template>
  <div class="my">
    <navigation :title="'个人中心'" :isBack="false" />
    <div class="my-content">
      <!-- 头像区域 -->
      <div class="my-content-header" @click="onLoginClick">
        <img class="my-content-header-avatar" src="@img/avater.png" alt />
        <p
          class="my-content-header-login"
        >{{$store.state.userName ? $store.state.userName : '登录/注册'}}</p>
      </div>
      <!-- 选项列表区域 -->
      <div class="my-content-list">
        <div class="my-content-list-item" v-for="(item, index) of listData" :key="index">
          <p class="my-content-list-item-name">{{item}}</p>
          <img class="my-content-list-item-arrow" src="@img/right-arrow.svg" alt />
        </div>
      </div>
      <div
        v-if="$store.state.userName"
        class="my-content-logout btn-commit"
        @click="onLogoutClick"
      >注销</div>
    </div>
  </div>
</template>

<script>
import Navigation from '@cpm/currency/NavigationBar.vue'
export default {
  components: {
    Navigation
  },
  data() {
    return {
      listData: [
        '全部订单',
        '我的预约',
        '应用推荐',
        '用户福利'
      ]
    };
  },
  methods: {
    /**
     * 登录
     */
    onLoginClick() {
      this.$router.push({
        name: 'login',
        params: {
          routerType: 'push'
        }
      });
    },
    /**
     * 注销
     */
    onLogoutClick() {
      if (window.android) {
        this.onLogoutToAndroid();
      } else if (window.webkit) {
        this.onLogoutToIOS();
      }
    },
    /**
     * Android端注销
     */
    onLogoutToAndroid() {
      let result = window.android.logout();
      this.onNativeLogoutCallback(result);
    },
    /**
     * iOS端注销
     */
    onLogoutToIOS() {
      // 指定iOS的回调方法
      window.logoutCallback = this.onNativeLogoutCallback;
      // 调用iOS退出登录接口
      window.webkit.messageHandlers.logout.postMessage({});
    },
    /**
     * 原生端注销回调
     */
    onNativeLogoutCallback(result) {
      if (result) {
        this.$store.commit('clearUserName');
        alert('注销成功');
      } else {
        this.$toast({
          title: '操作失败，请重试'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.my {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: $bgColor;

  &-content {
    width: 100%;
    height: 100%;

    &-header {
      display: flex;
      align-items: center;
      height: px2rem(68);
      border-top: px2rem(1) solid $lineColor;
      border-bottom: px2rem(1) solid $lineColor;
      padding: $marginSize;
      background-color: white;

      &-avatar {
        width: px2rem(52);
        height: px2rem(52);
      }

      &-login {
        margin-left: $marginSize;
        font-size: $titleFontSize;
      }
    }

    &-list {
      &-item {
        display: flex;
        align-items: center;
        height: px2rem(46);
        box-sizing: border-box;
        padding: $marginSize;
        background-color: white;
        border-bottom: px2rem(1) solid $lineColor;

        &-name {
          font-size: $infoFontSize;
          flex: 1;
        }

        &-arrow {
          width: px2rem(16);
        }
      }
    }

    &-logout {
      margin-top: 20%;
    }
  }
}
</style>
