<template>
	<div class="orderManagementDetail">
		<ContentLoad
		:getInfo="getData"
		>
		<span class="header">
			<span><van-icon name="checked" /></span>
			<span>已支付</span>
			<span class="left circle"></span>
			<span class="right circle"></span>
		</span>
		<van-cell title="音乐服务费" value-class="cellValue" value="音乐服务费" />
		<van-cell title="开房套餐费用" value-class="cellValue" value="音乐服务费" />
		<van-cell title="扫码订单金额" value-class="cellValue" value="音乐服务费" />
		<van-cell title="实付金额" value-class="cellValue" value="音乐服务费" />
		<van-cell title="订单编号" value-class="cellValue" value="音乐服务费" />
		<van-cell title="支付方式" value-class="cellValue" value="音乐服务费" />
		<van-cell title="交易时间" value-class="cellValue" value="音乐服务费" />
		<van-cell title="支付方式" value-class="cellValue" value="音乐服务费" />
		<van-cell title="支付方式" value-class="cellValue" value="音乐服务费" />
			
		</ContentLoad>
	</div>
</template>

<script>
	import ContentLoad from "@/components/contentLoad";
	export default{
		components:{
		  ContentLoad
		},
		data(){
			return{
				
			}
		},
		methods:{
			getData() {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve({})
					}, 1000)
				});
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.orderManagementDetail{
		height: 100%;
		overflow: auto;
		padding: 10px;
		.header{
			position: relative;
			display: flex;
			height: 50px;
			background-color: #01CCA3;
			border-top-left-radius: 4px;
			border-top-right-radius: 4px;
			align-items: center;
			justify-content: center;
			color: white;
			font-size:16px;
			font-weight:600;
			color:rgba(255,255,255,1);
			&>span:nth-child(1){
				margin-right: 6px;
			}
			.circle{
				position: absolute;
				display: block;
				width: 16px;
				height: 16px;
				border-radius: 50%;
				background-color: #F6F6F6;
				z-index: 99;
			}
			.left{
				left: -8px;
				bottom: -20px;
			}
			.right{
				right: -8px;
				bottom: -20px;
			}
		}
	}
</style>
