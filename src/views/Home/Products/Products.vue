<template>
  <div class="products">
    <van-tabs class="tabs" color="#28BE57" v-model="active" animated swipeable>
      <van-tab v-for="item in tabs" :title="item.title" :key="item.id">
        <ProductsList :reqName="item.reqName" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ProductsList from "./ProductsList.vue";
export default {
  name: "Products",
  data() {
    return { active: 0 };
  },
  props: {
    tabs: { type: Array, require: true },
  },
  components: { ProductsList },
};
</script>

<style  scoped lang='less'>
/deep/.van-tabs__wrap {
  position: sticky;
  top: 45px;
  left: 0;
  z-index: 99;
}
</style>