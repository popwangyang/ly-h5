<template>
	<div class="subTip">
		<span class="name">{{subTipData.name}}</span>
		<span class="box">
			<span>{{subTipData.city}}</span>
			<span class="name">
				城市开通数
			</span>
		</span>
		<span class="box">
			<span>{{subTipData.ktv}}</span>
			<span class="name">
				KTV数
			</span>
		</span>
		<span class="box">
			<span>{{subTipData.count}}</span>
			<span class="name">
				包厢数
			</span>
		</span>
	</div>
</template>

<script>
	export default{
		props:{
			subTipData:{
				type:Object,
				default:() => {
					return {
						'name':'全国',
						'city':0,
						'ktv':0,
						'count':0
					}
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.subTip{
		display: flex;
		justify-content: space-between;
		height: 56px;
		margin: 10px 0;
		&>span{
			display: flex;
			height: 100%;
		}
		&>span + span{
			margin-left: 10px;
		}
		.name{
			background-color: #F3F5F7;
			font-size:12px;
			font-weight:400;
			color:rgba(140,140,140,1);
			align-items: center;
			padding: 0 16px;
		}
		.name:nth-child(1){
			display: flex;
			padding: 0 10px;
			align-items: center;
			justify-content: center;
			max-width: 100px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.box{
			flex-direction: column;
			align-items: center;
			border:1px solid rgba(243,245,247,1);
			&>span{
				height: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			&>span:nth-child(1){
				font-size:16px;
				font-family:DINCondensed-Bold,DINCondensed;
				color:rgba(248,192,45,1);
			}
		}
	}
</style>
