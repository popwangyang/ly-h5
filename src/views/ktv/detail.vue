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
				<van-cell>
					<span slot="title">联系人</span>
					<span>
						{{detailData.contact_username}}
					</span>
				</van-cell>
				<van-cell>
					<span slot="title">手机号</span>
					<span>
						{{detailData.contact_phone}}
					</span>
				</van-cell>
				<van-cell>
					<span slot="title">经营地址</span>
					<span>
						{{detailData.province}}
						{{detailData.city}}
						{{detailData.county}}
						{{detailData.address}}
					</span>
				</van-cell>
				<span class="detailTitle">
					营业信息
				</span>
				<van-cell v-if="detailData.opening_hours">
					<span slot="title" class="YYTitle">开业时间</span>
					<span slot='label' class="YYLabel">
						{{detailData.opening_hours}}
					</span>
				</van-cell>
				<van-cell>
					<span slot="title" class="YYTitle">营业时间</span>
					<span slot='label' class="YYLabel">
						{{businessTime}}
					</span>
				</van-cell>
				<van-cell v-if="detailData.vod_ktv_id">
					<span slot="title" class="YYTitle">设备信息</span>
					<span slot='label' class="YYLabel">
						{{detailData.vod_ktv_id}}, {{detailData.vod_brand}}
					</span>
				</van-cell>
				<van-cell>
					<span slot="title" class="YYTitle">所属代理商</span>
					<span slot='label' class="YYLabel">
						{{detailData.agent_name}}
					</span>
				</van-cell>
				<div class="divider"></div>
				<van-cell is-link @click="remarkBtn" v-if="detailData.remark != null">
					<span slot="title">备注</span>
					<span class="remark">
						{{detailData.remark}}
					</span>
				</van-cell>
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
	import { getWeeks, getTime } from '@/libs/util'
	import ktvTag from '@/components/tags/ktvTags'
	export default{
		name: 'KTVDetail',
		mixins: [ cacheMixins ],
		components:{
			ContentLoad,
			ktvTag
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
			}
		},
		data(){
			return{
			   detailData: {
				   business_periods: '',
				   business_workdays: '',
			   },
			   cardList:[
				   {
					   id: 0,
					   imgUrl: require('@/assets/ktvTbas/tab1.png'),
					   title: '合同信息'
				   },
				   {
					   id: 1,
					   imgUrl:require('@/assets/ktvTbas/tab2.png'),
					   title: '实施信息'
				   },
				   {
					   id: 2,
					   imgUrl:require('@/assets/ktvTbas/tab3.png'),
					   title: '账户信息'
				   },
				   {
					   id: 3,
					   imgUrl:require('@/assets/ktvTbas/tab4.png'),
					   title: '账号信息'
				   },
				   {
					   id: 4,
					   imgUrl:require('@/assets/ktvTbas/tab5.png'),
					   title: '活动信息'
				   },
			   ]
			}
		},
		methods:{
			...mapActions([
				'KtvDetail'
			]),
			remarkBtn(){
				let remark = '暂无备注'
				if(this.detailData.remark){
				  remark = this.detailData.remark;
				}
				this.$dialog.alert({
				  title: '备注',
				  message: remark
				}).then(() => {
				  // on close
				});
			},
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
						console.log(res)
						resolve(res)
					})
				})
			}
		},
		mounted() {
			console.log('mounted');
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
			}
		}
		.remark{
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			display: inline-block;
			width: 100px;
			height: 18px;
		}
		.YYTitle{
			transform: scale(5/6);
			font-size: 12px;
			display: block;
			color: #999999;
			transform-origin: left center;
		}
		.YYLabel{
			font-size: 14px;
			color: #444444;
		}
		.cardList{
			display: flex;
			flex-wrap: wrap;
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
