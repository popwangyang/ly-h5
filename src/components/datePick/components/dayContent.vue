<template>
	<div class="dayContentBox">
		<div>
			<InputBox
			title="开始日期"
			:isSelected="startTime.isSelected"
			:timeValue="startTime.value"
			@click.native="selectedBtn(1)"
			/>
			<div style="margin: 0 20px;font-size: 14px;margin-top: 20px;">至</div>
			<InputBox
			title="结束日期"
			:isSelected="endTime.isSelected"
			:timeValue="endTime.value"
			@click.native="selectedBtn(2)"
			/>
		</div>
		<div>
			<van-datetime-picker
			  @change="pickerChange"
			  :show-toolbar="false"
			  :visible-item-count='3'
			  v-model="currentDate"
			  :formatter="formatter"
			  :min-date="minDate"
			  type="date"
			/>
		</div>
	</div>
</template>

<script>
	import InputBox from './input'
	import { getDay } from '@/libs/util'
	export default{
		components:{
			InputBox,
		},
		props:{
			dayValues:{
				type: Array,
				default: () => {
					return []
				}
			}
		},
		model:{
			prop: 'dayValues',
			event: 'returnBack'
		},
		data(){
			return{
				selectedValue: 1,
				startTime:{
					isSelected: true,
					value: ''
				},
				endTime:{
					isSelected: false,
					value: ''
				},
				currentDate: new Date(),
				minDate: new Date(2009, 0, 1)
			}
		},
		watch:{
			selectedValue: {
			    handler:function(newValue, oldValue){
					if(newValue == 1){
						this.startTime.isSelected = true;
						this.endTime.isSelected = false;
					}else{
						this.startTime.isSelected = false;
						this.endTime.isSelected = true;
					}
				},
				immediate: true
			}
		},
		methods:{
			formatter(type, value){
			    if (type === 'year') {
					return `${value}年`;
				  } else if (type === 'month') {
					return `${value}月`
				  }else if (type === 'day') {
					return `${value}日`
				  }
				return value;
			},
			selectedBtn(val){
				this.selectedValue = val;
				if(val == 1){
				  this.minDate = new Date(2009, 0, 1)
				  this.setCurrentDate(this.startTime.value)
				}else{
				  this.minDate = new Date(this.startTime.value)
				  this.setCurrentDate(this.endTime.value)
				}
			},
			pickerChange(val){
				let dateArr = val.getValues();
				if(dateArr.indexOf(undefined) > -1) return;
				let values = dateArr.map((item) => {
					let result = item.substr(0, item.length - 1)
					return result;
				})
				if(this.selectedValue == 1){
					this.startTime.value = values.join('-');
					this.endTime.value = ''
				}else{
					this.endTime.value = values.join('-');
				}
				this.$emit('returnBack', [this.startTime.value, this.endTime.value]);
			},
			setCurrentDate(data){
				setTimeout(() => {
					  this.currentDate = new Date(data);
				}, 0)
			}
		},
		mounted() {
			
			this.startTime.value = this.dayValues[0];
			this.endTime.value = this.dayValues[1];
			this.showValues = [this.startTime.value, this.endTime.value]
			this.setCurrentDate(this.startTime.value)
		}
	}
</script>

<style scoped="scoped" lang="less">
	.dayContentBox{
		height: 100%;
		width: 100%;
		display: flex;
		flex: 1;
		flex-direction: column;
		margin-top: 20px;
		&>div:nth-child(1){
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 15px;
			padding-bottom: 15px;
		}
		&>div:nth-child(2){
			height: 176px;
			position: relative;
		}
	}
</style>
