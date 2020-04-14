<template>
	<div class="accountRecordBox">
		<PageList
		:getData="getData"
		noListText="暂无计费记录"
		>
		<template v-slot:default="slotProps">
			<accountRecordItem v-for="(item, index) in slotProps.dataList" :data="item" :key="index"/>
		</template>
		</PageList>
	</div>
</template>

<script>
	import PageList from '@/components/pageList'
	import accountRecordItem from '@/components/listItems/accountRecordItem'
	import { getAccountRecord } from '@/api/ktv'
	export default{
		components:{
			PageList,
			accountRecordItem,
		},
		methods:{
			getData(send_data){
				return new Promise((resolve, reject) => {
					getAccountRecord(send_data).then(res => {
						let results = {
							data: [1, 2, 3, 4, 5, 6],
							total: 6
						}
						resolve(results);
					}).catch(err => {
						console.log(err)
					})
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.accountRecordBox{
		height: 100%;
	}
</style>
