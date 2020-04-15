<template>
	<div class="cardRecodeBox">
		<div class="title">
			<span>
				<date-pick v-model="dataValue"></date-pick>
			</span>
			<span>
				<van-icon name="search" size="24" color="#C6CBD4" @click="search"/>
			</span>
		</div>
		<div class="content">
			<PageList
			:getData="getCardTicketList"
			noListText="暂无兑换记录"
			:params="params"
			ref="pageList"
			>
				<template v-slot:default="slotProps">
					 <cardTicketItem v-for="(item, index) in slotProps.dataList" :key="index"/>
				</template>
			</PageList>
		</div>
	</div>
</template>

<script>
	import datePick from '@/components/datePick'
	import PageList from '@/components/pageList'
	import cardTicketItem from '@/components/listItems/cardTicketItem'
	import { getCardTicketList } from '@/api/cardTicket'
	import { getDay } from '@/libs/util'
	export default{
		components:{
			datePick,
			PageList,
			cardTicketItem
		},
		watch:{
			dataValue(newValue){
				console.log(newValue);
				this.params = {
					ktv_id: 345,
					start_date: newValue[0],
					end_date: newValue[1]
				}
				this.$refs.pageList.onReload()
			}
		},
		data(){
			return{
				params:{
					ktv_id: 345,
					start_date: getDay(new Date()),
					end_date: getDay(new Date())
				},
				dataValue:[
					getDay(new Date()),
					getDay(new Date()),
				],
				getCardTicketList: getCardTicketList
			}
		},
		methods:{
			search(){
				this.$router.push({
					name: 'cardTicketRecordSearch',
					query:{
						type: 'cardTicket'
					}
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.cardRecodeBox{
		height: 100%;
		display: flex;
		flex-direction: column;
		.title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 46px;
			padding: 0 16px;
			border-bottom: 1px solid #d7d7d7;
			background: white;
		}
		.content{
			flex: 1;
			background: #f2f2f2;
			overflow: auto;
		}
	}
</style>
