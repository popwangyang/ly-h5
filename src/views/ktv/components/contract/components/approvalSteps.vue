<template>
	<div class="approvalStepsBox">
		<ContentLoad
		:getInfo="getData"
		noListText="暂无审批记录"
		>
			<van-steps direction="vertical">
			  <van-step v-for="(item, index) in steps" :key="index">
				<span slot="active-icon" class="activeIcon"></span>
				<span slot="inactive-icon" class="activeIcon"></span>
			    <span class="stepBox">
					<span>{{item.approval_name}}</span>
					<span>{{item.create_date}}</span>
				</span>
				<span v-if="item.approval_state == 1">
					<p class="statues" >{{item.approve_type | filterApprovalType}}</p>
				</span>
				<span v-else-if="item.approval_state == 2">
					<p class="statues" >审批通过</p>
				</span>
			    <span v-else>
					<span class="error">审批退回</span>
					<p class="reason">退回理由：{{item.remark}}</p>
				</span>
			  </van-step>
			</van-steps>
		</ContentLoad>
	</div>
</template>

<script>
	import { getContractApprovalRecord } from '@/api/ktv'
	import ContentLoad from "@/components/contentLoad";
	export default{
		props:{
			tag_full: [Number, String]
		},
		components:{
		  ContentLoad,
		},
		data(){
			return{
				steps: [],
			}
		},
		filters:{
			filterApprovalType(type){
				console.log(type)
				let result = null;
				switch(type){
					case 1:
					  result = '提交合同审批';
					break;
					case 2:
					  result = '提交合同修改审批';
					break;
					case 3:
					  result = '提交合同终止审批';
					break;
					case 4:
					  result = '提交合同更改计费方式审批';
					break;
				}
				return result;
			}
		},
		methods:{
			getData(){
				return new Promise((resolve, reject) => {
					let send_data = {
						tag_full: this.tag_full
					}
					getContractApprovalRecord(send_data).then(res => {
						this.steps = res.data.results;
						resolve();
					}).catch(err => {
						reject();
					})
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.approvalStepsBox{
		// min-height: 200px;
		display: flex;
		align-items: flex-start;
		.activeIcon{
			width:7px;
			height:7px;
			display: block;
			background: #bff2e8;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			&:after{
				content: '';
				display: block;
				background: #01CCA3;
				width: 3px;
				height: 3px;
				border-radius: 50%;
			}
		}
		.stepBox{
			display: flex;
			justify-content: space-between;
			width: 100%;
			color: #999999;
			font-size: 12px;
			&+p{
				margin-bottom: 20px;
			}
		}
		.statues{
			color: #444444;
			font-size: 14px;
			margin: 10px 0;
		}
		.error{
			color: #EE2B30;
			font-size: 14px;
			margin: 10px 0;
			display: block;
		}
		.reason{
			color: #999999;
		    font-size: 12px;
		}
	}
</style>
