<template>
  <div class="products-list">
    <van-list
      class="lists"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="pullingDataLoading()"
    >
      <ProductsInfo
        :theme="1"
        :lists="response.list"
        @onLoadSuccessful="onLoadSuccessful"
      />
    </van-list>
  </div>
</template>

<script>
import ProductsInfo from "components/Products/ProductsInfo";

export default {
  name: "ProductsList",
  props: {
    reqName: { type: String, require: true },
  },
  data() {
    return {
      loading: false,
      finished: false,
      response: { page: -1, list: [] },
    };
  },

  methods: {
    /**
     * 请求无参数产品列表数据
     * @page 从0开始
     * @van-list 加载数据时机的钩子
     * 注意:create创建后就会执行一次,所以可以省略create创建
     */
    async pullingDataLoading() {
      this.loading = true;
      let page = (this.response.page += 1);
      const response = await this.$api[this.reqName]({ page });
      if (!response.length) {
        this.finished = true;
        return;
      }
      this.response.list.push(...response);
    },

    onLoadSuccessful() {
      setTimeout(() => (this.loading = false), 500);
    },
  },
  components: { ProductsInfo },
};
</script>

<style  scoped lang='less'>
.lists {
  border-radius: 10px;
  // display: flex;
  // justify-content: space-evenly;
  //   flex-flow: wrap;
  background-color: #f5f5f5;
  height: auto;
  padding: 10px;
}

/deep/.van-list__finished-text {
  margin: 0 auto;
}

.vue-waterfall {
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 2rem;
}
</style>