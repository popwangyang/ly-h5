<template>
	<div class="areaListItemBox">
		北京市
	</div>
</template>

<script>
	export default{
		props:{
			itemData:{
				type:Object
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.areaListItemBox{
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		color: black;
		width: 100%;
		padding: 20px 0;
		border: 1px solid grey;
		box-shadow: 0px 0px 4px #e0dede;
		border-radius: 2px;
	}
</style>
