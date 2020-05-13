<template>
	<div class="paymentVoucherBox">
		<van-grid :column-num="4">
		  <van-grid-item  text="款项说明" />
		  <van-grid-item  text="到账状态" />
		  <van-grid-item  text="到账金额" />
		  <van-grid-item  text="到账时间" />
		  <template v-for="item in FKPZ">
			  <van-grid-item>
				  <FkpzBox :id="item.annex">
					   <a>{{item.instructions | instructionsFilter}}</a>
				  </FkpzBox>
			  </van-grid-item>
			  <van-grid-item>
			  		{{item.state | stateFilter}}
			  </van-grid-item>
			  <van-grid-item>
			  		{{Number(item.amount_received)}}	  
			  </van-grid-item>
			  <van-grid-item>
					{{item.payment_confirmed_datetime == null ? '暂无':item.payment_confirmed_datetime}}
			  </van-grid-item>
		  </template>
		</van-grid>
		
	</div>
</template>

<script>
	import FkpzBox from "@/components/fkpz";
	export default{
		components:{
			FkpzBox
		},
		props:{
			FKPZ:{
				type:Array,
				default: () => []
			}
		},
		filters:{
			stateFilter(state){
				return state == "waiting_confirmed" ? '待确认':'已到账'
			},
			instructionsFilter(text){
				let length = 0 || text.length;
				if(length > 6){
					return text.substring(0, 6) + '...';
				}else{
					return text;
				}
			}
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
