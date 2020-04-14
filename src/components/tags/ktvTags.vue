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
		font-size: 10px;
		color: rgba(255, 255, 255, 1);
		padding: 2px 5px;
		border-radius: 1px;
		margin: auto 0;
	}
	.color1{
		background: linear-gradient(90deg, rgba(241, 194, 135, 1) 0%, rgba(204, 152, 88, 1) 100%);
	}
	.color2{
		background: linear-gradient(90deg,rgba(41,241,245,1) 0%,rgba(43,196,211,1) 100%);
	}
	.color3{
		background: linear-gradient(90deg, #53e42f 0%, #5db923 100%);
		text-align: center;
	}
</style>
