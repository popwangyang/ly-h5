<template>
	<div class="contentLoad">
		<span v-show="pageStatues == 0" class="content">
			<Loading/>
		</span>
		<span v-if="pageStatues == 1">
			<slot></slot>
		</span>
		<span v-if="pageStatues == 2" class="content">
			<Empty
			 :text="emptyText"
			 v-if="!$slots.empty"
			/>
			<slot name="empty" v-else></slot>
		</span>
		<span v-if="pageStatues == 3" class="content">
			<Error
			text="加载失败"
			@eventBtn="getData"
			 v-if="!$slots.error"
			/>
			<slot name="error" v-else></slot>
		</span>
	</div>
</template>

<script>
	import Loading from '@/components/loading/loading'
	import Error from '@/components/ErrorComponent'
	import Empty from '@/components/EmptyComponent'
	export default{
		components:{
			Loading,
			Empty,
			Error
		},
		props:{
			getInfo:{
				type: Function,
			},
			emptyText:{
			    type: String,
				default: '暂无信息'
			}
		},
		data(){
			return{
				pageStatues: 0 ,// 0为加载中，1为请求正常，2为没有数据，3为请求出错			
			}
		},
		methods:{
			getData(){
				this.pageStatues = 0;
				this.getInfo().then(res => {
					if(res != ''){
					  this.pageStatues = 1;
					}else{
					  this.pageStatues = 2;
					}
				}).catch(err => {
					console.log(err, 'ppppp')
					this.pageStatues = 3;
				})
			}
		},
		mounted() {
			this.getData();
		}
	}
</script>

<style scoped="scoped" lang="less">
	.contentLoad{
		height: 100%;
		width: 100%;
		.content{
			display: flex;
			height: 100%;
			align-items: center;
			justify-content: center;
		}
	}
</style>
