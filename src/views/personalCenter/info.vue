<template>
  <div class="personInfo" ref="scroll">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-show="pageStatues == 1">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="personInfo-wrapper" :key="'date'+indexs" v-for="(items, indexs) in list">
          <span class="infodate">{{items.create_date_2str_date}}</span>
          <div class="info-wrapper" :key="'info'+index" v-for="(item, index) in items.info">
            <p class="item-date">{{item.create_date}}</p>
            <p class="text">{{item.msg_info}}</p>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <div class="pageLoading" v-show="pageStatues == 0">
      <Loading />
    </div>
    <div class="pageLoading" v-show="pageStatues == 2">
      <Empty text="暂无消息" />
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
import { infoList, toRead } from "@/api/information";
import { cacheMixins } from "@/libs/mixins";

export default {
  name: "personalInfo",
  mounted() {
    this.getToRead();
  },
  mixins: [cacheMixins],
  components: {
    Loading,
    Empty,
    Error
  },
  data() {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      count: 0, // 总计
      total: 0, // 总数
      currentSize: 1, //当前页面
      pageSize: 15, //每页几条
      list: [], // 消息列表
      pageStatues: 1
    };
  },
  methods: {
    onReload() {
      this.pageStatues = 0;
      this.currentSize = 1;
      this.finished = false;
      this.getInfoList();
    },
    onLoad() {
      this.finished = false;
      this.getInfoList();
    },

    onRefresh() {
      this.list = [];
      this.count = 0;
      this.total = 0;
      this.currentSize = 1;
      this.finished = true;
      this.getInfoList();
    },

    // 获取消息列表
    getInfoList() {
      infoList(this.currentSize, this.pageSize)
        .then(res => {
          this.isLoading = false;
          if (res.status >= 200 && res.status < 400) {
            let data = res.data.data;
            this.currentSize++;
            this.total = res.data.p_total;
            if (this.total == 0) {
              this.pageStatues = 2;
            } else {
              this.pageStatues = 1;
            }
            let arr = Object.entries(
              data.reduce((acc, item) => {
                const { create_date_2str_date } = item;
                (
                  acc[create_date_2str_date] ||
                  (acc[create_date_2str_date] = [])
                ).push(item);
                return acc;
              }, {})
            ).map(([create_date_2str_date, info]) => ({
              create_date_2str_date,
              info
            }));
            this.list.push(...arr);
            this.count += 15;
            this.loading = false;
            if (this.count >= this.total) {
              this.finished = true;
            } else {
              this.finished = false;
            }
          }
        })
        .catch(err => {
          this.pageStatues = 3;
        });
    },

    // 全部已读
    getToRead() {
      toRead().then(res => {
        if (res.status >= 200 && res.status < 400) {
          this.$notify({
            type: "success",
            message: "全部已读"
          });
          this.$store.commit("SET_UNREAD", 0);
        }
      });
    }
  },
  watch: {
    $route(to) {
      if (to.name === "personalInfo") {
        this.getToRead();
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.personInfo {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #eeeeee;
  font-size: 14px;
  .pageLoading {
    height: 100%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .personInfo-wrapper {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:last-child {
      margin-bottom: 30px;
    }
    .infodate {
      margin: 13px 0;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(160, 160, 160, 1);
      line-height: 17px;
      line-height: 17px;
    }
    .info-wrapper {
      margin-bottom: 15px;
      width: 100%;
      display: inline-block;
      padding: 10px 20px 20px 20px;
      background-color: #fff;
      .item-date {
        padding: 8px 0 13px 0;
      }
      .title {
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(68, 68, 68, 1);
        line-height: 21px;
      }
      .item-date {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(160, 160, 160, 1);
        line-height: 17px;
      }
      .text {
        text-indent: 2em;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
