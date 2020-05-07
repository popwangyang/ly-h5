<template>
	<div class="accountRecordItemBox">
		<span>{{data.log_operator}}</span>
		<span>{{data.billing_time}}</span>
	</div>
</template>

<script>
	export default{
		props:{
			data:{
				type:Object
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.accountRecordItemBox{
		height:50px;
		background:rgba(255,255,255,1);
		margin: 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px;
		&>span:nth-child(1){
			font-size:14px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(68,68,68,1);
		}
		&>span:nth-child(2){
			font-size:14px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(153,153,153,1);
		}
	}
</style>
