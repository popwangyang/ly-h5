<template>
	<div class="areaFilterBox">
		<Selected></Selected>
		<van-popup v-model="show" position="bottom" :style="{ height: '360px' }">
			<div style="height: 100%; display: flex;flex-direction: column;">
				<Tootip @cancelBtn="cancelBtn" @confirmBtn="confirmBtn"></Tootip>
				<van-tabs v-model="active" color="#1989fa" line-width="30px" style="height: 50px;" title-active-color="#1989fa">
				  <van-tab>
					  <template v-slot:title>
						 <span class="tabTitle">
						 	<div>省</div>
							<span class="subtite">(省，自治区，直辖市)</span>
						 </span>
					  </template>
				  </van-tab>
				  <van-tab>
					  <template v-slot:title>
						  <span class="tabTitle">
						  	<div>市</div>
							<span class="subtite">(地级市，地区，自治州，盟)</span>
						  </span>
					  </template>
				  </van-tab>
				  <van-tab>
					  <template v-slot:title>
						  <span class="tabTitle">
						  	<div>区</div>
							<span class="subtite">(市辖区，县级市，县级区)</span>
						  </span>
					  </template>
				  </van-tab>
				</van-tabs>
				<div class="areaListBox">
					<AreaListItem/>
					<AreaListItem/>
					<AreaListItem/>
					<AreaListItem/>
					<AreaListItem/>
					<AreaListItem/>
					<AreaListItem/>
					<AreaListItem/>
					<AreaListItem/>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import Selected from '../selected.vue'
	import Tootip from './components/tooltip.vue'
	import AreaListItem from './components/areaListItem.vue'
	export default{
		components:{
			Selected,
			Tootip,
			AreaListItem
		},
		data(){
			return{
				show: true,
				active: 1,
				title: 'lllll'
			}
		},
		methods:{
			cancelBtn(){
				console.log("cancelBtn");
			},
			confirmBtn(){
				console.log("confirmBtn");
				this.title = "pppp";
			}
		}
	}
</script>
<style lang="less">
	.areaFilterBox{
		.van-tab{
			line-height: normal;
		}
		.van-tabs--line .van-tabs__wrap{
			height: 60px;
		}
	}
</style>

<style scoped="scoped" lang="less">
	.areaFilterBox{
		.tabTitle{
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.subtite{
				font-size: 8px;
			}
		}
		.areaListBox{
			flex: 1;
			overflow: auto;
			padding: 20px;
			div+div{
				margin-top: 20px;
			}
		}
	}
</style>
