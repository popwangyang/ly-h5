<template>
	<div class="emptyComponentBox">
		<img :src="imgsrc" alt="">
		<span style="display: flex;margin-top: 10px;">
			<span style="color: #d0d0d0;font-size: 14px;">
				{{text}}
			</span>
			<span class="errorTheme" @click="btn">重新加载</span>
		</span>
		
	</div>
</template>

<script>
	export default{
		props:{
			text:{
				type: String,
				default: '加载失败'
			}
		},
		data(){
			return{
				imgsrc:require("@/assets/error.png")
			}
		},
		methods:{
			btn(){
				this.$emit('eventBtn')
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.emptyComponentBox{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		img{
			margin-bottom: 0.1rem;
			width: 135px;
		}
	}
	
</style>
