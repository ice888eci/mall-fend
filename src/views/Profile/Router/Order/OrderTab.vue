<template>
  <div class="order-tab">
    <van-empty description="暂无数据" v-if="!orders.length" />
    <Scroll ref="scroll" height="calc(100vh - 99px)" :click="true" v-else>
      <section class="order-area" v-for="(item, index) in orders" :key="index">
        <div class="area-header">
          <div class="order-number">
            <span>订单编号:</span>
            <span>{{ item.number }}</span>
          </div>

          <van-count-down
            v-show="item.status == 0"
            class="order-stauts"
            millisecond
            :time="time(item.time)"
            format="HH:mm:ss:SS"
          />
          <div class="order-stauts" v-if="item.status == 1" style="color: gray">
            发货中
          </div>
          <div class="order-stauts" v-if="item.status == 2" style="color: gray">
            订购完成
          </div>
          <div class="order-stauts" v-if="item.status == 3" style="color: gray">
            交易关闭
          </div>
        </div>
        <div class="area-main">
          <van-card
            :num="item.quantity"
            :price="item.price"
            :desc="item.spec"
            :title="item.name"
          >
            <template #thumb>
              <img :src="item.thumbnail" @load="onloadImg(index)" />
            </template>
          </van-card>
        </div>

        <div class="area-footer">
          <div class="goods-stauts">共<i>1</i>件商品,待付:￥418</div>

          <div
            class="goods-btn"
            v-show="item.status == 0"
            style="background-color: #ee0a24; color: #fff; border: none"
          >
            支付订单
          </div>
          <div
            class="goods-btn"
            v-show="item.status == 1"
            @click="onDevelop(item.oid)"
          >
            查看物流
          </div>
          <div
            class="goods-btn"
            v-show="item.status == 2"
            @click="onDevelop(item.oid)"
          >
            查看订单
          </div>
          <div
            class="goods-btn"
            v-show="item.status == 3"
            @click="onExecStatus(item.oid)"
          >
            删除订单
          </div>
        </div>
      </section>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/Scroll/Scroll";
export default {
  name: "orderTab",
  props: {
    type: [Number, String],
    default: 0,
  },
  data() {
    return {
      orders: [],
    };
  },
  async created() {
    this.orders = await this.$api.ReqOrderAll({
      uid: this.$utils.GetUser().uid,
      type: this.type,
    });
    console.log(this.orders);
  },
  computed: {
    scroll() {
      if (this.$refs.scroll) return this.$refs.scroll;
    },
    nowTime() {
      return new Date().getTime();
    },
  },

  methods: {
    onloadImg(index) {
      if (this.orders.length - 1 == index) this.scroll.refresh();
    },

    time(time) {
      // 倒计时三十分钟
      let endTime = time * 1 + 60 * 30 * 1000;
      if (this.nowTime > endTime) return 0;
      return Math.floor(endTime - this.nowTime);
    },
    async onExecStatus(oid) {
      const { status, msg } = await this.$api.ReqDelOrders({
        oid,
        uid: this.$utils.GetUser().uid,
      });
      if (status) this.$Toast.success(msg);
    },
    onDevelop() {
      this.$Toast("该功能没开放");
    },
  },
  components: { Scroll },
};
</script>

<style  scoped lang='less'>
.order-tab {
  padding: 10px;
  .order-area {
    width: 100%;
    background: #fff;
    padding: 10px 15px;
    margin: 10px 0;
    border-radius: 20px;
    .area-header {
      display: flex;
      align-items: center;
      padding: 10px 0;
      justify-content: space-between;

      font-size: 0.3rem;

      text-indent: 0.5rem;
    }
  }
  .order-stauts {
    color: #ee0a24;
  }
  .area-footer {
    font-size: 14px;
    padding: 10px 0;
    display: flex;
    flex-flow: column;
    align-items: flex-end;
    justify-content: center;
    .goods-stauts {
      padding: 5px;
    }
    .goods-btn {
      text-align: center;
      width: 30vw;
      display: flex;
      justify-content: center;
      padding: 5px;
      margin-top: 5px;
      border-radius: 20px;
      color: #000;
      border: 0.5px solid rgba(0, 0, 0, 0.4);
    }
  }
}

/deep/.van-card__thumb {
  img {
    width: 100%;
  }
}
</style>