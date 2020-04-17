<template>
  <div class="manaCombo">
    <div v-if="total !== 0">
      <div class="common">
        <p>已上架套餐</p>
        <TranstionsList>
          <div class="item" v-for="(item, index) in this.up" :key="item.id">
            <div class="wrapper">
              <div class="cont">
                <div class="index">{{index + 1}}</div>
                <div class="cont-cont">
                  <p class="name">{{item.name}}</p>
                  <p class="price">
                    <span class="s1">￥{{item.actual_price}}</span>
                    <span class="s2">￥{{item.original_price}}</span>
                  </p>
                </div>
              </div>
              <div class="op">
                <span v-if="index!==0" class="op-s op1" @click="upway(item,index)">上移</span>
                <span v-if="index!==0" class="op-s op2" @click="firstway(item,index)">置顶</span>
                <span class="op-s op3" @click="downway(item,index)">下架</span>
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
        <p v-if="this.up.length === 0" class="mtp5 noneInfo">暂无套餐</p>
      </div>
      <div class="common">
        <p>已下架套餐</p>
        <TranstionsList>
          <div class="item" v-for="(item, index) in this.down" :key="item.id">
            <div class="wrapper">
              <div class="cont">
                <div class="cont-cont">
                  <p class="name">{{item.name}}</p>
                  <p class="price">
                    <span class="s1">￥{{item.actual_price}}</span>
                    <span class="s2">￥{{item.original_price}}</span>
                  </p>
                </div>
              </div>
              <div class="op">
                <span class="op-s op1" @click="inUp(item,index)">上架</span>
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
        <p>已删除套餐</p>
        <TranstionsList>
          <div class="item" v-for="(item, index) in this.clear" :key="item.id">
            <div class="wrapper">
              <div class="cont">
                <div class="cont-cont">
                  <p class="name">{{item.name}}</p>
                  <p class="price">
                    <span class="s1">￥{{item.actual_price}}</span>
                    <span class="s2">￥{{item.original_price}}</span>
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

    <p class="noneInfo" v-else>
      <van-loading type="spinner" v-if="showLoading"></van-loading>
      <span v-else>暂无套餐</span>
    </p>
    <div class="bottom">
      <div @click="cancle" class="btn cancle">取消</div>
      <div @click="save" class="btn save">保存</div>
    </div>

    <van-overlay :show="overlay">
      <div class="overlay">
        <van-loading />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getPackageList, manaCombo } from "@/api/combo";

import TranstionsList from "@/components/transtionList";
export default {
  name: "",
  data() {
    return {
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
    // 删除套餐
    clearItem(w, item, index) {
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
      getPackageList(this.$store.state.user.ktv_id).then(res => {
        if (res.status === 200 || res.status < 400) {
          this.total = res.data.results.length;
          let results = res.data.results;
          results.forEach(e => {
            if (e.enabled) {
              this.up.push(e);
              return;
            }
            this.down.push(e);
          });
          if (results.length) {
            this.showLoading = true;
            return;
          }
          this.showLoading = false;
        }
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
    // 取消
    cancle() {
      this.$router.push({
        name: "roomPackage"
      });
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
    TranstionsList
  }
};
</script>

<style lang="scss" scoped>
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
  padding-bottom: 45px;
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
      transition: all 2s;
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
</style>