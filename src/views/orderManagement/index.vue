<template>
	<div class="orderManagementBox" ref="scroll">
		<van-tabs line-height="6" v-model="currentTabComponent" line-width="50">
		  <van-tab name="toBeDelivered">
			  <span slot="title">
				 <TabTitle title="待配送" :info="undeliveredNum"/> 
			  </span>
			  <span>
				  <toBeDelivered/>
			  </span>
		  </van-tab>
		  <van-tab  name="haveBeenDelivered">
			  <span slot="title">
			  	<TabTitle title="已配送"/> 
			  </span>
			  <span>
				  <haveBeenDelivered/>
			  </span>
		  </van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import TabTitle from '@/components/tags/tabTitle'
	import toBeDelivered from './components/toBeDelivered.vue'
	import haveBeenDelivered from './components/haveBeenDelivered.vue'
	import { cacheMixins } from "@/libs/mixins";
	export default{
		name: 'orderManagement',
		mixins: [cacheMixins],
		components:{
			TabTitle,
			toBeDelivered,
			haveBeenDelivered
		},
		data(){
			return{
				currentTabComponent:"toBeDelivered"
			}
		},
		computed:{
		   undeliveredNum(){
			   return this.$store.state.app.undeliveredNum;
		   }	
		}
	}
</script>
<style lang="less">
	.orderManagementBox{
		.van-tabs{
			display: flex;
			flex-direction: column;
			height: 100%;
		}
		.van-ellipsis{
			overflow: visible;
		}
		.van-tab{
			flex: none;
			font-size:14px;
			font-family:PingFangSC-Semibold,PingFang SC;
			font-weight:600;
			color:rgba(183,183,183,1);
			margin-right: 50px;
		}
		.van-tab__pane{
			height: 100%;
		}
		.van-tabs__content{
			overflow: auto;
			flex: 1;
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
