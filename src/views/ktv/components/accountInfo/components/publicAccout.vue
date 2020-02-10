<template>
	<div>
		<van-cell title="账户类型" value="对公账户"/>
		<van-cell title="审核状态" >
		  <accout-tag :state="3"></accout-tag>
		</van-cell>
		<span class="accountBoxTitle">
			工商信息
		</span>
		<van-cell title="商户类型" value="xxxxxx"/>
		<van-cell title="工商登记名称" :value="formData.business_registration_name"/>
		<van-cell title="工商注册日期" :value="formData.business_registration_date"/>
		<van-cell title="营业执照注册号" :value="formData.business_license_registration_number"/>
		<van-cell title="营业执有效期" value="2019年10月1日-2020年10月1日"/>
		<cell-image title="营业执照附件" :dataList="formData.business_license_accessory"/>
		<span class="accountBoxTitle">
			法人信息
		</span>
		<van-cell title="法人姓名" :value="formData.name"/>
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
		<van-cell title="开户行网点名称" value="xxxxxx"/>
		<van-cell title="开户行联行行号" value="xxxxxx"/>
		<van-cell title="清算编号" value="2817289393"/>
	</div>
</template>

<script>
	import { accountMixins } from '@/libs/mixins'
	export default{
		mixins: [ accountMixins ],
		data(){
			return{
				formData:{
					business_registration_name: '',
					business_registration_date: '',
					business_license_registration_number: "",
					business_license_accessory: [],
					name: "",
					telephone: '',
					id_number: "",
					id_photos: [],
					bank: "",
					bank_card_number: "",
				}
			}
		}
	}
</script>
