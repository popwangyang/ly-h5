(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-68725bc7"],{"2d40":function(e,t,a){"use strict";var n=a("e157"),s=a.n(n);s.a},b3d5:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"searchPage"},[a("van-search",{attrs:{placeholder:e.placeholder,shape:"round","show-action":"",autofocus:!0},on:{input:e.searchChange},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}},[a("div",{attrs:{slot:"action"},on:{click:e.onCancel},slot:"action"},[e._v("取消")])]),1==e.pageStatues?a("div",{staticClass:"content"},[a("van-list",{attrs:{finished:e.finished,"finished-text":e.finishedText},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},e._l(e.results,(function(e,t){return a("ItemWidget",{key:t,attrs:{data:e}})})),1)],1):e._e(),0==e.pageStatues?a("div",{staticClass:"loading"},[a("Loading")],1):e._e()],1)},s=[],i=a("2909"),o=a("4624"),c=a("54a1"),h=a("c276"),l=a("2b0e"),u={name:"searchPage",components:{Loading:c["a"]},data:function(){return{total:0,pIndex:1,pSize:30,pageStatues:1,placeholder:o["a"][this.$route.query.type].placeholder,getData:o["a"][this.$route.query.type].api,searchValue:"",results:[],loading:!1,finished:!0}},computed:{finishedText:function(){return""==this.searchValue?"":"没有更多了"}},methods:{onCancel:function(){this.$router.go(-1)},onLoad:function(){var e=this;this.pIndex++;var t={name:this.searchValue,page_index:this.pIndex,page_size:this.pSize};this.getData(t).then((function(t){var a,n=t.data;(a=e.results).push.apply(a,Object(i["a"])(n)),e.loading=!1,e.results.length>=e.total&&(e.finished=!0)}))},searchChange:function(){if(""==this.searchValue)return this.results=[],this.pageStatues=1,this.finished=!1,void(this.loading=!1);this.pageStatues=0,Object(h["b"])(this.searchEvent,200)()},searchEvent:function(){var e=this;this.pIndex=1;var t={name:this.searchValue,page_index:this.pIndex,page_size:this.pSize};this.getData(t).then((function(t){e.total=t.total,e.results=""==e.searchValue?[]:t.data,e.pageStatues=1,e.finished=!1,e.loading=!1,e.results.length>=e.total&&(e.finished=!0)}))}},created:function(){l["a"].component("ItemWidget",o["a"][this.$route.query.type].template)},mounted:function(){}},r=u,d=(a("2d40"),a("2877")),p=Object(d["a"])(r,n,s,!1,null,"0329eec6",null);t["default"]=p.exports},e157:function(e,t,a){}}]);
//# sourceMappingURL=chunk-68725bc7.580463ed.js.map