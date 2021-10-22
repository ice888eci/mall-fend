<template>
  <Navbar ref="navbar" class="profile-navbar" :fixed="false">
    <template #center>
      <div></div>
    </template>
    <template #right>
      <van-icon
        name="setting-o"
        class="profile-icons"
        size="22px"
        color="#eee"
      />
      <van-icon
        name="service-o"
        class="profile-icons"
        size="22px"
        color="#eee"
      />
    </template>
  </Navbar>
</template>

<script>
import Navbar from "components/Navbar/Navbar";
export default {
  name: "profileNavbar",
  components: { Navbar },
};
</script>

<style  scoped lang='less'>
.profile-icons {
  margin-right: 15px;
}
</style>