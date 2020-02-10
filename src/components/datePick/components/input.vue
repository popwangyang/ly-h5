<template>
	<div class="dateBox">
		<div class="title">
			{{title}}
		</div>
		<div class="dateValue" :class="{datePickSelected: isSelected}">
			<span v-if="timeValue != '' ">{{timeValue}}</span>
			<span v-else>请选择</span>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			isSelected:{
				type: Boolean,
				default: false
			},
			timeValue: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: '开始日期'
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.dateBox{
		.title{
			font-size:12px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(102,102,102,1);
			margin-bottom: 10px;
		}
		.dateValue{
			width: 150px;
			height: 30px;
			border: 1px solid #dcdee2;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			color: gray;
			border-radius: 6px;
		}
		
	}
	
</style>
