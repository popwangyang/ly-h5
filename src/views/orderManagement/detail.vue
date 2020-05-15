<template>
	<div class="orderManagementDetail">
		<ContentLoad
		:getInfo="getData"
		>
		<span class="header">
			<span><van-icon name="checked" /></span>
			<span>{{detail.status_display}}</span>
			<span class="left circle"></span>
			<span class="right circle"></span>
		</span>
		<van-cell title="音乐服务费" value-class="cellValue" :value="detail.music_amount_display | filterA" />
		<van-cell title="开房套餐费用" value-class="cellValue" :value="detail.package_amount_display | filterA " />
		<van-cell title="扫码订单金额" value-class="cellValue" :value="detail.amount_display | filterA" />
		<van-cell title="实付金额" value-class="cellValue" :value="detail.real_amount_display | filterA" />
		<van-cell title="订单编号" value-class="cellValue" :value="detail.platform_id" />
		<van-cell title="支付方式" value-class="cellValue" :value="detail.platform_display" />
		<van-cell title="交易时间" value-class="cellValue" :value="detail.pay_time" />
		<span class="title" v-if="detail.package.name">购买套餐</span>
		<van-cell title="套餐名称" value-class="cellValue" v-if="detail.package.name">
			<span class="vanValue">
				<span>{{detail.package.name}}</span>
				<van-icon name="warning-o" @click.native="iconBtn"/>
			</span>
		</van-cell>
		<span class="title">参与活动</span>
		
		
		<van-cell v-if="!inActivity">
			<span class="emptyBox">
				未参与活动
			</span>
		</van-cell>
		<van-cell title="活动名称" v-else>
			<span slot="title" class="vanTitle">
				<span>活动名称</span>
				<span style="color: #969799;">#活动名称#</span>
			</span>
			<span slot="label" class="vanLabel" v-if="useCard">
				<span>
					<span>果盘券</span>
					<span>未核销</span>
				</span>
				<span>
					<span>免费</span>
					<span>1288913837813</span>
				</span>
			</span>
			<span class="emptyBox" style="margin: 0;" slot="label" v-else>
				未使用优惠券
			</span>
		</van-cell>
		</ContentLoad>
		<van-dialog v-model="dialogFlage" :title="detail.package.name">
		  <div class="dialogContent">
			  <span>套餐内容</span>
			  <span>
				  <span class="dialogListItem" v-for="(item, index) in detail.package.goods" :key="index">
					  <span>
						  <span class="tradeName">{{item.name}}</span>
						  <span class="tradeNum">X{{item.count}}</span>
					  </span>
					  <span class="tradePrice">￥{{item.original_price}}</span>
				  </span>
			  </span>
		  </div>
		</van-dialog>
	</div>
</template>

<script>
	import ContentLoad from "@/components/contentLoad";
	import { getOrderDetail } from '@/api/ktvClerkOrder.js'
	export default{
		components:{
		  ContentLoad
		},
		data(){
			return{
				dialogFlage: false,
				detail: {
					activities_display: [],
					cards_id_list: [],
					package:{}
				}
			}
		},
		filters:{
			filterA(val){
				return "￥"+val;
			},
		},
		computed:{
			inActivity(){
				return this.detail.activities_display.length == 0 ? false:true;
			},
			useCard() {
				return this.detail.cards_id_list.length == 0 ? false:true;
			}
		},
		methods:{
			iconBtn(){
				this.dialogFlage = true;
			},
			getData() {
				return new Promise((resolve, reject) => {
					let id = this.$route.query.id;
					getOrderDetail(id).then(res => {
						this.detail = res.data;
						console.log(this.detail);
						resolve(res.data);
					})
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
		.title{
			color: #999999;
			font-size: 12px;
			margin: 10px 0px;
			display: block;
		}
		.vanValue{
			display: flex;
			align-items: center;
			justify-content: flex-end;
			&>span{
				margin-right: 6px;
			}
		}
		.vanLabel{
			display: flex;
			flex-direction: column;
			background-color: #F6F8F9;
			width: 100%;
			padding: 5px 10px ;
			&>span{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 26px;
				
			}
		}
		.vanTitle{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.emptyBox{
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #F6F8F9;
			height: 80px;
			margin: 20px 0;
			color: #666666;
			font-size: 12px;
		}
		.dialogContent{
			margin: 20px 10px 10px 10px;
			color: #666666;
			font-size: 12px;
			&>span:nth-child(1){
				display: block;
				margin-bottom: 10px;
			}
			&>span:nth-child(2){
				display: block;
				border: 1px solid #EEEEEE;
				height: 164px;
				padding: 0px 10px;
				overflow: auto;
				.dialogListItem{
					display: flex;
					justify-content: space-between;
					margin: 10px 0;
					&>span:nth-child(1){
						display: inline-block;
						width: 50%;
						display: flex;
						justify-content: space-between;
					}
					.tradeName{
						margin-right: 10px;
						display: inline-block;
					}
					.tradePrice{
						font-size:12px;
						font-weight:bold;
						color:rgba(51,51,51,1);
					}
				}
			}
		}
	}
</style>
