<template>
	<div class="timeNoteBox">
		<van-cell 
		title-class="titleClass" 
		title="创建时间" 
		value-class="cellValue" 
		:value="formData.create_date" 
		v-if="formData.create_date"/>
		<van-cell 
		title-class="titleClass" 
		title="生效时间" 
		value-class="cellValue" 
		:value="formData.effective_time" 
		v-if="formData.effective_time"/>
		<van-cell 
		title-class="titleClass"
		 title="终止时间" 
		 value-class="cellValue" 
		 :value="formData.termination_time" 
		 v-if="formData.termination_time"/>
		<!-- <van-cell 
		title-class="titleClass" 
		title="开始计费时间" 
		value-class="cellValue" 
		:value="formData.billing_state_time" 
		v-if="formData.billing_state_time"/>
		<van-cell 
		title-class="titleClass" 
		title="暂停计费时间" 
		value-class="cellValue" 
		:value="formData.billing_state_time_end" 
		v-if="formData.billing_state_time_end"/> -->
	</div>
</template>

<script>
	export default{
		props:{
			contractType:{
				type: Number,
				default: 0
			}
		},
		computed:{
			formData(){
				let contractDetail = this.$store.state.ktv.contractDetail.contract;
				let {
					 create_date,
					 effective_time, 
					 termination_time, 
					 billing_state_time, 
					 billing_state_time_end} = contractDetail;
				return {
					 create_date,
					 effective_time, 
					 termination_time, 
					 billing_state_time, 
					 billing_state_time_end};
			}
			
			
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.timeNoteBox{
		.titleClass{
			font-size: 12px;
		}
		.cellValue{
			font-size: 12px;
			color: black;
		}
	}
</style>
