<template>
	<div class="toBeDeliveredBox">
		<PageList
		:getData="getData"
		noListText="暂无待配送订单"
		ref="pageList"
		>
			<template v-slot:default="slotProps">
				<TranstionsList>
					<DeliveredListItem v-for="(item, index) in slotProps.dataList"
					:itemData="item"
					:key="item.id"
					@showDetail="showDetail"
					:confirmAjax="haveBeDeliver"
					/>
				</TranstionsList>
			</template>
		</PageList>
	</div>
</template>

<script>
	import PageList from '@/components/pageList'
	import DeliveredListItem from '@/components/listItems/deliveredListItem'
	import TranstionsList from '@/components/transtionList'
	import { getOrderList, putOrderDeliverStatues } from '@/api/ktvClerkOrder.js'
	export default{
		props:{
			params:{
				type: Object,
				default: () =>{}
			}
		},
		components:{
			PageList,
			DeliveredListItem,
			TranstionsList
		},
		data(){
			return {
				total:0,
			}
		},
		methods:{
			showDetail(id){
				this.$router.push({
					name: 'managementDetail',
					query:{
						id: id
					}
				})
			},
			haveBeDeliver(id){
				return new Promise((resolve, reject) => {
					let send_data = {
						package_status: '1',
						id: id
					}
					putOrderDeliverStatues(send_data).then(res => {
						this.$refs.pageList.deletedItem('id', id);
						this.$store.commit('setUndelivered', --this.total);
						this.$toast('操作成功！');
						resolve();
					}).catch(err => {
						this.$toast('操作失败，请稍后重试！');
						reject();
					})
				})
				
			},
			search(){
				this.$refs.pageList.onReload();
			},
			getData(params){
				let send_data = {
					ktv_id: this.$store.state.user.ktv_id,
					package_status: 2
				}
				Object.assign(send_data, params);
				Object.assign(send_data, this.params);
				return new Promise((resolve, reject) => {
					getOrderList(send_data).then(res => {
						res.data.results.map(item => {
							if(!item.package){
								item.package = {
									name: '',
									goods: []
								}
							}
						})
						console.log(res.data.results);
						let result = {
							total: res.data.count,
							data: res.data.results
						};
						this.$store.commit('setUndelivered', res.data.count);
						resolve(result);
					})
				})
			}
		},
	}
</script>

<style scoped="scoped" lang="less">
	.toBeDeliveredBox{
		height: 100%;
		overflow: auto;
	}
</style>
