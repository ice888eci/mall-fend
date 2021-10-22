<template>
  <div class="special">
    <section class="special-title">
      <h3 class="special-title-left">特色专区</h3>
    </section>
    <section class="special-zones">
      <section
        class="special-zones-zone"
        v-for="item in specialArea"
        :key="item.id"
      >
        <span
          class="special-zones-zone-title"
          :style="{
            color: colors[Math.floor(Math.random() * specialArea.length)],
          }"
          >{{ item.title }}
        </span>
        <span class="special-zones-zone-subtitle">{{ item.subtitle }}</span>
        <div class="special-zones-zone-img">
          <div v-for="(image, index) in item.images" :key="index">
            <img :src="image" />
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: "specialArea",
  props: {
    specialArea: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      colors: ["#d20962", "#f47721", "#7ac143", "#00a78e", "#00bce4"],
    };
  },
};
</script>

<style  scoped lang='less'>
.special {
  padding: 0 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  &-title {
    display: flex;
    align-items: center;
    &-left {
      flex: 1;
      border-left: 4.5px solid rgb(67, 184, 96);
      text-indent: 1rem;
      font-weight: 400;

      font-size: 16px;
      margin: 10px 0 5px;
    }
    &-center {
      flex: 1 2 100px;
    }
    &-right {
      color: rgb(67, 184, 96);
      font-size: 15px;
      font-weight: bold;
      margin-left: auto;
      margin-right: auto;
    }
  }
  &-zones {
    box-sizing: border-box;
    border: 1px solid rgb(226, 226, 226);
    min-height: 250px;
    display: flex;
    flex-flow: wrap;
    &-zone {
      padding: 10px 10px 5px;
      flex: 1 1 50%;
      display: flex;
      flex-flow: column nowrap;
      max-height: 125px;
      box-sizing: border-box;
      border: 0.5px solid rgb(226, 226, 226);

      &:nth-last-of-type(-n + 2) {
        flex: 1 1 25%;
      }

      &-title {
        margin-bottom: 3px;
        font-size: 15px;
      }
      &-subtitle {
        margin-bottom: 3px;
        font-size: 14px;
        width: 100%;
        overflow: hidden;
      }
      &-img {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        img {
          max-width: 60px;
          max-height: 60px;
        }
      }
    }
  }
}
</style>