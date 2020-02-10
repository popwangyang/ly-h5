<template>
	<van-cell title-class="title">
		<span slot="title">
			{{data.operation_name}}
		</span>
		<span slot="label">
			<div>活动日期：</div>
			<div>{{data.start_date}} 至 {{data.end_date}}</div>
		</span>
		<span>
			{{statusText}}
		</span>
	</van-cell>
</template>

<script>
	export default{
		props:{
			data:{
				type: Object,
				required: true
			}
		},
		computed:{
			statusText(){
				let result = '进行中'
				let date = new Date();
				let endData = new Date(this.data.end_date);
				if(date > endData){
					result = '已结束'
				}
			    return result;
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.title{
		flex: 5;
	}
</style>
