<template>
	<div class="dateTimeBox">
		<div class="content" @click="showBtn">
			<span v-if="dateValue">{{dateValue}}</span>
			<span v-else>请选择日期</span>
			<van-icon name="arrow-down" />
		</div>
		<van-popup 
		get-container="body" 
		v-model="show" 
		position="bottom" 
		:style="{ height: '300px', overflow: 'hidden' }"
		>
		 <van-datetime-picker
		   v-model="currentDate"
		   type="date"
		   :formatter="formatter"
		   @confirm="confirmBtn"
		   @cancel="cancelBtn"
		 />
		</van-popup>
	</div>
</template>

<script>
	import { getDay } from '@/libs/util'
	export default{
		props:{
			dateValue:{
				type:String,
				default: ""
			}
		},
		model:{
			prop: "dateValue",
			event: "returnBack"
		},
		data(){
			return{
				currentDate: new Date(),
				show: false
			}
		},
		methods:{
			confirmBtn(){
				this.$emit('returnBack', getDay(this.currentDate));
				this.show = false;
			},
			cancelBtn(){
				this.show = false;
			},
			showBtn(){
				this.show = true;
				this.currentDate = this.dateValue? new Date(this.dateValue):new Date();
			},
			formatter(type, val){
				if(type === 'year'){
					return `${val}年`;
				} else if(type === 'month'){
					return `${val}月`
				}
				return `${val}日`;
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.dateTimeBox{
		width: 100%;
		.content {
		  flex: 1;
		  display: flex;
		  justify-content: space-between;
		  border: 1px solid lightgray;
		  padding: 6px 6px;
		}
	}
</style>
