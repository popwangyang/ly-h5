<template>
  <div class="searchPage">
    <van-search
      :placeholder="placeholder"
      v-model="searchValue"
      @input="searchChange"
      shape="round"
    />
    <div class="content" v-if="pageStatues == 1">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        immediate-check
        @load="onLoad"
      >
        <ItemWidget :hasPay="hasPay" v-for="(item, index) in results" :key="index" :data="item" />
      </van-list>
    </div>
    <div class="loading" v-if="pageStatues == 0">
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
import searchConfig from "@/config/searchConfig";
import Loading from "@/components/loading/loading";
import { debounce } from "@/libs/util";
import Vue from "vue";
export default {
  components: {
    Loading
  },
  data() {
    return {
      total: 0,
      pIndex: 1,
      pSize: 30,
      pageStatues: 1,
      placeholder: searchConfig[this.$route.query.type].placeholder,
      getData: searchConfig[this.$route.query.type].api,
      searchValue: "",
      results: [],
      loading: false,
      finished: true
    };
  },
  computed: {
    finishedText() {
      if (this.searchValue == "") {
        return "";
      } else {
        return "没有更多了";
      }
    }
  },
  methods: {
    onLoad() {
      this.results = [];
      let sendData = {
        platform_id: this.searchValue,
        page_index: this.pIndex,
        page_size: this.pSize
      };
      this.getData(sendData).then(res => {
        let arr = res.data;
        this.results.push(...arr);
        this.loading = false;
        if (this.results.length >= this.total) {
          this.finished = true;
        }
      });
    },
    searchChange() {
      if (this.searchValue == "") {
        this.results = [];
        this.pageStatues = 1;
        this.finished = false;
        this.loading = false;
        return;
      }
      this.pageStatues = 0;
      debounce(this.searchEvent, 500)();
    },
    searchEvent() {
      this.results = [];
      this.pIndex = 1;
      let sendData = {
        platform_id: this.searchValue,
        page_index: this.pIndex,
        page_size: this.pSize
      };
      this.getData(sendData).then(res => {
        this.total = res.total;
        this.results = this.searchValue == "" ? [] : res.data;
        this.pageStatues = 1;
        this.finished = false;
        this.loading = false;
      });
    }
  },
  created() {
    if (typeof this.$route.query.hasPay === "boolean") {
      this.hasPay = this.$route.query.hasPay;
    } else {
      this.$route.query.hasPay === "true"
        ? (this.hasPay = true)
        : (this.hasPay = false);
    }
    Vue.component("ItemWidget", searchConfig[this.$route.query.type].template);
  },
  mounted() {}
};
</script>

<style scoped="scoped" lang="less">
.searchPage {
  height: 100%;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow: auto;
  }
  .loading {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
