<template>
	<div class="orderManagementBox" ref="scroll">
		<van-tabs line-height="6" v-model="currentTabComponent" line-width="50" animated>
		  <van-tab name="toBeDelivered">
			  <span slot="title">
				 <TabTitle title="待配送" :info="undeliveredNum"/> 
			  </span>
			  <span>
				  <toBeDelivered :params="search" ref="toBeDelivered"/>
			  </span>
		  </van-tab>
		  <van-tab  name="haveBeenDelivered">
			  <span slot="title">
			  	<TabTitle title="已配送"/> 
			  </span>
			  <span>
				  <haveBeenDelivered :params="search" ref="haveBeenDelivered"/>
			  </span>
		  </van-tab>
		</van-tabs>
		<span class="screen" @click="popupBtn">筛选</span>
		<van-popup
		  v-model="show"
		  position="right"
		  :style="{ width: '280px', height: '100%' }"
		>
		  <div class="popupRightBox">
		    <div class="content">
				<span class="box">
					<span class="boxTitle">时间</span>
					<span class="boxList">
						<DatePick v-model="search.pay_time"/>
					</span>
				</span>
				<span class="box">
					<span class="boxTitle">交易状态</span>
					<span class="boxList">
					  <span
					    :class="{isSelected: search.status == item.id ? true: false }"
					    v-for="(item, index) in list"
					    :key="index"
						@click="selectedBtn(item.id)"
					  >{{item.text}}</span>
					</span>
				</span>
		    </div>
		    <div class="bottom">
		      <span @click="resetBtn">重置</span>
		      <span class="a" @click="searchBtn">搜索</span>
		    </div>
		  </div>
		</van-popup>
	</div>
</template>

<script>
	import DatePick from './components/dateTime'
	import TabTitle from '@/components/tags/tabTitle'
	import toBeDelivered from './components/toBeDelivered.vue'
	import haveBeenDelivered from './components/haveBeenDelivered.vue'
	import { getDay } from '@/libs/util'
	import { cacheMixins } from "@/libs/mixins";
	export default{
		// name: 'orderManagement',
		mixins: [cacheMixins],
		components:{
			TabTitle,
			toBeDelivered,
			haveBeenDelivered,
			DatePick
		},
		data(){
			return{
				show: false,
				currentTabComponent:"toBeDelivered",
				search:{
					status: '',
					pay_time: '',
					pay_time_start:'',
					pay_time_end: ''
				},
				list: [
					{
						id: '',
						text: '全部'
					},
					{
						id: '2',
						text: '已支付'
					},
					{
						id: '4',
						text: '已退款'
					},
					{
						id: '6',
						text: '已完成'
					},
				]
			}
		},
		computed:{
		   undeliveredNum(){
			   return this.$store.state.app.undeliveredNum;
		   }	
		},
		watch: {
			currentTabComponent(newValue, oldValue) {
				if(newValue == 'haveBeenDelivered'){
					this.$refs.haveBeenDelivered.search();
				}
			}
		},
		methods:{
			popupBtn(){
				this.show = true;
			},
			searchBtn(){
				this.search.pay_time_start = this.search.pay_time ? this.search.pay_time + ' 00:00:00' : '';
				this.search.pay_time_end = this.search.pay_time ?  this.search.pay_time + ' 23:59:59': '';
				this.$refs[this.currentTabComponent].search();
				this.show = false;
			},
			resetBtn(){
				this.search.pay_time = '';
				this.search.status = "";
			},
			selectedBtn(id){
				this.search.status = id;
			}
		}
	}
</script>
<style lang="less">
	.orderManagementBox{
		position: relative;
		.screen{
			position: absolute;
			right: 16px;
			top: 20px;
			transform: translateY(-50%);
			color: #1989fa;
		}
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
		.popupRightBox {
		  width: 100%;
		  height: 100%;
		  overflow: hidden;
		  display: flex;
		  flex-direction: column;
		  justify-content: space-between;
		  .bottom {
		    width: 100%;
		    height: 50px;
		    display: flex;
		    background: rgba(243, 245, 247, 1);
		    box-shadow: 0px -1px 5px -1px rgba(0, 0, 0, 0.16);
		    font-size: 16px;
		    font-weight: 500;
		    & > span {
		      display: flex;
		      flex: 1;
		      height: 100%;
		      align-items: center;
		      justify-content: center;
		    }
		    & > span:nth-child(2) {
		      flex: 2;
		    }
		    .a {
		      background: #0082ff;
		      color: white;
		    }
		  }
		  .content {
		    padding-left: 20px;
			padding-right: 20px;
		    .box {
		      .boxTitle {
		        font-size: 14px;
		        color: #444444;
		        display: block;
		        margin: 20px 0;
		        font-weight: 600;
		      }
		      .boxList {
		        display: flex;
		        flex-wrap: wrap;
		        font-size: 12px;
		        & > span {
		          padding: 10px 20px;
		          margin: 0 20px 20px 0;
		          min-width: 70px;
		          box-sizing: border-box;
		          background: #f3f5f7;
		          color: #444444;
		        }
		        & > span[class="isSelected"] {
		          background: white;
		          color: #0082ff;
		          border-radius: 2px;
		          border: 1px solid rgba(0, 130, 255, 1);
		        }
		      }
		    }
		  }
		}
	}
</style>
