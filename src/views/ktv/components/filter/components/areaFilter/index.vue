<template>
	<div class="areaFilterBox">
		<Selected :text="result" placeholder="所在地" @btnClick="btnClick"/>
		<van-popup v-model="show" position="bottom" :style="{ height: '360px' }">
			<div style="height: 100%; display: flex;flex-direction: column;">
				<Tootip @cancelBtn="cancelBtn" @confirmBtn="confirmBtn"></Tootip>
				<TabsArea :tabIndex="selectedList.length - 1" :tabValue="tabValue" @onClick="tabClick"/>
				<div class="areaListBox" ref="scroll">
					<AreaListItem v-for="(item, index) in showList" :key="index" :itemData="item" @areaSelected="selectedBtn"/>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import Selected from '../selected.vue'
	import Tootip from './components/tooltip.vue'
	import TabsArea from './components/tabsArea.vue'
	import AreaListItem from './components/areaListItem.vue'
	import mapData from './lib/map.json'
	import util from './lib/util'
	export default{
		components:{
			Selected,
			Tootip,
			AreaListItem,
			TabsArea
		},
		data(){
			return{
				show: false,
				result: '',
				showList:[],
				selectedList:[],
				tabValue:[],
			}
		},
		methods:{
			cancelBtn(){
				this.show = false;
			},
			confirmBtn(){
				let keys = ['province', 'city', 'county'];
				let codeData = {};
				this.result = "";
				keys.forEach((item, index) => {
					codeData[keys[index]] = this.tabValue[index] ? this.tabValue[index].value:"";
				})
				if(this.tabValue.length > 0){
					this.result = this.tabValue[this.tabValue.length - 1].label;
				}
				this.$emit("onChange", codeData);
				this.show = false;
			},
			btnClick(){
				this.show = true;
			},
			selectedBtn(itemData){
				itemData.scrollTop = this.$refs.scroll.scrollTop;
				let index = this.selectedList.length - 1;
				this.tabValue.splice(index, 1, itemData);
				if(itemData.children){
					this.showList = itemData.children;
					this.selectedList.push(this.showList);
					this.$nextTick(() => {
						this.$refs.scroll.scrollTop = 0;
					})
				}
			},
			tabClick(index){
				this.showList = this.selectedList[index];
				this.selectedList.splice(index+1);
				this.tabValue.splice(index);
				this.$nextTick(() => {
					if(this.tabValue[index]){
						this.$refs.scroll.scrollTop = this.tabValue[index].scrollTop;
					}
				})
			},
			init(){
				this.showList = mapData;
				this.selectedList = [mapData];
				this.tabValue = [];
			}
		},
		mounted() {
			this.init();
		}
	}
</script>
<style lang="less">
	.areaFilterBox{
		.van-tab{
			line-height: normal;
		}
		.van-ellipsis{
		  white-space: pre-wrap;
		}
		.van-tabs--line .van-tabs__wrap{
			height: 60px;
			background-color: white;
		}
	}
</style>

<style scoped="scoped" lang="less">
	.areaFilterBox{
		
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
