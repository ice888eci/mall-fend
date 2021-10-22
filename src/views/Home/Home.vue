<template>
  <div class="home">
    <Navbar ref="navbar" />
    <section class="home-bg">
      <Swiper
        :swiperList="HOME.carousel"
        class="home-swiper"
        :showPagination="true"
      />
      <Advertise :advertiseList="HOME.advertise" />
    </section>

    <div class="home-banner">
      <img :src="HOME.banner" />
    </div>

    <NavGird :navGirdList="navGirdList" />
    <Vip />
    <Special :specialArea="resetSpecialArea" />
    <Products :tabs="HOME.tabs" />

    <router-view />
  </div>
</template>

<script>
import Config from "config";
// import Scroll from "components/Scroll/Scroll";

import Navbar from "./Navbar/Navbar";
import Header from "./Header/Header";
import Swiper from "./Swiper/Swiper";
import Advertise from "./Advertise/Advertise";
import NavGird from "./NavGird/NavGird";
import Vip from "./Vip/Vip";
import Special from "./Special/Special";
import Products from "./Products/Products";

export default {
  name: "Home",
  data() {
    return {
      HOME: Config.dev.HomeInfo,
      navGirdList: [],
      specialArea: [],
    };
  },
  computed: {
    resetSpecialArea() {
      this.specialArea.forEach((val) => (val.images = JSON.parse(val.images)));
      return this.specialArea;
    },
    navbar() {
      return this.$refs.navbar && this.$refs.navbar.$el;
    },
  },
  created() {
    this.init();
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  // deactivated() {
  //   window.removeEventListener("scroll", this.handleScroll, true);
  // },

  activated() {
    console.log("activatedHome");
  },

  methods: {
    async init() {
      this.navGirdList = await this.$api.ReqPublicNav();
      this.specialArea = await this.$api.ReqHomeSpecialArea();
    },
    handleScroll(e) {
      let y = e.srcElement.scrollTop;
      let opacity = y / 200;
      if (y > 200) opacity = 1;
      if (this.navbar) {
        this.navbar.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
      }
    },
  },

  components: {
    Header,
    Swiper,
    Advertise,
    NavGird,
    Vip,
    Special,
    Products,
    Navbar,
    // Scroll,
  },
};
</script>

<style scoped lang="less" >
.home::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  display: none;
}
.home {
  height: calc(100vh - 50px);
  position: relative;
  overflow-y: scroll;
  &-bg {
    width: 100%;
    background-image: url("~img/Home/bg.png");
    .home {
      &-swiper {
        padding-top: 35px;
      }
    }
  }
  &-banner {
    border-radius: 0 0 15px 15px;
    img {
      width: 100%;
    }
  }
}
</style>
