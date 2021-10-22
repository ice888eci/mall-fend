<template>
  <div id="app">
    <!-- 盒子套住布局 过渡时不影响整体滑动 -->
    <div class="anmimate-box">
      <transition name="router-slider" mode="out-in">
        <keep-alive>
          <!-- v-if只能放在router-view上使用 -->
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition name="router-slider" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </div>

    <Tabbar :tabbarItems="tabbarItems" />
  </div>
</template>

<script>
// 禁止手机端扩大和缩小手势
window.onload = function () {
  document.addEventListener("touchstart", function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
  });
};

import Config from "./config";
import Tabbar from "./components/Tabbar/Tabbar";
export default {
  components: { Tabbar },
  data() {
    return {
      tabbarItems: Config.dev.public.tabbarItems,
    };
  },
};
</script>
<style lang="less">
@import "~styles/common/reset.less";
/*转场动画*/

.anmimate-box {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
}
.router-slider-enter-active,
.router-slider-leave-active {
  transition: all 0.2s;
}

.router-slider-enter,
.router-slider-leave-active {
  transform: translate3d(1rem, 0, 0);
  opacity: 1;
}
* {
  touch-action: pan-y;
}
</style>
