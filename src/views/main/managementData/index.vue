<template>
	<div>
		<DataDisplay/>
		<CircularData/>
		<RegionData/>
	</div>
</template>

<script>
	import DataDisplay from './components/dataDisplay.vue'
	import CircularData from './components/circularData'
	import RegionData from './components/region'
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

<style>
</style>
