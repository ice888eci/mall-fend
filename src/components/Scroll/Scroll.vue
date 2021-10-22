<template>
  <div class="wrapper" ref="wrapper" :style="{ height }">
    <div class="content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";

import Pullup from "@better-scroll/pull-up";
import ScrollBar from "@better-scroll/scroll-bar";
BScroll.use(Pullup);
BScroll.use(ScrollBar);

export default {
  name: "Scroll",
  props: {
    height: {
      type: String,
      default: "calc(100vh - 54px - 50px)",
    },
    probeType: {
      type: Number,
      default: 3,
    },
    click: {
      type: Boolean,
      default: true,
    },
    pullUpLoad: {
      type: Boolean,
      default: true,
    },
    bounce: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return { bs: null, isPullUpLoad: false, isScroll: false };
  },

  computed: {
    bsExist() {
      return this.bs ? true : false;
    },
  },
  async mounted() {
    await this.$nextTick();
    this.init();
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollY: true,
        pullUpLoad: this.pullUpLoad,
        bounce: this.bounce,
        useTransition: false,
        scrollbar: true,
      });

      if (this.probeType >= 1) {
        this.bs.on("scroll", ({ y }) => {
          if (this.isScroll) this.$emit("loadListenScrollHook", y);
        });
        // 开始滚动时触发 其他事件点击不触发
        this.bs.on("scrollStart", () => {
          // console.log("开始滚动");
          this.isScroll = true;
        });
        // 滚动结束触发
        this.bs.on("scrollEnd", () => {
          // console.log("结束");
          this.isScroll = false;
        });
      }
      if (this.pullUpLoad) this.bs.on("pullingUp", this.pullingUpHandler);

      this.bs.on("scrollEnd", () => {
        this.bs.isInTransition = false;
      });
    },

    pullingUpHandler() {
      console.log(111);
      this.$emit("loadingData");
    },

    finishPullUp() {
      this.bsExist && this.bs.finishPullUp();
    },
    refresh() {
      this.bsExist && this.bs.refresh();
    },
    scrollTo(y, duration = 300) {
      this.bs.scrollTo(0, y, duration);
    },
    getY() {
      return this.bs.y;
    },
  },
};
</script>
<style  scoped lang='less'>
.wrapper {
  // height: calc(100vh - 54px - 50px - 60px);
  // height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>