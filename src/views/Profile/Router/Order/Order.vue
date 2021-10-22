<template>
  <div class="pofile-order fiexd">
    <Navbar text="订单中心" />
    <div class="pofile-order-tabs">
      <van-tabs v-model="active" swipeable background="rgb(241, 243, 245)">
        <van-tab v-for="(item, index) in tabs" :title="item.title" :key="index">
          <OrderTab :type="index"></OrderTab>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Navbar from "views/Profile/Navbar/RouterNavbar";
import OrderTab from "./OrderTab.vue";
export default {
  name: "PofileOrder",
  data() {
    return {
      active: this.$route.params.active,
      tabs: [
        { title: "全部订单", reqName: "" },
        { title: "待支付", reqName: "" },
        { title: "待收货", reqName: "" },
        { title: "交易完成", reqName: "" },
      ],
      activeList: [],
    };
  },
  async created() {},
  components: { Navbar, OrderTab },
};
</script>

<style  scoped lang='less'>
@import "~styles/common/mixins.less";
.fiexd {
  .allMask();
}
.pofile-order {
  &-tabs {
  }
}
</style>