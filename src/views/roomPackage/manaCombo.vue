<template>
  <div ref="scroll" class="manaCombo">
    <div class="pagelist" ref="pageList">
      <div class="common">
        <p>已上架套餐</p>
        <TranstionsList v-if="up.length > 0">
          <div class="item" v-for="(item, index) in this.up" :key="item.id">
            <div class="wrapper">
              <div class="cont">
                <div class="index">{{ index + 1 }}</div>
                <div class="cont-cont">
                  <p class="name">{{ item.name }}</p>
                  <p class="price">
                    <span class="s1">￥{{ item.actual_price }}</span>
                    <span class="s2">￥{{ item.original_price }}</span>
                  </p>
                </div>
              </div>
              <div class="op">
                <span
                  v-if="index !== 0"
                  class="op-s op1"
                  @click="upway(item, index)"
                  >上移</span
                >
                <span
                  v-if="index !== 0"
                  class="op-s op2"
                  @click="firstway(item, index)"
                  >置顶</span
                >
                <span class="op-s op3" @click="downway(item, index)">下架</span>
              </div>
            </div>
            <img
              @click="clearItem('up', item, index)"
              class="cancelImg"
              width="15"
              height="15"
              :src="cancelImg"
              alt
            />
          </div>
        </TranstionsList>
        <transition v-else>
          <p class="mtp5 noneInfo">暂无套餐</p>
        </transition>
      </div>
      <div class="common">
        <p>已下架套餐</p>
        <TranstionsList>
          <div class="item" v-for="(item, index) in this.down" :key="item.id">
            <div class="wrapper">
              <div class="cont">
                <div class="cont-cont">
                  <p class="name">{{ item.name }}</p>
                  <p class="price">
                    <span class="s1">￥{{ item.actual_price }}</span>
                    <span class="s2">￥{{ item.original_price }}</span>
                  </p>
                </div>
              </div>
              <div class="op">
                <span class="op-s op1" @click="inUp(item, index)">上架</span>
              </div>
            </div>
            <img
              @click="clearItem('dow', item, index)"
              class="cancelImg"
              width="15"
              height="15"
              :src="cancelImg"
              alt
            />
          </div>
        </TranstionsList>
        <p v-if="this.down.length === 0" class="mtp5 noneInfo">暂无套餐</p>
      </div>
      <div class="common">
        <p>待删除套餐</p>
        <TranstionsList>
          <div class="item" v-for="(item, index) in this.clear" :key="item.id">
            <div class="wrapper">
              <div class="cont">
                <div class="cont-cont">
                  <p class="name">{{ item.name }}</p>
                  <p class="price">
                    <span class="s1">￥{{ item.actual_price }}</span>
                    <span class="s2">￥{{ item.original_price }}</span>
                  </p>
                </div>
              </div>
              <div class="op">
                <span @click="reset(item, index)" class="op-s op1">恢复</span>
              </div>
            </div>
          </div>
        </TranstionsList>
        <p v-if="this.clear.length === 0" class="mtp5 noneInfo">暂无删除套餐</p>
      </div>
    </div>
    <div class="bottom">
      <div @click="cancelpop" class="btn cancle">取消</div>
      <div @click="save" class="btn save">保存</div>
    </div>
    <van-dialog
      title="提示"
      v-model="cancelDialog"
      show-cancel-button
      closeOnPopstate
      :beforeClose="beforeClose"
    >
      <p class="cancelDialogtext">确定放弃已修改的内容吗？</p>
    </van-dialog>
    <van-overlay :show="overlay">
      <div class="overlay">
        <van-loading />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { getPackageList, manaCombo } from "@/api/combo";
// import { cacheMixins } from "@/libs/mixins";

