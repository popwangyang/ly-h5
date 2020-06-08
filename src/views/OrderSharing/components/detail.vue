<template>
  <div class="searchPage">
    <cell-search
      :placeholder="placeholder"
      type="number"
      v-model="searchValue"
      @insearch="searchChange"
      @close="refesh"
    />
    <div class="content" v-if="pageStatues == 1">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        immediate-check
        @load="onLoad"
      >
        <ItemWidget
          :isKtv="userType==='ktv'"
          :isMana="userType==='employee'"
          :hasPay="hasPay"
          v-for="(item, index) in results"
          :key="index"
          :data="item"
        />
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
import cellSearch from "@/components/cellForm/cellSearch";
import { debounce } from "@/libs/util";
import Vue from "vue";
export default {
  components: {
    Loading,
    cellSearch
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
      finishedText: "",
      loading: false,
      finished: true
    };
  },
  computed: {
    params() {
      return this.$store.state.order.params;
    },
    // 用户类型
    userType() {
      return this.$store.state.user.usertype;
    }
  },
  methods: {
    refesh() {
      this.searchValue = "";
      this.finishedText = "";
      this.results = [];
      this.pIndex = 1;
    },
    onLoad() {
      this.results = [];
      let sendData = {
        platform_id: this.searchValue
      };
      this.getData(Object.assign(sendData, this.params)).then(res => {
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
        this.finishedText = "暂未查询到相关订单";
        return;
      }
      this.pageStatues = 0;
      debounce(this.searchEvent, 500)();
    },
    searchEvent() {
      this.results = [];
      this.pIndex = 1;
      let sendData = {
        platform_id: this.searchValue
      };
      this.getData(Object.assign(sendData, this.params)).then(res => {
        this.total = res.total;
        this.results = this.searchValue == "" ? [] : res.data;
        this.finishedText = this.results.length ? "" : "暂未查询到相关订单";
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
