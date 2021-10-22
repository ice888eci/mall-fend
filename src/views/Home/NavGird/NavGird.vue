<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide v-for="(item, index) in navGirdList" :key="index">
      <section @click="onOpenZone(item.zone)">
        <img :src="item.images" />
        <span>{{ item.title }}</span>
      </section>
    </swiper-slide>

    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.min.css";

export default {
  name: "Nav",
  components: { swiper, swiperSlide },
  props: {
    navGirdList: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 5,
        slidesPerColumn: 2,
        spaceBetween: 5,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
      },
    };
  },

  methods: {
    onOpenZone(zone) {
      console.log(zone);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper {
  height: 175px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
  &-slide {
    height: 60px;
    margin-top: 0;
    section {
      display: flex;
      flex-flow: column;
      align-items: center;

      span {
        margin-top: 4px;
        font-size: 12px;
      }
      img {
        width: 45px;
        height: 45px;
      }
    }
  }
  /deep/ .swiper-wrapper {
    height: 150px;
  }
  /deep/ .swiper-slide {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>