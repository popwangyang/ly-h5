<template>
	<div class="contractBox">
		<div class="title">
			<span :style="{visibility: ktv_biling_switch_operation ? 'inherit' : 'hidden'}">
				<span>{{billingText}}</span>
				<span>
					<van-switch :value="checked" @input="onInput" size="20px" :active-color="color" />
				</span>
			</span>

			<span>
				<span @click="goAccountRecord">计费记录</span>
				<a style="color: #0082FF;" @click="popupBtn">筛选</a>
				<!-- <van-icon name="label-o" v-if="!screen" size="20px" @click="popupBtn" />
        <van-icon name="label" v-else size="20px" @click="popupBtn" /> -->
			</span>
		</div>
		<div class="contentBox" ref="scroll">
			<PageList :params="params" :getData="getData" noListText="暂无合同信息" ref="pageList">
				<template v-slot:default="slotProps">
					<ContractListItem v-for="(item, index) in slotProps.dataList" :data="item" :key="index" />
				</template>
			</PageList>
		</div>
		<van-popup v-model="show" position="right" @close="popupCloseEvent" :style="{ width: '280px', height: '100%' }">
			<div class="popupRightBox">
				<div class="content">
					<div class="box" v-for="(item, index) in popupData" :key="index">
						<span class="boxTitle">{{item.title}}</span>
						<span class="boxList">
							<span :class="{isSelected: popupValue[item.key] == item1.id ? true: false }" v-for="(item1, index1) in item.list"
							 :key="index1" @click="selectedBtn(item.key, item1.id)">{{item1.text}}</span>
						</span>
					</div>
				</div>
				<div class="bottom">
					<span @click="show = false">取消</span>
					<span class="a" @click="searchBtn">确定</span>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import { actionsAuthority } from '@/libs/util'
	import config from "@/config/index";
	import PageList from "@/components/pageList";
	import ContractListItem from "@/components/listItems/contactListItem";
	import {
		getContractList,
		billingSwitch
	} from "@/api/ktv";
	import {
		cacheMixins
	} from "@/libs/mixins";
	export default {
		name: "contract",
		mixins: [cacheMixins],
		components: {
			PageList,
			ContractListItem
		},
		computed: {
			color() {
				return this.$store.state.app.theme.color;
			},
			checked() {
				return this.$store.state.ktv.billingState == 1 ? true : false;
			},
			billingText() {
				return this.$store.state.ktv.billingState == 1 ? "停止计费":"开始计费";
			},
			message() {
				let text = "是否停止计费?";
				if (this.$store.state.ktv.billingState == 2) {
					text = "是否开启计费?";
				} else {
					if (this.dataList[0] && this.dataList[0].type == 2 && this.dataList[0].state == 2) {
						text = "当前合同还未过期，且商家已开通扫码，是否确定关闭商家的扫码功能？";
					}
				}
				return text;
			}
		},
		data() {
			return {
				ktv_biling_switch_operation: actionsAuthority('ktv_biling_switch_operation'), // 开始计费和暂停计费
				params: {
					ktv: this.$store.state.ktv.ktvID
				},
				getContractList: getContractList,
				screen: false,
				show: false,
				dataList: [],
				popupValue: {
					contract_type: 0,
					contract_statue: 0,
					approval_statue: 0
				},
				searchValue: {
					contract_type: 0,
					contract_statue: 0,
					approval_statue: 0
				},
				popupData: config.ktv_contract_data
			};
		},
		watch: {
			searchValue: {
				handler(newValue) {
					let flag = false;
					Object.keys(newValue).map(item => {
						if (newValue[item] != 0) {
							flag = true;
						}
					});
					this.screen = flag;
				},
				deep: true
			}
		},
		methods: {
			goAccountRecord() {
				this.$router.push({
					name: "accountRecord",
				});
			},
			popupCloseEvent() {
				Object.assign(this.popupValue, this.searchValue);
			},
			searchBtn() {
				Object.assign(this.searchValue, this.popupValue);
				console.log(this.searchValue);
				this.show = false;
				this.params = {
					ktv: this.$store.state.ktv.ktvID,
					type: this.searchValue.contract_type == 0 ? "" : this.searchValue.contract_type,
					state: this.searchValue.contract_statue == 0 ? "" : this.searchValue.contract_statue,
					approve_state: this.searchValue.approval_statue == 0 ? "" : this.searchValue.approval_statue
				};
				this.$nextTick(() => {
					this.$refs.pageList.onReload();
				});
			},
			selectedBtn(title, id) {
				console.log(title, id);
				this.popupValue[title] = id;
			},
			onInput(checked) {
				let title = "计费开关";
				this.$dialog.confirm({
					title: title,
					message: this.message,
					confirmButtonColor: this.$store.state.app.theme.color,
					beforeClose: this.startChargingBtn
				});
			},
			startChargingBtn(action, done) {
				let state = this.checked ? 2 : 1;
				if (action === "confirm") {
					let send_data = {
						contract: {
							billing_state: state // 1：开启计费 2：关闭计费
						}
					};
					billingSwitch(send_data, this.$store.state.ktv.ktvID)
						.then(res => {
							console.log(state);
							this.$store.commit("setBillingState", state);
							done();
							this.$toast("状态修改成功");
						})
						.catch(err => {
							done();
							console.log(err);
							let toastTxt = "操作失败！！！";
							if (err.status == 400) {
								toastTxt = err.data[0];
							}
							this.$toast(toastTxt);
						});
				} else {
					done();
				}
			},
			popupBtn() {
				this.show = true;
			},
			getData(params) {
				return new Promise((resolve, reject) => {
					getContractList(params).then(res => {
						let priorityArr = [2, 1, 3, 4]; // 根据合同状态排序，合同已生效排在第一位
						res.data.results.sort((a, b) => {
							if (priorityArr.indexOf(a.state) > priorityArr.indexOf(b.state)) {
								return 1;
							} else {
								return -1;
							}
						})
						let results = {
							total: res.data.count,
							data: res.data.results
						}
						this.dataList = res.data.results;
						resolve(results)
					})
				})
			}
		}
	};
