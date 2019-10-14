<template>
  <div class="countdown">
    <div class="countdown-end">
      <p>{{endHours}}点场</p>
    </div>
    <div class="countdown-sec">
      <p>{{timeState | filterTime}}</p>
    </div>
  </div>
</template>

<script>
/**
 * 计算展示内容：
 * 1. 当前时间未到开始时间：展示倒计时
 * 2. 当前时间已到开始时间：展示‘活动进行中’
 * 3. 当前时间已超过开始时间：展示‘活动已结束’
 */
export default {
  props: {
    // 结束的小时
    endHours: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {
      // 当前展示的活动状态
      timeState: '',
      // 距离活动开始时间的秒数
      diffSec: 0,
      // 用于倒计时的计时器
      interval: null
    }
  },
  methods: {
    /**
     * 计算当前距离活动开始的时间
     * 并把时间转换为HH:mm:ss格式
     */
    computEndSec() {
      if (this.interval) {
        clearInterval(this.interval);
      }
      // 获取当前时间
      const date = new Date();
      // -- 根据传进的小时数更新对应的活动状态
      if (date.getHours() === this.endHours) {
        // 活动进行中
        this.timeState = '活动进行中';
        return;
      }

      if (date.getHours() > this.endHours) {
        // 活动已结束
        this.timeState = '活动已结束';
        return;
      }

      //  -- 计算当前时间与活动开始时间的秒数差值
      // 计算小时差距 如果开始时间为16时，当前时间为15时，差距时间应该为0:59:59
      // 当当前时间如果为15:10，如果小时不-1，那会计算出距离16时会剩下01:50，而不是00:50
      const diffHours = this.endHours - date.getHours() - 1;
      // 计算分钟差距 0:60:00 = 1:00:00; 不可能有60分出现
      // 超过60分都属于下一个小时的范畴了，所以要-1
      const diffMinutes = 60 - date.getMinutes() - 1;
      // 秒不可能出现60秒的 只会出现0 ~ 59
      const diffSeconds = 60 - date.getSeconds();
      // 全部转换为秒，相加得出总秒数
      this.diffSec = diffHours * 3600 + diffMinutes * 60 + diffSeconds;
      // 开始倒计时
      this.interval = setInterval(() => {
        this.diffSec -= 1;
      }, 1000);
    }
  },
  created() {
    this.computEndSec();
  },
  // 相当于微信小程序组件内的observers对象，用于监听data内属性的变化
  watch: {
    diffSec(newVal) {
      // 根据秒数得出小时，向下取整
      const hours = Math.floor(newVal / 3600);
      // 根据秒数得出分钟，向下取整，并对超过小时的分钟数的取余
      const minutes = Math.floor(newVal / 60) % 60;
      // 对当前的总秒数60取余，可以获取到超出剩余的小时，分钟数
      const secounds = newVal % 60;
      // 拼装数据
      this.timeState = `${hours}:${minutes}:${secounds}`;

      // 如果倒计时完了，则调用计算方法更新状态
      if (newVal === 0) {
        this.computEndSec();
      }
    },
    endHours() {
      this.computEndSec();
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.countdown {
  display: inline-block;
  font-size: $miniFontSize;

  &-end {
    display: inline-block;
    padding: px2rem(2) px2rem(6);
    color: white;
    background-color: $mainColor;
    border-top-left-radius: px2rem(4);
    border-bottom-left-radius: px2rem(4);
  }

  &-sec {
    display: inline-block;
    padding: px2rem(2) px2rem(6);
    color: $mainColor;
    border: px2rem(1) solid $lineColor;
    border-top-right-radius: px2rem(4);
    border-bottom-right-radius: px2rem(4);
  }
}
</style>
