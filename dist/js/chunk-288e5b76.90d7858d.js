(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-288e5b76"],{"4ada":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"contractBox"},[e("div",{staticClass:"title"},[e("span",[e("span",[t._v(t._s(t.billingText))]),e("span",[e("van-switch",{attrs:{value:t.checked,size:"20px","active-color":t.color},on:{input:t.onInput}})],1)]),e("span",[t.screen?e("van-icon",{attrs:{name:"label",size:"20px"},on:{click:t.popupBtn}}):e("van-icon",{attrs:{name:"label-o",size:"20px"},on:{click:t.popupBtn}})],1)]),e("div",{ref:"scroll",staticClass:"contentBox"},[e("PageList",{ref:"pageList",attrs:{params:t.params,getData:t.getContractList,noListText:"暂无创建合同信息"},scopedSlots:t._u([{key:"default",fn:function(s){return t._l(s.dataList,(function(t,s){return e("ContractListItem",{key:s,attrs:{data:t}})}))}}])})],1),e("van-popup",{style:{width:"280px",height:"100%"},attrs:{position:"right"},on:{close:t.popupCloseEvent},model:{value:t.show,callback:function(s){t.show=s},expression:"show"}},[e("div",{staticClass:"popupRightBox"},[e("div",{staticClass:"content"},t._l(t.popupData,(function(s,a){return e("div",{key:a,staticClass:"box"},[e("span",{staticClass:"boxTitle"},[t._v(t._s(s.title))]),e("span",{staticClass:"boxList"},t._l(s.list,(function(a,n){return e("span",{key:n,class:{isSelected:t.popupValue[s.key]==a.id},on:{click:function(e){return t.selectedBtn(s.key,a.id)}}},[t._v(t._s(a.text))])})),0)])})),0),e("div",{staticClass:"bottom"},[e("span",{on:{click:function(s){t.show=!1}}},[t._v("取消")]),e("span",{staticClass:"a",on:{click:t.searchBtn}},[t._v("确定")])])])])],1)},n=[],o=(e("d81d"),e("b64b"),e("f121")),c=e("3382"),i=e("1777"),r=e("71a5"),l=e("b6f9"),p={name:"contract",mixins:[l["b"]],components:{PageList:c["a"],ContractListItem:i["a"]},computed:{color:function(){return this.$store.state.app.theme.color},checked:function(){return 1==this.$store.state.ktv.billingState},billingText:function(){return 1==this.$store.state.ktv.billingState?"停止计费":"开始计费"}},data:function(){return{params:{ktv:this.$store.state.ktv.ktvID},getContractList:r["k"],screen:!1,show:!1,popupValue:{contract_type:0,contract_statue:0,approval_statue:0},searchValue:{contract_type:0,contract_statue:0,approval_statue:0},popupData:o["a"].ktv_contract_data}},watch:{searchValue:{handler:function(t){var s=!1;Object.keys(t).map((function(e){0!=t[e]&&(s=!0)})),this.screen=s},deep:!0}},methods:{popupCloseEvent:function(){Object.assign(this.popupValue,this.searchValue)},searchBtn:function(){var t=this;Object.assign(this.searchValue,this.popupValue),console.log(this.searchValue),this.show=!1,this.params={ktv:this.$store.state.ktv.ktvID,type:this.searchValue.contract_type,state:this.searchValue.contract_statue},this.$nextTick((function(){t.$refs.pageList.onReload()}))},selectedBtn:function(t,s){console.log(t,s),this.popupValue[t]=s},onInput:function(t){var s="计费开关",e=null;e=t?"是否开启计费?":"是否停止计费?",this.$dialog.confirm({title:s,message:e,confirmButtonColor:this.$store.state.app.theme.color,beforeClose:this.startChargingBtn})},startChargingBtn:function(t,s){var e=this,a=this.checked?2:1;if("confirm"===t){var n={contract:{billing_state:a}};Object(r["c"])(n,this.$store.state.ktv.ktvID).then((function(t){console.log(a),e.$store.commit("setBillingState",a),s(),e.$toast("状态修改成功")}))["catch"]((function(t){s(),console.log(t);var a="操作失败！！！";400==t.status&&(a=t.data[0]),e.$toast(a)}))}else s()},popupBtn:function(){this.show=!0}}},u=p,h=(e("e277"),e("2877")),v=Object(h["a"])(u,a,n,!1,null,"9fbd5296",null);s["default"]=v.exports},cb0d:function(t,s,e){},e277:function(t,s,e){"use strict";var a=e("cb0d"),n=e.n(a);n.a}}]);
//# sourceMappingURL=chunk-288e5b76.90d7858d.js.map