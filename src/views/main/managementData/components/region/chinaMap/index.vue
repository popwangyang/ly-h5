<template>
	<div class="chinaMapBox">
		<slot name='title'></slot>
		<div id="china-map"></div>
		<span class="visualMap">场所签约排名</span>
		<span class="tip">省份开通数：{{provinceNumber}}</span>
	</div>
</template>

<script>
	import echarts from 'echarts';
	import china from './components/map/china';
	import mapData from '@/static/json/map.json';
	import {
		provincesText,
		tooltip,
		visualMapPieces,
	} from './components/config'
	export default {
		props:{
		  controller:{
			  type: Object,
		  },
		  defaultArea:{
			  type: String,
			  default: '全国',
			  validator: function(val){
				  let code = provincesText.findIndex(item => val.indexOf(item) > -1);
				  if(code || val == '全国'){
					  return true;
				  }else{
					  return false;
				  }
			  }
		  },
		  getData:{
		      type: Function,
			  required: true
		  },
		  itemClick:{
			  type: Function
		  },
		  plantform:{
			  type:String,
			  default: 'PC',
			  validator:(value) => ['PC', 'h5'].indexOf(value) !== -1
		  }
		},
		data() {
			return {
				myChart: null,
				cityName: provincesText.find(item => this.defaultArea.indexOf(item) > -1 ),
				regionData:[],
				provinceNumber: 0
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
					level: 1,
					name: pName
				}
				let code = "";
				if(pName != '全国'){
					let codeData = mapData.find(item => {
						if(item.label.indexOf(pName) != -1){
							return true;
						}
					});
					if(codeData.children.length == 1){
						send_data.level = 3;
						send_data.province = codeData.value;
						send_data.city = codeData.children[0].value;
					}else{
						send_data.level = 2;
						send_data.province = codeData.value;
					}
				}
				this.getData(send_data).then(res => {
					console.log(res);
					this.regionData = res;
					myChart.hideLoading();
					this.cityName = pName;
					res.sort((a, b) => {
						return b.ktv - a.ktv;
					});
					let index = 1;
					let pre = res[0].ktv;
					for(let i = 0; i < res.length; i++){
						let value = res[i].ktv;
						if(value > 0){
							this.provinceNumber++;
							if(pre == value){
								res[i].value = index;
							}else{
								pre = value;
								index++;
								res[i].value = index;
							}
						}else{
						    res[i].value = 19;
						}
						res[i].itemStyle = {
							normal: {
								borderColor: res[i].value == 0 ? '#cecece':'#cecece',
								color: '#FFF'
							},
						}
					}
					var tmpSeriesData = res;
					var option = {
						visualMap: {
							type: 'piecewise',
							bottom: 0,
							splitNumber: 5,
							itemWidth: 10,
							itemHeight: 10,
							textGap: 4,
							align: 'left',
							pieces: visualMapPieces,
							orient: 'horizontal',
							inRange: {
								color:  ['#0082FF','#4DA6FC' ,'#90C8FF','#D2E9FF', '#fafcff',],
								symbolSize: [0, 1000],
								symbol: 'circle'
							},
                            inverse: false,
							show:true,//是否显示组件
							textStyle: {
								color: '#8C8C8C',
								fontSize: 10,
							},
							padding: 0,
							borderColor: 'black'
						},
						tooltip: this.plantform == 'PC' ? tooltip:{},
						series: [{
							name: pName,
							type: 'map',
							mapType: pName == '全国' ? 'china':pName,
							layoutCenter:['50%', "50%"],
							layoutSize:260,
							zoom: 1.3,
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
							top: "1%" //组件距离容器的距离
						}]
					};

					myChart.setOption(option);

					myChart.off("click");

					myChart.on('click', (param) => {
						let data = param.data;
						if(this.plantform == 'PC'){
							this.showProvince(param.name);
						}else{
							tmpSeriesData.forEach(item => {
								if(item.name == param.name){
									item.selected = !item.selected;
									if(!item.selected){
										data = '';
									}
								}else{
									item.selected = false;
								}
							})
							myChart.setOption(option);
						}
						this.$emit('itemClick', data);
					});
				})
			},
			// 展示省级数据
			showProvince(pName) {
				this.setArea(pName);
			},
			setArea(name){
				if(provincesText.indexOf(name) > -1){
					this.cityName = name;
					this.initEcharts(name);
				}
			},
		},
		mounted() {
			this.myChart = echarts.init(document.getElementById('china-map'))
			this.initEcharts(this.cityName)
			if(this.controller){
				this.controller.addListener('area', (area) => {
					this.setArea(area);
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.chinaMapBox{
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		#china-map {
			flex: 1;
		}
		.visualMap{
			position: absolute;
			left: 0px;
			bottom: 30px;
			font-size: 10px;
			color: #444444;
		}
		.tip{
			position: absolute;
			font-size:12px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(0,130,255,1);
			left: 0;
			top: 100px;
		}
	}

</style>
<style>

	#china-map .tooltip {
		background: #0f2542c7;
		color: white;
		border-radius: 3px;
		min-width: 120px;
		overflow: hidden;
	}

	.tooltip>span {
		display: flex;
		height: 25px;
		padding: 0 10px;
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
	}

	.tooltipGo img{
		width: 14px;
		height: 14px;
		vertical-align: middle;
	}

	.tooltip>span:nth-child(1) {
		background: #0f2542;
		font-size: 14px;
		padding: 4px 10px;
	}
</style>
