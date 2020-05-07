 <template>
  <div class="widthdrawalDetail">
    <div class="search">
      <div class="time">
        <date-pick class="dataPick" @returnBack="returnBack" v-model="dateValue"></date-pick>
      </div>
      <div class="icon" @click="showHelp">
        <i></i>
      </div>
    </div>
    <div class="list">
      <PageList ref="pagelist" noListText="暂无提现信息" :params="params" :getData="getlist">
        <template v-slot:default="slotProps">
          <withdrawalDetailItem class="withdrawalDetailItem" :dataList="slotProps.dataList" />
        </template>
      </PageList>
    </div>
  </div>
</template>
 
 <script>
import { getDay, getDayTime } from "@/libs/util";
import PageList from "@/components/pageList";
import withdrawalDetailItem from "@/components/listItems/withdrawalDetailItem";
import datePick from "@/components/datePick";
import { getlist } from "@/api/withdrawal.js";
export default {
  data() {
    return {
      getlist: getlist,
      dateValue: [],
      params: {
        time_start: getDayTime(new Date()),
        time_end: getDayTime(new Date(), 1),
        user_id: this.user_id
      }
    };
  },

  components: {
    PageList,
    withdrawalDetailItem,
    datePick
  },
  computed: {
    // 用户Id
    user_id() {
      return this.$store.state.user.user_id;
    }
  },
  mounted() {},
  methods: {
    // 获取时间
    returnBack(val) {
      this.params = {
        time_start: this.dateValue[0] + " 00:00:00",
        time_end: this.dateValue[1] + " 23:59:59",
        user_id: this.user_id
      };
      this.$nextTick(() => {
        this.$refs.pagelist.pageStatues = 0;
        this.$refs.pagelist.dataList = [];
        this.$refs.pagelist.handlerData();
      });
    },

    // 说明
    showHelp() {
      this.$dialog.alert({
        message:
          "实际到账金额 = 可提现金额 - 可提现金额 * 支付通道费率 - 提现手续费",
        confirmButtonText: "知道了"
      });
    }
  }
};
</script>
 <style lang="scss" scoped>
.widthdrawalDetail {
  background-color: #f4f4f4;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  .search {
    z-index: 20;
    width: 100%;
    background-color: #fff;
    display: flex;
    padding: 15px 30px;
    align-items: center;
    .time,
    .icon {
      display: inline-block;
    }
    .time {
      font-size: 26px;
    }
    .icon {
      position: absolute;
      top: 0x;
      font-size: 10px;
      right: 30px;
      display: inline-block;
      padding: 0 5px;
      i {
        display: inline-block;
        vertical-align: top;
        margin-top: -1px;
        width: 12px;
        height: 12px;
        background: url("../../../../static/img/help.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .list {
    width: 100%;
    z-index: 10;
    flex: 1;
    overflow: auto;
    margin-top: 2px;
  }
}
</style>
<style>
.widthdrawalDetail .van-cell .van-cell__title {
  flex: 3;
}
.widthdrawalDetail .van-pull-refresh {
  height: 100% !important;
  overflow-y: auto !important;
}
.widthdrawalDetail .datePicker {
  width: auto !important;
  padding: 0 5px;
}
</style>