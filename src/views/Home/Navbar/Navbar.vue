<template>
  <Navbar ref="navbar" class="home-navbar">
    <template #left>
      <img
        src="~svg/a.svg"
        class="icon"
        @click="() => $router.push({ name: `Map` })"
      />
    </template>
    <template #right
      ><img
        src="~svg/user.svg"
        class="icon"
        @click="() => $router.push({ name: `Login` })"
    /></template>
  </Navbar>
</template>

<script>
import Navbar from "components/Navbar/Navbar";
export default {
  name: "homeNavbar",
  components: { Navbar },
};
</script>

<style  scoped lang='less'>
</style>