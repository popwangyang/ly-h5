<template>
	<div class="haveBeenDeliveredBox">
		<PageList
		:getData="getData"
		noListText="暂无待配送订单"
		ref="pageList"
		>
			<template v-slot:default="slotProps">
				 <DeliveredListItem v-for="(item, index) in slotProps.dataList" 
				 :itemData="item"
				 :key="item.id"
				 @showDetail="showDetail"
				 @haveBeDeliver="haveBeDeliver"
				 />
			</template>
		</PageList>
	</div>
</template>

<script>
	import PageList from '@/components/pageList'
	import DeliveredListItem from '@/components/listItems/deliveredListItem'
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
			getData(){
				return new Promise((resolve, reject) => {
					let data = [{
						id: 3,
						countNumber: '888',
						statues: 2,
						mealName: '娱乐大酬宾',
						meals:[
							{
								name: '百威',
								number: 1,
							},
							{
								name: '可口可乐',
								number: 1,
							}
						],
						create_date:'2020-01-09 12:09:01'
					},{
						id: 4,
						countNumber: '888',
						statues: 2,
						mealName: '娱乐大酬宾',
						meals:[
							{
								name: '百威',
								number: 1,
							},
							{
								name: '可口可乐',
								number: 1,
							}
						],
						create_date:'2020-01-09 12:09:01'
					}];
					setTimeout(() => {
						resolve({total: 2, data: data})
					}, 1000)
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
