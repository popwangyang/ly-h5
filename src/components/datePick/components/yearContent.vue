<template>
	<div class="yearContentBox">
		<van-picker
		 :default-index="defaultIndex"
		:columns="columns"
		@change="onChange" />
	</div>
</template>

<script>
	import { setYears } from '@/libs/util'
	export default{
		data(){
			return{
				defaultIndex: 0,
				columns:[]
			}
		},
		props:{
			yearValue:{
				type: Array,
				default: () => {
					return []
				}
			}
		},
		model:{
			prop: 'yearValue',
			event: 'returnBack'
		},
		methods:{
			onChange(e){
				let year = e.getValues()[0].substr(0, e.getValues()[0].length - 1);
				let start = year +"-01-01";
				let end = year +"-12-31";
				this.$emit('returnBack', [start, end]);
			}
		},
		mounted() {
			this.columns = setYears();
			let year = this.yearValue[0].split('-')[0] + '年';
			this.defaultIndex = this.columns.indexOf(year);
		}
	}
</script>

<style scoped="scoped" lang="less">
	.yearContentBox{
		padding-top: 20px;
	}
</style>