</script>

<style scoped="scoped" lang="less">
	.contractBox {
		display: flex;
		flex-direction: column;
		height: 100%;

		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px;
			background: white;
			border: 1px solid #f6f6f6;

			&>span {
				display: flex;
				align-items: center;

				&>span {
					display: block;
					margin-right: 10px;
				}
			}
		}

		.contentBox {
			flex: 1;
			overflow: auto;
			background: #f6f6f6;
		}

		.popupRightBox {
			width: 100%;
			height: 100%;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.bottom {
				width: 100%;
				height: 50px;
				display: flex;
				background: rgba(243, 245, 247, 1);
				box-shadow: 0px -1px 5px -1px rgba(0, 0, 0, 0.16);
				font-size: 16px;
				font-weight: 500;

				&>span {
					display: flex;
					flex: 1;
					height: 100%;
					align-items: center;
					justify-content: center;
				}

				&>span:nth-child(2) {
					flex: 2;
				}

				.a {
					background: #0082ff;
					color: white;
				}
			}

			.content {
				padding-left: 20px;

				.box {
					.boxTitle {
						font-size: 14px;
						color: #444444;
						display: block;
						margin: 20px 0;
						font-weight: 600;
					}

					.boxList {
						display: flex;
						flex-wrap: wrap;
						font-size: 12px;

						&>span {
							padding: 10px 20px;
							margin: 0 20px 20px 0;
							min-width: 70px;
							box-sizing: border-box;
							background: #f3f5f7;
							color: #444444;
						}

						&>span[class="isSelected"] {
							background: white;
							color: #0082ff;
							border-radius: 2px;
							border: 1px solid rgba(0, 130, 255, 1);
						}
					}
				}
			}
		}
	}
</style>
