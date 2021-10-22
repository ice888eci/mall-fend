<template>
  <div>
    <header class="navbar">
      <div class="navbar-left">
        <div class="navbar-left-box" @click="() => $router.go(-1)">
          <van-icon name="arrow-left" size="16px" />
        </div>
      </div>
      <div class="navbar-right">
        <van-search
          v-model="searchValue"
          shape="round"
          placeholder="请输入搜索关键词"
          @input="input"
        />
      </div>
    </header>

    <section class="search">
      <!-- 搜索历史 -->
      <div class="search-history" v-show="historySearchTags.length">
        <div class="search-history-title">
          <h4>搜索历史</h4>
          <img src="~svg/clear.svg" class="clear" @click="onClearHistory()" />
        </div>
        <div class="search-history-content">
          <span
            class="search-history-tag"
            v-for="(item, index) in historySearchTags"
            :key="index"
          >
            <a href="javascript:;" @click="onAddHistorySearchTag(item)">
              {{ item.name }}
            </a>
          </span>
        </div>
      </div>

      <!-- 搜索发现 -->
      <div class="search-hot">
        <h4 class="search-hot-title">搜索发现</h4>
        <div class="search-hot-content">
          <div
            class="search-hot-tag"
            v-for="(item, index) in searchRecommend"
            :key="index"
            @click="onAddHistorySearchTag(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </section>

    <!-- 搜索弹出层 -->
    <div class="search-popup" v-show="checkSearchValue">
      <div
        class="search-popup-cell"
        v-for="(item, index) in searchList"
        :key="item.id"
        @click="onAddHistorySearchTag(item)"
      >
        <p @>{{ item.name }}</p>
        <p @click.stop="onPreview(index)">图片预览</p>
      </div>

      <van-image-preview
        v-model="previewShow"
        :images="images"
        :startPosition="previewIndex"
      >
        <template #index>图{{ previewIndex + 1 }}</template>
      </van-image-preview>
    </div>
  </div>
</template>

<script>
import { ImagePreview, Dialog } from "vant";

import { mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchValue: "",
      popupIsShow: false,
      searchList: [],
      searchRecommend: [],
      searchDebounce: null,
      previewShow: false,
      previewIndex: 1,
    };
  },
  created() {
    this.reqInit();
    console.log(this.historySearchTags);
  },

  activated() {
    console.log("Search-activated");
  },
  deactivated() {
    console.log("Search-deactivated");
  },

  computed: {
    // 检测查找的内容是否为汉字或为空
    checkSearchValue() {
      return (
        this.searchValue.trim() && /\p{sc=Han}+|\d/gu.test(this.searchValue)
      );
    },
    // 预览图列表
    images() {
      return this.searchList.map((v) => v.thumbnail);
    },

    ...mapState({
      historySearchTags: (state) => state.search.historySearchTags,
    }),
  },

  methods: {
    async reqInit() {
      // 热门搜索list
      this.searchRecommend = await this.$api.ReqPublicSearchRecommend();
      // 搜索时防抖
      this.searchDebounce = this.$utils.Debounce(async (name) => {
        this.searchList = await this.$api.ReqPublicSearchList({ name });
      });
    },
    // 搜索时触发
    input(v) {
      if (this.checkSearchValue) this.searchDebounce(v);
    },

    onAddHistorySearchTag(item) {
      this.$store.dispatch("search/addHistorySearchTag", item);
      this.$router.push({ name: `Info`, params: { id: item.id } });
    },
    // 搜索到的列表点击项
    onPreview(index) {
      this.previewShow = true;
      // 预览图起始索引
      this.previewIndex = index;
    },
    async onClearHistory() {
      try {
        await Dialog.confirm({ message: "是否删除全部搜索历史" });
        this.$store.commit("search/clearToHistorySearchTag");
      } catch (error) {}
    },
  },
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
    [Dialog.Component.name]: Dialog.Component,
  },
};
</script>

<style  scoped lang='less'>
.navbar {
  display: flex;
  position: relative;
  z-index: 999;
  height: 50px;
  display: flex;
  background-color: #fff;
  &-left {
    flex: 0 0 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    &-box {
      display: flex;
      span {
        font-size: 12px;
        display: flex;
        align-items: center;
      }
    }
  }
  &-right {
    flex: 1;
  }
}

.search {
  width: 100%;
  margin: 0 auto;
  &-history {
    width: 90%;
    margin: 15px auto;
    display: flex;
    flex-flow: column;
    &-title {
      font-size: 15px;
      display: flex;
      align-items: center;
      h4 {
        width: 90%;
      }
      .clear {
        width: 18px;
      }
    }
    &-content {
      width: 100%;
      span {
        font-size: 12px;
        text-align: center;
        min-width: 50px;
        padding: 5px;
        display: inline-block;
        background: rgba(0, 0, 0, 0.04);
        border-radius: 15px;
        margin-right: 5px;
        margin-bottom: 8px;
        a {
          color: black;
        }
      }
    }
  }
  &-hot {
    width: 90%;
    margin: 15px auto;
    display: flex;
    flex-flow: column;
    &-title {
      font-size: 15px;
    }
    &-content {
      display: flex;
      flex-flow: row wrap;
      font-size: 14px;
      div {
        justify-content: space-between;
        box-sizing: border-box;
        min-width: 50%;
        padding: 5px;
      }
    }
  }
  &-popup {
    width: 100%;
    height: 70%;
    overflow: scroll;
    position: absolute;
    left: 0;
    top: 50px;
    background-color: #fff;
    &-cell {
      display: flex;
      height: 50px;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      &:last-of-type {
        border-bottom: none;
      }
      p:first-of-type {
        width: 70%;
        font-size: 14px;
      }
      p:last-of-type {
        font-size: 10px;
        color: cornflowerblue;
      }
    }
  }
}
</style>