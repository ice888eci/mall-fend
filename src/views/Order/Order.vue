<template>
  <div class="order">
    <RouterNavbar text="确认订单" />

    <Scroll ref="scroll" height="calc(100vh - 105px)" :click="true">
      <div class="order-body">
        <div class="order-address">
          <div class="order-address-icons">
            <van-icon name="location-o" size="22px" />
          </div>
          <div class="order-address-info">
            <div class="info">
              <div class="info-name">{{ address.name }}</div>

              <div class="info-tel">{{ address.tel }}</div>
              <div class="info-tags">
                <span>默认</span>
              </div>
            </div>
            <div class="details">{{ address.addressDetail }}</div>
          </div>
          <div class="order-address-icons" @click="onToAddressEdit()">
            <van-icon name="arrow" size="16px" />
          </div>
        </div>

        <section
          class="order-area"
          v-for="(item, index) in products"
          :key="index"
        >
          <div class="area-header">
            <van-icon name="shop-o" size="15px" class="header-icon" />
            <p class="header-title">{{ item.tag }}</p>
          </div>
          <div class="area-main">
            <van-card
              :num="item.quantity"
              :price="item.price"
              :desc="item.spec"
              :title="item.name"
            >
              <template #thumb>
                <img :src="item.thumbnail" @load="onLoad(index)" />
              </template>
            </van-card>
          </div>

          <div class="area-footer">
            <van-cell-group>
              <van-cell title="配送" label="标准配送" />
            </van-cell-group>
          </div>
        </section>

        <div class="order-total">
          <van-cell-group inset>
            <van-cell title="商品总价" :value="`￥${productsTotalPirce}`" />
            <van-cell value="￥0">
              <template #title>
                <span class="custom-title">配送费</span>
                <van-icon name="question-o" class="question-o" size="15px" />
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </Scroll>

    <van-submit-bar
      :price="productsTotalPirce * 100"
      button-text="提交订单"
      @submit="onSubmit"
    />
    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Scroll from "components/Scroll/Scroll";
import RouterNavbar from "views/Order/Navbar/RouterNavbar";
export default {
  name: "order",
  data() {
    return {
      chosenAddressId: "1",
      products: [],
      address: {},
    };
  },
  computed: {
    scroll() {
      if (this.$refs.scroll) return this.$refs.scroll;
    },
    // cids
    orderParams() {
      if (Object.keys(this.$route.params).length) {
        return this.$route.params.selected.join("-");
      }
      return null;
    },
    productsTotalPirce() {
      if (this.products.length) {
        return this.products.reduce((t, v) => v.price + t, 0).toFixed(2);
      }
      return 0;
    },
  },

  async activated() {
    if (this.orderParams) {
      const response = await this.$api.ReqOrderList({
        uid: this.$utils.GetUser().uid,
        cids: this.orderParams,
      });
      this.products = response.products;
      this.address = response.address;
    }
  },

  methods: {
    async onSubmit() {
      if (this.orderParams == null) return;
      let res = await this.$api.ReqOrderCreate({
        uid: this.$utils.GetUser().uid,
        cids: this.orderParams,
        aid: this.address.id,
      });
      this.$router.push({ name: "CashierOrder", params: { pays: res } });
    },
    onToAddressEdit() {
      this.$router.push({
        name: "EditAddress",
        params: { item: this.address },
      });
    },

    onLoad(index) {
      if (this.products.length - 1 == index) this.scroll.refresh();
    },
  },

  components: { RouterNavbar, Scroll },
};
</script>

<style  scoped lang='less'>
.order {
  background: rgb(241, 243, 245);
  width: 100%;
  height: 100vh;
  &-body {
    padding: 20px;
  }
  &-address {
    display: flex;
    max-width: 100%;
    justify-content: space-around;
    background-color: #fff;
    border-radius: 20px;
    padding: 15px;

    &-icons {
      display: flex;
      align-items: center;
    }

    &-info {
      padding: 0 10px;
      display: flex;
      flex-flow: column;
      .info {
        display: flex;
        align-items: center;
        font-size: 15px;
        & > div {
          padding-right: 10px;
        }
        & > div:nth-last-of-type(2) {
          padding-right: 5px;
        }
        .info-tags {
          span {
            font-size: 12px;
            display: inline-block;
            padding: 2px;
            border: 0.5px solid rgba(230, 69, 102, 0.8);
            text-align: center;
          }
          color: rgba(230, 69, 102, 0.8);
          margin-bottom: 5px;
        }
      }
      .details {
        color: #000;
        opacity: 0.6;
        line-height: 1.05rem;
      }
    }
  }
}

.order-area {
  width: 100%;
  background: #fff;
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 20px;
  .area-header {
    display: flex;
    align-items: center;
    padding: 5px 0;
    .header-title {
      font-size: 14px;
      text-indent: 0.5rem;
    }
  }
}
.order-total {
  width: 100%;
  background: #fff;
  padding: 5px 0;
  margin: 10px 0;
  border-radius: 20px;
  /deep/.van-cell__title {
    display: flex;
    align-items: center;
  }
}
/deep/.van-submit-bar__text {
  display: flex;
  align-items: center;
}

/deep/.van-card__thumb {
  img {
    width: 100%;
  }
}
/*转场动画*/
.router-slider-enter-active,
.router-slider-leave-active {
  transition: all 0.3s;
}

.router-slider-enter,
.router-slider-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>