<template>
	<div class="accountInfTagBox">
		<span class="textValue">
			{{textValue}}
		</span>
		<van-icon
		v-if="state != 1"
		style="margin-left: 6px;" 
		name="info" 
		:color="color" 
		@click="dialogBtn" />
	</div>
</template>

<script>
	import AccoutDialog from '@/config/accoutDialog'
	export default{
		props:{
			state:{
				type: Number,
				default: 1
			}
		},
		computed:{
			color(){
				return this.$store.state.app.theme.color
			},
			textValue(){
				let result = "开户成功";
				switch(this.state){
					case 1:
					  result = '开户成功';
					  break;
					case 2:
					  result = '已提交待激活';
					  break;
					case 3:
					  result = '处理审核中';
					  break;
					case 4:
					  result = '开户失败';
					  break;
				}
				return result;
			}
		},
		methods:{
			dialogBtn(){
				let index = this.state - 2;
				let accoutDialogInfo = AccoutDialog[index];
				this.$dialog.alert({
				  title: accoutDialogInfo.title,
				  message: accoutDialogInfo.content,
				  confirmButtonColor: this.color,
				  confirmButtonText: '知道了'
				}).then(() => {});
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.accountInfTagBox{
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
</style>
