<template>
	<div class="sweepCodeBillBox">
		<van-grid :column-num="2" style="border-left: 0.5px solid #ebedf0;">
			<van-grid-item>
				<span>
					计费价格
					<span class="tipText">（元/次/终端）</span>
				</span>
			</van-grid-item>
			<van-grid-item>计费时段</van-grid-item>
			<template v-for="item in charging_duration">
				<van-grid-item>{{item.price}}元</van-grid-item>
				<van-grid-item>{{item.begin_time}} - {{item.end_time}}</van-grid-item>
			</template>
		</van-grid>
	</div>
</template>

<script>
	export default{
		props:{
			charging_duration:{
				type: Array,
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.sweepCodeBillBox{
		padding: 16px;
		background-color: white;
		border-bottom: 0.5px solid #ebedf0;
		.tipText{
			font-size: 12px;
			color: gray;
			display: inline-block;
		}
	}
</style>
