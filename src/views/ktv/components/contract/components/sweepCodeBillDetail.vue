<template>
	<div class="sweepCodeBillBox">
		<van-grid :column-num="3" style="border-left: 0.5px solid #ebedf0;">
			<van-grid-item>
				<span>
					<span>计费价格</span>
					<span class="tipText">（元/次/终端）</span>
				</span>
			</van-grid-item>
			<van-grid-item>计费时段</van-grid-item>
			<van-grid-item>计费日期</van-grid-item>
			<template v-for="item in charging_duration">
				<van-grid-item>
					<span>
						<span>
							{{item.price}}元
						</span>
						<span :style="{visibility: false ? 'hidden':'inherit'}">
							<van-tag type="primary">试用</van-tag>
						</span>
					</span>
				</van-grid-item>
				<van-grid-item>{{item.begin_time}} - {{item.end_time}}</van-grid-item>
				<van-grid-item>20-01-01 ~ 20-01-31</van-grid-item>
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
<style lang="less">
	.sweepCodeBillBox{
		.van-grid-item:nth-child(1),.van-grid-item:nth-child(2),.van-grid-item:nth-child(3),{
			.van-grid-item__content--center{
				padding: 6px 10px;
				font-weight: bold;
				background-color: #F6F8F9;
				border: none;
			}
		}
	}
</style>

<style scoped="scoped" lang="less">
	.sweepCodeBillBox{
        color:black;
		background-color: white;
		border-bottom: 0.5px solid #ebedf0;
		.tipText{
			font-size: 10px;
			color: gray;
			display: inline-block;
			font-weight: normal;
		}
	}
</style>
