(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ce1d7be"],{"3bd1":function(e,t,a){},"51d1":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"searchPage"},[a("van-search",{attrs:{placeholder:e.placeholder,shape:"round"},on:{input:e.searchChange},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}}),1==e.pageStatues?a("div",{staticClass:"content"},[a("van-list",{attrs:{finished:e.finished,"finished-text":e.finishedText,"immediate-check":""},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},e._l(e.results,(function(t,s){return a("ItemWidget",{key:s,attrs:{hasPay:e.hasPay,data:t}})})),1)],1):e._e(),0==e.pageStatues?a("div",{staticClass:"loading"},[a("Loading")],1):e._e()],1)},i=[],h=a("4624"),n=a("54a1"),r=a("c276"),l=a("2b0e"),o={components:{Loading:n["a"]},data(){return{total:0,pIndex:1,pSize:30,pageStatues:1,placeholder:h["a"][this.$route.query.type].placeholder,getData:h["a"][this.$route.query.type].api,searchValue:"",results:[],loading:!1,finished:!0}},computed:{finishedText(){return""==this.searchValue?"":"没有更多了"}},methods:{onLoad(){this.results=[];let e={platform_id:this.searchValue,page_index:this.pIndex,page_size:this.pSize};this.getData(e).then(e=>{let t=e.data;this.results.push(...t),this.loading=!1,this.results.length>=this.total&&(this.finished=!0)})},searchChange(){if(""==this.searchValue)return this.results=[],this.pageStatues=1,this.finished=!1,void(this.loading=!1);this.pageStatues=0,Object(r["b"])(this.searchEvent,500)()},searchEvent(){this.results=[],this.pIndex=1;let e={platform_id:this.searchValue,p_index:this.pIndex,p_size:this.pSize};this.getData(e).then(e=>{this.total=e.total,this.results=""==this.searchValue?[]:e.data,this.pageStatues=1,this.finished=!1,this.loading=!1})}},created(){"boolean"===typeof this.$route.query.hasPay?this.hasPay=this.$route.query.hasPay:"true"===this.$route.query.hasPay?this.hasPay=!0:this.hasPay=!1,l["a"].component("ItemWidget",h["a"][this.$route.query.type].template)},mounted(){}},u=o,d=(a("efda"),a("2877")),c=Object(d["a"])(u,s,i,!1,null,"0b4ce33e",null);t["default"]=c.exports},efda:function(e,t,a){"use strict";var s=a("3bd1"),i=a.n(s);i.a}}]);
//# sourceMappingURL=chunk-3ce1d7be.d6fdba57.js.map