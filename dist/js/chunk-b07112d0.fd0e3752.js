(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b07112d0"],{"4ada":function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"contractBox"},[a("div",{staticClass:"title"},[a("span",[a("span",[t._v(t._s(t.billingText))]),a("span",[a("van-switch",{attrs:{value:t.checked,size:"20px","active-color":t.color},on:{input:t.onInput}})],1)]),a("span",[a("span",{on:{click:t.goAccountRecord}},[t._v("计费记录")]),a("a",{staticStyle:{color:"#0082FF"},on:{click:t.popupBtn}},[t._v("筛选")])])]),a("div",{ref:"scroll",staticClass:"contentBox"},[a("PageList",{ref:"pageList",attrs:{params:t.params,getData:t.getData,noListText:"暂无合同信息"},scopedSlots:t._u([{key:"default",fn:function(s){return t._l(s.dataList,(function(t,s){return a("ContractListItem",{key:s,attrs:{data:t}})}))}}])})],1),a("van-popup",{style:{width:"280px",height:"100%"},attrs:{position:"right"},on:{close:t.popupCloseEvent},model:{value:t.show,callback:function(s){t.show=s},expression:"show"}},[a("div",{staticClass:"popupRightBox"},[a("div",{staticClass:"content"},t._l(t.popupData,(function(s,e){return a("div",{key:e,staticClass:"box"},[a("span",{staticClass:"boxTitle"},[t._v(t._s(s.title))]),a("span",{staticClass:"boxList"},t._l(s.list,(function(e,o){return a("span",{key:o,class:{isSelected:t.popupValue[s.key]==e.id},on:{click:function(a){return t.selectedBtn(s.key,e.id)}}},[t._v(t._s(e.text))])})),0)])})),0),a("div",{staticClass:"bottom"},[a("span",{on:{click:function(s){t.show=!1}}},[t._v("取消")]),a("span",{staticClass:"a",on:{click:t.searchBtn}},[t._v("确定")])])])])],1)},o=[],i=a("f121"),c=a("3382"),n=a("1777"),l=a("71a5"),r=a("b6f9"),p={name:"contract",mixins:[r["b"]],components:{PageList:c["a"],ContractListItem:n["a"]},computed:{color(){return this.$store.state.app.theme.color},checked(){return 1==this.$store.state.ktv.billingState},billingText(){return 1==this.$store.state.ktv.billingState?"停止计费":"开始计费"},message(){let t="是否停止计费?";return 2==this.$store.state.ktv.billingState?t="是否开启计费?":this.dataList[0]&&2==this.dataList[0].type&&2==this.dataList[0].state&&(t="当前合同还未过期，且商家已开通扫码，是否确定关闭商家的扫码功能？"),t}},data(){return{params:{ktv:this.$store.state.ktv.ktvID},getContractList:l["l"],screen:!1,show:!1,dataList:[],popupValue:{contract_type:0,contract_statue:0,approval_statue:0},searchValue:{contract_type:0,contract_statue:0,approval_statue:0},popupData:i["a"].ktv_contract_data}},watch:{searchValue:{handler(t){let s=!1;Object.keys(t).map(a=>{0!=t[a]&&(s=!0)}),this.screen=s},deep:!0}},methods:{goAccountRecord(){this.$router.push({name:"accountRecord"})},popupCloseEvent(){Object.assign(this.popupValue,this.searchValue)},searchBtn(){Object.assign(this.searchValue,this.popupValue),console.log(this.searchValue),this.show=!1,this.params={ktv:this.$store.state.ktv.ktvID,type:0==this.searchValue.contract_type?"":this.searchValue.contract_type,state:0==this.searchValue.contract_statue?"":this.searchValue.contract_statue,approve_state:0==this.searchValue.approval_statue?"":this.searchValue.approval_statue},this.$nextTick(()=>{this.$refs.pageList.onReload()})},selectedBtn(t,s){console.log(t,s),this.popupValue[t]=s},onInput(t){let s="计费开关";this.$dialog.confirm({title:s,message:this.message,confirmButtonColor:this.$store.state.app.theme.color,beforeClose:this.startChargingBtn})},startChargingBtn(t,s){let a=this.checked?2:1;if("confirm"===t){let t={contract:{billing_state:a}};Object(l["d"])(t,this.$store.state.ktv.ktvID).then(t=>{console.log(a),this.$store.commit("setBillingState",a),s(),this.$toast("状态修改成功")}).catch(t=>{s(),console.log(t);let a="操作失败！！！";400==t.status&&(a=t.data[0]),this.$toast(a)})}else s()},popupBtn(){this.show=!0},getData(t){return new Promise((s,a)=>{Object(l["l"])(t).then(t=>{let a=[2,1,3,4];t.data.results.sort((t,s)=>a.indexOf(t.state)>a.indexOf(s.state)?1:-1);let e={total:t.data.count,data:t.data.results};this.dataList=t.data.results,s(e)})})}}},u=p,h=(a("b94d"),a("2877")),d=Object(h["a"])(u,e,o,!1,null,"a7726142",null);s["default"]=d.exports},b94d:function(t,s,a){"use strict";var e=a("bc54"),o=a.n(e);o.a},bc54:function(t,s,a){}}]);
//# sourceMappingURL=chunk-b07112d0.fd0e3752.js.map