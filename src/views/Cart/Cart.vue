<template>
  <div class="cart">
    <Navbar />

    <Scroll ref="scroll" height="calc(100vh - 150px)" :click="true">
      <van-notice-bar
        v-if="isLogin"
        mode="link"
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o"
        @click="() => $router.push({ name: 'Login' })"
      >
        登陆后展示购物车列表
      </van-notice-bar>
      <section class="cart-empty" v-if="!isEmpty">
        <img src="~img/cart/empty.png" />
        <p class="cart-empty-des">购物车饿憋了(≧﹏ ≦)</p>
      </section>
      <van-checkbox-group v-model="selected" ref="checkboxGroup" v-else>
        <van-swipe-cell
          v-for="(item, index) in lists"
          :key="item.id"
          class="cart-cell"
        >
          <van-card
            :num="item.quantity"
            :price="item.price"
            :desc="item.spec"
            :title="item.name"
            :origin-price="item.origin_price"
            :tag="item.type_tag"
          >
            <template #tags>
              <div class="cart-tags">
                <van-stepper
                  v-model="item.quantity"
                  theme="round"
                  button-size="22"
                  disable-input
                  @plus="increment(item)"
                  @minus="decrement(item)"
                />

                <van-checkbox
                  :name="item.id"
                  class="van-checkbox cart-tags-checkbox"
                  @click="onAddProductToCart(selected)"
                />
              </div>
            </template>

            <template #thumb>
              <img
                :src="item.thumbnail"
                @load="onloadImg(index)"
                style="width: 100%"
              />
            </template>

            <template #footer>
              <span class="cart-subtotal"
                >小计:<i
                  >{{ (item.quantity * item.price).toFixed(2) }}￥</i
                ></span
              >
            </template>
          </van-card>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="onDelCart(item)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>

      <section class="cart-like">
        <van-divider dashed> 猜你喜欢 </van-divider>
        <ProductsInfo
          :theme="1"
          :lists="likeList"
          @onLoadSuccessful="onLoadSuccessful"
        />
      </section>
    </Scroll>

    <van-submit-bar
      class="cart-submit"
      :price="totalPrice"
      :button-text="`结算(${totalNums})`"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkAll" :decimal-length="2" @click="onCheckAll()"
        >全选</van-checkbox
      >
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ProductsInfo from "components/Products/ProductsInfo";
import Scroll from "components/Scroll/Scroll";
import Navbar from "./Navbar/Navbar.vue";
export default {
  name: "cart",
  data() {
    return {
      cart: [],
      selected: [],
      checkAll: false,
      isLogin: false,
      likeList: [],
    };
  },
  // 每次进入都需要重新加载一次
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      vm.likeList = await vm.$api.ReqPublicLikeList();
      if (Object.keys(vm.$utils.GetToken()).length) {
        vm.$store.dispatch("cart/getAllProducts");
        vm.isLogin = false;
      } else {
        vm.isLogin = true;
      }
    });
  },
  computed: {
    ...mapState({
      lists: (state) => state.cart.all,
    }),
    ...mapGetters({
      totalPrice: "cart/cartTotalPrice",
      totalNums: "cart/cartTotalNums",
    }),
    scroll() {
      if (this.$refs.scroll) return this.$refs.scroll;
    },
    checkboxGroup() {
      if (this.$refs.checkboxGroup) return this.$refs.checkboxGroup;
    },
    isEmpty() {
      return this.lists.length ? true : false;
    },
  },
  methods: {
    increment(item) {
      this.$store.dispatch("cart/incrementItemQuantity", item);
    },
    decrement(item) {
      this.$store.dispatch("cart/decrementItemQuantity", item);
    },
    // 选中操作
    onAddProductToCart(selected) {
      this.$store.dispatch("cart/addProductToCart", selected);
    },
    onDelCart(item) {
      this.$store.dispatch("cart/delProductToAll", item);
      // 删除后刷新页面
      this.scroll.refresh();
    },
    onCheckAll() {
      // 没有数据时点击直接返回
      if (!this.isEmpty) return;
      this.checkboxGroup.toggleAll(this.checkAll);
      this.onAddProductToCart(this.selected);
    },
    onloadImg(index) {
      if (this.lists.length - 1 == index) this.scroll.refresh();
    },
    onLoadSuccessful() {
      this.scroll.refresh();
    },
    onSubmit() {
      if (!this.selected.length) return;
      this.$router.push({ name: "Order", params: { selected: this.selected } });
    },
  },

  components: { Navbar, Scroll, ProductsInfo },
};
</script>

<style   lang='less' scoped>
.cart {
  width: 100%;
  background-color: rgb(241, 243, 245);
  height: 100vh;

  &-empty {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 25px 0;
    img {
      display: block;
      margin: 0 auto;
      width: 50%;
    }
    &-des {
      font-size: 14px;
    }
  }
  &-cell {
    margin-bottom: 15px;
    .cart-tags {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
    }
  }
  &-submit {
    position: fixed;
    left: 0;
    bottom: 50px;
    z-index: 99;
  }
  &-subtotal {
    display: flex;
    justify-content: flex-end;
    font-size: 13px;

    i {
      color: #ee0a24;
    }
  }
}
.goods-card {
  margin: 0;
  background-color: #fff;
}

.delete-button {
  height: 100%;
}
</style>