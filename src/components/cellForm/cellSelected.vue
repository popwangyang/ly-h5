<template>
	<div>
		<van-cell :title="title" is-link @click="selectedBtn">
			<span>
				<span v-if="selectValue != '' " style="color: #000000;">{{selectValue}}</span>
				<span v-else>{{placeholder}}</span>
			</span>
		</van-cell>
		<van-popup 
		position="bottom"  
		style="height: 300px" 
		v-model="showPicker">
			<van-picker
			ref="picker"
			@cancel="showPicker = false"
			@confirm="onConfirm"
			show-toolbar
			:default-index="defaultIndex"
			:columns="columns"
			@change="onChange" />
		</van-popup>
	</div>
</template>

<script>
	export default{
		props:{
			title:{
				type: String,
				default: '标题'
			},
			modelvalue: {
				type: [ String, Number],
				default: ''
			},
			placeholder:{
				type: String,
				default: '请选择'
			},
			dataList:{
				 type:Array,
                 default:function(){
                    return [];
                 }
			}
		},
		model:{
			prop: 'modelvalue',
			event: 'returnBack'
		},
		watch:{
			modelvalue(newValue){
				this.dataList.forEach((item, index) => {
					if(this.modelvalue !='' && item.value == this.modelvalue){
					  this.defaultIndex = index;
					  this.currentIndex = index;
					  this.selectValue = item.label;
					}
				})
			}
		},
		data(){
			return{
				selectValue: '',
				columns:[],
				defaultIndex:0,
				showPicker: false,
				currentIndex: 0,
			}
		},
		methods:{
			onConfirm(value){
				this.selectValue = this.dataList[this.currentIndex].label
				this.$emit('returnBack', this.dataList[this.currentIndex].value)
				this.showPicker = false;
			},
			selectedBtn(){
				this.showPicker = true;
				this.$nextTick(() => {
					this.currentIndex = 0;
					this.dataList.forEach((item, index) => {
						if(this.modelvalue !='' && item.value == this.modelvalue){
						  this.currentIndex = index;
						}
					})
					
					this.$refs.picker.setIndexes([this.currentIndex])
				})
			},
			onChange(vm){
				this.currentIndex = vm.getIndexes()[0];
			},
			init(){
				let arr = []
				this.dataList.forEach((item, index) => {
					arr.push(item.label)
					if(this.modelvalue !='' && item.value == this.modelvalue){
					  this.defaultIndex = index;
					  this.currentIndex = index;
					  this.selectValue = item.label;
					}
				})
				this.columns = arr;
			}
		},
		mounted(){
			this.init();
		}
	}
</script>

<style>
</style>
