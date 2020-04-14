<template>
	<div class="areaListItemBox" @click="btnCilck">
		{{itemData.label}}
	</div>
</template>

<script>
	export default{
		props:{
			itemData:{
				type:Object
			}
		},
		methods:{
			btnCilck(){
				this.$emit('areaSelected', this.itemData);
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
		box-shadow: 0px 0px 4px #e0dede;
		border-radius: 2px;
		position: relative;
		z-index: 0;
		&::before{
			position: absolute;
			top: 50%;
			left: 50%;
			width: 100%;
			height: 100%;
			background-color: #000;
			border: inherit;
			border-color: #000;
			border-radius: inherit;
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			opacity: 0;
			transition: all 0.5 ease;
			content: ' ';
		}
		&:active:before{
			opacity: 0.1;
		}
	}
</style>
