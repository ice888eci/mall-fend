<template>
  <div class="cashier-order fiexd">
    <RouterNavbar text="收银台" />

    <van-cell-group>
      <van-cell
        title="付款金额"
        :value="`￥${totalPrice}`"
        :label="`描述信息:${userInfo.name},${userInfo.tel}`"
      />
    </van-cell-group>

    <van-radio-group v-model="radio">
      <van-cell-group title="选择支付方式">
        <van-cell clickable @click="radio = '1'">
          <template slot="title">
            <img
              src="~img/order/zfb.png"
              alt=""
              width="25px"
              height="25px"
              style="vertical-align: middle; padding-right: 5px"
            />
            <span>支付宝支付(维护中)</span>
          </template>
          <van-radio slot="right-icon" name="1" checked-color="#07c160" />
        </van-cell>
        <van-cell clickable @click="radio = '2'">
          <template slot="title">
            <img
              src="~img/order/wx.png"
              alt=""
              width="25px"
              height="25px"
              style="vertical-align: middle; padding-right: 5px"
            />
            <span>微信支付(维护中)</span>
          </template>
          <van-radio slot="right-icon" name="2" checked-color="#07c160" />
        </van-cell>

        <van-cell clickable @click="radio = '3'" style="display: flex">
          <template slot="title">
            <van-icon name="balance-o" size="22px" class="icons" />
            <span style="margin: 0 0 1px 5px"> APP支付</span>
          </template>
          <van-radio slot="right-icon" name="3" checked-color="#07c160" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <van-submit-bar
      :price="totalPrice * 100"
      button-text="付款"
      @submit="onSubmit"
    />

    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-password-input
        :value="password"
        :focused="showKeyboard"
        :error-info="errorInfo"
        @focus="showKeyboard = true"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        v-model="password"
        :show="showKeyboard"
        @blur="showKeyboard = true"
      />
    </van-popup>
  </div>
</template>

<script>
import RouterNavbar from "views/Order/Navbar/RouterNavbar";
export default {
  name: "CashierOrder",
  data() {
    return {
      radio: "3",
      show: false,
      password: "",
      showKeyboard: true,
      errorInfo: "",
    };
  },
  created() {
    console.log(this.$route.params);
    console.log(this.numbers);
  },
  computed: {
    totalPrice() {
      if (Object.keys(this.$route.params).length) {
        return this.$route.params.pays
          .reduce((t, v) => t + v.price * v.quantity, 0)
          .toFixed(2);
      }
      return 0;
    },
    userInfo() {
      if (Object.keys(this.$route.params).length) {
        return this.$route.params.pays[0];
      }
      return {};
    },
    numbers() {
      if (Object.keys(this.$route.params).length) {
        return this.$route.params.pays.map((v) => v.number).join("-");
      }
      return [];
    },
  },
  methods: {
    async onSubmit() {
      if (this.radio == 1 || this.radio == 2) {
        this.$Toast.fail("该支付正在维护");
        return;
      } else {
        this.show = true;
      }

      // if (this.radio == 1) {
      //   const res = await this.$api.ReqPayment({
      //     alipayId: 12341221243234,
      //     price: this.totalPrice,
      //   });
      //   location.href = res.data;
      // } else {
      //   this.$Toast.fail("该支付正在维护");
      // }
    },
  },
  watch: {
    async password(value) {
      if (value.length === 6) {
        const { status, msg } = await this.$api.ReqPayment({
          numbers: this.numbers,
          totalPrice: this.totalPrice,
          uid: this.$utils.GetUser().uid,
          payPwd: value,
        });
        if (status) {
          this.$Toast.success(msg);
          setTimeout(() => this.$router.push({ name: "PaySuccess" }), 1500);
        } else {
          this.$Toast.fail(msg);
        }
      } else {
        this.errorInfo = "";
      }
    },
  },
  components: { RouterNavbar },
};
</script>

<style  scoped lang='less'>
@import "~styles/common/mixins.less";
.fiexd {
  .allMask();
}
.icons {
  vertical-align: bottom;
}
</style>