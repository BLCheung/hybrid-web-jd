/**
 * 判断当前设备是否iPhoneX
 * @returns true为iPhoneX，否则不是
 */
const isIphoneX = () => {
  if (window && typeof window !== 'undefined') {
    // 正则匹配如果window.navigator.userAgent包含iphone，表示当前在iOS设备上运行
    // iPhoneX及以上设备的屏幕高度大于812
    return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;
  }
  return false;
}

// 计算结果赋值给window对象下的一个属性
window.isIphoneX = isIphoneX();
