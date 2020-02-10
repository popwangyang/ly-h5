<template>
	<van-cell value="营业中" is-link class="ktvListItem" @click="goDetail">
		 <span slot="title" class="title">
			 <span class="name">{{data.ktv_name}}</span>
			 <ktvTag :value="data.cate"></ktvTag>
		 </span>
		 <span slot="label">
			 <span>创建人: {{data.user_name}}</span>
			 <span> {{data.create_date}}</span>
		 </span>
		 <span class="value1" v-if="data.business_state == 1">
			营业中
		 </span>
		 <span class="value2" v-if="data.business_state == 2">
		 	停业
		 </span>
		 <span class="value3" v-if="data.business_state == 3">
		 	暂停营业
		 </span>
	</van-cell>
</template>

<script>
	import ktvTag from '@/components/tags/ktvTags'
	export default{
		props:{
			data:{
				type: Object,
				required: true
			}
		},
		components:{
			ktvTag
		},
		methods:{
			goDetail(id){
				this.$store.commit('setBillingState', this.data.billing_state);
				this.$store.commit('setKtvID', this.data.id);
				this.$router.push({
					name: 'KTVDetail',
				})
			}
		}
	}
</script>
<style>
	.ktvListItem  .van-cell__title{
		flex: 3;
	}
</style>
<style scoped="scoped" lang="less">
	.ktvListItem{
		.title{
			display: flex;
			align-items: center;
			.name{
				display: block;
				max-width: 160px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				margin-right: 10px;
			}
		}
		.value1{
			color: #01CCA3;
		}
		.value2{
			color: #999999;
		}
		.value3{
			color: red;
		}
	}
</style>
