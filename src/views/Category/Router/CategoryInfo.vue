<template>
  <div class="category-info fiexd">
    <Navbar />
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="productActive"
        :options="dropdownProducts"
        @change="onChange"
      />
      <van-dropdown-item
        v-model="sortActive"
        :options="dropdownSort"
        @change="onChange"
      />
    </van-dropdown-menu>

    <van-empty
      v-if="!isEmpty"
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无商品"
    />
    <Scroll
      v-else
      :probeType="1"
      ref="scroll"
      height="calc(100vh - 54px - 48px )"
    >
      <ProductsInfo
        :showSales="true"
        :theme="4"
        :lists="activeList"
        @onLoadSuccessful="() => scroll.refresh()"
      />
      <van-divider :style="{ color: '#adadad' }"> 已经到底啦 </van-divider>
    </Scroll>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import ProductsInfo from "components/Products/ProductsInfo";
import Scroll from "components/Scroll/Scroll";
export default {
  name: "CategoryInfo",
  data() {
    return {
      searchValue: "",
      productActive: "allProducts",
      sortActive: "normalSort",
      dropdownProducts: [
        { text: "全部商品", value: "allProducts" },
        { text: "会员商品", value: "vipProducts" },
      ],
      dropdownSort: [
        { text: "综合排序", value: "normalSort" },
        { text: "销量排序", value: "hotSalesSort" },
        { text: "价钱排序", value: "priceSort" },
      ],
      categoryListItem: [],
      activeList: [],
    };
  },

  created() {
    this.reqInit();
  },
  computed: {
    scroll() {
      return this.$refs.scroll;
    },
    isEmpty() {
      return this.activeList.length ? true : false;
    },

    //产品分类
    allProducts() {
      return this.categoryListItem;
    },
    vipProducts() {
      return this.categoryListItem.filter((v) => v.vip_price != null);
    },

    //产品排序
    normalSort() {
      return this[this.productActive].sort((a, b) => a.id - b.id);
    },
    hotSalesSort() {
      return this[this.productActive].sort(
        (a, b) => b.total_sales - a.total_sales
      );
    },
    priceSort() {
      return this[this.productActive].sort((a, b) => a.price - b.price);
    },
  },
  methods: {
    async reqInit() {
      let tag = this.$utils.Decoding(this.$route.params.tag);
      if (!tag) return false;
      this.categoryListItem = await this.$api.ReqCategoryListItem({ tag });
      // 根据当前使用的商品类型再进行排序
      this.activeList = this.normalSort;
    },
    onChange(valueMethods) {
      this.activeList = this[valueMethods];
    },
  },

  components: { ProductsInfo, Scroll, Navbar },
};
</script>

<style  scoped lang='less'>
@import "~styles/common/mixins.less";
.fiexd {
  .allMask();
}
.category-info {
  &-lowest {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
}
</style>