import TranstionsList from "@/components/transtionList";
export default {
  name: "manaCombo",
  data() {
    return {
      old: null, // 旧数据
      new: null, // 新数据
      cancelDialog: false, // 取消弹窗
      overlay: false, // 加载中
      showLoading: true, // 加载中
      total: 0, // 列表总数
      cancelImg: require("@/assets/comboCancel.png"),
      up: [], // 上架列表
      down: [], // 下架列表
      clear: [] // 已删除列表
    };
  },
  watch: {},
  mounted() {
    this.getList();
  },
  methods: {
    // 取消确认
    cancelpop() {
      let error = this.old !== JSON.stringify([...this.up, " ", ...this.down]);
      if (this.clear.length || error) {
        this.cancelDialog = true;
        return;
      }
      this.$router.push({
        name: "roomPackage"
      });
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        this.up = [];
        this.down = [];
        this.clear = [];
        this.getList();
        done();
      } else {
        done();
      }
    },
    // 删除套餐
    clearItem(w, item, index) {
      this.deltips(() => {
        if (w === "up") {
          this.up.splice(index, 1);
        } else {
          this.down.splice(index, 1);
        }
        this.clear.push(item);
        this.$toast({
          message: "套餐已删除",
          type: "success"
        });
      });
    },
    // 恢复套餐
    reset(item, index) {
      if (item.enabled) {
        this.up.push(item);
      } else {
        this.down.push(item);
      }
      this.clear.splice(index, 1);
    },
    // 获取套餐列表
    getList() {
      this.up = [];
      this.down = [];
      this.overlay = true;
      return new Promise((resolve, reject) => {
        getPackageList(this.$store.state.user.ktv_id)
          .then(r => {
            if (r.data) {
              this.overlay = false;
              this.total = r.data.results.length;
              let results = r.data.results;
              results.forEach(e => {
                if (e.enabled) {
                  this.up.push(e);
                  return;
                }
                this.down.push(e);
              });
              this.old = JSON.stringify([...this.up, " ", ...this.down]);
              if (results.length) {
                this.showLoading = true;
                resolve({
                  total: this.total,
                  data: results
                });
                return;
              }
              this.showLoading = false;
              resolve({
                total: 0,
                data: []
              });
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 数据处理
    deepCopyHandle(arr, attr, val) {
      let _a = JSON.stringify(arr);
      let _b = JSON.parse(_a);
      for (let item of _b) {
        item[attr] = val;
      }
      return _b;
    },
    //上移
    upway(item, index) {
      let _a = JSON.stringify(this.up[index]);
      let _b = JSON.stringify(this.up[index - 1]);
      let a = JSON.parse(_a);
      let b = JSON.parse(_b);
      this.up.splice(index, 1, b);
      this.up.splice(index - 1, 1, a);
    },
    //置顶
    firstway(item, index) {
      this.up.unshift(this.up.splice(index, 1)[0]);
    },
    //下架
    downway(item, index) {
      this.down.unshift(item);
      this.up.splice(index, 1);
    },
    //上架
    inUp(item, index) {
      this.up.push(item);
      this.down.splice(index, 1);
    },
    //删除提示
    deltips(cal) {
      Dialog.confirm({
        title: "提示",
        message: "是否删除该套餐"
      }).then(cal);
    },
    // 保存
    save() {
      this.overlay = true;
      let clear = this.deepCopyHandle(this.clear, "is_delete", true);
      let up = this.deepCopyHandle(this.up, "enabled", true);
      let down = this.deepCopyHandle(this.down, "enabled", false);
      let arrTemp = [...up, ...down, ...clear];
      let arr1 = JSON.stringify(arrTemp);
      let arr2 = JSON.parse(arr1);
      let len = arr2.length;
      for (let i = 0; i < arr2.length; i++) {
        arr2[i].weight = len--;
      }
      manaCombo({ ktv_id: this.$store.state.user.ktv_id }, arr2).then(r => {
        if (r.status < 400) {
          this.$toast({
            message: "保存成功",
            type: "success"
          });
          this.overlay = false;
          this.$router.push({
            name: "roomPackage"
          });
        }
      });
    }
  },
  components: {
    TranstionsList,
    [Dialog.Component.name]: Dialog.Component
  }
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  height: 0;
}
</style>

<style lang="less" scoped>
.overlay {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 45%;
}
.noneInfo {
  text-align: center;
  color: #afacac;
  margin-top: 30%;
}
.mtp5 {
  margin-top: 5% !important;
}
.manaCombo {
  display: flex;
  width: 100%;
  min-height: 100%;
  padding-bottom: 45px;
  .pagelist {
    width: 100%;
    height: auto !important;
    .common {
      display: block;
      width: 100%;
      padding: 22px 15px;
      overflow: hidden;
      background-color: #fff;
      margin-bottom: 10px;
      transition: all 2s;
      .item {
        display: flex;
        width: 100%;
        align-items: center;
        transition: all 1s;
        overflow: hidden;
        .wrapper {
          flex: 1;
          background-color: #fff;
          display: block;
          border-radius: 12px;
          box-shadow: 1px 4px 5px 0px #eae8e8;
          margin-bottom: 10px;
          padding: 17px 17px 0 17px;
          .cont {
            border-bottom: 1px solid #eeeeee;
            display: flex;
            padding: 17px 0;
            align-items: center;
            .index {
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background-color: #0495f5;
              color: #fff;
              font-size: 8px;
              line-height: 16px;
              text-align: center;
            }
            .cont-cont {
              margin-left: 10px;
              flex: 1;
              .name {
                width: 80%;
                line-height: 1.3;
                font-size: 16px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: rgba(51, 51, 51, 1);
                margin-bottom: 10px;
              }
              .price {
                .s1 {
                  margin-right: 25px;
                  color: #fe6042;
                }
                .s2 {
                  margin-right: 25px;
                  color: #999999;
                  text-decoration: line-through;
                }
              }
            }
          }
          .op {
            padding: 7px 0;
            .op-s {
              display: inline-block;
              border-radius: 4px;
              padding: 4px 10px;
            }
            .op1 {
              border: 1px solid rgba(0, 150, 247, 1);
              color: rgba(0, 150, 247, 1);
              margin-right: 10px;
            }
            .op2 {
              border: 1px solid #00cda2;
              color: #00cda2;
              margin-right: 10px;
            }
            .op3 {
              border: 1px solid #ff5562;
              color: #ff5562;
            }
          }
        }
        .cancelImg {
          margin-left: 15px;
        }
      }
    }
  }
}
.bottom {
  height: 44px;
  line-height: 44px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -1px 5px -1px rgba(0, 0, 0, 0.16);
  .btn {
    flex: 1;
    text-align: center;
  }
  .save {
    background: rgba(0, 130, 255, 1);
    color: #fff;
  }
}
.cancelDialogtext {
  text-align: center;
  padding: 20px;
  color: grey;
}
</style>
