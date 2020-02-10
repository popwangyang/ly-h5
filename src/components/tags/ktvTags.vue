<template>
	<span class="ktvTypeBG" :class="color">{{value}}</span>
</template>

<script>
	export default{
		props:{
			value:{
				type:String,
			}
		},
		computed:{
			color(){
				let flag = 'color3';
				if(this.value == '量贩式'){
					flag = 'color1'
				}else if(this.value == '夜总会'){
					flag = 'color2';
				}
				
				return flag;
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.ktvTypeBG {
		display: inline-block;
		transform-origin: left center;
		transform: scale(0.5);
		font-size: 18px;
		color: rgba(255, 255, 255, 1);
		padding: 2px 5px;
	}
	.color1{
		background: linear-gradient(90deg, rgba(241, 194, 135, 1) 0%, rgba(204, 152, 88, 1) 100%);
	}
	.color2{
		background: linear-gradient(90deg,rgba(41,241,245,1) 0%,rgba(43,196,211,1) 100%);
	}
	.color3{
		background: linear-gradient(90deg, #53e42f 0%, #5db923 100%);
		width: 138px;
		text-align: center;
	}
</style>
