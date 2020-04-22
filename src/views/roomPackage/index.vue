<template>
  <div ref="scroll" class="combo">
    <PageList :getData="getData" ref="pageList" :params="params">
      <template>
        <div>
          <div class="combo-top">
            <span class="combo-top-title">套餐列表（{{total}}/10）</span>
            <div class="combo-top-op">
              <button class="op-btn op-btn-man" @click="manaCombo">管理</button>
              <button class="op-btn op-btn-new" @click="newCombo">创建</button>
            </div>
          </div>
          <div class="combo-ul">
            <li @click="detail(item)" v-for="(item, index) in results" :key="index">
              <img style="display:none;" width="40" height="40" class="leftimg" :src="listImg" alt />
              <div class="combo-ul-content">
                <div class="combo-ul-content-p1">
                  <span class="p1-name">{{item.name}}</span>
                  <!-- <img class="tip" width="31" height="16" :src="recommendImg" alt /> -->
                  <div class="tip1">{{item.enabled?"已上架":"未上架"}}</div>
                </div>
                <p class="combo-ul-content-p2">
                  <span class="p2-1">￥{{item.actual_price|toFixed2}}</span>
                  <b class="p2-2">￥{{item.original_price|toFixed2}}</b>
                </p>
              </div>
            </li>
          </div>
        </div>
      </template>
    </PageList>
  </div>
</template>

<script>
import PageList from "@/components/pageList";
import { getPackageList } from "@/api/combo";
import { cacheMixins } from "@/libs/mixins";
export default {
  name: "roomPackage",
  mixins: [cacheMixins],
  data() {
    return {
      params: { load: true },
      showLoading: true,
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
    getData() {
      return new Promise((resolve, reject) => {
        getPackageList(this.$store.state.user.ktv_id)
          .then(r => {
            if (r.data) {
              this.isCreate = true;
              this.total = r.data.results.length;
              this.results = r.data.results;
              if (this.results.length) {
                this.showLoading = true;
                resolve({
                  total: this.total,
                  data: this.results
                });
                return;
              }
              this.showLoading = false;
            }
            resolve(r);
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
      if (this.total === 0 && !this.isCreate) {
        this.$toast({
          message: "套餐列表加载中",
          type: "fail"
        });
        return;
      }
      if (this.total === 10) {
        this.$dialog.alert({
          message: "套餐数量上限为10，请删除部分套餐后操作。",
          confirmButtonText: "知道了"
        });
        return;
      }
      this.$store.commit("set_comboItemAttr", null);
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

<style lang="scss" scoped>
.combo {
  padding: 10px 20px;
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
    width: 100%;
    height: 40px;
    padding: 12px 15px;
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
