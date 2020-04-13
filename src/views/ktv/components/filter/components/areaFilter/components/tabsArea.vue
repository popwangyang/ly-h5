<template>
	<div class="tabsAreaBox">
		<van-tabs v-model="active" @click="tabsClick" color="#1989fa" line-width="30px"  title-active-color="#1989fa">
		  <van-tab>
			  <template v-slot:title>
				 <span class="tabTitle">
					 <span v-if="tabValue[0]">
						<div>{{tabValue[0].label}}</div>
					 </span>
					 <span v-else>
						<div>省</div>
						<span class="subtite">(省，自治区，直辖市)</span>
					 </span>
				 </span>
			  </template>
		  </van-tab>
		  <van-tab>
			  <template v-slot:title>
				  <span class="tabTitle">
					  <span v-if="tabValue[1]">
						  <div>{{tabValue[1].label}}</div>
					  </span>
					  <span v-else>
						  <div>市</div>
						  <span class="subtite">(地级市，地区，自治州，盟)</span>
					  </span>
				  </span>
			  </template>
		  </van-tab>
		  <van-tab>
			  <template v-slot:title>
				  <span class="tabTitle">
					  <span v-if="tabValue[2]">
						  {{tabValue[2].label}}
					  </span>
					  <span v-else>
						  <div>区</div>
						  <span class="subtite">(市辖区，县级市，县级区)</span>
					  </span>
				  </span>
			  </template>
		  </van-tab>
		</van-tabs>
	</div>
</template>

<script>
	export default{
		props:{
		    tabIndex:{
			   type:Number,
			   default: 0
		    },
			tabValue:{
				type:Array,
				default:() => []
			}
		},
		watch: {
			tabIndex(newValue, oldValue) {
				this.$nextTick(() => {
					this.active = newValue;
				})
			}
		},
		data(){
			return{
				active:0,
			}
		},
		methods:{
			tabsClick(index){
				this.$emit('onClick', index);
			}
		}
	}
</script>
<style lang="less">
	.tabsAreaBox{
		.van-tab{
			line-height: normal;
		}
		.van-ellipsis{
		  white-space: pre-wrap;
		}
		.van-tabs--line .van-tabs__wrap{
			height: 60px;
		}
	}
</style>
<style scoped="scoped" lang="less">
	.tabsAreaBox{
		.tabTitle{
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.subtite{
				font-size: 8px;
			}
		}
	}
</style>
