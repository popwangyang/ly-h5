<template>
	<div>
		<button v-on:click="add">Add</button>
		<button v-on:click="remove">Remove</button>
		<button v-on:click="shuffle">shuffle</button>
		<TranstionsList>
			<span class="itemBox" v-for="item in items" :key="item">
				{{item}}
			</span>
		</TranstionsList>
	</div>
</template>

<script>
	import TranstionsList from '@/components/transtionList'
	export default{
		components:{
			TranstionsList
		},
		data(){
			return{
				items: [1,2,3,4,5,6,7,8,9],
				nextNum: 10
			}
		},
		methods:{
			    randomIndex: function () {
			      return Math.floor(Math.random() * this.items.length)
			    },
			    add: function () {
			      this.items.splice(this.randomIndex(), 0, this.nextNum++)
			    },
			    remove: function () {
			      this.items.splice(this.randomIndex(), 1)
			    },
				shuffle: function () {
				      this.items = [2,1,3,4,5,6,7,8,9]
				}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.itemBox{
	  transition: all 1s;
	  display: block;
	  border: 20px solid #ECECEC;
	  width: 100%;
	  height:120px;
	  background:rgba(255,255,255,1);
	  box-shadow:0px 2px 6px 0px rgba(0,0,0,0.08);
	  border-radius:10px;
	}
</style>
