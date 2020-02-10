<template>
	<div class="cardTicketItemBox">
		<span>
			<div class="title">20198382893384848823</div>
			<div>已核销</div>
		</span>
		<span>
			<div>果盘券</div>
			<div class="date">2019-10-11 11:23:32</div>
		</span>
	</div>
</template>

<script>
</script>

<style scoped="scoped" lang="less">
	.cardTicketItemBox{
		display: flex;
		margin: 10px 16px;
		padding: 10px;
		background: white;
		flex-direction: column;
		justify-content: space-between;
		height: 70px;
		&>span{
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #999999;
			.title{
				font-size: 16px;
				color: #444444;
			}
			.date{
				font-size: 12px;
				transform: scale(0.8);
			}
		}
		
	}
</style>
