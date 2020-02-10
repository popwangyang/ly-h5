<template>
	<div class="activityBox">
		<PageList
		:getData="getData"
		noListText="暂无参加活动"
		>
		<template v-slot:default="slotProps">
			<div>
				<activityListItem v-for="(item, index) in slotProps.dataList" :data="item" :key="index" />
			</div>
		</template>
		</PageList>
	</div>
</template>

<script>
	import PageList from '@/components/pageList'
	import activityListItem from '@/components/listItems/activityListItem'
	import { getActivityList } from '@/api/ktv'
	export default{
		components:{
			PageList,
			activityListItem
		},
		data(){
			return{
				
			}
		},
		methods:{
			getData(data){
				let params = {
					p_index: data.page_index,
					p_size: data.page_size,
					ktv_id: this.$store.state.ktv.ktvID
				}
				return new Promise((resolve, reject) => {
					getActivityList(params).then(res => {
						let results = {
							total: res.data.p_total,
							data: res.data.data
						}
						resolve(results);
					})
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.activityBox{
		height: 100%;
		overflow: auto;
	}
</style>
