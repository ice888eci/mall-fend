<template>
  <Navbar
    ref="navbar"
    class="category-info-navbar"
    :fixed="false"
    bg="rbg(241, 243, 245)"
  >
    <template #left>
      <img src="~svg/back.svg" class="icon" @click="() => $router.go(-1)" />
    </template>
  </Navbar>
</template>

<script>
import Navbar from "components/Navbar/Navbar";
export default {
  name: "categoryInfoNavbar",
  components: { Navbar },
};
</script>

