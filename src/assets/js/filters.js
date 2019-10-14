import Vue from 'vue';

/**
 * 金额过滤器
 * 过滤整数价格为浮点类型价格(加上小数点后两位)
 * @param value 需要被过滤的价格
 */
Vue.filter('price2Fixed', (value) => {
  if (!value) {
    return '0.00';
  }

  // 把文本转换为float类型
  let result = parseFloat(value);
  // 如果还是为int整数类型
  if (Number.isInteger(result)) {
    // 则文本就是一个整数值，无小数点
    return result;
  }
  // 文本包含小数，返回两位小数的价格
  return result.toFixed(2);
});

/**
 * 时间过滤器
 * 用于给时间的时:分:秒补零 3:5:9 -> 03:05:09
 */
Vue.filter('filterTime', (value) => {
  if (!value) {
    return;
  }
  // 非时间格式字符串
  if (value.indexOf(':') === -1) {
    return value;
  }

  let result = '';
  // 分割字符串为一个数组，按照':'将分割成[3, 5, 9]
  const arr = value.split(':');
  if (parseInt(arr[0]) < 10) {
    result = `0${arr[0]}`;
  } else {
    result = arr[0];
  }

  if (parseInt(arr[1]) < 10) {
    result = `${result}:0${arr[1]}`;
  } else {
    result = `${result}:${arr[1]}`;
  }

  if (parseInt(arr[2]) < 10) {
    result = `${result}:0${arr[2]}`;
  } else {
    result = `${result}:${arr[2]}`;
  }

  return result;
});
