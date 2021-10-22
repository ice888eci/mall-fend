<template>
  <div class="ProductsList">
    <ListTheme :theme="theme">
      <ListItem
        v-for="(item, index) in lists"
        :key="index"
        @click.native="onTabItemsInfo(item.id)"
      >
        <template #img>
          <!-- :src="" -->
          <!-- 图片懒加载 -->
          <img v-lazy="item.thumbnail" @load="onLoadSuccessful(index)" />
        </template>
        <template #title>{{ item.name }} </template>
        <template #subtitle>{{ item.spec }} </template>
        <template #other>
          <ListOther>
            <section class="price">
              <span class="new-price"><em>¥</em>{{ item.price }}</span>
              <span class="origin-price">¥{{ item.origin_price }}</span>
              <span class="sales" v-if="showSales">
                销量:{{ item.total_sales }}
              </span>
            </section>
            <img
              src="~svg/cart.svg"
              @click.stop="onAddToCart(item.id)"
              alt="加入购物车"
            />
          </ListOther>
        </template>
      </ListItem>
    </ListTheme>
  </div>
</template>

<script>
import { ListTheme, ListItem, ListOther } from "components/List";
export default {
  name: "ProductsList",
  props: {
    showSales: {
      type: Boolean,
      default: false,
    },
    theme: { default: 1 },
    lists: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  methods: {
    // 进入详情
    onTabItemsInfo(id) {
      console.log(`info:${id}`);
    },
    // 加入购物车
    onAddToCart(id) {
      console.log(this.$utils.GetUser().uid);
      if (this.$utils.GetUser().uid) {
        this.$store.dispatch("cart/addProductToAll", id);
      } else {
        this.$Toast("请先登陆在添加商品");
      }
    },
    onLoadSuccessful(index) {
      if (this.lists.length - 1 == index) {
        this.$emit("onLoadSuccessful");
      }
    },
  },
  components: { ListTheme, ListItem, ListOther },
};
</script>

<style  scoped lang='less'>
.price {
  .new-price {
    font-size: 18px;
    color: rgb(242, 86, 98);
  }
  .origin-price {
    margin-left: 3px;
    font-size: 14px;
    color: #505050;
    text-decoration: line-through;
  }
  .sales {
    font-size: 14px;
    margin-left: 5px;
  }
}
</style>