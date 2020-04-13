<template>
	<div class="dataDisplayBox">
		<div class="banner"></div>
		<div class="content">
			<div class="title">
				<span>场所概况</span>
				<span>场所数</span>
				<span>包厢数</span>
			</div>
			
			<div class="item" v-for="(item, index) in dataList" :key="index">
				<span>{{item.title}}</span>
				<span>
					<span class="number">{{item.ktv}}</span>
					<span class="tipText">较上周+{{item.add}}</span>
				</span>
				<span class="number">{{item.box}}</span>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				dataList:[
					{
						title: '场所签约情况',
						ktv: '8,080',
						box: '9,808,080',
						add: '100'
					},
					{
						title: '场所接入情况',
						ktv: '8,080',
						box: '9,808,080',
						add: '100'
					},
					{
						title: '扫码计费情况',
						ktv: '8,080',
						box: '9,808,080',
						add: '100'
					},
					{
						title: 'CDN开通情况',
						ktv: '8,080',
						box: '9,808,080',
						add: '100'
					},
				]
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.dataDisplayBox{
		.banner{
			background-image: url(../../../../assets/banner.png);
			background-repeat: no-repeat;
			background-size: contain;
			height: 250px;
			width: 100%;
		}
		.content{
			background-color: #fafcfe;
			margin: 0 20px 16px 20px;
			border-top-right-radius: 20px;
			border-top-left-radius: 20px;
			margin-top: -200px;
			overflow: hidden;
			.title{
				display: flex;
				justify-content: space-around;
				font-size: 14px;
				color: #B7B7B7;
				font-weight: 400;
				height: 70px;
				background-color: white;
				padding-top: 40px;
				margin: 0 10px;
				&>span{
					display: block;
					width: 33%;
					text-align: center;
				}
			}
			.item{
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin: 10px;
				height:64px;
				background:rgba(255,255,255,1);
				box-shadow:0px 2px 10px 2px rgba(221,221,221,0.31);
				border-radius:4px;
				&>span{
					display: block;
					width: 33%;
					text-align: center;
				}
				&>span:nth-child(1){
					font-size:12px;
					font-weight:400;
					color:rgba(108,114,124,1);
				}
				&>span:nth-child(2){
					display: flex;
					flex-direction: column;
					font-size:12px;
					font-weight:400;
					color:rgba(108,114,124,1);
					position: relative;
				}
				.number{
					font-size:16px;
					font-weight:bold;
					color:rgba(68,68,68,1);
				}
				.tipText{
					display: block;
					width: 200px;
					height: 20px;
					line-height: 20px;
					text-align: center;
					position: absolute;
					top: 100%;
					left: 50%;
					margin-left: -100px;
					font-size:10px;
					font-weight:400;
					color:rgba(183,183,183,1);
				}
			}
		}
	}
</style>
