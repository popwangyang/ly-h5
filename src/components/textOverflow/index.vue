<template>
	<div class="textOverflowBox">
		{{showText}}
		<a style="color: #0082FF;" @click="btnClick">{{btnText}}</a>
	</div>
</template>

<script>
	export default{
		props:{
			text:{
				type:String,
			},
			maxLength:{
				type:Number,
				default: 50
			}
		},
		computed:{
			showText(){
				if(this.show || this.maxLength >= this.text.length){
					return this.text;
				}else{
					return this.text.substring(0, this.maxLength)+"...";
				}
			},
			btnText(){
				if(this.maxLength >= this.text.length){
					return "";
				}else if(this.show){
					return '收起';
				}else{
					return '更多';
				}
			}
		},
		data(){
			return{
				show: false
			}
		},
		methods:{
			btnClick(){
				this.show = !this.show;
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.textOverflowBox{
		
	}
</style>
