<template>
  <div class="Tabbar">
    <van-tabbar v-model="tabbarActive" fixed @change="onChange">
      <van-tabbar-item v-for="(item, index) in tabbarItems" :key="index">
        <span>{{ item.name }}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  props: {
    tabbarItems: {
      default() {
        return [];
      },
      require: true,
    },
  },
  data() {
    return {
      tabbarActive: 0,
    };
  },

  methods: {
    onChange() {
      this.$router.push({ name: this.tabbarItems[this.tabbarActive].from });
    },
  },
  watch: {
    $route: {
      handler(val) {
        for (const [k, v] of this.tabbarItems.entries()) {
          if (val.path == `/${v.from}`) {
            console.log(k);
            this.tabbarActive = k;
            return;
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style  scoped lang='less'>
</style>