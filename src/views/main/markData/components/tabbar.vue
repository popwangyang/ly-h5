<template>
    <div class='tabbarBox'>
        <div class="loading" v-if="loading">
           <Loading/>
       </div>
        <van-tabs line-height="2" line-width="66" v-model="active" v-if="!loading">
            <van-tab title="场所签约">
                <Table :data="data" :key="keysign"/>
            </van-tab>
            <van-tab title="场所接入">
                <Table :data="data" :key="keyImplement"/>
            </van-tab>
            <van-tab title="扫码计费">
                <Table :data="data" :key="keyScan"/>
            </van-tab>
            <van-tab title="曲库管理开通">
                <Table :data="data" :key="keyCDN"/>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import Table from './table'
import Loading from '@/components/loading/loading'
export default {
  components:{
      Table,
      Loading
  },
  props: {
      loading: {
          type: Boolean,
          default: true
      },
      data: {
          type: Array,
          default: () => {
              return [];
          }
      }
  },
  data() {
    return {
        active: 0,
        keysign: [
            'name',
            'city',
            'sign_num_ktv',
            'sign_num_room'
        ],
        keyImplement: [
            'name',
            'city',
            'implement_num_ktv',
            'implement_num_room'
        ],
        keyScan: [
            'name',
            'city',
            'scan_num_ktv',
            'scan_num_room'
        ],
        keyCDN: [
            'name',
            'city',
            'cdn_num_ktv',
            'cdn_num_room'
        ]
    }
  },
  props: {
       data: {
          type: Array,
          default: () => {
              return [];
          }
      }
  },

  created() {},


  mounted() {}
}

</script>


<style scope lang='less'>
  .tabbarBox{
      margin-top: 10px;
      background-color: white;
      height: 100%;
      .loading{
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
      }
  }
</style>
<style lang="less">
	.tabbarBox{
		margin-bottom: 20px;
		.van-tab{
			flex: none;
			font-size:12px;
			font-family:PingFangSC-Semibold,PingFang SC;
			font-weight:600;
			color:rgba(183,183,183,1);
			line-height: 64px;
			margin-right: 20px;
		}
		.van-tabs__line{
            background: #0082FF;
            width: 100%;
		}
		.van-tab--active{
			font-size:16px;
			font-family:PingFangSC-Semibold,PingFang SC;
			font-weight:bold;
			color:rgba(68,68,68,1);
		}
		.van-tabs__wrap{
			padding: 0 10px;
		}
	}
</style>