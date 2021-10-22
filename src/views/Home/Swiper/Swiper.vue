<template>
  <div class="swiper">
    <Carousel :showPagination="true" :autoplay="true">
      <template>
        <swiper-slide
          class="swiper-slide"
          v-for="item in swiperList"
          :key="item.id"
        >
          <img :src="item.icon_url" />
        </swiper-slide>
      </template>
    </Carousel>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import Carousel from "components/Carousel/Carousel";
import { swiperSlide } from "vue-awesome-swiper";

export default {
  name: "swiper",
  props: {
    swiperList: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {};
  },
  created() {
    // console.log(this.swiperList);
  },
  components: { Carousel, swiperSlide },
};
</script>

<style  scoped lang='less'>
.swiper-slide {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>