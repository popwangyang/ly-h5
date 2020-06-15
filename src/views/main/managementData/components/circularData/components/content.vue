<template>
	<span class="tabsItemBox">
		<span>
			<van-circle
			  v-model="currentRate"
			  :rate="rateNumber"
			  :speed="100"
			  :color="color"
			  layer-color="#ECECEC"
			  stroke-width="150"
			  stroke-linecap="butt"
			  :clockwise="false"
			/>
		</span>
		<span>
			<slot></slot>
		</span>
	</span>
</template>

<script>
	export default{
		props:{
			rate:{
				type:Number,
				default:0
			},
			color:{
				type:String,
				default: "#0082FF"
			}
		},
		watch: {
			rate(newValue, oldValue) {
				if(!isNaN(newValue)){
					this.rateNumber = newValue;
				}
			}
		},
		data(){
			return{
				currentRate:0,
				rateNumber:0,
			}
		},
		mounted(){
			this.rateNumber = this.rate;
		}
	}
</script>

<style scoped="scoped" lang="less">
	.tabsItemBox{
			  height: 136px;
			  display: flex;
			  align-items: center;
			  padding: 0 20px;
			  &>span:nth-child(2){
				  flex: 1;
				  height: 100%;
				  display: flex;
				  flex-direction: column;
				  padding: 0 0 0 20px;
				  .money{
					  font-size:20px;
					  color:rgba(0,0,0,1);
				  }
				  b{
					  display: inline-block;
					  margin-right: 10px;
					  width: 9px;
					  height: 9px;
					  border-radius: 5px;
				  }
				  .b1{
					  background-color: #0082FF;
				  }
				  .b2{
					  background-color: #ECECEC;
				  }
				  .b3{
					  background-color: #01cca3;
				  }
				  &>span{
					  display: flex;
					  justify-content: space-between;
					  align-items: center;
				  }
				  &>span:nth-child(1){
					  font-size:18px;
					  font-family:PingFangSC-Regular,PingFang SC;
					  font-weight:400;
					  color:rgba(0,0,0,1);
					  margin: 30px 0 20px 0;
				  }
				  &>span:nth-child(2){
					  font-size:14px;
					  font-family:PingFangSC-Regular,PingFang SC;
					  font-weight:400;
					  color:rgba(140,140,140,1);
					  height:20px;
					  margin-bottom: 10px;
				  }
				  
				  &>span:nth-child(3){
					  font-size:14px;
					  font-family:PingFangSC-Regular,PingFang SC;
					  font-weight:400;
					  color:rgba(140,140,140,1);
					  height:20px;
				  }
			  }
	}
</style>
