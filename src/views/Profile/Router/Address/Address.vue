<template>
  <div class="pofile-address fiexd">
    <Navbar text="收货地址" />
    <section class="address-body">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </section>

    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Navbar from "views/Profile/Navbar/RouterNavbar";
export default {
  name: "PofileAddress",
  data() {
    return {
      chosenAddressId: -1,
      list: [],
    };
  },

  // 暂时用 后面keepalive后换成路由
  created() {
    this.reqInint();
  },

  beforeRouteUpdate(to, from, next) {
    if (to.name == "PofileAddress") {
      this.reqInint();
    }
    next();
  },
  methods: {
    async reqInint() {
      this.list = await this.$api.ReqAllAddress({
        uid: this.$utils.GetUser().uid,
      });
      this.list.sort((a, b) => b.isDefault - a.isDefault);
      this.chosenAddressId = this.list[0].id;
    },
    onAdd() {
      this.$router.push({ name: "AddAddress" });
    },
    onEdit(item) {
      this.$router.push({ name: "EditAddress", params: { item } });
    },
  },
  components: { Navbar },
};
</script>

<style  scoped lang='less'>
@import "~styles/common/mixins.less";
.fiexd {
  .allMask();
}

/*转场动画*/
.router-slider-enter-active,
.router-slider-leave-active {
  transition: all 0.3s;
}

.router-slider-enter,
.router-slider-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>