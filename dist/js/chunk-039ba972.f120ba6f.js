(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-039ba972"],{1417:function(t,n,e){},"5c8d":function(t,n,e){"use strict";var a=e("1417"),s=e.n(a);s.a},"7ce2":function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"withdrawal-result"},[e("div",{staticClass:"result"},[t.f?e("van-icon",{attrs:{size:"52px",color:"#01CCA3",name:"checked"}}):e("van-icon",{attrs:{size:"52px",color:"#F56C6C",name:"clear"}}),t.f?e("div",[e("p",{staticClass:"title"},[t._v("提现申请已成功提交")]),e("p",{staticClass:"content"},[t._v("具体到账时间以银行为准")])]):e("p",{staticClass:"content"},[t._v("请稍后再试")])],1),t.f?e("div",{staticClass:"content"},[e("van-cell-group",[e("van-cell",{attrs:{title:"提现银行卡",value:t.bank}}),e("van-cell",{attrs:{title:"提现金额",value:t._f("changeMoney")(t._f("toFixed2")(t.inputnum))}}),e("van-cell",{attrs:{title:"手续费",value:t._f("changeMoney")(t._f("toFixed2")(t.poundange))}}),e("van-cell",{staticClass:"inMoney",attrs:{title:"实际到账金额",value:t._f("changeMoney")(t._f("toFixed2")(t.inputnum))}})],1)],1):t._e(),e("van-button",{staticClass:"confirm entityBtnDefault",on:{click:t.submit}},[t._v("完成")])],1)},s=[],i={data(){return{bank:"",inputnum:0,poundange:0,f:!1}},mounted(){this.f=this.$route.query.f,this.bank=this.$route.query.bank,this.inputnum=this.$route.query.withdrawalMoney},methods:{submit(){this.f?this.$router.push({path:"/main"}):this.$router.push({path:"/withdrawal"})}},computed:{}},c=i,u=(e("91b5"),e("5c8d"),e("2877")),l=Object(u["a"])(c,a,s,!1,null,"5286e400",null);n["default"]=l.exports},"91b5":function(t,n,e){"use strict";var a=e("c2e1"),s=e.n(a);s.a},c2e1:function(t,n,e){}}]);
//# sourceMappingURL=chunk-039ba972.f120ba6f.js.map