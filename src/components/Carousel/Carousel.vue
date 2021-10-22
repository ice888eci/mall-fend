<template>
  <div class="Carousel">
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      class="swiper-container swiper"
    >
      <slot></slot>
      <div class="swiper-pagination" slot="pagination" ref="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper } from "vue-awesome-swiper";

export default {
  name: "Carousel",
  components: { swiper },
  created() {
    console.log(this.slidesPerView);
  },
  props: {
    // 显示分页器
    showPagination: {
      type: Boolean,
      default: false,
    },

    // 显示slide数量
    slidesPerView: {
      type: [Number, String],
      default: 1,
    },

    slidesPerColumn: {
      type: [Number, String],
      default: 1,
    },

    spaceBetween: {
      type: Number,
      default: 5,
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
  data() {
    return {
      swiperOption: null,
    };
  },
  created() {
    this.swiperOption = {
      slidesPerView: this.slidesPerView,
      slidesPerColumn: this.slidesPerColumn,
      spaceBetween: this.spaceBetween,
      loop: this.loop,
      centeredSlides: this.centeredSlides,
      pagination: {},
    };

    // 自动播放
    if (this.autoplay) {
      this.swiperOption.autoplay = {
        delay: this.delay,
        disableOnInteraction: this.disableOnInteraction,
      };
    }

    // 显示分页器
    if (this.showPagination) {
      this.swiperOption.pagination = {
        el: ".swiper-pagination",
        dynamicBullets: true,
      };
    }
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    pagination() {
      return this.$refs.pagination;
    },
  },
};
</script>

<style lang="less" scoped>
.swiper {
  padding-top: 1rem;
  width: 95%;
  height: 200px;
  border-radius: 1rem;
  img {
    width: 100%;
    height: 100%;
  }
  // 自定义颜色
  & /deep/ .swiper-pagination-bullet-active {
    background-color: rgb(20, 211, 163);
  }
  // 自定义大小
  & /deep/ .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
  }
}
</style>
