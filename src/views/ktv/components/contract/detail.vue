<template>
  <div class="contractDetail" ref="scroll">
    <ContentLoad :getInfo="getData">
      <van-cell title="合同类型" value-class="cellValue" :value="formData.type" />
      <van-cell title="合同状态" value-class="cellValue" :value="formData.state | filterState" />
      <van-cell title="合同编号" value-class="cellValue" :value="formData.number" />
      <van-cell title="合同起始日期" value-class="cellValue" :value="formData.begin_date" />
      <expensesDetails
        v-if="contractStatues == 2"
        :isPerson="showPersonContract"
        :data="formData.expensesDetails"
      ></expensesDetails>
      <div class="divider" v-if="contractStatues == 2"></div>   
	 <van-cell 
	   title="计费方式"
	   value-class="cellValue"
	   :value="formData.billingMethod | filterBillingMethod"
	 />
	 <van-cell
	   title="计费价格"
	   value-class="cellValue"
	   :value="formData.billingPrice"
	   v-if="contractStatues != 2"
	 />
	 <van-cell
	   title="扫码费用(综合技术服务费)"
	   value-class="cellValue"
	   :value="formData.scan_code_payment | filterUnitB"
	   v-if="contractStatues == 2 && formData.scan_code_payment"
	 />
      <van-cell
        title="支付方式"
        value-class="cellValue"
        :value="formData.pay_method | filterPayMethod"
        v-if="contractStatues == 2"
      />
      <van-cell
        title="代垫方"
        value-class="cellValue"
        :value="formData.substitute"
        v-if="contractStatues == 2 && formData.substitute"
      />
      
      <van-cell title="承若最晚支付时间" value-class="cellValue" :value="formData.latestPaymentDate" v-if="formData.latestPaymentDate" />

      <van-cell title="变更历史" is-link v-if="hasChangeHistory"  @click="goHistory"></van-cell>
      <div class="divider"></div>
      <div v-if="!showPersonContract">
        <van-cell
          title="开始计费时间"
          value-class="cellValue"
          :value="formData.billing_state_time"
          v-if="contractStatues != 0 && formData.billing_state_time"
        />
        <van-cell
          title="暂停计费时间"
          value-class="cellValue"
          :value="formData.billing_state_time_end"
          v-if="contractStatues != 0 && formData.billing_state_time_end"
        />
      </div>
      <div class="divider"></div>
      <van-cell
        title="机构"
        value-class="cellValue"
        :value="formData.mechanism"
        v-if="contractStatues != 0"
      />
      <van-cell
        title="机构分成比例"
        value-class="cellValue"
        :value="formData.proportion_of_mechanism"
        v-if="contractStatues == 2"
      />
      <van-cell
        title="场所分成比例"
        value-class="cellValue"
        :value="formData.proportion_of_places"
        v-if="contractStatues == 2"
      />
      <div class="divider"></div>
      <cell-image title="确认函" :dataList="formData.replies"></cell-image>
      <cell-image title="合同附件" :dataList="formData.annex"></cell-image>
      <div class="divider" v-if="contractStatues != 2"></div>
	  <time-note :contractType="contractStatues"></time-note>
      <div v-if="!showPersonContract">
		<div class="divider"></div>
        <van-cell title="审批记录" is-link @click="goApprovalRecord" v-if="contractStatues != 2 && formData.tag_full!= null"></van-cell>
        <approval-steps
          v-if="contractStatues != 2 && formData.tag_full != null"
          :tag_full="formData.tag_full"
        ></approval-steps>
      </div>
    </ContentLoad>
  </div>
</template>

