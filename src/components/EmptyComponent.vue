<template>
	<div class="emptyComponentBox">
		<img :src="imgsrc" alt="">
		<span style="color: #d0d0d0;font-size: 14px;margin-top: 10px;display: block;margin-bottom: 20px;">
			{{text}}
		</span>
		<van-button class="buttonSquare" @click="btn" v-if="title && title != ''">{{title}}</van-button>
	</div>
</template>

<script>
	export default{
		props:['text', 'title'],
		data(){
			return{
				imgsrc:require("@/assets/empty.png")
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
		}
	}
	
</style>
