<template>
	<van-collapse-item :name="name" class="approvalRecordItemBox">
		<span slot="title" class="title">
			<div>
				<span>{{data.approve_type | titleFilters}}</span>
			</div>
			<div>
				发起时间：{{data.create_date}}
			</div>
		</span>
		<div class="content">
			<slot></slot>
		</div>
	</van-collapse-item>
</template>

<script>
	export default{
		props:{
			name:{
				type: Number
			},
			data:{
				type: Object
			}
		},
		filters:{
			titleFilters(state){
				let result = '创建审批';
				switch(state){
					case 1:
					  result = '创建审批';
					  break;
					case 2:
					  result = '修改审批';
					  break;
					case 3:
					  result = '终止审批';
					  break;
					case 4:
					  result = '更改计费方式审批';
					  break;
				}
				return result;
			}
		}
	}
</script>
<style>
	.approvalRecordItemBox .van-steps{
		background: transparent;
	}
</style>
<style scoped="scoped" lang="less">
	.approvalRecordItemBox{
		.title{
			display: flex;
			flex-direction: column;
			&>div:nth-child(1){
				font-size:14px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(68,68,68,1);
			}
			&>div:nth-child(2){
				font-size:10px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
			}
		}
		.content{
			background: #F7F7F7;
		}
	}
</style>
