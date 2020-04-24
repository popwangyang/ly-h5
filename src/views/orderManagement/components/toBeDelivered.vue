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
		components:{
			PageList,
			DeliveredListItem,
			TranstionsList
		},
		data(){
			return {
				total:0
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
			getData(params){
				console.log(params);
				let send_data = {
					ktv_id_list: this.$store.state.user.ktv_id,
					package_status: 2
				}
				Object.assign(send_data, params);
				return new Promise((resolve, reject) => {
<<<<<<< HEAD
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
							},
							{
								name: '百威',
								number: 1,
							},
							{
								name: '可口可乐',
								number: 1,
							},
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
=======
					getOrderList(send_data).then(res => {
						let result = {
							total: res.data.count,
							data: res.data.results
						};
						this.$store.commit('setUndelivered', res.data.count);
						resolve(result);
					})
>>>>>>> wangyan
				})
			}
		},
		mounted() {
			console.log('ppp');
			this.$store.commit('setUndelivered', 4);
		}
	}
</script>

<style scoped="scoped" lang="less">
	.toBeDeliveredBox{
		height: 100%;
		overflow: auto;
	}
</style>
