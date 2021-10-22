<template>
  <div id="Advertise">
    <section class="Advertise-list">
      <div v-for="(item, key) in advertiseList" :key="key">
        <img :src="item.url" />
        <div class="name">{{ item.name }}</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Advertise",
  props: {
    advertiseList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style  scoped lang='less'>
.Advertise-list {
  display: flex;
  padding: 8px 0;
  justify-content: center;
  div {
    margin-right: 0.1rem;
    display: flex;
    align-items: center;
    text-align: center;
    .name {
      font-size: 9px;
      color: rgb(62, 187, 81);
      font-size: bold;
      margin-left: 3px;
    }
    img {
      width: 1rem;
      min-width: 1rem;
      min-height: 1rem;
    }
  }
}
</style>