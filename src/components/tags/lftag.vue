<template>
	<div class="lftagBox">
		00
	</div>
</template>

<script>
</script>

<style scoped="scoped" lang="less">
	.lftagBox{
		display: inline-block;
		width:25px;
		height:12px;
		background:linear-gradient(90deg,rgba(241,194,135,1) 0%,rgba(204,152,88,1) 100%);
		border-radius:1px;
		&>span{
			transform: scale(0.66);
			font-size:12px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:12px;
			text-align: center;
		}
	}
</style>
