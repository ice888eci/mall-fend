<template>
  <Navbar
    ref="navbar"
    class="router-profile-navbar"
    :fixed="false"
    bg="rgb(241, 243, 245)"
  >
    <template #left>
      <img src="~svg/back.svg" class="icon" @click="() => $router.back()" />
    </template>
    <template #center>
      <span class="navbar-router-text">{{ text }}</span>
    </template>
  </Navbar>
</template>

<script>
import Navbar from "components/Navbar/Navbar";
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  components: { Navbar },
};
</script>

<style lang="less" scoped>
.navbar-router-text {
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
