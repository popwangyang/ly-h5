<template>
	<div class="regionDataBox">
		<nav>区域分布情况</nav>
		<div class="mapBox">
			<MapBox :getData="getData" :defaultArea="defaultArea"/>
		</div>
	</div>
</template>

<script>
	import MapBox from './chinaMap'
	import { region } from '@/api/managementData.js'
	export default{
		components:{
			MapBox
		},
		data(){
			return{
				getData:region,
				defaultArea:"全国"
			}
		},
		methods:{
			// getData(params){
			// 	return new Promise((resolve, reject) => {
			// 		getMapData(params).then(res => {
			// 			console.log(res);
			// 			resolve(res);
			// 		})
			// 	})
			// }
		},
		mounted() {}
	}
</script>

<style scoped="scoped" lang="less">
	.regionDataBox{
		display: flex;
		flex-direction: column;
		background-color: white;
		height: 430px;
		padding: 10px 20px;
		nav{
			height:24px;
			font-size:16px;
			font-family:PingFangSC-Semibold,PingFang SC;
			font-weight:bold;
			color:rgba(68,68,68,1);
			line-height:22px;
			border-bottom: 1px solid #F6F6F6;
		}
		
	    .mapBox{
			flex: 1;
		}
	}
</style>
