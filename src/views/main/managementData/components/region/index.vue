<template>
	<div class="regionDataBox">
		<van-cell is-link @click="goMark" v-if="hasTitle">
			<span class="title">
				区域分布情况
			</span>
		</van-cell>
		<div class="mapBox">
			<MapBox plantform="h5" :getData="getData" @itemClick="itemclick" :defaultArea="defaultArea">
			     <template slot="title">
					<Lenged :subTipData="lengedData"/>
				 </template>
			</MapBox>
		</div>
	</div>
</template>

<script>
	import MapBox from './chinaMap'
	import { region } from '@/api/managementData.js'
	import Lenged from './lenged.vue'
	export default{
		props: {
			hasTitle:{
				type: Boolean,
				default: true
			}
		},
		components:{
			MapBox,
			Lenged
		},
		data(){
			return{
				defaultArea: this.$store.state.user.area.name,
				lengedData:{},
				level: 1,
				regionData:[]
			}
		},
		methods:{
			goMark(){
				this.$router.push({
					name: 'markData'
				})
			},
			getData(params){
				this.level = params.level;
				return new Promise((resolve, reject) => {
					region(params).then(res => {
						this.regionData = res;
						this.setLengedData();
						this.$emit('getData', res);
						resolve(res);
					})
				})
			},
			itemclick(data){
				this.setLengedData(data);
			},
			setLengedData(data){
				let name, ktv = 0, count = 0, city = 0;
				if(data && data != 'undefind'){
					name = data.name;
					city = data.grant_num_city ? data.grant_num_city:0;
					ktv = data.ktv;
					count = data.count;
					if(this.level == 3){
						city = this.regionData.some(item => {
							return item.ktv > 0;
						}) ? 1:0;
					}else if(this.level == 2){
						city = data.ktv > 0 ? 1:0;
					}
					console.log(data, ktv);
				}else{
					name = this.defaultArea;
					this.regionData.forEach(item => {
						if(this.level == 1){
							city += item.grant_num_city;
						}else if(this.level == 2){
							if(item.ktv){
								city++;
							}
						}
						ktv += item.ktv;
						count += item.count;
					})
					if(this.level == 3&& ktv != 0){
						city = 1;
					}
				}
				this.lengedData = {
					name: name,
					city: city,
					ktv: ktv,
					count: count
				};
			},
		},
		mounted() {
			this.lengedData = {
				name: this.defaultArea,
				city:0,
				ktv:0,
				count:0
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.regionDataBox{
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 10px;
		.title{
			font-size:16px;
			font-family:PingFangSC-Semibold,PingFang SC;
			font-weight:bold;
			color:rgba(68,68,68,1);
			line-height:22px;
			border-bottom: 1px solid #F6F6F6;
		}
	    .mapBox{
			height: 400px;
		}
	}
</style>
<style lang="less" scoped>
.regionDataBox{
  .van-cell{
	  padding-left: 0px;
	  padding-right: 0px;

  }
}
</style>
