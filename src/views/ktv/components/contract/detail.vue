<template>
	<div class="contractDetail" ref="scroll">
		<ContentLoad :getInfo="getData">
			<van-cell title="合同类型" value-class="cellValue" :value="formData.type | filterType" />
			<van-cell title="合同状态" value-class="cellValue" :value="formData.state | filterState" />
			<van-cell title="合同编号" value-class="cellValue" :value="formData.number" />
			<span v-if="formData.type == 1">
				<openService :service="formData.service_list" />
				<div class="divider"></div>
				<van-cell title="付款凭证" value-class="cellValue" v-if="formData.FKPZ.length != 0">
					<span slot="label">
						<paymentVoucher :FKPZ="formData.FKPZ" />
					</span>
				</van-cell>
				<div class="divider"></div>
				<cell-image title="合同附件" :dataList="formData.annex"></cell-image>
				<van-cell title="其他约定" value-class="cellValue" v-if="formData.other_conventions != null && formData.other_conventions != ''">
					<span slot="label">
						<TextOverflow :maxLength="50" :text="formData.other_conventions" />
					</span>
				</van-cell>

			</span>
			<span v-if="formData.type == 2">
				<div class="divider"></div>
				<!-- <van-cell title="有效年限" value-class="cellValue">
					<span>
						<span>{{Number(formData.effective_age)}}</span>
						<span> 年</span>
					</span>
        </van-cell>-->
				<van-cell title="接入日期" value-class="cellValue" :value="formData.begin_date" />
				<van-cell title="结束日期" value-class="cellValue" :value="formData.end_date" />
				<div class="divider"></div>
				<van-cell title="支付方式" value-class="cellValue" :value="formData.pay_method | filterPayMethod" />
				<span v-if="formData.pay_method == 2">
					<van-cell title="垫付费用" value-class="cellValue" :value="formData.substitute_payment | filterUnitB" />
					<van-cell title="代垫方/行业协会" value-class="cellValue"  :value="formData.substitute_name" />
					<van-cell title="代垫方/行业协会分润比例" value-class="cellValue" :value="formData.proportion_of_substitute | filterUnitA" />
				    <van-cell title="场所分润比例" value-class="cellValue" :value="formData.proportion_of_places | filterUnitA"/>
				</span>
				<van-cell title="综合服务费" value-class="cellValue">
					<span slot="label">
						<sweepCodeBillDetail :charging_duration="formData.charging_duration" :trial_charging_duration="formData.trial_charging_duration" />
					</span>
				</van-cell>
				<cell-image title="合同附件" :dataList="formData.annex"></cell-image>
				<cell-image title="确认函" :dataList="formData.replies"></cell-image>
			</span>
			<div v-if="!isKTV">
				<div class="divider"></div>
				<van-cell title="审批记录" is-link @click="goApprovalRecord" v-if="formData.tag_full"></van-cell>
				<approval-steps v-if="formData.tag_full" :tag_full="formData.tag_full"></approval-steps>
			</div>
			<time-note></time-note>
		</ContentLoad>
	</div>
</template>

<script>
	import approvalSteps from "./components/approvalSteps";
	import expensesDetails from "./components/expensesDetails";
	import sweepCodeBillDetail from "./components/sweepCodeBillDetail.vue";
	import paymentVoucher from "./components/paymentVoucher.vue";
	import openService from "./components/openService.vue";
	import timeNote from "./components/timeNote";
	import ContentLoad from "@/components/contentLoad";
	import cellImage from "@/components/cellForm/cellImage";
	import TextOverflow from "@/components/textOverflow";
	import {
		cacheMixins
	} from "@/libs/mixins";
	import {
		getContractDetail
	} from "@/api/ktv";
	import {
		Delayering
	} from "@/libs/util";
	export default {
		name: "contractDetail",
		mixins: [cacheMixins],
		components: {
			ContentLoad,
			cellImage,
			expensesDetails,
			sweepCodeBillDetail,
			openService,
			approvalSteps,
			timeNote,
			TextOverflow,
			paymentVoucher
		},
		computed: {
			// 当前角色类型是否为ktv
			isKTV() {
				switch (this.$store.state.user.usertype) {
					case "ktv":
						{
							return 1;
						}
				}
				return 0;
			},
			hasChangeHistory() {
				// 依据合同详情里的变更计费和最晚支付时间来判断是否合同发生了变更；
				let contractDetail = this.$store.state.ktv.contractDetail;
				let {
					change_time,
					refund_total,
					old_billing_method,
					old_latest_payment_date
				} = contractDetail;
				if (old_billing_method != null && old_latest_payment_date != null) {
					return true;
				} else {
					return false;
				}
			}
		},
		filters: {
			filterVodParticipation(type) {
				return type == 1 ? "是" : "否";
			},
			filterType(type) {
				return type == 1 ? "曲库服务合同" : "商户星盟";
			},
			filterUnitA(value) {
				let num = isNaN(Number(value)) ? 0 : value;
				return `${num}%`;
			},
			filterUnitB(value) {
				let num = isNaN(Number(value)) ? 0 : value;
				return `￥${num}`;
			},
			filterPayMethod(state) {
				let result = null;
				switch (state) {
					case 1:
						result = "场所支付";
						break;
					default:
						result = "代垫方/行业协会垫付";
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
		mounted() {},
		data() {
			return {
				formData: {}
			};
		},
		methods: {
			goApprovalRecord() {
				this.$router.push({
					name: "approvalRecord",
					query: {
						contractID: this.formData.id
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
							this.$route.query.contractID,
							this.$route.query.itemID
						)
						.then(res => {
							this.$store.commit("setContractDetail", res.data);
							this.formData = Delayering(res.data);
							this.formData.annex = JSON.parse(res.data.annex); //合同附件
							this.formData.replies = this.formData.replies ?
								JSON.parse(res.data.replies) :
								[]; //合同附件
							this.formData.charging_duration = res.data.charging_duration ?
								res.data.charging_duration.map(item => {
									item.period_start_date = res.data.official_period_start_date;
									return item;
								}) :
								[];
							this.formData.trial_charging_duration = res.data
								.trial_charging_duration ?
								res.data.trial_charging_duration.map(item => {
									item.period_start_date = res.data.trial_period_start_date;
									return item;
								}) :
								[];
							console.log(this.formData, res);
							resolve(res);
						})
						.catch(err => {
							reject(err);
						});
				});
			}
		},
		updated() {
			console.log("ppppp");
		},
		mounted() {}
	};
</script>

<style scoped="scoped" lang="less">
	.contractDetail {
		height: 100%;
		overflow: auto;
	}
</style>
