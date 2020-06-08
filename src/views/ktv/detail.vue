<template>
	<div style="height: 100%;overflow: auto;" ref='scroll'>
		<ContentLoad
		:getInfo="getData"
		>
		<template>
			<div class="ktvDetailBox">
				<div class="titleBG">
					<span>{{detailData.ktv_name}}</span>
                    <ktvTag :value="detailData.cate"/>
				</div>
				<van-cell v-if="detailData.vod_ktv_id">
					<span slot="title">VOD场所ID</span>
					<span>
						{{detailData.vod_ktv_id}}
					</span>
				</van-cell>
				<van-cell v-if="detailData.vod_ktv_id">
					<span slot="title">VOD品牌</span>
					<span>
						{{detailData.vod_brand}}
					</span>
				</van-cell>
				<van-cell v-if="detailData.agent_name">
					<span slot="title">所属代理商</span>
					<span>
						{{detailData.agent_name}}
					</span>
				</van-cell>
				<van-cell>
					<span slot="title">负责人</span>
					<span>
						{{detailData.contact_username}}
					</span>
				</van-cell>
				<van-cell>
					<span slot="title">联系电话</span>
					<span>
						{{detailData.contact_phone}}
					</span>
				</van-cell>
				<div class="divider"></div>
				<van-cell v-if="detailData.opening_hours">
					<span slot="title">开业时间</span>
					<span>
						{{detailData.opening_hours}}
					</span>
				</van-cell>
				<van-cell>
					<span slot="title">营业状态</span>
					<span>
						{{detailData.business_state | businessStateFilter}}
					</span>
				</van-cell>
				<van-cell>
					<span slot="title">允许退单时间</span>
					<span>
						{{detailData.allow_refund_minute}}分钟
					</span>
				</van-cell>
				<van-cell>
					<span slot="title">实际包厢数</span>
					<span>
						{{detailData.room_num}}
					</span>
				</van-cell>
				<van-cell value-class="YYLabel">
					<span slot="title">营业时间</span>
					<span>
						{{businessTime}}
					</span>
				</van-cell>
				<div class="divider"></div>
				<van-cell value-class="YYLabel"  v-if="detailData.remark != null && detailData.remark != ''">
					<span slot="title">备注</span>
					<span class="remark">
						<TextOverflow
						:maxLength="20"
						:text="remark"
						/>
					</span>
				</van-cell>
				<div class="divider"></div>
				<van-cell>
					<span slot="title">创建人</span>
					<span>
						{{detailData.user_name}}
					</span>
				</van-cell>
				<van-cell>
					<span slot="title">创建时间</span>
					<span>
						{{detailData.create_date}}
					</span>
				</van-cell>
				<div class="divider"></div>
				<div class="cardList">
					<span class="cardListBox" v-for="item in cardList" :key="item.id" @click="cardBtn(item.id)">
						<span>
							<img :src="item.imgUrl">
						</span>
						<span>{{item.title}}</span>
					</span>
				</div>
			</div>
		</template>
		</ContentLoad>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import ContentLoad from '@/components/contentLoad'
	import { cacheMixins } from '@/libs/mixins'
	import { getWeeks, getTime, actionsAuthority } from '@/libs/util'
	import ktvTag from '@/components/tags/ktvTags'
	import TextOverflow from '@/components/textOverflow'
	export default{
		name: 'KTVDetail',
		mixins: [ cacheMixins ],
		components:{
			ContentLoad,
			ktvTag,
			TextOverflow
		},
		filters:{
			businessStateFilter(state){
				let business = '正常';
				switch(state){
					case 1:
					    business = '正常';
					break;
					case 2:
					    business = '停业';
					break;
					case 3:
					    business = '暂停营业';
					break;
				}
				return business;
			}
		},
		computed:{
			businessTime(){
				let time, day = null;
				if(this.detailData.business_periods == ''){
					time = '24小时营业';
				}else{
					time = getTime(this.detailData.business_periods);
				}
				let arr = this.detailData.business_workdays.split('');
				day = getWeeks(arr);
				return day+" "+time;
			},
			cardList(){
				let results = [];
				if(this.ktv_contract_query){
					results.push({
					   id: 0,
					   imgUrl: require('@/assets/ktvTbas/tab1.png'),
					   title: '合同信息'
				   })
				}
				
				if(this.ktv_implementation_info_query){
					results.push( {
					   id: 1,
					   imgUrl:require('@/assets/ktvTbas/tab2.png'),
					   title: '实施信息'
				   })
				}
				
				if(this.ktv_financial_account_query){
					results.push({
					   id: 2,
					   imgUrl:require('@/assets/ktvTbas/tab3.png'),
					   title: '账户信息'
				   })
				}
				
				if(this.ktv_user_info_query){
					results.push({
					   id: 3,
					   imgUrl:require('@/assets/ktvTbas/tab4.png'),
					   title: '账号信息'
				   })
				}
				
				if(this.ktv_activity_query){
					results.push( {
					   id: 4,
					   imgUrl:require('@/assets/ktvTbas/tab5.png'),
					   title: '活动信息'
				   })
				}
				return results;
			}
		},
		data(){
			return{
			   ktv_contract_query: actionsAuthority('ktv_contract_query'), // 合同信息查询包含列表和详情
			   ktv_implementation_info_query:  actionsAuthority('ktv_implementation_info_query'), // 实施信息查询
			   ktv_financial_account_query: actionsAuthority('ktv_financial_account_query'), // 账户信息查询
			   ktv_user_info_query: actionsAuthority('ktv_user_info_query'),  // 账号信息查询
			   ktv_activity_query: actionsAuthority('ktv_activity_query'),  // 活动信息查询
			   detailData: {
				   business_periods: '',
				   business_workdays: '',
			   },
			   remark:""
			}
		},
		methods:{
			...mapActions([
				'KtvDetail'
			]),
			cardBtn(id){
				switch (id){
					case 0:
						this.$router.push({
							name: 'contract'
						})
						break;
					case 1:
						this.$router.push({
							name: 'impletDetail'
						})
						break;
					case 2:
						this.$router.push({
							name: 'account'
						})
						break;
					case 3:
						this.$router.push({
							name: 'accountNumber'
						})
						break;
					case 4:
						this.$router.push({
							name: 'activity'
						})
						break;
				}
			},
			getData(){
				return new Promise((resolve, reject) => {
					this.KtvDetail(this.$store.state.ktv.ktvID).then(res => {
						this.detailData = res;
						this.remark = this.detailData.remark;
						resolve(res)
					})
				})
			}
		},
		mounted() {
			
			
		}
	}
