<template>
  <div class="swiper">
    <div class="swiper-container" ref="container">
      <div class="swiper-wrapper" ref="wrapper">
        <slot></slot>
      </div>
    </div>
    <div class="swiper-pagination" ref="pagination"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

export default {
  name: "swiper",
  props: {
    // 显示分页器
    showPagination: {
      type: Boolean,
      default: false,
    },

    // 可选值: 数字 或 'auto'
    slidesPerView: {
      type: [Number, String],
      default: 5,
    },

    slidesPerColumn: {
      type: [Number, String],
      default: 2,
    },

    // slide间隔
    spaceBetween: {
      type: Number,
      default: 0,
    },
    // 循环
    loop: {
      type: Boolean,
      default: true,
    },
    // 自动居中
    centeredSlides: {
      type: Boolean,
      default: true,
    },
    // 自动播放
    autoplay: {
      type: Boolean,
      default: false,
    },
    // 时间间隔
    delay: {
      type: Number,
      default: 3000,
    },
    // 用户操作后, 是否禁止自动播放
    disableOnInteraction: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.create();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    create() {
      // 如果已经有swiper实例了,就先销毁
      this.destroy();

      // 轮播内容的class必须为swiper-slide
      const slides = this.$refs.wrapper.children;
      Array.from(slides).forEach((el) => {
        el.classList.add("swiper-slide");
      });
      // swiper参数
      const param = {
        freeMode: true,
        slidesPerView: this.slidesPerView,
        slidesPerColumn: this.slidesPerColumn,
        spaceBetween: this.spaceBetween,
        loop: this.loop,
        centeredSlides: this.centeredSlides,
        pagination: {},
      };
      // 自动播放
      if (this.autoplay) {
        param.autoplay = {
          delay: this.delay,
          disableOnInteraction: this.disableOnInteraction,
        };
      }
      // 显示分页器
      if (this.showPagination) {
        param.pagination = {
          el: this.$refs.pagination,
          dynamicBullets: true,
        };
      }
      // 创建swiper
      this.swiper = new Swiper(this.$refs.container, param);
    },
    destroy() {
      // 销毁swiper
      if (this.swiper) {
        this.swiper.destroy();
        this.swiper = null;
      }
    },
    update() {
      // 更新swiper
      // 这个方法就是create的别名
      this.create();
    },
  },
};
</script>

<style  scoped lang='less'>
.swiper-container {
  width: 100%;
  padding-top: 1rem;
  border-radius: 1rem;
  height: 140px;
}

.swiper-wrapper {
  height: 55px;
}
</style>
