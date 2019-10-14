// 定义最大fontSize
// const MAX_FONT_SIZE = 42;

// 给文档注册事件监听，监听html文档解析完成时事件DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // 获取html标签
  const html = document.querySelector('html');
  // 获取屏幕宽度设置为根元素fontSize标准
  let fontSize = window.innerWidth;
  // 限制fontSize大小不允许超过最大限制
  // fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize;
  html.style.fontSize = fontSize + 'px';
});
