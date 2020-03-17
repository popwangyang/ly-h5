<template>
	<div class="contractDetail" ref="scroll">
		<ContentLoad :getInfo="getData">
			<van-cell title="合同类型" value-class="cellValue" :value="formData.type | filterType" />
			<van-cell title="合同状态" value-class="cellValue" :value="formData.state | filterState" />
			<van-cell title="合同终止日期" value-class="cellValue" v-if="formData.end_date && formData.state == 4" :value="formData.end_date" />
			<van-cell title="合同编号" value-class="cellValue" :value="formData.number" />
			<van-cell title="合同起始日期" value-class="cellValue" v-if="formData.state != 4" :value="formData.begin_date" />
			<van-cell title="是否分配给VOD设备商" value-class="cellValue" :value="formData.vod_participation | filterVodParticipation" />
			<expensesDetails v-if="data.set_top_box_purchase_upgrade_cost" :isPerson="showPersonContract" :data="data"></expensesDetails>
			<div class="divider"></div>
			<van-cell title="计费方式" value-class="cellValue" :value="formData.billingMethod | filterBillingMethod" />
			<sweepCodeBillDetail :charging_duration="formData.charging_duration" v-if="formData.charging_duration && formData.charging_duration.length != 0"></sweepCodeBillDetail>
			<van-cell title="计费价格" value-class="cellValue" :value="formData.billingPrice" v-if="formData.billing_price" />
			<van-cell title="扫码费用(综合技术服务费)" value-class="cellValue" v-if="formData.scan_code_payment != null" :value="formData.scan_code_payment | filterUnitB" />
			<van-cell title="支付方式" value-class="cellValue" v-if="formData.pay_method" :value="formData.pay_method | filterPayMethod" />
			<van-cell title="代垫方" value-class="cellValue" v-if="formData.substitute_name" :value="formData.substitute_name" />
			<van-cell title="承若最晚支付时间" value-class="cellValue" :value="formData.latest_payment_date" v-if="formData.latest_payment_date" />
			<van-cell title="变更历史" is-link v-if="hasChangeHistory" @click="goHistory"></van-cell>
			<div class="divider"></div>
			<van-cell title="机构" value-class="cellValue" v-if="formData.mechanism_name" :value="formData.mechanism_name" />
			<van-cell title="机构分成比例" value-class="cellValue" v-if="formData.proportion_of_mechanism != null" :value="formData.proportion_of_mechanism | filterUnitA" />
			<van-cell title="场所分成比例" value-class="cellValue" v-if="formData.proportion_of_places != null" :value="formData.proportion_of_places | filterUnitA" />
			<div class="divider"></div>
			<cell-image title="确认函" :dataList="formData.replies" v-if="formData.replies"></cell-image>
			<cell-image title="合同附件" :dataList="formData.annex" v-if="formData.annex"></cell-image>
			<div class="divider"></div>
			<time-note></time-note>
			<div v-if="!showPersonContract">
				<div class="divider"></div>
				<van-cell title="审批记录" is-link @click="goApprovalRecord" v-if="formData.tag_full"></van-cell>
				<approval-steps v-if="formData.tag_full" :tag_full="formData.tag_full"></approval-steps>
			</div>
		</ContentLoad>
	</div>
</template>

<script>
	import approvalSteps from "./components/approvalSteps";
	import expensesDetails from "./components/expensesDetails";
	import sweepCodeBillDetail from './components/sweepCodeBillDetail.vue'
	import timeNote from './components/timeNote'
	import ContentLoad from "@/components/contentLoad";
	import cellImage from "@/components/cellForm/cellImage";
	import {
		cacheMixins
	} from "@/libs/mixins";
	import {
		getContractDetail
	} from "@/api/ktv";
	import {
		Delayering
	} from '@/libs/util';
	export default {
		name: "contractDetail",
		mixins: [cacheMixins],
		components: {
			ContentLoad,
			cellImage,
			expensesDetails,
			sweepCodeBillDetail,
			approvalSteps,
			timeNote
		},
		computed: {
			hasChangeHistory() { // 依据合同详情里的变更计费和最晚支付时间来判断是否合同发生了变更；
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
				return type == 1 ? '是' : '否';
			},
			filterType(type) {
				return type == 1 ? '曲库服务合同' : '综合技术服务合同';
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
						result = "乙方先行垫付";
						break;
					default:
						result = "甲方一次性支付";
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
			console.log(this.showPersonContract);
		},
		data() {
			return {
				showPersonContract: false, // 是否展示审批流
				formData: {},
				data: {},
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
						this.$route.query.contractID
					).then(res => {
						this.$store.commit('setContractDetail', res.data);
						let data = res.data;
						this.data = data;
						this.formData = Delayering(data);
						this.formData.billingMethod = data.billing_method;
						this.formData.latest_payment_date = data.latest_payment_date;
						this.formData.replies = JSON.parse(data.replies); //确认函
						this.formData.annex = JSON.parse(data.annex); //合同附件
						this.formData.billingPrice = data.billing_method == 2 ?
							`${data.billing_price}元/次/终端` :
							`${data.billing_price}元`;
							console.log(this.formData.charging_duration.length);
						resolve(res);
					}).catch(err => {
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
