<template>
	<div class="managementDataBox">
		<DataDisplay/>
		<CircularData/>
		<RegionData/>
	</div>
</template>

<script>
	import ContentLoad from "@/components/contentLoad";
	import DataDisplay from './components/dataDisplay.vue'
	import CircularData from './components/circularData'
	import RegionData from './components/region/chinaMap'
	export default{
		components:{
			DataDisplay,
			CircularData,
			RegionData
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.managementDataBox{
		height: 100%;
	}
</style>
