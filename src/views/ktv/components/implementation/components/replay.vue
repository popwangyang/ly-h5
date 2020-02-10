<template>
	<span class="replayBox" @click="onClick">
		<van-icon name="replay" size="30" :class="{icon: iconFlage}"/>
	</span>
</template>

<script>
	export default{
		data(){
			return{
				iconFlage: false
			}
		},
		methods:{
			onClick(){
				if(this.iconFlage) return;
				
				this.iconFlage = true;
				setTimeout(() => {
					this.iconFlage = false;
				}, 500)
				
				this.$emit('btnClick');
				
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.replayBox{
		position: absolute;
		bottom: 60px;
		right: 20px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: white;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 2px 2px 2px gainsboro;
		.icon{
			animation: replay 0.5s ease-in-out;
		}
	}
	@keyframes replay {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
