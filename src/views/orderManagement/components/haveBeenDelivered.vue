<template>
	<div class="haveBeenDeliveredBox">
		<PageList
		:getData="getData"
		noListText="暂无已配送订单"
		ref="pageList"
		>
			<template v-slot:default="slotProps">
				 <DeliveredListItem v-for="(item, index) in slotProps.dataList" 
				 :itemData="item"
				 :key="item.id"
				 @showDetail="showDetail"
				 />
			</template>
		</PageList>
	</div>
</template>

<script>
	import PageList from '@/components/pageList'
	import DeliveredListItem from '@/components/listItems/deliveredListItem'
	import { getOrderList } from '@/api/ktvClerkOrder.js'
	export default{
		props:{
			params:{
				type: Object,
				default: () =>{}
			}
		},
		components:{
			PageList,
			DeliveredListItem
		},
		data(){
			return{
				
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
				console.log(this.$refs.pageList.deletedItem);
				this.$refs.pageList.deletedItem('id', id);
			},
			search(){
				this.$refs.pageList.onReload();
			},
			getData(params){
				let send_data = {
					ktv_id: this.$store.state.user.ktv_id,
					package_status: 1,
					ordering: '-pay_time'
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
						let result = {
							total: res.data.count,
							data: res.data.results
						};
						resolve(result);
					})
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.haveBeenDeliveredBox{
		height: 100%;
		overflow: auto;
	}
</style>
