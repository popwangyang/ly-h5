(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2a2838fe"],{"0b7e":function(t,e,s){"use strict";var a=s("d7e2"),o=s.n(a);o.a},3608:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"contractBox"},[s("div",{ref:"scroll",staticClass:"contentBox"},[s("PageList",{ref:"pageList",attrs:{params:t.params,getData:t.getData,noListText:"暂无合同信息"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.dataList,(function(t,e){return s("ContractListItem",{key:e,attrs:{data:t}})}))}}])})],1),s("van-popup",{style:{width:"280px",height:"100%"},attrs:{position:"right"},on:{close:t.popupCloseEvent},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[s("div",{staticClass:"popupRightBox"},[s("div",{staticClass:"content"},t._l(t.popupData,(function(e,a){return s("div",{key:a,staticClass:"box"},[s("span",{staticClass:"boxTitle"},[t._v(t._s(e.title))]),s("span",{staticClass:"boxList"},t._l(e.list,(function(a,o){return s("span",{key:o,class:{isSelected:t.popupValue[e.key]==a.id},on:{click:function(s){return t.selectedBtn(e.key,a.id)}}},[t._v(t._s(a.text))])})),0)])})),0),s("div",{staticClass:"bottom"},[s("span",{on:{click:function(e){t.show=!1}}},[t._v("取消")]),s("span",{staticClass:"a",on:{click:t.searchBtn}},[t._v("确定")])])])])],1)},o=[],i=s("f121"),n=s("3382"),c=s("1777"),r=s("71a5"),l=s("b6f9"),p={name:"contract",mixins:[l["b"]],components:{PageList:n["a"],ContractListItem:c["a"]},computed:{color(){return this.$store.state.app.theme.color},checked(){return 1==this.$store.state.ktv.billingState},billingText(){return 1==this.$store.state.ktv.billingState?"停止计费":"开始计费"},message(){let t="是否停止计费?";return 2==this.$store.state.ktv.billingState?t="是否开启计费?":this.dataList[0]&&2==this.dataList[0].type&&2==this.dataList[0].state&&(t="当前合同还未过期，且商家已开通扫码，是否确定关闭商家的扫码功能？"),t}},data(){return{params:{ktv:this.$store.state.ktv.ktvID},getContractList:r["l"],screen:!1,show:!1,dataList:[],popupValue:{contract_type:0,contract_statue:0,approval_statue:0},searchValue:{contract_type:0,contract_statue:0,approval_statue:0},popupData:i["a"].ktv_contract_data}},watch:{searchValue:{handler(t){let e=!1;Object.keys(t).map(s=>{0!=t[s]&&(e=!0)}),this.screen=e},deep:!0}},methods:{goAccountRecord(){this.$router.push({name:"accountRecord"})},popupCloseEvent(){Object.assign(this.popupValue,this.searchValue)},searchBtn(){Object.assign(this.searchValue,this.popupValue),console.log(this.searchValue),this.show=!1,this.params={ktv:this.$store.state.ktv.ktvID,type:0==this.searchValue.contract_type?"":this.searchValue.contract_type,state:0==this.searchValue.contract_statue?"":this.searchValue.contract_statue,approve_state:0==this.searchValue.approval_statue?"":this.searchValue.approval_statue},this.$nextTick(()=>{this.$refs.pageList.onReload()})},selectedBtn(t,e){console.log(t,e),this.popupValue[t]=e},onInput(t){let e="计费开关";this.$dialog.confirm({title:e,message:this.message,confirmButtonColor:this.$store.state.app.theme.color,beforeClose:this.startChargingBtn})},startChargingBtn(t,e){let s=this.checked?2:1;if("confirm"===t){let t={contract:{billing_state:s}};Object(r["d"])(t,this.$store.state.ktv.ktvID).then(t=>{console.log(s),this.$store.commit("setBillingState",s),e(),this.$toast("状态修改成功")}).catch(t=>{e(),console.log(t);let s="操作失败！！！";400==t.status&&(s=t.data[0]),this.$toast(s)})}else e()},popupBtn(){this.show=!0},getData(t){return new Promise((e,s)=>{Object(r["l"])(t).then(t=>{let s=[2,1,3,4];t.data.results.sort((t,e)=>s.indexOf(t.state)>s.indexOf(e.state)?1:-1);let a={total:t.data.count,data:t.data.results};this.dataList=t.data.results,e(a)})})}}},u=p,h=(s("0b7e"),s("2877")),d=Object(h["a"])(u,a,o,!1,null,"74aef03c",null);e["default"]=d.exports},d7e2:function(t,e,s){}}]);
//# sourceMappingURL=chunk-2a2838fe.04e28143.js.map