<template>
  <article class="list" :class="classes">
    <slot></slot>
  </article>
</template>

<script>
export default {
  name: "list",
  props: {
    theme: {
      validator(value) {
        return [1, 2, 3, 4, 5].indexOf(value * 1) > -1;
      },
      default: 1,
    },
  },

  computed: {
    classes() {
      return "list-theme" + this.theme;
    },
  },
};
</script>

<style lang='less'>
@import "~styles/components/list.less";
</style>