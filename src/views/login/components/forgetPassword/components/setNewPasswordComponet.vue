<template>
	<div class="setNewBox">
		<h2>新密码</h2>
		<div class="item">
				<h4>新密码</h4>
				<div>
					<van-field
						v-model="fromData.password1"
						left
						placeholder="请输入新密码"
					  />
				</div>
		</div>
		<div class="item">
				<h4>确认密码</h4>
				<div>
					<van-field
						v-model="fromData.password2"
						left
						placeholder="请再次输入密码"
					  />
				</div>
		</div>
		<div class="footer">
			<van-button type="info"   size="large" @click="handleFrom" :loading='loading'>完成</van-button>
		</div>
		<div class="bottom">
			<div @click="backLogin">已有密码? 返回登录</div>
		</div>
		
	</div>
</template>

<script>
	import formValidate from '@/libs/validator'
	import { ConfirmToModifyTheNewPassword } from '@/api/user.js'
	export default{
		props:[ 'username', 'code' ],
		data(){
			const validatePassword1 = (value) => {
				var myrey = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
				if(value == ''){
					return "密码不能为空";
				}else if(!myrey.test(value)){
					return "请输入6~20位数字和字母组合";
				}
			}
			const validatePassword2 = (value, data) => {
				if(value == ''){
					return "请再次输入密码";
				}else if(value != data.password1){
					return "两次输入密码不一致";
				}
			}
			return{
				loading:false,
				fromData: {
				   password1: '',
				   password2: '',
				},
				rules:{
					password1: [
						{ required: true, validate: validatePassword1 }
					],
					password2:[
						{ required: true, validate: validatePassword2 }
					] 
				}
			}
		},
		computed:{
			state(){
				return this.$store.state.user.forgetPasswordKey;
			},
		},
		methods:{
			backLogin(){
				this.$emit('event2');
			},
			handleFrom(){
				formValidate(this.fromData, this.rules).then(val => {
					if(val){
						const password = this.fromData.password1;
						const username = this.username;
						const code = this.code;
						    this.loading = true;
							let send_data = {
								username: username,
								code: code,
								password: password
							}
						ConfirmToModifyTheNewPassword(send_data).then(res => {
							this.loading = false;
							this.$toast('密码修改成功')
							this.$emit('event2')
						}).catch(err => {
							console.log(err)
							this.loading = false;
							this.$toast('密码修改失败');
						})
					}
				})
			
			}
		}
	
	}
</script>

<style scoped="scoped" lang="less">
	.setNewBox{
		display: block;
		height: 100%;
		width: 100%;
		background: #ffffff;
		padding: 25.35px 9.75px;
		box-sizing: border-box;
		.item{
			&> div{
				border-bottom: 1px solid #C6CBD4;
				margin-bottom: 11.25px;
				.code{
					font-size:12px;
					font-weight:500;
					color:rgba(75,116,255,1);
				}
			}
			.loading{
				width: 100%;
				height: 22.5px;
				display: flex;
				align-items: center;
			}
		}
		.footer{
			margin-top: 37.5px;
			display: block;
		}
		.bottom{
			display: flex;
			justify-content: center;
			margin-top: 20px;
			font-size:12px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(50,109,242,1);
			flex-direction: column;
			align-items: center;
		}
	}
	h2, h4{
		margin: 0;
		padding: 0;
	}
	h2{
		font-size:20px;
		font-weight:500;
		color: #020202;
		margin-bottom: 19.5px;
	}
	h4{
		font-size:12px;
		font-weight:400;
		color:rgba(108,114,124,1);
		margin-bottom: 9.75px;
	}
</style>
