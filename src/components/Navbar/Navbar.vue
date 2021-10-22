<template>
  <div :class="[fixed ? 'fixed' : '', 'nav']" :style="{ backgroundColor: bg }">
    <div class="nav-left nav-item">
      <slot name="left"> </slot>
    </div>
    <div class="nav-center nav-item">
      <slot name="center">
        <div class="input" @click="() => $router.push({ name: `Search` })">
          <div class="input-icon">
            <img src="~svg/search.svg" />
          </div>
          <input type="search" placeholder="请输入关键字" />
        </div>
      </slot>
    </div>
    <div class="nav-right nav-item">
      <slot name="right"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  props: {
    fixed: {
      default: true,
    },
    bg: {
      default: "transparent",
    },
  },
};
</script>

<style  scoped lang='less'>
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
.nav {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 55px;
  &-item {
    display: flex;
    justify-content: center;
  }
  &-center {
    flex: 1;
  }
  &-left,
  &-right {
    min-width: 10px;
    & > img {
      width: 29px;
      margin: 0 5px;
      color: red;
    }
  }
}

.input {
  display: flex;
  width: 100%;
  align-items: center;
  background-color: rgb(247, 248, 250);
  border-radius: 20px;
  height: 30px;
  &-icon {
    min-width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & > input {
    border-radius: 20px;
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    font-size: inherit;
    padding: 8px 0;
    background-color: rgb(247, 248, 250);
    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }
    &::placeholder {
      font-size: 14px;
    }
  }
}
</style>