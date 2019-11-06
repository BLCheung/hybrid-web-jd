<template>
  <div class="register">
    <navigation :title="'注册'" @left="onLeftClick" />

    <div class="register-content">
      <div class="input-wrapper">
        <input v-model="username" type="text" placeholder="请输入用户名" />
      </div>
      <div class="input-wrapper">
        <input v-model="password" type="password" placeholder="请输入密码" />
      </div>
      <div class="input-wrapper">
        <input v-model="confirmPassword" type="password" placeholder="确认密码" />
      </div>
      <!-- 注册按钮 -->
      <div class="register-content-register btn-commit" @click="onRegisterClick">注册</div>
    </div>
  </div>
</template>

<script>
import Navigation from '@cpm/currency/NavigationBar.vue';
import md5 from '@js/md5.min.js';

export default {
  name: 'register',
  components: {
    Navigation
  },
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      md5Password: ''
    }
  },
  methods: {
		/**
		 * 后退
		 */
    onLeftClick() {
      this.$router.go(-1);
    },
		/**
		 * 注册点击事件
		 */
    onRegisterClick() {
      if (this.username.length === 0) {
        alert('用户名不能为空');
        return;
      }

      if (this.password.length === 0) {
        alert('密码不能为空');
        return;
      } else if (this.password !== this.confirmPassword) {
        alert('两次输入的密码不一致');
        return;
      }

      // 与原生端交互
      this.md5Password = md5(this.password);

      // 判断设备
      if (window.android) {
        this.onRegisterInAndroid();
      } else if (window.webkit) {
        this.onRegisterInIOS();
      }
    },
    /**
     * Android端注册
     */
    onRegisterInAndroid() {
      let result = window.android.register(JSON.stringify({
        'userName': this.username,
        'password': this.md5Password
      }));
      this.onNativeRegisterCallback(result);
    },
    /**
     * iOS注册
     */
    onRegisterInIOS() {
      window.onRegisterCallback = this.onNativeRegisterCallback;
      window.webkit.messageHandlers.register.postMessage({
        'userName': this.username,
        'password': this.md5Password
      });
    },
    /**
     * 原生端注册回调结果
     */
    onNativeRegisterCallback(result) {
      switch (result) {
        case '-1':
          this.$toast({ title: '注册失败！请重试' });
          break;

        case '0':
          this.$toast({ title: '该用户已被注册！' });
          break;

        case '1':
          alert('注册成功！去登录吧^_^');
          this.onLeftClick();
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

.register {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;

  &-content {
    width: 100%;
    // height: 100%;

    &-register {
      margin-top: 40%;
    }
  }
}
</style>
