<template>
	<van-cell :title="title">
		<span slot="label">
			<span class="cellImagLabel" v-for="(item ,index) in data" :key="index" @click="imagePreview(item.fileUrl, item.name)">
				<van-icon name="photo" size="20" color="#FF5562" />
				<span>{{item.name}}</span>
			</span>
		</span>
	</van-cell>
</template>

<script>
	import {
		ImagePreview
	} from "vant";
	import {
		getUploadFileInfo
	} from "@/api/ktv";
	export default {
		props: {
			title: {
				type: String,
				default: "标题"
			},
			dataList: {
				type: Array,
				default: () => []
			},
			dataID: {
				type: Number,
			}
		},
		data() {
			return {
				data: [],
				instance: null
			};
		},
		watch: {
			dataList: {
				handler(newValue, oldValue) {
					if (newValue.length != 0) {
						this.getInfo();
					}
				},
				immediate: true
			}
		},
		methods: {
			imagePreview(url, name) {
				let type = name.split(".")[name.split(".").length - 1];
				if (type === "pdf") {
					this.$router.push({
						path: "/PdfPreview",
						query: {
							url,
							name: name
						}
					});
				} else {
					this.instance = instance = ImagePreview({
						images: [
							url
						],
						asyncClose: true,
					});
				}
			},
			getInfo() {
				let promise = []
				this.dataList.forEach(item => {
					let p = getUploadFileInfo({
						id: item
					});
					promise.push(p);
				});
				Promise.all(promise).then(res => {
					this.data = res.reduce((cur, next) => {
						let result = {
							fileUrl: next.data.results[0].path_auth,
							name: next.data.results[0].name
						};
						cur.push(result);
						return cur;
					}, []);
				});
			}
		},
		activated() {
			if (this.instance == null) return;
			this.instance.close();
		},
		destroyed() {
			if (this.instance == null) return;
			this.instance.close();
		}
	};
</script>

<style scoped="scoped" lang="less">
	.cellImagLabel {
		display: flex;
		background: #f8f8f8;
		padding: 10px;
		margin-top: 10px;

		&>span:nth-child(2) {
			margin-left: 10px;
			color: #444444;
			font-size: 14px;
		}
	}
</style>
