<template>
  <div class="Header">
    <div :class="[{ unfold: isUnfold }, 'locationWrapper']">
      <img src="~svg/address.svg" class="iconLocation" />
      <span class="address">{{ address }}</span>
      <img src="~svg/down.svg" class="iconDown" @click="onToggleUnfold" />
    </div>

    <div class="searchWrapper">
      <van-search v-model="query" placeholder="请输入商品名称" shape="round" />
    </div>
    <van-icon
      class="userWrapper"
      name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      address: "安徽省蚌埠市天湖国际",
      isUnfold: false,
    };
  },
  methods: {
    onSearch() {},
    onToggleUnfold() {
      this.isUnfold = !this.isUnfold;
    },
  },
};
</script>
<style  scoped lang='less'>
.Header {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  height: 3.125rem;
  line-height: 3.125rem;
  width: 100%;
  box-sizing: border-box;
  border-top: solid 1px #eeeeee;
  color: white;
}
// 地址框
.unfold {
  max-width: 35%;
  .address {
    overflow: hidden;
    width: inherit;
    text-overflow: ellipsis;
  }
}

.locationWrapper {
  position: relative;
  margin-top: 0.6rem;
  margin-left: 0.6rem;
  height: 1.875rem;
  line-height: 25px;
  // max-width: 35%;
  width: 100%;
  min-width: 20%;
  white-space: nowrap;
  opacity: 0.5;
  background-color: black;
  border-radius: 3.125rem;
  // flex: 0, 0, 10rem;

  .iconLocation {
    position: absolute;
    padding: 0 3px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1.2rem;
    height: 1.2rem;
  }
  .iconDown {
    position: absolute;
    right: 3px;
    top: 50%;
    width: 2em;
    height: 2rem;
    transform: translateY(-50%);
  }
  .address {
    padding-left: 2rem;
    display: inline-block;
    font-size: 12px;
    color: #f17c2e;
    // overflow: hidden;
    white-space: nowrap;
    line-height: 1.875rem;
    // text-overflow: ellipsis;
    max-width: 50%;
    min-width: 20%;
  }
}

.searchWrapper {
  margin-top: 0.6rem;
  .van-search {
    background-color: transparent;
  }
  .van-search__content {
    height: 30px;
  }
}
.van-icon__image {
  margin-top: 8px;
  margin-right: 8px;
  width: 1.6em;
  height: 1.6em;
}
</style>