<template>
	<div class="searchBox">
		<van-search 
		ref="search" 
		:placeholder="placeholder" 
		v-model="value" 
		shape="round"/>
		<div @click="Btn" class="div"></div>
	</div>
</template>

<script>
	export default{
		props:{
			placeholder:{
				type:String,
				default: '请输入搜索内容'
			},
		},
		data(){
			return{
				value:''
			}
		},
		methods:{
			Btn(){
				this.$router.push({
					name: 'searchPage',
					query:{
						type: 'ktv'
					}
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.searchBox{
		position: relative;
		.div{
			position: absolute;
			left: 0;
			top: 0;
			opacity: 0;
			width: 100%;
			height: 100%;
		}
	}
</style>
