<template>
	<div class="circularDataBox">
		<van-tabs line-height="6" line-width="96"  v-model="active" animated>
		  <van-tab title="扫码计费收入">
			<Content :rate="scanCodeBillRate">
				<span>
					<span>总收入</span>
					<span class="money">¥{{formData.amount}}</span>
				</span>
				<span>
					<span>
						<b class="b1"></b>
						<span>音乐服务费</span>
					</span>
					<span class="money">¥{{formData.music_amount_display}}</span>
				</span>
				<span>
					<span>
						<b class="b2"></b>
						<span>商户开房套餐</span>
					</span>
					<span class="money">¥{{formData.package_amount_display}}</span>
				</span>
			</Content>
		  </van-tab>
		  <van-tab  title="扫码计费订单">
			<Content :rate="totalOrdersRate">
				<span>
					<span>订单总数</span>
					<span class="money">{{formData.count}}</span>
				</span>
				<span>
					<span>
						<b class="b2"></b>
						<span>退款订单</span>
					</span>
					<span class="money">{{formData.refund_count}}</span>
				</span>
				<span>
					<span>
						<b></b>
						<span>退款金额</span>
					</span>
					<span class="money">¥{{formData.refund_amount_display}}</span>
				</span> 
			</Content>
		  </van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import Content from './components/content.vue'
	import { orderDisplay } from '@/api/managementData.js'
	export default{
		components:{
		   Content
		},
		data(){
			return{
				active:0,
				currentRate:0,
				formData:{
					amount_display: "00.0",
					amount_music_display: "00.0",
					amount_package_display: "00.0",
					count_total: "0",
					count_refunded: "0",
					amount_refunded_display:"00.0"
				},
			}
		},
		computed:{
			scanCodeBillRate(){
				return (this.formData.music_amount_display / this.formData.amount) * 100;
			},
			totalOrdersRate(){
				return (1 - this.formData.refund_count / this.formData.count) * 100;
			}
		},
		methods:{
			getData(){
				let userType = this.$store.state.user.usertype;
				let params;
				if(userType == 'agentibus'){
					params = {
					  agent_id: this.$store.state.user.user_id
					};
				}
				orderDisplay(params).then(res => {
					console.log(res);
					this.formData = res.data;
				})
			}
		},
		activated() {
			this.getData();
		},
		mounted() {
			this.getData();
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
		.van-tabs__wrap{
			padding: 0 20px;
		}
	}
</style>

<style scoped="scoped" lang="less">
	.circularDataBox{
	  height: 180px;
	  background-color: white;
	}
</style>
