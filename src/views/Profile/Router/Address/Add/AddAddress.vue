<template>
  <div class="add-address fiexd">
    <Navbar text="添加地址" />
    <van-address-edit
      show-delete
      show-set-default
      :area-list="areaList"
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { areaList } from "utils";
import Navbar from "views/Profile/Navbar/RouterNavbar";

export default {
  name: "AddAddress",
  data() {
    return { areaList, searchResult: [] };
  },
  methods: {
    async onSave(content) {
      let {
        addressDetail,
        city,
        county,
        isDefault,
        name,
        province,
        tel,
        areaCode,
      } = content;

      const res = await this.$api.ReqAddAddress({
        uid: this.$utils.GetUser().uid,
        addressDetail,
        city,
        county,
        isDefault,
        name,
        province,
        tel,
        areaCode,
      });
      if (res.status) {
        this.$Toast.success(res.msg);
        this.$router.back();
      }
    },
    onDelete() {
      this.$router.back();
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
</style>