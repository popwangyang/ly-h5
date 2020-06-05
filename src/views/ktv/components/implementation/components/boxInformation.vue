<template>
	<div class="boxInformationBox">
		<span class="notData" v-if="pageStatues == 0">
			<span>尚未同步数据</span>
			<span>
				<van-button  class="buttonSquare" @click="syncBtn">同步数据</van-button>
			</span>
		</span>
		<ContentLoad
		v-else
		:getInfo="getData"
		emptyText="暂无包厢信息"
		>
			<div class="title">
				<span @click="editedBtn">
					<span v-if="isEdited">保存</span>
					<span v-else>编辑</span>
				</span>
			</div>
			<div class="divider"></div>
			 <boxListItem v-for="(item, index) in dataList" 
			 :data="item"
			 :key="index"
			 :isEdited="isEdited"
			 />
		</ContentLoad>
		<Replay @btnClick="refresh" v-show="!isEdited && pageStatues == 1"/>
	</div>
</template>

<script>
	import { actionsAuthority } from '@/libs/util'
	import Replay from './replay'
	import ContentLoad from '@/components/contentLoad'
	import { getBoxInfoList, patchBoxInfoList, syncBoxInfoList } from '@/api/ktv'
	import boxListItem from '@/components/listItems/boxListItem'
	export default{
		components:{
			ContentLoad,
			boxListItem,
			Replay
		},
		data(){
			return{
				ktv_implementation_info_edit: actionsAuthority('ktv_implementation_info_edit'),
				dataList: [],
				isEdited: false,
			}
		},
		computed:{
			pageStatues(){
				return this.$store.state.ktv.firstSet;
			}
		},
		methods:{
			syncBtn(){
				let send_data = {
					   ktv: this.$store.state.ktv.ktvID,
					   id: this.$store.state.ktv.implementID,
					   first_set: 1
					}
				syncBoxInfoList(send_data).then(res => {
					this.$store.commit('setBoxInfoFirstSet', 1);
				})
			},
			editedBtn(){
				if(!this.ktv_implementation_info_edit){
					this.$toast('您无编辑实施信息权限！！')
					return
				}
				this.isEdited = !this.isEdited;
				console.log(this.dataList)
				if(this.isEdited) return;
				this.$toast.loading({
				  duration: 0, // 持续展示 toast
				  forbidClick: true,
				  message: '修改中...'
				});
				patchBoxInfoList(this.dataList).then(res => {
					this.$toast.success('修改成功');
				}).catch(err => {
					this.$toast('修改失败，请稍后重试');
				})
			},
			refresh(){
				let send_data = {
					id: this.$store.state.ktv.ktvID
				}
				getBoxInfoList(send_data).then(res => {
					this.dataList = res.data.data;
					this.$toast.success('刷新成功');
				}).catch(err => {
					this.$toast('刷新失败');
				})
			},
			getData(){
				return new Promise((resolve, reject) => {
					let send_data = {
						id: this.$store.state.ktv.ktvID
					}
					getBoxInfoList(send_data).then(res => {
						this.dataList = res.data.data;
						if(this.dataList.length > 0){
							resolve({});
						}else{
							resolve('');
						}
					})
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.boxInformationBox{
		height: 100%;
		background: #f2f2f25b;
		overflow: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		.title{
			color: #0082FF;
			background: white;
			height: 40px;
			display: flex;
			padding: 0 16px;
			align-items: center;
			justify-content: flex-end;
		}
		.notData{
		   display: flex;
		   flex-direction: column;
		   font-size:14px;
		   font-family:PingFangSC-Regular,PingFang SC;
		   font-weight:400;
		   color:rgba(153,153,153,1);
		   align-items: center;
		   &>span{
			   display: block;
			   margin-bottom: 10px;
		   }
		}
	}
</style>
