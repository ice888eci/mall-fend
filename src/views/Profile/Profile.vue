<template>
  <div class="profile">
    <header class="profile-header">
      <Navbar />
      <section
        class="profile-header-user"
        v-if="!isLogin"
        @click="() => $router.push({ name: 'Login' })"
      >
        <div class="user-icon"><img src="~img/profile/ic_avatar.png" /></div>
        <div class="user-info"><span>登陆/注册</span></div>
      </section>

      <section class="profile-header-user" v-else>
        <div class="user-icon">
          <img src="~img/login/normal.jpg" />
        </div>
        <div class="user-info">
          <span>{{ isLogin && userInfo.info.nicname }} 你好!</span>
        </div>
      </section>
    </header>

    <div class="profile-body">
      <section class="body-order">
        <div class="body-order-header">
          <span class="body-order-header-title">全部订单</span>
          <div class="body-order-header-cat">
            <span @click="onToOrder(0)"
              >查看订单 <van-icon name="arrow" />
            </span>
          </div>
        </div>
        <div class="body-order-body">
          <van-grid :border="false">
            <van-grid-item
              @click="onTo(index)"
              :icon="item.icon"
              :text="item.text"
              v-for="(item, index) in gridList"
              :key="index"
            />
          </van-grid>
        </div>
      </section>

      <van-cell
        is-link
        :icon="item.icon"
        style="margin-top: 5px"
        v-for="(item, index) in cellList"
        :key="index"
        @click="onToChildRouter(item.name)"
      >
        <template #title>
          <span class="custom-title">{{ item.text }}</span>
        </template>
      </van-cell>
    </div>

    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Navbar from "./Navbar/Navbar";
export default {
  name: "Profile",
  data() {
    return {
      gridList: [
        { icon: "paid", text: "待支付", to: "order" },
        { icon: "logistics", text: "待收货", to: "order" },
        { icon: "edit", text: "待评价", to: "evaluation" },
        { icon: "smile-comment-o", text: "退后/售后", to: "afterSales" },
      ],
      cellList: [
        { icon: "coupon-o", text: "优惠券", name: "" },
        { icon: "todo-list-o", text: "收货地址", name: "PofileAddress" },
      ],
    };
  },

  computed: {
    userInfo() {
      if (Object.keys(this.$utils.GetUser()).length)
        return this.$utils.GetUser();
      return {};
    },
    isLogin() {
      return Object.keys(this.$utils.GetUser()).length ? true : false;
    },
  },
  methods: {
    onToOrder(active) {
      this.$router.push({ name: "PofileOrder", params: { active } });
    },

    onToChildRouter(name) {
      this.$router.push({ name });
    },
  },
  components: { Navbar },
};
</script>

<style  scoped lang='less'>
.profile {
  height: 100vh;
  background-color: rgb(241, 243, 245);
  &-header {
    position: relative;
    display: flex;
    flex-direction: column;
    background: url("~img/profile/head_bg.png");
    min-height: 150px;
    background-clip: content-box;
    border-radius: 0 0 20px 20px;

    &-user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-height: 48px;
      width: 90%;
      margin: 0 auto;
      .user {
        &-icon {
          flex: 0 0 65px;
          img {
            display: flex;
            justify-content: flex-start;
            width: 90%;
            border-radius: 50%;
          }
        }
        &-info {
          flex: 1;
          margin-left: auto;
          color: white;
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  }
  &-body {
    display: flex;
    max-width: 100%;
    margin: 10px 20px 15px;
    flex-flow: column;
    .body-order {
      display: flex;
      flex-flow: column;
      background-color: #fff;
      border-radius: 20px;
      min-height: 128px;
      margin-bottom: 5px 0;
      &-header {
        padding: 15px;
        display: flex;
        justify-content: space-between;
        &-title {
          font-size: 16px;
        }
        &-cat {
          display: flex;
          font-size: 14px;
          align-items: center;
          color: #000;
        }
      }
      // &-body {
      // }
    }
  }
}
/*转场动画*/
.router-slider-enter-active,
.router-slider-leave-active {
  transition: all 0.3s;
}

.router-slider-enter,
.router-slider-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>