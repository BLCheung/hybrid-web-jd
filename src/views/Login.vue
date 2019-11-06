<template>
  <div class="login">
    <navigation :title="'登录'" @left="onLeftClick" />
    <div class="login-content">
      <div class="input-wrapper">
        <input v-model="username" type="text" placeholder="请输入用户名" />
      </div>
      <div class="input-wrapper">
        <input v-model="password" type="password" placeholder="请输入密码" />
      </div>
      <!-- 登录按钮 -->
      <div class="login-content-login btn-commit" @click="onLoginClick">登录</div>
      <a class="login-content-register" @click="onRegisterClick">注册新用户</a>
    </div>
  </div>
</template>

<script>
import Navigation from '@cpm/currency/NavigationBar.vue';
import md5 from '@js/md5.min.js';

export default {
  name: 'login',
  components: {
    Navigation
  },
  data() {
    return {
      username: '',
      password: '',
      // md5加密的密码
      md5Password: ''
    }
  },
  methods: {
    /**
     * 点击返回
     */
    onLeftClick() {
      this.$router.go(-1);
    },
		/**
		 * 登录点击事件
		 */
    onLoginClick() {
      if (this.username.length === 0 || this.password.length === 0) {
        alert('请输入用户名或密码');
        return;
      }

      // 对密码进行md5加密
      this.md5Password = md5(this.password);

      // 与原生端交互，判断设备环境
      if (window.android) {
        this.onLoginInAndroid();
      } else if (window.webkit) {
        this.onLoginInIOS();
      }
    },
		/**
		 * 注册点击事件
		 */
    onRegisterClick() {
      this.$router.push({
        name: 'register',
        params: {
          routerType: 'push'
        }
      });
    },
    /**
     * Android端登录验证
     */
    onLoginInAndroid() {
      let result = window.android.login(JSON.stringify({
        'userName': this.username,
        'password': this.md5Password
      }));
      this.onNativeLoginCallback(result);
    },
    /**
     * iOS端登录验证
     */
    onLoginInIOS() {
      // 回调方法，一定要在调用原生接口前创建
      window.onLoginCallback = this.onNativeLoginCallback;
      // iOS的接口方法
      window.webkit.messageHandlers.login.postMessage({
        'userName': this.username,
        'password': this.md5Password
      });
    },
    /**
     * 原生端登录结果回调
     */
    onNativeLoginCallback(result) {
      switch (result) {
        case '-1':
          alert('系统未知错误，请重试！');
          break;

        case '0':
          alert('用户不存在！');
          break;

        case '1':
          // 登录成功，保存用户名
          this.$store.commit('setUserName', this.username);
          this.$toast({
            title: '登录成功'
          });
          this.onLeftClick();
          break;

        case '2':
          alert('用户名或密码错误');
          break;

        default:
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.login {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;

  &-content {
    width: 100%;
    // height: 100%;

    &-login {
      margin-top: 40%;
    }

    &-register {
      font-size: $infoFontSize;
      color: $hintColor;
      margin-top: $marginSize;
      padding: $marginSize;
      float: right;
    }
  }
}
</style>
