<template>
	<div class="chinaMapBox">
		<Lenged :subTipData="lengedData"/>
		<div id="china-map"></div>
	</div>
	
</template>

<script>
	import echarts from 'echarts';
	import Vue from 'vue'
	import china from './components/map/china';
	import Lenged from './components/lenged.vue'
	import {
		provinces,
		provincesText,
		modules,
		visualMapPieces,
	} from './components/config'
	import mapData from './components/json/map.json'
	export default {
		components:{
			Lenged
		},
		props:{
		  controller:{
			  type: Object,
		  },
		  defaultArea:{
			  type: String,
			  default: '全国',
			  validator: function(val){
				  return provincesText.indexOf(val) > -1 || val == '全国';
			  }
		  },
		  getData:{
		      type: Function,
			  required: true
		  }
		},
		data() {
			return {
				myChart: null,
				cityName: this.defaultArea,
				lengedData: {},
				regionData:[],
				isFlage: false
			}
		},
		methods: {
			initEcharts(pName) {
				let myChart = this.myChart;
				let tooltipOption = {
					tooltip:{
						show: false
					}
				};
				myChart.setOption(tooltipOption);
				myChart.showLoading({
						text: '加载中...',
						color: '#57a3f3',
						textColor: '#57a3f3',
						maskColor: 'rgba(255, 255, 255, 0.8)',
						zlevel: 0
				});
				let send_data = {
					name: pName,
				}
				let code = "";
				if(send_data.name != '全国'){
					code = mapData.find(item => {
						if(item.label.indexOf(send_data.name) != -1){
							return true;
						}
					}).value;
				}
				send_data.province = code;
				this.getData(send_data).then(res => {
					this.regionData = res;
					this.setLengedData();
					myChart.hideLoading();
					this.cityName = send_data.name;
					var tmpSeriesData = res.map(item => {
						item.value = item.ktv
						item.selected = false;
						return item;
					});
					var option = {
						visualMap: {
							type: 'piecewise',
							bottom: 0,
							splitNumber: 5,
							itemWidth: 10,
							itemHeight: 10,
							pieces: visualMapPieces,
							orient: 'horizontal',
							inRange: {
								color:  ['#fafcff', '#D2E9FF', '#90C8FF', '#4DA6FC', '#0082FF'],
								symbolSize: [0, 1000],
								symbol: 'circle'
							},
							show:true,//是否显示组件
							textStyle: {
								color: 'black'
							}
						},
						series: [{
							name: pName,
							type: 'map',
							mapType: pName == '全国' ? 'china':pName,
							layoutCenter:['50%', "50%"],
							layoutSize:260,
							roam: false, //是否开启鼠标缩放和平移漫游
							label: { // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
								normal: { //静态的时候展示样式
									show: false, //是否显示地图省份得名称
									textStyle: {
										color: "rgb(140, 140, 140)",
									}
								},
								emphasis: { //动态展示的样式
								    show: false,
									color: 'white',
									backgroundColor: 'rgb(86, 86, 86)',
									padding: [6, 4, 6, 4],
									borderRadius: 4,
								},
							},
							itemStyle: { //地图区域的多边形 图形样式
								normal: {
								    color: 'red',
									areaColor: '#fafcff',
									borderColor: '#FFF',
									borderWidth: 1,
								},
								emphasis: {
									areaColor: '#01CCA3',
								}
							},
							data: tmpSeriesData,
							// top: "6%" //组件距离容器的距离
						}]
					};

					myChart.setOption(option);

					myChart.off("click");

					myChart.on('click', (param) => {
						
						tmpSeriesData.forEach(item => {
							if(item.name == param.name){
								item.selected = !item.selected;
							}else{
								item.selected = false;
							}
						})
						let data = this.regionData.find(item => {
							if(item.name == param.name && item.selected){
								return true;
							}
						})
						myChart.setOption(option);
						this.setLengedData(data);
					});
					myChart.on('mapselectchanged', (params) => {
						console.log('ppppp');
					})
				})
			},
			setLengedData(data){
				let name, ktv = 0, count = 0, city = 0;
				if(data && data != 'undefind'){
					name = data.name;
					city = data.ktv > 0 ? 1:0;
					ktv = data.ktv;
					count = data.count;
				}else{
					name = this.cityName;
					this.regionData.forEach(item => {
						if(item.ktv){
							city++;
						}
						ktv += item.ktv;
						count += item.count
					})
				}
				this.lengedData = {
					name: name,
					city: city,
					ktv: ktv,
					count: count
				};
			},
			setArea(name){
				if(provincesText.indexOf(name) > -1){
					this.cityName = name;
					this.initEcharts(name);
				}
			}
		},
		mounted() {
			this.myChart = echarts.init(document.getElementById('china-map'));
			this.initEcharts(this.cityName);
			this.lengedData = {
				name: this.cityName,
				city:0,
				ktv:0,
				count:0
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.chinaMapBox{
		height: 100%;
		display: flex;
		flex-direction: column;
		#china-map {
			flex: 1;
		}
	}
	
</style>
