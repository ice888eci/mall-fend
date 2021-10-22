<template>
  <div class="Map">
    <van-notice-bar left-icon="volume-o" text="Map页面功能未完善" />
    <div class="search">
      <div class="back">
        <van-icon
          name="arrow-left"
          size="1.5rem"
          @click="() => $router.back()"
        />
      </div>
      <van-search
        v-model="query"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch()"
        @input="onQueryInput()"
        @clear="onClearInput()"
      >
        <template #action>
          <van-button class="query" type="info" @click="onSearch()">
            搜索
          </van-button>
        </template>
      </van-search>
    </div>

    <div
      class="show-address-list"
      v-show="address.length"
      @click="isPopupShow = true"
    >
      <img src="~svg/show.svg" />
      <p>展开</p>
    </div>

    <div class="autoComplete" v-show="isTipsShow">
      <van-cell
        class="item"
        :title="item"
        v-for="(item, index) in tips"
        :key="index"
        @click="onReplaceQuery(item)"
      />
    </div>

    <van-popup class="popup" v-model="isPopupShow" position="top" closeable>
      <div class="totalPage">
        <div>共 {{ total == 0 ? "..." : total }} 条结果</div>
      </div>
      <div v-if="Object.keys(address).length">
        <van-cell
          :title="item.name"
          :label="item.address"
          v-for="item in address"
          :key="item.id"
          @click="onActive(item.id)"
        />
        <van-pagination
          v-show="total > 0"
          v-model="pageIndex"
          :total-items="total"
          :show-page-size="Math.ceil(total / pageSize)"
          class="pagination"
          @change="onPageChange"
        >
          <template #prev-text>
            <van-icon name="arrow-left" />
          </template>
          <template #next-text>
            <van-icon name="arrow" />
          </template>
          <template #page="{ text }">{{ text }}</template>
        </van-pagination>
      </div>

      <van-empty v-else image="search" description="搜索内容" />
    </van-popup>

    <Amap
      ref="amap"
      is-hotspot
      :zoom="13"
      :show-indoor-map="false"
      :center="[116.473778, 39.990661]"
      @hotspotclick="onHotspotClick"
      @click="() => clearTips"
    >
      <AmapMarker
        ref="markers"
        :z-index="120"
        :offset="[0, 0]"
        :position="active.lnglat || [0, 0]"
        :label="{ content: active.name || '', direction: 'bottom' }"
        :icon="hasActive ? icons.active : ''"
      />
    </Amap>
  </div>
</template>

<script>
import selected from "svg/selected.svg";
import { Amap, Marker as AmapMarker, loadPlugins } from "@amap/amap-vue";

