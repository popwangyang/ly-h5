<template>
	<div class="deliveredListItemBox">
		<div class="box">
			<span class="title">
				<span>
					<span class="title_top">包厢</span>
					<span class="title_top">{{itemData.countNumber}}</span>
					<span class="title_state">{{itemData.statues | statuesFilter}}</span>
				</span>
				<span class="btn title_btn" @click="openListBtn" v-if="openListText">{{openListText}}</span>
				<span v-else></span>
			</span>			
			<span class="tcname">{{itemData.mealName}}</span>
			<div class="spnameBox" ref="spnameBox" :style="{maxHeight: maxHeight}">
				<span class="spname" v-for="(item, index) in meals" :key="index">
					<span>{{item.name}}</span>
					<span>x{{item.number}}</span>
				</span>
			</div>
			<span class="ellipsis" v-show="itemData.meals.length > 3 && !openListStatues">...</span>
			<span class="bottom">
				<span>{{itemData.create_date}}</span>
				<span>
					<span class="btn qx_btn" @click="detailBtn">详情</span>
					<span class="btn confirm_btn" @click="confirmBtn" v-if="itemData.statues == 1 ? true:false">确认配送</span>
				</span>
			</span>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			itemData:{
				type:Object
			},
			rows:{
				type:Number,
				default: 12
			}
		},
		computed:{
			maxHeight(){
				return 20 * this.rows + 8 + "px";
			},
			openListText(){
				if(this.itemData.meals.length <= 3){
					return '';
				}else if(this.openListStatues){
					return '收起';
				}else{
					return '展开';
				}
			},
			meals(){
				if(this.openListStatues){
					return this.itemData.meals;
				}else{
					return this.itemData.meals.slice(0, 3);
				}
			}
		},
		data(){
		   return{
			   openListStatues: false
		   }
		},
		filters:{
			statuesFilter(state){
				return state == 1 ? '待配送':'已配送';
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
				this.$emit('haveBeDeliver', this.itemData.id);
			}
		},
		mounted() {
			
		}
	}
</script>
<style scoped="scoped" lang="less">
	.deliveredListItemBox{
		background-color: white;
		padding: 15px;
		transition: all 1s;
		display: flex;
		width: 100%;
		box-sizing: border-box;
		border: 10px solid;
		border-color: #f6f6f6; 
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
				.qx_btn{
					color: #00CDA2;
					border: 1px solid #00CDA2;
				}
				.confirm_btn{
					color: #0096F7;
					border: 1px solid #0096F7;
					margin-left: 20px;
				}
			}
		}
	}
</style>
