<template>
	<div>
		<van-cell title="账户类型" value="对私账户"/>
		<van-cell title="审核状态" >
		  <accout-tag :state="3"></accout-tag>
		</van-cell>
		<span class="accountBoxTitle">
			用户信息
		</span>
		<van-cell title="用户类型" value="xxxx"/>
		<van-cell title="姓名" :value="formData.name"/>
		<van-cell title="手机号" :value="formData.telephone"/>
		<van-cell title="身份证号" :value="formData.id_number"/>
		<van-cell title="身份证有效期" value="2019年10月1日-2020年10月1日"/>
		<cell-image title="身份证照片" :dataList="formData.id_photos"/>
		<span class="accountBoxTitle">
			开户信息
		</span>
		<van-cell title="银行卡类型" value="信用卡"/>
		<van-cell title="银行卡号" :value="formData.bank_card_number"/>
		<van-cell title="银行卡开户名" value="王某某"/>
		<van-cell title="银行卡开户行" :value="formData.bank"/>
	</div>
</template>

<script>
	import { accountMixins } from '@/libs/mixins'
	export default{
		mixins: [ accountMixins ],
		data(){
			return{
				formData:{
					name: "",
					telephone: '',
					id_number: "",
					id_photos: [],
					bank: "",
					bank_card_number: "",
				}
			}
		},
	}
</script>
