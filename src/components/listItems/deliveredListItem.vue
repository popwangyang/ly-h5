<template>
	<div class="deliveredListItemBox">
		<div class="box">
			<span class="title">
				<span>
					<span class="title_top">包厢 {{itemData.room_id}}</span>
					<span class="title_top">{{itemData.countNumber}}</span>
					<span class="title_state">{{itemData.package_status_display | statuesFilter}}</span>
					
				</span>
				<span class="title_dingdan_state">  {{itemData.status_display}}</span>
				<!-- <span class="btn title_btn" @click="openListBtn" v-if="openListText">{{openListText}}</span>
				<span v-else></span> -->
			</span>	
			<span class="tcname">{{itemData.package.name}}</span>
			<div class="spnameBox" ref="spnameBox" :style="{maxHeight: maxHeight}">
				<span class="spname" v-for="(item, index) in meals" :key="index">
					<span>{{item.name}}</span>
					<span>x{{item.count}}</span>
				</span>
			</div>
			<span class="ellipsis" v-show="itemData.package.goods.length > 3 && !openListStatues">...</span>
			<span class="listTextBtn" @click="openListBtn" v-if="openListText">{{openListText}}</span>
			<div class="sfBox">
				<span>实付金额</span>
				<span>￥{{itemData.real_amount_display}}</span>
				<!--<span>
					
					 <span>  {{itemData.status_display}}</span> 
				</span>-->
			</div>
			<span class="bottom">
				<span>{{itemData.pay_time}}</span>
				<span>
					<van-button size="mini" class="btn" plain type="primary" @click="detailBtn">详情</van-button>
					<van-button class="btn confirm_btn" @click="confirmBtn" size="mini" plain type="info" v-if="itemData.package_status_display == '未送达' ? true:false">
						{{confirmText}}
					</van-button>
				</span>
			</span>
		</div>
	</div>
</template>

<script>
	import Loading from '@/components/loading/loading.vue'
	export default{
		components:{
			Loading
		},
		props:{
			itemData:{
				type:Object,
				default: () => {
					return {
						package:{
							goods:[]
						}
					}
				}
			},
			rows:{
				type:Number,
				default: 12
			},
			confirmAjax:{
				type: Function
			}
		},
		computed:{
			maxHeight(){
				return 20 * this.rows + 8 + "px";
			},
			openListText(){
				if(this.itemData.package.goods.length <= 3){
					return '';
				}else if(this.openListStatues){
					return '收起';
				}else{
					return '展开';
				}
			},
			meals(){
				if(this.openListStatues){
					return this.itemData.package.goods;
				}else{
					return this.itemData.package.goods.slice(0, 3);
				}
			},
			confirmText(){
				return this.confirmLoading ? '确认中...':'确认配送';
			}
		},
		data(){
		   return{
			   openListStatues: false,
			   confirmLoading: false,
		   }
		},
		filters:{
			statuesFilter(state){
				return state == '未送达' ? '待配送':'已配送';
			}
		},
		methods:{
			openListBtn(){
				this.openListStatues = !this.openListStatues;
			},
			detailBtn(){
				this.$emit('showDetail', this.itemData.id);
			},
			confirmBtn(){
				this.confirmLoading = true;
				this.confirmAjax(this.itemData.id).then(res => {
					this.confirmLoading = false;
				}).catch(err => {
					this.confirmLoading = false;
				})
			}
		}
	}
</script>
<style scoped="scoped" lang="less">
	.deliveredListItemBox{
		background-color: white;
		padding: 15px;
		// transition: all 1s;
		display: flex;
		width: 100%;
		box-sizing: border-box;
		// overflow: hidden;
		// border: 10px solid;
		// border-color: #f6f6f6; 
		.box{
			border: 1px solid #EEEEEE;
			padding: 10px;
			display: flex;
			width: 100%;
			flex-direction: column;
			.btn{
				padding: 2px 4px;
				font-size: 12px;
			}
			.title{
				display: flex;
				height: 20px;
				justify-content: space-between;
				align-items: center;
				font-size:12px;
				margin-bottom: 20px;
				.title_top{
					font-size:14px;
					font-weight:400;
					color:rgba(68,68,68,1);
					margin-right: 10px;
				}
				.title_state{
					
					font-weight:400;
					color:rgba(153,153,153,1);
				}
				.title_btn{
					border:1px solid rgba(252,136,101,1);
					color: rgba(252,136,101,1);
				}
				.title_dingdan_state{
					font-size:12px;
					font-weight:400;
					color:rgba(252,136,101,1);
				}
				
			}
		    .tcname{
				font-size:14px;
				color: #666666;
				margin: 10px 0;
			}
			.spnameBox{
				overflow: auto;
				.spname{
					font-size:12px;
					color:rgba(102,102,102,1);
					margin: 8px 0;
					display: flex;
					justify-content: space-between;
					span{
						flex: 1;
					}
					&>span:nth-child(2){
						align-self: flex-start;
					}
				}
			}
			.ellipsis{
				display: block;
				margin-bottom: 10px;
			}
			.listTextBtn{
				font-size:12px;
				font-weight:400;
				color:rgba(153,153,153,1);
				margin-top: 10px;
				
			}
			.sfBox{
				border-top: 1px solid #EEEEEE;
				padding-top: 20px;
				margin-top: 20px;
				padding-bottom: 10px;
				&>span:nth-child(1){
					font-size:14px;
					font-weight:400;
					color:rgba(102,102,102,1);
					margin-right: 10px;
					display: inline-block;
				}
				&>span:nth-child(2){
					font-size:14px;
					font-weight:400;
					color:rgba(254,96,66,1);
				}
				
			}
			.bottom{
				display: flex;
				align-items: center;
				justify-content: space-between;
				&>span:nth-child(1){
					font-size:12px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(204,204,204,1);
					
				}
				.btn{
					min-width: auto;
					padding: 0 6px;
				}
				.confirm_btn{
					margin-left: 20px;
				}
			}
		}
	}
</style>
