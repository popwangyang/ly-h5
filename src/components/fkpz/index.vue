<template>
	<div class="fkpzBox" @click="btnClick">
       <slot></slot>
	</div>
</template>

<script>
	import {
		getUploadFileInfo
	} from "@/api/ktv";
	import { ImagePreview } from "vant";
	export default {
		props: ['id'],
		data(){
			return{
				fkpzInfo:{}
			}
		},
		watch: {
			id: {
				handler(newValue, oldValue) {
				let arr = JSON.parse(newValue);
					if(arr && arr.length > 0){
						this.getInfo(arr[0]);
					}
				},
			    immediate: true
			}
		},
		methods: {
			btnClick() {
				let name = this.fkpzInfo.name;
				let url = this.fkpzInfo.path_auth;
				console.log(this.fkpzInfo)
				let type = name.split(".")[name.split(".").length - 1];
				if (type === "pdf") {
				  this.$router.push({
				    path: "/PdfPreview",
				    query: { url, name: name }
				  });
				} else {
				  ImagePreview([url]);
				}
			},
			getInfo(id) {
				getUploadFileInfo({
					id: id
				}).then(res => {
					this.fkpzInfo = res.data.results[0];
				})
			}
		}
	}
</script>

<style>
</style>
