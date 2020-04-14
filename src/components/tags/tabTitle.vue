<template>
	<div class="tabTitleBox">
		<span>{{title}}</span>
		<span class="info visible" v-if="infoText">{{infoText}}</span>
	</div>
</template>

<script>
	export default{
		props:{
			info:{
				type:Number,
				default:0,
			},
			title:{
				type:String,
				required:true
			}
		},
		computed:{
			infoText(){
				if(this.info == 0){
					return "";
				}else if(this.info > 99){
					return "99+"
				}else{
					return this.info;
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.tabTitleBox{
		position: relative;
		.info{
			position: absolute;
			display: block;
			border-radius: 20px;
			padding: 0 4px;
			background-color: red;
			color: white;
			font-size: 12px;
			right: 0;
			top: 50%;
			transform: translate(120%, -50%);
			line-height: 16px;
			height: 16px;
			border: 1px solid white;
			box-sizing: content-box;
		}
		
	}
</style>
