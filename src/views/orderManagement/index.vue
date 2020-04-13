<template>
	<div class="orderManagementBox">
		<van-tabs line-height="6" line-width="50" @click="onClick">
		  <van-tab title="待配送" name="toBeDelivered"></van-tab>
		  <van-tab  title="已配送" name="haveBeenDelivered"></van-tab>
		</van-tabs>
		<div class="content">
			<keep-alive>
			  <router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			onClick(name, title){
				this.$router.push({
					path:`/orderManagement/${name}`
				})
			}
		},
		mounted() {
			this.$router.push({
				path:`/orderManagement/toBeDelivered`
			})
		}
	}
</script>
<style lang="less">
	.orderManagementBox{
		.van-tabs{
			display: flex;
			flex-direction: column;
		}
		.van-tab{
			flex: none;
			font-size:14px;
			font-family:PingFangSC-Semibold,PingFang SC;
			font-weight:600;
			color:rgba(183,183,183,1);
			margin-right: 20px;
		}
		.van-tabs__nav--line{
			padding-left: 20px;
		}
		.van-tabs__line{
			bottom: 20px;
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
	.orderManagementBox{
		height: 100%;
		display: flex;
		flex-direction: column;
		.content{
			flex: 1;
			overflow: auto;
		}
	}
</style>
