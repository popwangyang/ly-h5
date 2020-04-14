<template>
	<van-cell value="营业中" is-link class="ktvListItem" @click="goDetail">
		 <div slot="title" class="title">
			 <span class="name">{{data.ktv_name}}</span>
			 <ktvTag :value="data.cate"></ktvTag>
		 </div>
		 <span slot="label">
			 <span>{{data.province}}{{data.city}}{{data.county}}</span>
			 <span style="margin-left: 40px;">实际包厢数: {{data.room_num}}</span>
		 </span>
		 <span class="value3" v-if="data.implement_status == 1">
			待确认到账
		 </span>
		 <span class="value2" v-if="data.implement_status == 2">
		    待实施
		 </span>
		 <span class="value1" v-if="data.implement_status == 3">
		 	已实施
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
			&>span{
				vertical-align: top;
			}
			.name{
				display: inline-block;
				max-width: 160px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				margin-right: 10px;
				color: #444444;
				font-size: 14px;
				font-weight:900;
				font-family: Microsoft Yahei;
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
