<template>
	<div class="BoxListBox">
		<van-cell title-style="flex:3">
			<span slot='title'>
				<span>{{data.name}}  </span>
				<span class="title">{{statuesText}}</span>
			</span>
			<span>
				<span v-show="!isEdited">
					{{data.people_amount}}人
				</span>
				<span v-show="isEdited">
					<input type="text" v-model="peopleAmount" class="input" @input="onChange">人
				</span>
			</span>
			<span slot='label' class="label">
				<span style="display: flex;align-items: center;">
					<img :src="imgUrl" style="width: 18px;height: 10px;">
					<span class="labelSpan1">{{clientText}}</span>
				</span>
				<span>
					{{data.room_ip}}
				</span>
			</span>
		</van-cell>
	</div>
</template>

<script>
	export default{
		props:{
			data:{
				type: Object,
		        required: true
			},
			isEdited:{
				type: Boolean,
				default: false
			}
		},
		data(){
			return{
				peopleAmount: 0,
				imgUrl: require("@/assets/sbIcon.png")
			}
		},
		watch:{
			data:{
				handler(newValue){
				  this.peopleAmount = newValue.people_amount;
			    },
			    deep: true,
				immediate: true
			}
		},
		computed:{
			statuesText(){
			    let result;
				if(this.data.status == 0){
					result = '关房'
				}else if(this.data.status == 1){
					result = '开房未支付'
				}else{
					result = '开房已支付'
				}
				return result;
			},
			clientText(){
				let result;
				if(this.data.client_status == 0){
					result = '已关闭'
				}else{
					result = '运行中'
				}
				return result;
			} 
		},
		methods:{
			onChange(val){
				let reg = /^([1-9]\d*|[0]{1,1})$/;
				
				if(!reg.test(Number(this.peopleAmount))){
					this.peopleAmount = 0;
					this.data.people_amount = 0;
					return;
				}
				if(this.peopleAmount > 999){
					this.peopleAmount = 999;
					this.data.people_amount = 999;
					return;
				}
				this.data.people_amount = Number(this.peopleAmount);
			}
		}
	}
</script>
<style scoped="scoped" lang="less">
	.BoxListBox{
		margin-bottom: 10px;
		.title{
			font-size:12px;
			color: gray;
			margin-left: 10px;
		}
		.input{
			width: 50px;
			height: 20px;
			margin-right: 10px;
			text-align: center;
		}
		.label{
			display: flex;
			align-items: center;
			.labelSpan1{
				display: block;
				margin: 0 10px;
			}
		}
	}
	
</style>
