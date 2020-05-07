<template>
	<div class="paymentVoucherBox">
		<van-grid :column-num="4">
		  <van-grid-item  text="款项说明" />
		  <van-grid-item  text="到账状态" />
		  <van-grid-item  text="到账金额" />
		  <van-grid-item  text="到账时间" />
		  <template>
			  <van-grid-item>
				  <a @click="imagePreview">曲库初装费</a>
			  </van-grid-item>
			  <van-grid-item>
			  		待确认		  
			  </van-grid-item>
			  <van-grid-item>
			  		1234.00		  
			  </van-grid-item>
			  <van-grid-item>
			  		20-01-01 ~ 20-01-31		  
			  </van-grid-item>
		  </template>
		</van-grid>
		
	</div>
</template>

<script>
	import { ImagePreview } from "vant";
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			imagePreview(url, name) {
			  // let type = name.split(".")[name.split(".").length - 1];
			  // if (type === "pdf") {
			  //   this.$router.push({
			  //     path: "/PdfPreview",
			  //     query: { url, name: name }
			  //   });
			  // } else {
			  //   ImagePreview([url]);
			  // }
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
	.paymentVoucherBox{
		a{
			color: #1989fa;
		}
	}
</style>
