// 当文档加载完成或者窗口大小改变时，设置 html 元素的 font-size，从而实现 rem 布局
(() => {
  const docEl = document.documentElement;
  // orientationchange 在设备的纵横比发生变化时触发
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const recalc = () => {
    const clientWidth = docEl.clientWidth;
    if (!clientWidth) {
      return;
    }
    // 这个计算方式跟运行的设备有关系
    // iphone3/4/5是 320px
    // iphone6 是 375px
    // 这里是按照 iphone6 的大小为基准设置的
    docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
  };
  document.addEventListener('DOMContentLoaded', recalc, false);
  window.addEventListener(resizeEvt, recalc);
})();
