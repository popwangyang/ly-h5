<template>
	<div class="contractHistoryBox">
		<van-cell title="变更时间" value-class="cellValue" :value="formData.change_time"/>
		<van-cell title="退还金额" value-class="cellValue" :value="formData.refund_total"/>
		<van-cell title="原计费方式" value-class="cellValue" :value="formData.old_billing_method | filterBillingMethod"/>
		<van-cell title="原计费价格" value-class="cellValue" :value="formData.old_billing_price"/>
		<van-cell title="原承若最晚支付时间" value-class="cellValue" :value="formData.old_latest_payment_date"/>
	</div>
</template>

<script>
	export default{
		filters: {
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
		computed:{
			formData(){
				let contractDetail = this.$store.state.ktv.contractDetail;
				let {
					change_time,
					refund_total,
					old_billing_method,
				    old_latest_payment_date
				} = contractDetail;
				
				let old_billing_price = old_billing_method == 1 ? 
				`${contractDetail.old_billing_price}元/次/终端`:
				`${contractDetail.old_billing_price}元`;
			    return 	{
					change_time,
					refund_total,
					old_billing_method,
					old_billing_price,
				    old_latest_payment_date}
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	
	.contractHistoryBox{
		height: 100%;
		background: #f2f2f25b;
		.cellValue{
			text-align: right;
		}
	}
</style>
