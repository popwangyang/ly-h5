<template>
	<div class="forgetPage">
		<div class="title">
			<div :class="{selected: state == 'phone' ? true:false}" @click="backBtn">手机号验证</div>
			<div :class="{selected: state == 'email' ? true:false }" @click="backBtn">邮箱验证</div>
		</div>
		<div class="item">
			<h4>{{textData.title}}</h4>
			<div>
				<van-field v-model="fromData.username" left :placeholder="textData.placeholder" />
			</div>
		</div>
		<div class="item">
			<h4>验证码</h4>
			<div>
				<van-field v-model="fromData.code" placeholder="请输入验证码">
					<span class="loading" slot="button">
						<span class="code" @click="getCode" v-if="loadState == 0">发送验证码</span>
						<van-loading v-if="loadState == 1" size="20" color="#4B74FF" />
						<span class="code" v-if="loadState == 2">{{time}}s</span>
					</span>
				</van-field>
			</div>
		</div>
		<div class="footer">
			<van-button type="info" size="large" :disabled="!disabled" @click="handleFrom">下一步</van-button>
		</div>
		<div class="bottom">
			<div @click="backLogin">已有密码? 返回登录</div>
		</div>
	</div>
</template>

<script>
	import formValidate from '@/libs/validator'
	import {
		getUserType,
		getIdentifyungCode,
		testIdentifyungCode
	} from '@/api/user.js'
	import { validPlatform } from '@/libs/util'
	export default {
		data() {
			return {
				time: 60,
				loadState: 0,
				setInterval: null,
				fromData: {
					username: '',
					code: ''
				},
				rulesPhone: {
					username: [{
							required: true,
							message: '请输入手机号'
						},
						{
							type: 'isPhone',
							message: '手机号格式不正确'
						}
					]
				},
				rulesEmail: {
					username: [{
							required: true,
							message: '请输入邮箱账号',
						},
						{
							type: 'isEmail',
							message: '邮箱号格式不正确',
						}
					]
				}
			}
		},
		computed: {
			state(){
				return this.$store.state.user.forgetPasswordKey;
			},
			textData(){
				if(this.state == 'phone'){
					return {
						title: '手机号',
						placeholder: '请输入手机号',
						codeToast: '验证码已发送至手机，请注意查收',
						backText: '通过邮箱找回密码'
					};
				}else{
					return {
						title: '邮箱号',
						placeholder: '请输入邮箱号',
						codeToast: '验证码已发送至邮箱，请注意查收',
						backText: '通过手机号找回密码'
					};
				}
			},
			disabled() {
				var flag = true;
				for (var key in this.fromData) {
					if (this.fromData[key] == '') {
						flag = false;
					}
				}
				return flag;
			}
		},
		methods: {
			backLogin(){
				this.$emit('event2');
			},
			backBtn(){
				let commitText = this.state == 'phone' ? 'email':'phone';
				this.$store.commit('setforgetPasswordKey', commitText);
				this.fromData.username = '';
				this.fromData.code = '';
				this.loadState = 0;
				clearInterval(this.setInterval);
			},
			getCode() {
				let rules = this.state == 'phone' ? this.rulesPhone : this.rulesEmail;
				formValidate(this.fromData, rules).then(async val => {
					if (val) {
						this.loadState = 1;
						const { username } = this.fromData;
						let resData = await getUserType({ username });
						if(resData.status == 200){
							let userType = resData.data.user_type;
							let data = validPlatform(userType, true);
							if(!data.flag){
								this.loadState = 0;
								this.$toast(data.msg);
							}else{
								let send_data = {
									[this.state]: this.fromData.username
								}
								getIdentifyungCode(send_data).then((res) => {
									this.$toast(this.textData.codeToast);
									this.loadState = 2;
									this.time = 60;
									this.setInterval = setInterval(() => {
										if (this.time <= 0) {
											clearInterval(this.setInterval);
											this.loadState = 0;
											this.time = 60;
										}
										this.time--;
									}, 1000)
								}).catch(err => {
									this.loadState = 0;
								})
							}
						}else{
							this.loadState = 0;
							this.$toast('获取验证码失败，请稍后重试！');
						}
					}
				})
			},
			handleFrom() {
				let send_data = {
					code: this.fromData.code,
					[this.state]: this.fromData.username
				}
				console.log(send_data);
				testIdentifyungCode(send_data).then((res) => {
					const { username, code } = this.fromData;
					this.$emit('event1', {
						username,
						code,
						index: 2
					});
				}).catch(err => {
					console.log(err)
					if(err.status == 406){
						this.$toast(err.data.error);
					}
				})
			}
		},
		mounted() {
			
			document.title = this.state == 'phone' ? "手机验证":"邮箱验证"
		},
		destroyed() {
			if (this.setInterval != null) {
				clearInterval(this.setInterval);
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.forgetPage {
		display: block;
		height: 100%;
		width: 100%;
		background: #ffffff;
		padding: 25.35px 9.75px;
		box-sizing: border-box;
		.title {
			display: flex;
			align-items: center;
			margin-bottom: 20px;
			
			&>div {
				transition: all 0.2s ease-in-out;
				height: 26px;
				margin-right: 20px;
				font-size:16px;
				font-family:PingFangSC-Semibold,PingFang SC;
				font-weight:600;
				color:rgba(108,114,124,1);
			}
			.selected {
				font-size: 20px;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(2, 2, 2, 1);
			}
		}

		.item {
			&>div {
				border-bottom: 1px solid #C6CBD4;
				margin-bottom: 11.25px;

				.code {
					font-size: 12px;
					font-weight: 500;
					color: rgba(75, 116, 255, 1);
				}
			}

			.loading {
				width: 100%;
				height: 22.5px;
				display: flex;
				align-items: center;
			}
		}

		.footer {
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

	h2,
	h4 {
		margin: 0;
		padding: 0;
	}

	h2 {
		font-size: 20px;
		font-weight: 500;
		color: #020202;
		margin-bottom: 19.5px;
	}

	h4 {
		font-size: 12px;
		font-weight: 400;
		color: rgba(108, 114, 124, 1);
		margin-bottom: 9.75px;
	}
</style>
