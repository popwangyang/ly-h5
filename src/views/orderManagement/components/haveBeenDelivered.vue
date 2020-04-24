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
				console.log(id);
				this.$router.push({
					name: 'managementDetail'
				})
			},
			haveBeDeliver(id){
				console.log(this.$refs.pageList.deletedItem);
				this.$refs.pageList.deletedItem('id', id);
			},
			getData(params){
				console.log(params);
				let send_data = {
					ktv_id_list: this.$store.state.user.ktv_id,
					package_status: 1
				}
				Object.assign(send_data, params);
				return new Promise((resolve, reject) => {
					getOrderList(send_data).then(res => {
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
