(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d6e8b2b6"],{"171c":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("van-cell",{attrs:{title:e.title,"is-link":""},on:{click:e.selectedBtn}},[a("span",[""!=e.selectValue?a("span",{staticStyle:{color:"#000000"}},[e._v(e._s(e.selectValue))]):a("span",[e._v(e._s(e.placeholder))])])]),a("van-popup",{staticStyle:{height:"300px"},attrs:{position:"bottom"},model:{value:e.showPicker,callback:function(t){e.showPicker=t},expression:"showPicker"}},[a("van-picker",{ref:"picker",attrs:{"show-toolbar":"","default-index":e.defaultIndex,columns:e.columns},on:{cancel:function(t){e.showPicker=!1},confirm:e.onConfirm,change:e.onChange}})],1)],1)},r=[],o=(a("4160"),a("a9e3"),a("159b"),{props:{title:{type:String,default:"标题"},modelvalue:{type:[String,Number],default:""},placeholder:{type:String,default:"请选择"},dataList:{type:Array,default:function(){return[]}}},model:{prop:"modelvalue",event:"returnBack"},watch:{modelvalue:function(e){var t=this;this.dataList.forEach((function(e,a){""!=t.modelvalue&&e.value==t.modelvalue&&(t.defaultIndex=a,t.currentIndex=a,t.selectValue=e.label)}))}},data:function(){return{selectValue:"",columns:[],defaultIndex:0,showPicker:!1,currentIndex:0}},methods:{onConfirm:function(e){this.selectValue=this.dataList[this.currentIndex].label,this.$emit("returnBack",this.dataList[this.currentIndex].value),this.showPicker=!1},selectedBtn:function(){var e=this;this.showPicker=!0,this.$nextTick((function(){e.currentIndex=0,e.dataList.forEach((function(t,a){""!=e.modelvalue&&t.value==e.modelvalue&&(e.currentIndex=a)})),e.$refs.picker.setIndexes([e.currentIndex])}))},onChange:function(e){this.currentIndex=e.getIndexes()[0]},init:function(){var e=this,t=[];this.dataList.forEach((function(a,n){t.push(a.label),""!=e.modelvalue&&a.value==e.modelvalue&&(e.defaultIndex=n,e.currentIndex=n,e.selectValue=a.label)})),this.columns=t}},mounted:function(){this.init()}}),i=o,c=a("2877"),l=Object(c["a"])(i,n,r,!1,null,null,null);t["a"]=l.exports},"1d1c":function(e,t,a){var n=a("23e7"),r=a("83ab"),o=a("37e8");n({target:"Object",stat:!0,forced:!r,sham:!r},{defineProperties:o})},"24d6":function(e,t,a){},"455d":function(e,t,a){"use strict";a("4160"),a("b64b"),a("d3b7"),a("159b");var n=a("d399"),r={isNonEmpty:function(e,t){if(""===e)return t},isNumber:function(e,t){if(!/^[+]{0,1}(\d+)$/.test(e))return t},isEmail:function(e,t){if(!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(e))return t},isPhone:function(e,t){if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(e))return t},isGateway:function(e,t){if(!/^192\.168(\.(\d|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))){2}$/.test(e))return t},isMac:function(e,t){if(!/^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/.test(e))return t}},o=function(){this.cache=[]};o.prototype.add=function(e,t,a){for(var n=this,o=function(){var o=t[i];o.required?o.validate?n.cache.push((function(){return o.validate(e,a)})):o.type?n.cache.push((function(){return r[o.type](e,o.message)})):n.cache.push((function(){return r.isNonEmpty(e,o.message)})):o.type?0==o.required?""!=e&&n.cache.push((function(){return r[o.type](e,o.message)})):n.cache.push((function(){return r[o.type](e,o.message)})):o.validate&&(0==o.required?""!=e&&n.cache.push((function(){return o.validate(e,a)})):n.cache.push((function(){return o.validate(e,a)})))},i=0;i<t.length;i++)o()},o.prototype.start=function(){for(var e=0;e<this.cache.length;e++){var t=this.cache[e]();if(t)return console.log(t),t}};var i=function(e,t){return new Promise((function(a,r){var i=new o;Object.keys(t).forEach((function(a){i.add(e[a],t[a],e)}));var c=i.start();c?(Object(n["a"])(c),a(!1)):a(!0)}))};t["a"]=i},5530:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));a("a4d3"),a("4de4"),a("4160"),a("1d1c"),a("7a82"),a("e439"),a("dbb4"),a("b64b"),a("159b");var n=a("ade3");function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){Object(n["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,a){var n=a("1d80"),r=a("5899"),o="["+r+"]",i=RegExp("^"+o+o+"*"),c=RegExp(o+o+"*$"),l=function(e){return function(t){var a=String(n(t));return 1&e&&(a=a.replace(i,"")),2&e&&(a=a.replace(c,"")),a}};e.exports={start:l(1),end:l(2),trim:l(3)}},7156:function(e,t,a){var n=a("861d"),r=a("d2bb");e.exports=function(e,t,a){var o,i;return r&&"function"==typeof(o=t.constructor)&&o!==a&&n(i=o.prototype)&&i!==a.prototype&&r(e,i),e}},"87d0":function(e,t,a){"use strict";t["a"]={video:[{label:"MPG",value:"4"},{label:"MP4",value:"3"},{label:"MKV",value:"5"}],tv_picture:[{label:"png",value:"0"},{label:"jpg",value:"1"},{label:"gif",value:"2"}],vod_picture:[{label:"png",value:"0"},{label:"jpg",value:"1"}],tv_resolvingPower:[{label:"1280*720",value:"1"},{label:"1920*1080",value:"3"}],vod_resolvingPower:[{label:"720P",value:"1"},{label:"1080P",value:"3"}],TV720P:[{label:"946,373",value:"0"},{label:"154,373",value:"1"},{label:"自定义",value:"2"}],TV1080P:[{label:"1418,560",value:"0"},{label:"230,560",value:"1"},{label:"自定义",value:"2"}],SH720P:[{label:"946,352",value:"0"},{label:"自定义",value:"1"}],SV720P:[{label:"421,947",value:"0"},{label:"自定义",value:"1"}],SH1080P:[{label:"1418,527",value:"0"},{label:"自定义",value:"1"}],SV1080P:[{label:"631,1420",value:"0"},{label:"自定义",value:"1"}]}},a9e3:function(e,t,a){"use strict";var n=a("83ab"),r=a("da84"),o=a("94ca"),i=a("6eeb"),c=a("5135"),l=a("c6b6"),s=a("7156"),u=a("c04e"),d=a("d039"),f=a("7c73"),v=a("241c").f,p=a("06cf").f,b=a("9bf2").f,h=a("58a8").trim,m="Number",g=r[m],_=g.prototype,y=l(f(_))==m,P=function(e){var t,a,n,r,o,i,c,l,s=u(e,!1);if("string"==typeof s&&s.length>2)if(s=h(s),t=s.charCodeAt(0),43===t||45===t){if(a=s.charCodeAt(2),88===a||120===a)return NaN}else if(48===t){switch(s.charCodeAt(1)){case 66:case 98:n=2,r=49;break;case 79:case 111:n=8,r=55;break;default:return+s}for(o=s.slice(2),i=o.length,c=0;c<i;c++)if(l=o.charCodeAt(c),l<48||l>r)return NaN;return parseInt(o,n)}return+s};if(o(m,!g(" 0o1")||!g("0b1")||g("+0x1"))){for(var k,x=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof x&&(y?d((function(){_.valueOf.call(a)})):l(a)!=m)?s(new g(P(t)),a,x):P(t)},w=n?v(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),I=0;w.length>I;I++)c(g,k=w[I])&&!c(x,k)&&b(x,k,p(g,k));x.prototype=_,_.constructor=x,i(r,m,x)}},ade3:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));a("7a82");function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},cddc:function(e,t,a){"use strict";var n=a("24d6"),r=a.n(n);r.a},d9ea:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"formatResolutionBox"},[a("span",{staticClass:"formatResolutionBoxTitle"},[e._v(" TV端 ")]),a("cell-selected",{attrs:{title:"分辨率",dataList:e.dataList1},model:{value:e.formData.tv_resolving,callback:function(t){e.$set(e.formData,"tv_resolving",t)},expression:"formData.tv_resolving"}}),a("cell-selected",{attrs:{title:"视频格式",dataList:e.dataList2},model:{value:e.formData.tv_video,callback:function(t){e.$set(e.formData,"tv_video",t)},expression:"formData.tv_video"}}),a("cell-selected",{attrs:{title:"图片格式",dataList:e.dataList3},model:{value:e.formData.tv_picture,callback:function(t){e.$set(e.formData,"tv_picture",t)},expression:"formData.tv_picture"}}),a("span",{staticClass:"formatResolutionBoxTitle"},[e._v(" 点歌器端 ")]),a("cell-selected",{attrs:{title:"分辨率",dataList:e.dataList5},model:{value:e.formData.vod_resolving,callback:function(t){e.$set(e.formData,"vod_resolving",t)},expression:"formData.vod_resolving"}}),a("cell-selected",{attrs:{title:"视频格式",dataList:e.dataList6},model:{value:e.formData.vod_video,callback:function(t){e.$set(e.formData,"vod_video",t)},expression:"formData.vod_video"}}),a("cell-selected",{attrs:{title:"图片格式",dataList:e.dataList7},model:{value:e.formData.vod_picture,callback:function(t){e.$set(e.formData,"vod_picture",t)},expression:"formData.vod_picture"}}),a("div",{staticClass:"button"},[a("van-button",{staticClass:"buttonDefault",attrs:{size:"large"},on:{click:e.btnClick}},[e._v("保存")])],1)],1)},r=[],o=(a("d81d"),a("0d03"),a("b64b"),a("d3b7"),a("25f0"),a("4795"),a("5530")),i=a("2f62"),c=a("171c"),l=a("87d0"),s=a("455d"),u={components:{cellSelected:c["a"]},computed:{data:function(){return this.$store.state.ktv.resolutionFormat}},data:function(){return{dataList1:l["a"].tv_resolvingPower,dataList2:l["a"].video,dataList3:l["a"].tv_picture,dataList4:l["a"].tv_picture,dataList5:l["a"].vod_resolvingPower,dataList6:l["a"].video,dataList7:l["a"].vod_picture,formData:{tv_resolving:"",tv_video:"",tv_picture:"",vod_resolving:"",vod_video:"",vod_picture:"",id:""},rules:{tv_resolving:[{required:!0,message:"TV端分辨率不能为空"}],tv_video:[{required:!0,message:"TV端视频格式不能为空"}],tv_picture:[{required:!0,message:"TV端图片格式不能为空"}],vod_resolving:[{required:!0,message:"点歌器端分辨率不能为空"}],vod_video:[{required:!0,message:"点歌器端视频格式不能为空"}],vod_picture:[{required:!0,message:"点歌器端图片格式不能为空"}]}}},methods:Object(o["a"])({},Object(i["b"])(["handlerPatchResolutionFormat","handlerAddResolutionFormat"]),{btnClick:function(){var e=this;Object(s["a"])(this.formData,this.rules).then((function(t){if(t){var a="修改",n=e.handlerPatchResolutionFormat;e.data||(e.formData.ktv=e.$store.state.ktv.ktvID,a="创建",n=e.handlerAddResolutionFormat),e.$toast.loading({duration:0,forbidClick:!0,message:"".concat(a,"中...")}),n(e.formData).then((function(t){e.$toast.success("".concat(a,"成功")),setTimeout((function(){e.$router.go(-1)}),1e3)}))["catch"]((function(t){console.log(t),e.$toast("".concat(a,"失败，请稍后重试"))}))}}))}}),mounted:function(){var e=this;console.log(this.data),this.data&&(Object.keys(this.formData).map((function(t){e.formData[t]=e.data[t].toString()})),console.log(this.formData))}},d=u,f=(a("cddc"),a("2877")),v=Object(f["a"])(d,n,r,!1,null,"24b4bc1d",null);t["default"]=v.exports},dbb4:function(e,t,a){var n=a("23e7"),r=a("83ab"),o=a("56ef"),i=a("fc6a"),c=a("06cf"),l=a("8418");n({target:"Object",stat:!0,sham:!r},{getOwnPropertyDescriptors:function(e){var t,a,n=i(e),r=c.f,s=o(n),u={},d=0;while(s.length>d)a=r(n,t=s[d++]),void 0!==a&&l(u,t,a);return u}})},e439:function(e,t,a){var n=a("23e7"),r=a("d039"),o=a("fc6a"),i=a("06cf").f,c=a("83ab"),l=r((function(){i(1)})),s=!c||l;n({target:"Object",stat:!0,forced:s,sham:!c},{getOwnPropertyDescriptor:function(e,t){return i(o(e),t)}})}}]);
//# sourceMappingURL=chunk-d6e8b2b6.1c4c78c2.js.map