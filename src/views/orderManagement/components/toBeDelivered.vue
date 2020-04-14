<template>
	<div class="toBeDeliveredBox">
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
			return {
				total:0
			}
		},
		methods:{
			showDetail(id){
				this.$router.push({
					name: 'managementDetail'
				})
			},
			haveBeDeliver(id){
				this.$refs.pageList.deletedItem('id', id);
				this.$store.commit('setUndelivered', --this.total);
			},
			getData(){
				return new Promise((resolve, reject) => {
					let data = [{
						id: 1,
						countNumber: '888',
						statues: 1,
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
						id: 2,
						countNumber: '888',
						statues: 1,
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
						id: 3,
						countNumber: '888',
						statues: 1,
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
						statues: 1,
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
					this.total = 4;
					setTimeout(() => {
						resolve({total: 4, data: data})
					}, 1000)
				})
			}
		},
		mounted() {
			this.$store.commit('setUndelivered', 4);
		}
	}
</script>

<style scoped="scoped" lang="less">
	.toBeDeliveredBox{
		height: 100%;
	}
</style>
