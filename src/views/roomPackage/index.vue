<template>
  <div class="combo">
    <div class="combo-top">
      <span class="combo-top-title">套餐列表</span>
      <div class="combo-top-op">
        <button class="op-btn op-btn-man" @click="manaCombo">管理</button>
        <button class="op-btn op-btn-new" @click="newCombo">创建</button>
      </div>
    </div>
    <div class="list" ref="scroll">
      <PageList
        noListText="暂无套餐"
        :disRefresh="true"
        :getData="getData"
        ref="pageList"
        :params="params"
      >
        <template v-slot:default="slotProps">
          <div>
            <div class="combo-ul">
              <li
                @click="detail(item)"
                v-for="(item, index) in slotProps.dataList"
                :key="index"
              >
                <img
                  style="display:none;"
                  width="40"
                  height="40"
                  class="leftimg"
                  :src="listImg"
                  alt
                />
                <div class="combo-ul-content">
                  <div class="combo-ul-content-p1">
                    <span class="p1-name">{{ item.name }}</span>
                    <!-- <img class="tip" width="31" height="16" :src="recommendImg" alt /> -->
                    <div class="tip1">
                      {{ item.enabled ? "已上架" : "已下架" }}
                    </div>
                  </div>
                  <p class="combo-ul-content-p2">
                    <span class="p2-1"
                      >￥{{ item.actual_price | toFixed2 }}</span
                    >
                    <b class="p2-2">￥{{ item.original_price | toFixed2 }}</b>
                  </p>
                </div>
              </li>
            </div>
          </div>
          <p v-if="!hasCombo" class="noneInfo">暂无套餐</p>
        </template>
      </PageList>
    </div>
  </div>
</template>

<script>
import PageList from "@/components/pageList";
import { getPackageList } from "@/api/combo";
// import { cacheMixins } from "@/libs/mixins";
export default {
  name: "roomPackage",
  // mixins: [cacheMixins],
  data() {
    return {
      params: { load: true },
      results: [], // 列表
      total: 0, // 套餐数量
      isCreate: false, // 是否可创建
      listImg: require("@/assets/alipay.png"),
      recommendImg: require("@/assets/backicon.png")
    };
  },
  components: {
    PageList
  },
  computed: {
    //  是否有套餐
    hasCombo() {
      if (this.total) return true;
      return false;
    }
  },
  mounted() {},
  methods: {
    // 详情
    detail(item) {
      this.$store.commit("set_comboItem", item);
      this.$router.push({
        name: "comboDetail"
      });
    },
    // 获取套餐列表
    getData(params) {
      return new Promise((resolve, reject) => {
        getPackageList(this.$store.state.user.ktv_id, params)
          .then(res => {
            this.isCreate = true;
            this.total = res.data.count;
            let results = {
              total: res.data.count,
              data: res.data.results
            };
            resolve(results);
            // resolve({
            //   total: 0,
            //   data: []
            // });
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 管理套餐
    manaCombo() {
      this.$router.push({
        name: "manaCombo"
      });
    },
    // 创建套餐
    newCombo() {
      this.$store.commit("set_comboItem", null);
      this.$router.push({
        name: "newcombo",
        query: {
          c: true
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.combo {
  padding: 10px 16px;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 60px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .combo-top {
    flex-shrink: 0;
    width: 100%;
    padding: 6px 15px;
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .combo-top-title {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(68, 68, 68, 1);
    }
    .combo-top-op {
      margin: 5px 0;
      .op-btn {
        border-radius: 4px;
        height: 24px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 20px;
        border: none;
      }
      .op-btn-man {
        border: 1px solid rgba(0, 150, 247, 1);
        background-color: #fff;
        color: rgba(0, 150, 247, 1);
        margin-right: 20px;
      }
      .op-btn-new {
        background: linear-gradient(
          180deg,
          rgba(54, 210, 254, 1) 0%,
          rgba(0, 130, 255, 1) 100%
        );
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .combo-ul {
    overflow-y: auto;
    flex: 1;
    li {
      border-radius: 12px;
      box-shadow: 0px 5px 5px 0px #eae8e8;
      margin-bottom: 10px;
      padding: 17px;
      list-style: none;
      display: flex;
      align-items: center;
      background-color: #fff;
      .leftimg {
        margin-right: 20px;
      }
      .combo-ul-content {
        flex: 1;
        .combo-ul-content-p1 {
          position: relative;
          margin-bottom: 10px;
          .p1-name {
            display: inline-block;
            width: 80%;
            line-height: 1.3;
            font-size: 16px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
          }
          .tip {
            position: absolute;
            right: 0;
            top: -17px;
          }
          .tip1 {
            position: absolute;
            right: 0;
            top: -5px;
            font-size: 12px;
            color: #d4d4d4;
            padding: 3px 8px;
            border-radius: 12px;
            background-color: #f4f4f4;
          }
        }
        .combo-ul-content-p2 {
          margin-top: 15px;
          .p2-1 {
            margin-right: 25px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(254, 96, 66, 1);
          }
          .p2-2 {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
.noneInfo {
  text-align: center;
  color: #afacac;
  margin-top: 10%;
}
</style>
<style>
.combo .van-pull-refresh {
  /* width: 100% !important; */
  overflow: inherit !important;
}
/* .combo .van-pull-refresh__track {
  height: 100%;
} */

.combo .list {
  flex: 1;
  overflow: auto;
  z-index: 11;
}
.combo .pageListBox .pageLoading {
  width: 100%;
}
</style>
