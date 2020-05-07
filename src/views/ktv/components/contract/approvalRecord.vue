<template>
	<div class="approvaRecordBox">
		<PageList
		:getData="getData"
		noListText="暂无审批记录"
		>
		<template v-slot:default="slotProps">
			<van-collapse v-model="activeName" accordion>
				<approvalRecordItem v-for="(item, index) in slotProps.dataList" :data="item" :key="index" :name="index">
						<approvalSteps :tag_full="item.tag_full"></approvalSteps>
				</approvalRecordItem>
			</van-collapse>
		</template>
		</PageList>
	</div>
</template>

<script>
	import PageList from '@/components/pageList'
	import approvalRecordItem from '@/components/listItems/approvalRecordItem'
	import approvalSteps from './components/approvalSteps'
	import { getContractApprovalRecord } from '@/api/ktv'
	export default{
		components:{
			PageList,
			approvalRecordItem,
			approvalSteps
		},
		data(){
			return{
				activeName: ''
			}
		},
		methods:{
			getData(send_data){
				return new Promise((resolve, reject) => {
					send_data.contract = this.$route.query.contractID;
					send_data.level = 1;
					getContractApprovalRecord(send_data).then(res => {
						let results = {
							data: res.data.results,
							total: res.data.count
						}
						resolve(results);
					})
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.approvaRecordBox{
		height: 100%;
	}
</style>
