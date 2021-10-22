<template>
  <Navbar
    ref="navbar"
    class="cart-navbar"
    :fixed="false"
    bg="rgb(241, 243, 245)"
  >
    <template #center>
      <span class="navbar-cart-text">购物车</span>
    </template>

    <template #right>
      <img
        class="icon"
        src="~svg/search.svg"
        @click="() => $router.push({ name: `Search` })"
      />
    </template>
  </Navbar>
</template>

<script>
import Navbar from "components/Navbar/Navbar";
export default {
  name: "cartNavbar",
  components: { Navbar },
};
</script>

<style lang="less" scoped>
.navbar-cart-text {
  text-align: left;
  width: 86%;
  font-size: 20px;
}

/deep/.nav-right {
  margin-right: 15px;
  img {
    width: 25px;
  }
}
</style>