export default {
  name: "Map",
  data() {
    return {
      icons: { active: selected },
      model: "search",
      query: "蚌埠市天湖国际",
      active: {},
      address: [],
      tips: [],
      total: 0,
      pageIndex: 1,
      pageSize: 20,
      isPopupShow: false,
      isTipsShow: false,
      collapseModel: [],
    };
  },
  computed: {
    hasActive() {
      return Object.keys(this.active).length ? true : false;
    },
    clearTips() {
      this.tips = [];
    },
  },
  async mounted() {
    await loadPlugins([
      "AMap.AutoComplete",
      "AMap.PlaceSearch",
      "AMap.Geocoder",
    ]);
    this.MAP = this.$refs.amap.$map;
    this.ps = new AMap.PlaceSearch({ pageSize: this.pageSize });
    this.ac = new AMap.AutoComplete();
    this.geocoder = new AMap.Geocoder();
  },
  methods: {
    // 自动缩放地图到合适的视野级别
    async fitView() {
      await requestAnimationFrame(() =>
        this.MAP.setFitView(null, false, [0, 0, 300, 0])
      );
    },

    // 选中默认地址存储到this.active
    async onActive(id) {
      let active = this.address.filter((v) => v.id == id);
      let { name, address, location } = active[0];
      this.active = { name, address, lnglat: [location.lng, location.lat] };
      await this.MAP.setCenter([this.active.lng, this.active.lat]);
      this.fitView();
      // 选中后关闭
      this.isPopupShow = false;
    },

    //输入时搜索提示内容
    autoComplete(keywords) {
      if (!keywords) {
        this.tips = [];
      } else {
        this.ac.search(keywords, (status, result) => {
          if (keywords !== this.query) return;
          if (status === "complete" && result.tips) {
            // 搜索的可能有重复的这里去重
            this.tips = Array.from(new Set(result.tips.map((tip) => tip.name)));
            this.isTipsShow = true;
          } else {
            this.tips = [];
          }
        });
      }
    },

    //坐标转地址
    getAddress(location = [0, 0]) {
      return new Promise((res) => {
        this.geocoder.getAddress(location, (status, result) => {
          if (status === "complete" && result.info === "OK")
            res(result.regeocode);
        });
      });
    },

    //地址转坐标
    getLocation(address = "") {
      return new Promise((res) => {
        this.geocoder.getLocation(address, (status, result) => {
          if (status === "complete" && result.info === "OK")
            res(result.regeocode);
        });
      });
    },

    //重置输入
    reset() {
      this.address = [];
      this.total = 0;
      this.pageIndex = 1;
      this.tips = [];
      this.ps.setPageIndex(1);
    },

    // 搜索地址内容
    onSearch() {
      this.isPopupShow = true;
      let { query } = this;
      this.ps.search(query, (status, result) => {
        // 防止篡改消息
        if (query !== this.query) return;
        // 搜索完毕status返回complete  | result.poiList Array<{}>返回搜索到的数据
        if (status === "complete" && result.poiList) {
          this.address = result.poiList.pois;
          this.total = result.poiList.count;
          this.fitView();
        } else {
          this.address = [];
          this.total = 0;
        }
      });
    },

    // 点击地图更改默认this.active
    onHotspotClick(e) {
      let { lng, lat } = e.lnglat;
      this.active = { ...this.active, ...{ lnglat: [lng, lat], name: e.name } };
    },

    //切换页面时触发
    onPageChange(val) {
      // 重定向页数 页数ps里面内置只需调用方法就行
      this.ps.setPageIndex(val);
      this.onSearch();
    },

    // 清除输入框触发
    onClearInput() {
      this.reset();
    },

    //输入输入框触发
    onQueryInput() {
      this.autoComplete(this.query);
    },

    //提示内容替换输入内容并重置之前搜索内容
    onReplaceQuery(kw) {
      this.query = kw;
      this.reset();
    },
  },
  components: { Amap, AmapMarker },
};
</script>
<style scoped lang="less">
.Map {
  width: 100%;
  height: 600px;
}
.search {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .van-search {
    flex: 1;
  }
  .query {
    background-color: green;
    padding: 0 15px;
    margin-left: -15px;
    height: 40px;
    border-radius: 0 20px 20px 0;
  }
  .back {
    width: 30px;
    height: 40px;
    .van-icon {
      padding-left: 8px;
      line-height: 40px;
    }
  }
}
.popup {
  width: 100%;
  z-index: 99;
  height: 50%;
  overflow-y: "scroll";
  padding: "0 12px 24px";
  padding: 15px 15px 0 15px;
  .totalPage {
    padding: 0 10px 10px 10px;
    font-size: 16px;
  }
}
.autoComplete {
  width: 80%;
  position: absolute;
  z-index: 99;
  left: 50%;
  transform: translateX(-53%);
  height: 150px;
  border-radius: 10px;
  overflow-y: scroll;
  padding: 0px 15px 0 15px;
  .item {
    width: 100%;
  }
}
.show-address-list {
  z-index: 99;
  position: fixed;
  right: 5%;
  bottom: 3%;
  text-align: center;
  animation: bounce 3000ms linear infinite;
  p {
    font-size: 12px;
  }
  img {
    width: 32px;
  }
}

@keyframes bounce {
  0%,
  100% {
    bottom: 5%;
  }
  25%,
  75% {
    bottom: 6%;
  }
  50% {
    bottom: 7%;
  }
}
</style>
