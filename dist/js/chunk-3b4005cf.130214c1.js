(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b4005cf"],{"015b":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"withdrawal-result"},[n("div",{staticClass:"result"},[t.f?n("van-icon",{attrs:{size:"52px",color:"#01CCA3",name:"checked"}}):n("van-icon",{attrs:{size:"52px",color:"#F56C6C",name:"clear"}}),t.f?n("div",[n("p",{staticClass:"title"},[t._v("提现申请已成功提交")]),n("p",{staticClass:"content"},[t._v("具体到账时间以银行为准")])]):n("p",{staticClass:"content"},[t._v(t._s(t.error))])],1),t.f?n("div",{staticClass:"content"},[n("van-cell-group",[n("van-cell",{attrs:{title:"提现银行卡",value:t.bank}}),n("van-cell",{attrs:{title:"提现金额",value:t._f("changeMoney")(t._f("toFixed2")(t.inputnum))}}),n("van-cell",{attrs:{title:"手续费",value:t._f("changeMoney")(t._f("toFixed2")(t.poundange))}}),n("van-cell",{staticClass:"inMoney",attrs:{title:"实际到账金额",value:t._f("changeMoney")(t._f("toFixed2")(t.infa))}})],1)],1):t._e(),n("van-button",{staticClass:"confirm entityBtnDefault",on:{click:t.submit}},[t._v("完成")])],1)},i=[],s={data(){return{bank:"",inputnum:0,poundange:0,infa:0,f:!1}},mounted(){this.f=this.$route.query.f,this.bank=this.$route.query.bank,this.inputnum=this.$route.query.inputnum,this.poundange=this.$route.query.poundange,this.infa=this.$route.query.arrivemo},methods:{submit(){this.f?this.$router.push({path:"/main"}):this.$router.push({path:"/withdrawal"})}},computed:{error(){return this.$route.query.e?this.$route.query.e:"请稍后再试"}}},u=s,r=(n("b4e2"),n("1547"),n("4023")),o=Object(r["a"])(u,a,i,!1,null,"763e8d0a",null);e["default"]=o.exports},1547:function(t,e,n){"use strict";var a=n("6be3"),i=n.n(a);i.a},"625f":function(t,e,n){},"6be3":function(t,e,n){},b4e2:function(t,e,n){"use strict";var a=n("625f"),i=n.n(a);i.a}}]);
//# sourceMappingURL=chunk-3b4005cf.130214c1.js.map