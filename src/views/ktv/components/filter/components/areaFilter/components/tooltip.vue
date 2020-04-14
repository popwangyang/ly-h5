<template>
	<div class="van-hairline--top-bottom van-picker__toolbar">
		<button type="button" class="van-picker__cancel" @click="cancel">取消</button>
		<button type="button" class="van-picker__confirm" @click="confirm">确认</button>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			cancel(){
				this.$emit('cancelBtn');
			},
			confirm(){
				this.$emit('confirmBtn');
			}
		}
	}
</script>

<style scoped="scoped" lang="less">

</style>
