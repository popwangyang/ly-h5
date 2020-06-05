<template>
  <div class="pageListBox">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-show="pageStatues == 1">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="total>30?'没有更多了':''"
        @load="onLoadMore"
      >
        <slot v-bind:dataList="dataList"></slot>
      </van-list>
    </van-pull-refresh>
    <div class="pageLoading" v-show="pageStatues == 0">
      <Loading />
    </div>
    <div class="pageLoading" v-show="pageStatues == 2">
      <Empty :text="noListText" />
    </div>
    <div class="pageLoading" v-show="pageStatues == 3">
      <Error text="加载失败" @eventBtn="onReload" />
    </div>
  </div>
</template>

<script>
import Empty from "@/components/EmptyComponent";
import Error from "@/components/ErrorComponent";
import Loading from "@/components/loading/loading";
export default {
  components: {
    Loading,
    Empty,
    Error
  },
  props: {
    noListText: {
      type: String,
      default: "暂无信息"
    },
    getData: {
      type: Function,
      required: true
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    params: {
      handler(newValue) {
        this.otherParams = newValue;
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      otherParams: {},
      dataList: [],
      isLoading: false,
      pageStatues: 0,
      loading: false,
      finished: false,
      pIndex: 1,
      pSize: 30,
      total: 0
    };
  },
  methods: {
    deletedItem(key, value) {
      let index = this.dataList.findIndex(item => {
        console.log(item[key], value);
        if (item[key] == value) {
          return true;
        }
      });
      this.dataList.splice(index, 1);
      this.total--;
      if (this.total <= 0) {
        this.pageStatues = 2;
      }
    },
    onReload() {
      this.pageStatues = 0;
      this.pIndex = 1;
      this.finished = false;
      this.handlerData();
    },
    onRefresh() {
      this.pIndex = 1;
      this.finished = true;
      this.handlerData();
    },
    onLoadMore() {
      this.pIndex++;
      let sendData = {
        p_index: this.pIndex,
        p_size: this.pSize
      };
      Object.assign(sendData, this.otherParams);
      this.getData(sendData).then(res => {
        var arr = res.data;
        this.dataList.push(...arr);
        this.loading = false;
        if (this.dataList.length >= this.total) {
          this.finished = true;
        }
      });
    },
    handlerData() {
      let sendData = {
        p_index: this.pIndex,
        p_size: this.pSize
      };
      if (this.otherParams) {
        Object.assign(sendData, this.otherParams);
      }
      this.getData(sendData)
        .then(res => {
          this.total = res.total;
          this.dataList = res.data;
          this.pageStatues = 1;
          this.isLoading = false;
          if (this.total == 0) {
            this.pageStatues = 2;
          } else {
            this.pageStatues = 1;
          }
          if (this.dataList.length >= this.total) {
            this.finished = true;
          } else {
            this.finished = false;
          }
        })
        .catch(err => {
          this.pageStatues = 3;
        });
    }
  },
  mounted() {
    this.pageStatues = 0;
    this.handlerData();
  }
};
</script>

<style scoped="scoped" lang="less">
.pageListBox {
  flex: 1;
  height: 100%;
  .pageLoading {
    height: 100%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
