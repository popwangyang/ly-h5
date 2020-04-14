<template>
	<div class="circularDataBox">
		<van-tabs line-height="6" line-width="96"  v-model="active" animated>
		  <van-tab title="扫码计费收入">
			<Content>
				<span>
					<span>总收入</span>
					<span class="money">¥80,000.00</span>
				</span>
				<span>
					<span>
						<b class="b1"></b>
						<span>音乐服务费</span>
					</span>
					<span class="money">¥900</span>
				</span>
				<span>
					<span>
						<b class="b2"></b>
						<span>商户开房套餐</span>
					</span>
					<span class="money">¥89</span>
				</span>
			</Content>
		  </van-tab>
		  <van-tab  title="扫码计费订单">
			<Content>
				<span>
					<span>订单总数</span>
					<span class="money">20,000.00</span>
				</span>
				<span>
					<span>
						<b class="b2"></b>
						<span>退款订单</span>
					</span>
					<span class="money">900</span>
				</span>
				<span>
					<span>
						<b></b>
						<span>退款金额</span>
					</span>
					<span class="money">¥89</span>
				</span> 
			</Content>
		  </van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import Content from './components/content.vue'
	export default{
		components:{
		   Content
		},
		data(){
			return{
				active:0,
				currentRate:0
			}
		}
	}
</script>
<style lang="less">
	.circularDataBox{
		margin-bottom: 20px;
		.van-tab{
			flex: none;
			font-size:12px;
			font-family:PingFangSC-Semibold,PingFang SC;
			font-weight:600;
			color:rgba(183,183,183,1);
			line-height: 64px;
			margin-right: 20px;
		}
		.van-tabs__line{
			background: linear-gradient(180deg,rgba(0,184,255,0) 0%,rgba(0,130,255,1) 100%);
		}
		.van-tab--active{
			font-size:16px;
			font-family:PingFangSC-Semibold,PingFang SC;
			font-weight:bold;
			color:rgba(68,68,68,1);
		}
	}
</style>

<style scoped="scoped" lang="less">
	.circularDataBox{
	  height: 180px;
	  background-color: white;
	  padding: 0 20px;
	 
	
	}
</style>
