<template>
  <div class="pay-success fiexd">
    <section>
      <img src="~img/order/cart.jpg" alt="" />
      <h1>订单支付成功</h1>
      <p>您的商品已经全部购买完毕</p>
      <div class="btns">
        <van-button
          plain
          hairline
          type="primary"
          @click="() => $router.push({ name: 'Profile' })"
          >返回我的</van-button
        >
        <van-button
          plain
          hairline
          type="info"
          @click="() => $router.push({ name: 'Category' })"
          >再去看看</van-button
        >
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "PaySuccess",
  data() {
    return {};
  },
};
</script>

<style  scoped lang='less'>
@import "~styles/common/mixins.less";
.fiexd {
  .allMask();
  section {
    margin-top: 50px;
    display: flex;
    flex-flow: column;
    align-items: center;
    img {
      width: 100%;
    }
    h1 {
      font-size: 22px;
      padding: 10px;
    }
    .btns {
      padding: 20px;
      display: flex;
      width: 100%;
      justify-content: space-around;
    }
  }
}
.navbar-router-text {
  text-align: left;
  width: 86%;
  font-size: 20px;
}
</style>