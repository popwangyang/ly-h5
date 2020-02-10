<template>
	<div class="cardTicketBox">
		<div>
			<div class="title" style="display: none;">兑换类型</div>
			<div class="selectedBox">
				<span @click="foo(1)">
					<span>单店兑换</span>
					<van-icon name="checked" class="icon" color="#FFFFFF" size="20" v-show="selectd == 1 ? true:false"/>
				</span>
				<span @click="foo(2)">
					<span>通兑</span>
					<span class="label">带有通兑标识</span>
					<van-icon name="checked" class="icon" color="#FFFFFF" size="20" v-show="selectd == 2 ? true:false"/>
				</span>
			</div>
		</div>
		<div>
			<div class="title">输入卡券号</div>
			<div class="inputBox" @click="show = true">
				<span class="inputContent">
					<span>
						<span v-for="(item, index) in cardArr1" :key="index">{{item}}</span>
					</span>
					<span>
						<span v-for="(item, index) in cardArr2" :key="index">{{item}}</span>
					</span>
					<span>
						<span v-for="(item, index) in cardArr3" :key="index">{{item}}</span>
					</span>
				</span>
				<span class="errorMag" >
					{{errorMag}}
				</span>
			</div>
		</div>
		<span class="button">
			<van-button  class="buttonDefault"  size="large" @click='btnClick'>确认兑换</van-button>
		</span>
		<span class="recordBtn">
			<a @click="goRecord">兑换记录</a>
			<span><van-icon name="arrow" /></span>
		</span>
		<van-number-keyboard
		  :show="show"
		  extra-key="."
		  theme="custom"
		  close-button-text="完成"
		  @blur="show = false"
		  @input="onInput"
		  @delete="onDelete"
		/>
	</div>
</template>

<script>
	import { putCard } from '@/api/cardTicket'
	export default{
		data(){
			return{
				show: false,
				selectd: 1,
				cardNumber:'',
				errorMag: ""
			}
		},
		computed:{
			cardArr1(){
				let str = this.cardNumber.substr(0, 4);
				return str.split('');
			},
			cardArr2(){
				let str = this.cardNumber.substr(4, 4);
				return str.split('');
			},
			cardArr3(){
				let str = this.cardNumber.substr(8, 4);
				return str.split('');
			}
		},
		methods:{
			btnClick(){
				if(this.cardNumber.length != 12){
					this.errorMag = "请输入完整卡券号"
					return
				}
				let send_data = {
					ktv_id: 343,
					card_code: this.cardNumber
				}
				
				putCard(send_data).then(res => {
					if (res.data.code === 0) {
					   this.cardNumber = "";
					}
					this.$toast(res.data.codemsg);
				})
			},
			goRecord(){
				this.$router.push({
					name: 'cardTicketRecord'
				})
			},
			foo(num){
				this.selectd = num;
				this.cardNumber = '';
			},
			onInput(value) {
			    if(this.cardNumber.length >= 12)  
				return;
				this.cardNumber += value;
			},
			onDelete() {
				if(this.cardNumber.length <= 0)
				return;
			    this.cardNumber = this.cardNumber.substr(0, this.cardNumber.length - 1);
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.cardTicketBox{
		padding: 0 16px;
		height: 100%;
		background: white;
		.title{
			font-size:14px;
			font-family:PingFangSC-Semibold,PingFang SC;
			font-weight:600;
			color:rgba(68,68,68,1);
			display: block;
			padding: 20px 0;
		}
		.selectedBox{
			display: none;
			justify-content: space-between;
			.isSelected{
				border: 1px solid blue;
			}
			&>span{
				display: flex;
				width: 160px;
				height: 80px;
				font-size:16px;
				font-family:PingFangSC-Semibold,PingFang SC;
				font-weight:600;
				color:rgba(255,255,255,1);
				flex-direction: column;
				align-items: center;
				justify-content: center;
				background-size: contain;
				position: relative;
				.label{
					font-size:10px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(255,255,255,1);
					display: block;
					margin-top: 4px;
				}
				.icon{
					position: absolute;
					right: 10px;
					bottom: 20px;
				}
			}
			&>span:nth-child(1){
				background: url(../../assets/cardTickA.png) no-repeat;				
			}
			&>span:nth-child(2){
				background: url(../../assets/cardTickB.png) no-repeat;
			}
		}
		.inputBox{
			.inputContent{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10px;
				&>span{
					display: flex;
					border-radius:2px;
					border:1px solid rgba(243,245,247,1);
					width: 90px;
					height: 36px;
					justify-content: flex-start;
					align-items: center;
					box-sizing: border-box;
					padding: 0 10px;
					&>span{
						font-size:16px;
						font-family:PingFangSC-Semibold,PingFang SC;
						font-weight:600;
						color:rgba(0,130,255,1);
						display: block;
						margin-right: 8px;
					}
				}
			}
			.errorMag{
				font-size:12px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(255,91,63,1);
			}
		}
		.button{
			margin-top: 20px;
			display: block;
		}
		.recordBtn{
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 20px;
			color: #0082FF;
		}
	}
</style>
