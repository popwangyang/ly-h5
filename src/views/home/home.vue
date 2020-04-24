<template>
<<<<<<< HEAD
	<div class="homeBox">
		<div class="routerView theme">
			<transition :name="transitionName" v-if="transitionName!='slide-none'">
				<keep-alive :include="keepAliveList">
					<router-view></router-view>
				</keep-alive>
			</transition>
			<keep-alive :include="keepAliveList" v-else>
				<router-view></router-view>
			</keep-alive>
		</div>
		<BottomBar v-show="showTab" @goView="goView" />
	</div>
=======
  <div class="homeBox">
    <div class="routerView theme">
		<transition :name="transitionName">
		  <keep-alive :include="keepAliveList">
		    <router-view></router-view>
		  </keep-alive>
		</transition>
    </div>
    <BottomBar v-show="showTab" @goView="goView" />
  </div>
>>>>>>> wangyan
</template>

<script>
	import {
		mapActions
	} from "vuex";
	import BottomBar from "./components/bottomTabbar";
	export default {
		components: {
			BottomBar
		},
		computed: {
			keepAliveList() {
				return this.$store.state.app.keepAliveList;
			},
			showTab() {
				if (this.$route.meta && this.$route.meta.showBottomTab) {
					return true;
				} else {
					return false;
				}
			}
		},
		data() {
			return {
				timer: null,
				transitionName: 'slide-none'
			};
		},
		watch: {
			$route(to, from) {
				document.title = to.meta.title;
				const toDepth = to.path.split('/').length
				const fromDepth = from.path.split('/').length
				if (toDepth == fromDepth) {
					this.transitionName = 'slide-none';
				} else if (toDepth < fromDepth) {
					this.transitionName = 'slide-right';
				} else {
					this.transitionName = 'slide-left';
				}
			}
		},
		methods: {
			...mapActions(["getUnRead"]),
			goView(pageName) {
				this.$router.push({
					name: pageName
				});
			}
		},
		created() {
			this.$store.commit("SET_THEME", this.$store.state.user.usertype);
		},
		mounted() {
			let body = document.getElementsByTagName("body")[0];
			body.className = this.$store.state.app.className;
		},
		destroyed() {
			clearInterval(this.timer);
			let body = document.getElementsByTagName("body")[0];
			body.className = "themea";
		}
	};
</script>
<style lang="less">
	@import "../../static/style/theme.less";

	.themea {
		.theme(); //默认的样式
	}

	.themeb {
		.theme(#2accdd,
		linear-gradient(180deg,
		rgba(24, 223, 208, 1) 0%,
		rgba(29, 180, 213, 1) 100%),
		url("../../assets/banner2.png"));
	}
</style>
<style scoped="scoped" lang="less">
<<<<<<< HEAD
	.homeBox {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #f6f6f6;

		.routerView {
			flex: 1;
			overflow: auto;
		}
	}

	.slide-none-enter-active,
	.slide-none-enter-active {
		transition: opacity 0.01s ease-out;
	}

	.slide-none-enter {
		opacity: 1.0;
	}
=======
.homeBox {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #f6f6f6;
  .routerView {
    flex: 1;
    overflow: auto;
  }
}
.slide-none-enter-active, .slide-none-enter-active{
	transition: opacity 0.01s ease-out;
}
.slide-none-enter{
	opacity: 0;
}
>>>>>>> wangyan

	.slide-left-enter-active,
	.slide-right-enter-active {
		transition: all 0.2s ease-out;
	}

	.slide-left-enter {
		transform: translate(100%, 0);
	}

	.slide-right-enter {
		transform: translate(-100%, 0);
	}
</style>
