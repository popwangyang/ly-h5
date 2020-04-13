<template>
  <div class="contractListItem">
    <span class="title">
      <span>{{data.type == 1 ? '曲库服务合同':'技术综合服务协议'}}</span>
      <span style="color: #999999;">{{stateText}}</span>
    </span>
    <van-cell :is-link="!showStatus" @click="goDetail(data, data.type)">
      <span slot="title">
        <span>合同编号：</span>
        <span>{{data.number}}</span>
      </span>
      <div slot="label">
        <span>有效年限：</span>
        <span>{{''||'1年'}}</span>
        <div class="mtp5">
          <span>接入/结束日期：</span>
          <span>{{data.begin_date}}</span>
          <span>{{' '}}至{{' '}}</span>
          <span>{{data.end_date}}</span>
        </div>
        <div class="mtp5" v-if="showStatus">
          <span>审批状态：</span>
          <span class="statues1" v-if="data.approve_state == 1">审批中</span>
          <span class="statues2" v-if="data.approve_state == 2">已通过</span>
          <span class="statues3" v-if="data.approve_state == 3">未通过审批</span>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    showStatus: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      required: true
    },
    showPersonContract: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    stateText() {
      let result = null;
      switch (this.data.state) {
        case 1:
          result = "合同创建中";
          break;
        case 2:
          result = "已生效";
          break;
        case 3:
          result = "已过期";
          break;
        case 4:
          result = "合同终止";
          break;
        default:
          result = "合同创建中";
          break;
      }
      return result;
    }
  },
  methods: {
    goDetail(data, type) {
      this.$router.push({
        name: "contractDetail",
        query: {
          contractID: type == 1 ? data.music_id : data.comprehensive_id,
          contractType: type,
          showPersonContract: this.showPersonContract
        }
      });
    }
  }
};
</script>
<style>
.contractListItem .van-cell__title {
  flex: 3;
}
.contractListItem .van-cell__value {
  display: flex;
  justify-content: flex-end;
}
</style>
<style scoped="scoped" lang="less">
.contractListItem {
  margin-top: 10px;
  .title {
    display: flex;
    background: white;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    border-bottom: 1px solid #f6f6f6;
    font-size: 12px;
  }
  .statues1 {
    color: #ffb04e;
  }
  .statues2 {
    color: #01cca3;
  }
  .statues3 {
    color: #999999;
  }
}
.mtp5 {
  margin-top: 5px;
}
</style>
