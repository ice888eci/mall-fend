<template>
  <div class="fiexd">
    <Navbar />
    <section class="category">
      <div class="sidebar">
        <van-sidebar v-model="activeKey">
          <Scroll
            :bounce="false"
            :probeType="0"
            ref="sidebarScroll"
            height="calc(100vh - 54px - 50px)"
          >
            <van-sidebar-item
              v-for="(item, key) in sidebar"
              :title="item.title"
              :key="key"
              @click="onSidebar(item.zone)"
            />
          </Scroll>
        </van-sidebar>
      </div>

      <div class="category-info">
        <Scroll
          :probeType="2"
          ref="scroll"
          height="calc(100vh - 55px - 50px)"
          @loadListenScrollHook="loadListenScrollHook"
        >
          <div class="views" v-if="isShowSpecial">
            <section
              class="grid-view"
              v-for="(list, index) in sidebarList"
              :key="index"
            >
              <div class="subtitle" :ref="index">
                <span>{{ list.name }}</span>
              </div>
              <div class="content">
                <van-grid :column-num="3" :border="false">
                  <van-grid-item
                    v-for="(item, key) in list.list"
                    :key="key"
                    :text="item.type_tag"
                    @click="onViewsDetails(item.type_tag)"
                  >
                    <template #icon>
                      <img
                        :src="item.thumbnail"
                        class="item-thumbnail"
                        @load="loadSidebarDetailHook()"
                      />
                    </template>
                  </van-grid-item>
                </van-grid>
              </div>
            </section>
          </div>
        </Scroll>
      </div>
    </section>

    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Scroll from "components/Scroll/Scroll";
import Navbar from "./Navbar/Navbar";
export default {
  name: "Category",
  components: { Scroll, Navbar },
  data() {
    return {
      searchProduct: "",
      activeKey: "",
      sidebar: [],
      sidebarList: [],
      isShowSpecial: true,
      refreshDebounce: null,
      scrollDebounce: null,
      cacheSidebarDetailDistance: new Map(),
    };
  },

  computed: {
    // 分类导航BS
    sidebarScroll() {
      return this.$refs.sidebarScroll;
    },
    // 分类导航元素高度
    sidebarWrapperHeight() {
      return this.sidebarScroll.$el.offsetHeight;
    },
    // 分类导航元素下内容元素
    sidebarContent() {
      return this.sidebarScroll.$refs.content;
    },
    // 分类详细BS
    detailsScroll() {
      return this.$refs.scroll;
    },
  },

  created() {
    this.requestInit();
  },

  async mounted() {
    await this.$nextTick();
    this.debounceBind();
  },
  methods: {
    // 请求数据
    async requestInit() {
      this.sidebar = await this.$api.ReqPublicNav();
      this.sidebarList = await this.$api.ReqCategoryList();
      // 将对应`sidebar`的zone缓存成$key用来为触发监听滑动做准备
      await this.$nextTick();
      this.sidebar.forEach((el) => this.cacheDetailOffset(el.zone));
    },

    // 绑定Debounce
    async debounceBind() {
      // 刷新页面高度防抖
      this.refreshDebounce = this.$utils.Debounce(() => {
        this.sidebarScroll && this.sidebarScroll.refresh();
        this.sidebarScroll && this.detailsScroll.refresh();
      });
      // 滚动详细内容时绑定防抖
      this.scrollDebounce = this.$utils.Debounce((y) => {
        for (const [key, val] of this.cacheSidebarDetailDistance) {
          // 大于某个详细header时更新
          if (Math.abs(y) >= val) {
            this.activeKey = key;
            this.adjustSidebarOffset();
          }
        }
      }, 15);
    },

    //点击后需要调整Sideba的视口位置
    async adjustSidebarOffset() {
      // 所以操作都在异步加载后操作
      await this.$nextTick();
      // sideba活跃索大于后3位的时不需要调整
      if (this.activeKey >= this.sidebar.length - 4) return;
      // 获取sideba容器的高度
      const wrapperHeight = this.sidebarWrapperHeight;
      // 获取选中元素高度
      const el = this.sidebarContent.querySelector(`.van-sidebar-item--select`);
      const selectHeight = el.offsetHeight;
      const selectTop = el.offsetTop;
      // 计算出偏移距离
      let selectDistance = selectTop - (wrapperHeight - selectHeight) / 2;
      // sideba活跃索引小于视口索引一半是初始化为0,不需要动
      if (selectDistance < 0) selectDistance = 0;
      this.sidebarScroll.scrollTo(-selectDistance);
    },

    // 返回对应`zone:[0-10]`的offsetTop值 如果没有缓存则缓存它
    cacheDetailOffset(zone) {
      if (!this.cacheSidebarDetailDistance.get(zone)) {
        const offsetTop = this.$refs[zone][0].offsetTop;
        this.cacheSidebarDetailDistance.set(zone, offsetTop);
      }
      return this.cacheSidebarDetailDistance.get(zone);
    },

    // 点击Sidebar触发
    onSidebar(zone) {
      const activeOffsetTop = this.cacheDetailOffset(zone);
      this.detailsScroll.scrollTo(-activeOffsetTop);
      this.adjustSidebarOffset();
    },

    //
    onloadImg() {
      this.detailsScroll.refresh();
    },
    // 跳转到详情列表页面
    onViewsDetails(tag) {
      this.$router.push({
        name: "CategoryInfo",
        params: { tag: this.$utils.Coding(tag) },
      });
    },

    // SidebarDetail-img 更新时触发
    loadSidebarDetailHook() {
      this.refreshDebounce();
    },

    // 滚动时监听`SidebarDetail`滚动位置 调整Sidebar
    loadListenScrollHook(y) {
      this.scrollDebounce(y);
    },
  },
};
</script>

<style  scoped lang='less'>
.category {
  border-top: 1px solid rgb(211, 210, 210);
  display: flex;
  .sidebar {
    min-width: 80px;
  }
  .category-info {
    width: 100%;
    display: flex;
    flex-flow: column;
    .tabs {
      flex: 1 1 100%;
      display: flex;
      height: 60px;
      line-height: 60px;
      max-height: 60px;
      text-align: center;
      span {
        flex: 0 1 30%;
        font-size: 14px;
      }
      span:last-of-type {
        margin-right: auto;
      }
    }

    .subtitle {
      display: flex;
      justify-content: space-evenly;
      height: 60px;
      line-height: 60px;
      max-height: 60px;
      // background-color: #f7f8fa;
      text-align: center;
      color: #fff;
      background: #efefbb; /* fallback for old browsers */
      background: linear-gradient(to left, #d4d3dd, #efefbb);

      span {
        flex: 1;
        margin-left: 20px;
        font-size: 14px;
      }
    }
    .item-thumbnail {
      width: 32px;
      height: 32px;
    }
  }
}
.grid-view:last-of-type {
  height: 600px;
}

/deep/.van-sidebar-item--select::before {
  background-color: green;
}

.price {
  .new-price {
    font-size: 18px;
    color: rgb(242, 86, 98);
  }
  .origin-price {
    margin-left: 3px;
    font-size: 14px;
    color: #505050;
    text-decoration: line-through;
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