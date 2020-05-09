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
	import { billingLog } from '@/api/ktv'
	export default{
		components:{
			PageList,
			accountRecordItem,
		},
		methods:{
			getData(send_data){
				let params = {
					ktv: this.$store.state.ktv.ktvID
				}
				Object.assign(params, send_data);
				return new Promise((resolve, reject) => {
					billingLog(params).then(res => {
						console.log(res);
						let results = {
							data: res.data.results,
							total: res.data.count
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
