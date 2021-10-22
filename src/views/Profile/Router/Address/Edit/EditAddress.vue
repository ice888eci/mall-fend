<template>
  <div class="edit-address fiexd">
    <Navbar text="修改地址" />
    <van-address-edit
      ref="addressEdit"
      :area-list="areaList"
      :addressInfo="addressInfo"
      :search-result="searchResult"
      show-delete
      show-set-default
      @save="onSave"
      @delete="onDelete"
    >
    </van-address-edit>
  </div>
</template>

<script>
import { areaList } from "utils";
import Navbar from "views/Profile/Navbar/RouterNavbar";
export default {
  name: "EditAddress",
  data() {
    return { areaList, searchResult: [], addressInfo: {} };
  },
  computed: {
    addressEdit() {
      if (this.$refs.addressEdit) return this.$refs.addressEdit;
    },
  },
  created() {
    // 将isDefault==1转换成布尔值
    this.$route.params.item.isDefault = !!this.$route.params.item.isDefault;
    this.addressInfo = this.$route.params.item;
  },

  methods: {
    async onSave(content) {
      let {
        id,
        name,
        tel,
        province,
        city,
        county,
        addressDetail,
        isDefault,
        areaCode,
        u_id,
      } = content;

      console.log(content);

      const res = await this.$api.ReqEditAddress({
        id,
        name,
        tel,
        province,
        city,
        county,
        addressDetail,
        isDefault,
        areaCode,
        u_id,
      });
      if (res.status) {
        this.$Toast.success(res.msg);
        this.$router.back();
      }
    },
    async onDelete({ u_id, id }) {
      const res = await this.$api.ReqDelAddress({ u_id, id });
      if (res.status) {
        this.$Toast.success(res.msg);
        this.$router.back();
      }
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