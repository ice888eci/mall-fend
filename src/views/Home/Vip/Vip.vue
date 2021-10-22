<template>
  <div class="vip">
    <section @click="onVipZone">
      <img src="~svg/vip.svg" />
      <span>加入会员每年节省806元</span>
      <span>5折开卡 ></span>
    </section>
  </div>
</template>

<script>
export default {
  name: "vip",
  methods: {
    onVipZone() {},
  },
};
</script>

<style  scoped lang='less'>
.vip {
  padding: 0 15px;
  margin: 15px 0 5px;
  section {
    color: white;
    border-radius: 5px;
    width: 100%;
    height: 40px;
    background-color: rgb(67, 184, 96);
    display: flex;
    justify-content: space-around;
    align-items: center;
    span:first-of-type {
      text-indent: -2.5em;
    }
  }
}
</style>