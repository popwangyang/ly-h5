(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-317930be"],{"4ada":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"contractBox"},[s("div",{staticClass:"title"},[s("span",[s("span",[t._v(t._s(t.billingText))]),s("span",[s("van-switch",{attrs:{value:t.checked,size:"20px","active-color":t.color},on:{input:t.onInput}})],1)]),s("span",[t.screen?s("van-icon",{attrs:{name:"label",size:"20px"},on:{click:t.popupBtn}}):s("van-icon",{attrs:{name:"label-o",size:"20px"},on:{click:t.popupBtn}})],1)]),s("div",{ref:"scroll",staticClass:"contentBox"},[s("PageList",{ref:"pageList",attrs:{params:t.params,getData:t.getContractList,noListText:"暂无合同信息"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.dataList,(function(t,e){return s("ContractListItem",{key:e,attrs:{data:t}})}))}}])})],1),s("van-popup",{style:{width:"280px",height:"100%"},attrs:{position:"right"},on:{close:t.popupCloseEvent},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[s("div",{staticClass:"popupRightBox"},[s("div",{staticClass:"content"},t._l(t.popupData,(function(e,a){return s("div",{key:a,staticClass:"box"},[s("span",{staticClass:"boxTitle"},[t._v(t._s(e.title))]),s("span",{staticClass:"boxList"},t._l(e.list,(function(a,o){return s("span",{key:o,class:{isSelected:t.popupValue[e.key]==a.id},on:{click:function(s){return t.selectedBtn(e.key,a.id)}}},[t._v(t._s(a.text))])})),0)])})),0),s("div",{staticClass:"bottom"},[s("span",{on:{click:function(e){t.show=!1}}},[t._v("取消")]),s("span",{staticClass:"a",on:{click:t.searchBtn}},[t._v("确定")])])])])],1)},o=[],n=s("f121"),c=s("3382"),i=s("1777"),l=s("71a5"),r=s("b6f9"),p={name:"contract",mixins:[r["b"]],components:{PageList:c["a"],ContractListItem:i["a"]},computed:{color(){return this.$store.state.app.theme.color},checked(){return 1==this.$store.state.ktv.billingState},billingText(){return 1==this.$store.state.ktv.billingState?"开始计费":"停止计费"}},data(){return{params:{ktv:this.$store.state.ktv.ktvID},getContractList:l["k"],screen:!1,show:!1,popupValue:{contract_type:0,contract_statue:0,approval_statue:0},searchValue:{contract_type:0,contract_statue:0,approval_statue:0},popupData:n["a"].ktv_contract_data}},watch:{searchValue:{handler(t){let e=!1;Object.keys(t).map(s=>{0!=t[s]&&(e=!0)}),this.screen=e},deep:!0}},methods:{popupCloseEvent(){Object.assign(this.popupValue,this.searchValue)},searchBtn(){Object.assign(this.searchValue,this.popupValue),console.log(this.searchValue),this.show=!1,this.params={ktv:this.$store.state.ktv.ktvID,type:0==this.searchValue.contract_type?"":this.searchValue.contract_type,state:0==this.searchValue.contract_statue?"":this.searchValue.contract_statue,approve_state:0==this.searchValue.approval_statue?"":this.searchValue.approval_statue},this.$nextTick(()=>{this.$refs.pageList.onReload()})},selectedBtn(t,e){console.log(t,e),this.popupValue[t]=e},onInput(t){let e="计费开关",s=null;s=t?"是否开启计费?":"是否停止计费?",this.$dialog.confirm({title:e,message:s,confirmButtonColor:this.$store.state.app.theme.color,beforeClose:this.startChargingBtn})},startChargingBtn(t,e){let s=this.checked?2:1;if("confirm"===t){let t={contract:{billing_state:s}};Object(l["c"])(t,this.$store.state.ktv.ktvID).then(t=>{console.log(s),this.$store.commit("setBillingState",s),e(),this.$toast("状态修改成功")}).catch(t=>{e(),console.log(t);let s="操作失败！！！";400==t.status&&(s=t.data[0]),this.$toast(s)})}else e()},popupBtn(){this.show=!0}}},u=p,h=(s("fd8c"),s("2877")),v=Object(h["a"])(u,a,o,!1,null,"64eab14c",null);e["default"]=v.exports},"835e":function(t,e,s){},fd8c:function(t,e,s){"use strict";var a=s("835e"),o=s.n(a);o.a}}]);
//# sourceMappingURL=chunk-317930be.b9c958ff.js.map