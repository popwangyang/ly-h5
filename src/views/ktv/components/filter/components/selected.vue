<template>
	<div class="selectedBox">
		<span class="fileMenu">
			<span>所在地</span>
		</span>
	</div>
</template>

<script>
</script>

<style scoped="scoped" lang="less">
	.selectedBox{
		.fileMenu{
			font-size: 14px;
			&>span:nth-child(1){
				display: inline-block;
				margin-right: 6px;
				position: relative;
				&::after{
					position: absolute;
					    top: 50%;
					    right: -14px;
					    margin-top: -5px;
					    border: 3px solid;
					    border-color: transparent transparent currentColor currentColor;
					    -webkit-transform: rotate(-45deg);
					    transform: rotate(-45deg);
					    opacity: 0.8;
					    content: '';
				}
			}
			
		}
	}
</style>
