<template>
	<div class="ktvBox">
        <Search placeholder="请输入门店名称"></Search>
		<FilterMenu/>
	    <div class="content" ref='scroll'>
			<PageList
			:getData="getKTVList"
			noListText="暂未创建KTV信息"
			>
			<template v-slot:default="slotProps">
				 <ktvListItem v-for="(item, index) in slotProps.dataList" 
				 :data="item" 
				 :key="index"
				 />
			</template>
			</PageList>
		</div>
	</div>
</template>

<script>
	import FilterMenu from './components/filter'
	import PageList from '@/components/pageList'
    import Search from '@/components/search'
	import ktvListItem from '@/components/listItems/ktvListItem'
	import { getKTVList } from '@/api/ktv'
	import { cacheMixins } from '@/libs/mixins'
	import { mapActions } from 'vuex'
	export default{
		name: 'ktvmanage',
		mixins: [ cacheMixins ],
		components:{
			PageList,
			Search,
			ktvListItem,
			FilterMenu
		},
		data(){
			return{
				value: '',
				getKTVList: getKTVList
			}
		},
		methods:{
			...mapActions([
				'vodBands'
			]),
		},
		mounted() {
			this.vodBands();
		}
	}
</script>
<style scoped="scoped" lang="less">
	.ktvBox{
		height: 100%;
		display: flex;
		flex-direction: column;
		.content{
			flex: 1;
			overflow: auto;
		}
		
	}
</style>