<script>
import approvalSteps from "./components/approvalSteps";
import expensesDetails from "./components/expensesDetails";
import timeNote from './components/timeNote'
import ContentLoad from "@/components/contentLoad";
import cellImage from "@/components/cellForm/cellImage";
import { cacheMixins } from "@/libs/mixins";
import { getContractDetail } from "@/api/ktv";
export default {
  name: "contractDetail",
  mixins: [cacheMixins],
  components: {
    ContentLoad,
    cellImage,
    expensesDetails,
    approvalSteps,
	timeNote
  },
  computed:{
	hasChangeHistory (){ // 依据合同详情里的变更计费和最晚支付时间来判断是否合同发生了变更；
		let contractDetail = this.$store.state.ktv.contractDetail;
		let {
			change_time,
			refund_total,
			old_billing_method,
		    old_latest_payment_date
		} = contractDetail;
		if(old_billing_method != null && old_latest_payment_date != null){
			return true;
		}else{
			return false;
		}
	} 
  },
  filters: {
    filterUnitB(value) {
		console.log(Number(value))
		let num = isNaN(Number(value)) ? 0:value;
      return `￥${num}`;
    },
    filterPayMethod(state) {
      let result = null;
      switch (state) {
        case 1:
          result = "甲方一次性支付";
          break;
        default:
          result = "乙方先行垫付";
          break;
      }
      return result;
    },
    filterState(state) {
      let result = null;
      switch (state) {
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
    },
    filterBillingMethod(state) {
      let result = null;
      switch (state) {
        case 1:
          result = "扫码支付";
          break;
        case 2:
          result = "精确计次";
          break;
        case 3:
          result = "综合计费";
          break;
        default:
          result = "扫码支付";
          break;
      }
      return result;
    }
  },
  mounted() {
    this.showPersonContract =
      String(this.$route.query.showPersonContract) === "true" ? true : false;
  },
  data() {
    return {
      showPersonContract: false, // 是否展示审批流
      contractStatues: 0, // 0 为曲库服务协议生效合同，1为曲库服务协议终止合同 2为技术综合服务协议
      formData: {
        tag_full: "", // 当前一个完整的流程唯一标识
        contractID: "",
        type: "", // 合同类型:1,曲库服务协议 2，综合计费服务
        state: "", // 合同状态：1合同创建中, 2合同中, 3已过期, 4合同终止 (仅做解释，非传递值)
        number: "", // 合同编号
        begin_date: "", // 合同起始日期
        end_date: "", // 合同结束日期
        writeDate: "", // 结算起始日期
        latestPaymentDate: "", // 最晚支付时间
        billing_state_time: "", // 开始计费时间
        billing_state_time_end: "", // 暂停计费时间
        billingMethod: "",
        billingPrice: "",
        scan_code_payment: "", // 扫码付费
        pay_method: "", // 支付方式
        substitute: "", // 代垫方ID
        mechanism: "", // 机构ID
        proportion_of_mechanism: "", // 机构占比(%)
        proportion_of_places: "", // 场所占比(%)
        replies: [], // 确认函
        annex: [], // 附件
        expensesDetails: {
          music_library_cdn_risk_warning_service: "",
          scan_code_payment_accurate_counting: "",
          set_top_box_purchase_upgrade_cost: "",
          switch_purchase_upgrade_cost: "",
          other_comprehensive_service_payment: "",
          total_comprehensive_service_payment: ""
        }
      }
    };
  },
  methods: {
    goApprovalRecord() {
      this.$router.push({
        name: "approvalRecord",
        query: {
          contractID: this.formData.contractID
        }
      });
    },
    goHistory() {
      this.$router.push({
        name: "contractChangeHistory"
      });
    },
    getData() {
      return new Promise((resolve, reject) => {
        getContractDetail(
          this.$route.query.contractType,
          this.$route.query.contractID
        )
          .then(res => {
            console.log(res);
			this.$store.commit('setContractDetail', res.data);
            if (res.data.contract.type == 1 && res.data.contract.state != 4) {
              this.contractStatues = 0;
            }
            if (res.data.contract.type == 1 && res.data.contract.state == 4) {
              this.contractStatues = 1;
            }

            if (res.data.contract.type == 2) {
              this.contractStatues = 2;
            }
            this.formData.tag_full = res.data.contract.tag_full;
            this.formData.contractID = res.data.contract.id;
            this.formData.type =
              res.data.contract.type == 1
                ? "曲库服务协议合同"
                : "技术综合服务协议合同";
            this.formData.state = res.data.contract.state;
            this.formData.number = res.data.contract.number;
            this.formData.writeDate = res.data.contract.write_date;
            this.formData.billingMethod = res.data.billing_method;
            this.formData.billingPrice =
              res.data.billing_method == 1
                ? `${res.data.billing_price}元/次/终端`
                : `${res.data.billing_price}元`;
            this.formData.scan_code_payment = res.data.scan_code_payment;
            this.formData.pay_method = res.data.contract.pay_method;
            this.formData.billing_state_time =
              res.data.contract.billing_state_time;
            this.formData.billing_state_time_end =
              res.data.contract.billing_state_time_end;
            this.formData.begin_date = res.data.contract.begin_date;
            this.formData.end_date = res.data.contract.end_date;
            this.formData.mechanism = res.data.mechanism_name;
            this.formData.substitute = res.data.substitute_name;
            this.formData.proportion_of_mechanism =
              Number(res.data.proportion_of_mechanism) + "%";
            this.formData.proportion_of_places =
              Number(res.data.proportion_of_places) + "%";
            this.formData.latestPaymentDate = res.data.latest_payment_date;
            this.formData.replies = JSON.parse(res.data.replies); //确认函
            this.formData.annex = JSON.parse(res.data.annex); //合同附件
            this.formData.expensesDetails.music_library_cdn_risk_warning_service =
              res.data.music_library_cdn_risk_warning_service;
            this.formData.expensesDetails.scan_code_payment_accurate_counting =
              res.data.scan_code_payment_accurate_counting;
            this.formData.expensesDetails.set_top_box_purchase_upgrade_cost =
              res.data.set_top_box_purchase_upgrade_cost;
            this.formData.expensesDetails.switch_purchase_upgrade_cost =
              res.data.switch_purchase_upgrade_cost;
            this.formData.expensesDetails.other_comprehensive_service_payment =
              res.data.other_comprehensive_service_payment;
            this.formData.expensesDetails.total_comprehensive_service_payment =
              res.data.total_comprehensive_service_payment;
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
</script>

<style scoped="scoped" lang="less">
.contractDetail {
  height: 100%;
  overflow: auto;
}
</style>