</script>

<style scoped="scoped" lang="less">
	.ktvDetailBox{
		background: #F6F6F6;
		padding: 10px 15px;
		height: 100%;
		.titleBG{
			width: 100%;
			height: 55px;
			background: url(../../assets/titleBG.png) no-repeat;
			background-size: contain;
			box-sizing: border-box;
			padding: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: flex-start;
			&>span:nth-child(1){
				font-size: 15px;
				font-family: PingFangSC-Semibold,PingFang SC;
				font-weight: 600;
				color: rgba(255,255,255,1);
				margin-bottom: 8px;
			}
		}
		.remark{
			width: 100%;
			line-height: 26px;
		}
		.YYTitle{
			transform: scale(5/6);
			font-size: 12px;
			display: block;
			color: #999999;
			transform-origin: left center;
		}
		.YYLabel{
			flex: 2;
			text-align: left;
		}
		.cardList{
			display: flex;
			flex-wrap: wrap;
			background-color: white;
			.cardListBox{
				display: flex;
				width: 20%;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				margin-bottom: 10px;
				background: white;
				padding-bottom: 20px;
				&>span:nth-child(1){
					display: block;
					width: 52px;
					height: 52px;
					margin-top: 10px;
					margin-bottom: 4px;
					&>img{
						width: 52px;
						height: 52px;
					}
				}
				&>span:nth-child(2){
					font-size:12px;
					font-family:PingFangSC-Semibold,PingFang SC;
					font-weight:600;
					color:rgba(68,68,68,1);
				}
			}
		}
	}
	
</style>
