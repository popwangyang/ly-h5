(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a2ed0cee"],{"0e19":function(t,e,a){"use strict";var n=a("889c"),r=a.n(n);r.a},"13d5":function(t,e,a){"use strict";var n=a("23e7"),r=a("d58f").left,o=a("a640"),i=a("ae40"),s=o("reduce"),c=i("reduce",{1:0});n({target:"Array",proto:!0,forced:!s||!c},{reduce:function(t){return r(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},1427:function(t,e,a){t.exports=a.p+"img/empty.d72b6a74.png"},"171c":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-cell",{attrs:{title:t.title,"is-link":""},on:{click:t.selectedBtn}},[a("span",[""!=t.selectValue?a("span",{staticStyle:{color:"#000000"}},[t._v(t._s(t.selectValue))]):a("span",[t._v(t._s(t.placeholder))])])]),a("van-popup",{staticStyle:{height:"300px"},attrs:{position:"bottom"},model:{value:t.showPicker,callback:function(e){t.showPicker=e},expression:"showPicker"}},[a("van-picker",{ref:"picker",attrs:{"show-toolbar":"","default-index":t.defaultIndex,columns:t.columns},on:{cancel:function(e){t.showPicker=!1},confirm:t.onConfirm,change:t.onChange}})],1)],1)},r=[],o=(a("4160"),a("a9e3"),a("159b"),{props:{title:{type:String,default:"标题"},modelvalue:{type:[String,Number],default:""},placeholder:{type:String,default:"请选择"},dataList:{type:Array,default:function(){return[]}}},model:{prop:"modelvalue",event:"returnBack"},watch:{modelvalue:function(t){var e=this;this.dataList.forEach((function(t,a){""!=e.modelvalue&&t.value==e.modelvalue&&(e.defaultIndex=a,e.currentIndex=a,e.selectValue=t.label)}))}},data:function(){return{selectValue:"",columns:[],defaultIndex:0,showPicker:!1,currentIndex:0}},methods:{onConfirm:function(t){this.selectValue=this.dataList[this.currentIndex].label,this.$emit("returnBack",this.dataList[this.currentIndex].value),this.showPicker=!1},selectedBtn:function(){var t=this;this.showPicker=!0,this.$nextTick((function(){t.currentIndex=0,t.dataList.forEach((function(e,a){""!=t.modelvalue&&e.value==t.modelvalue&&(t.currentIndex=a)})),t.$refs.picker.setIndexes([t.currentIndex])}))},onChange:function(t){this.currentIndex=t.getIndexes()[0]},init:function(){var t=this,e=[];this.dataList.forEach((function(a,n){e.push(a.label),""!=t.modelvalue&&a.value==t.modelvalue&&(t.defaultIndex=n,t.currentIndex=n,t.selectValue=a.label)})),this.columns=e}},mounted:function(){this.init()}}),i=o,s=a("2877"),c=Object(s["a"])(i,n,r,!1,null,null,null);e["a"]=c.exports},"1fe8":function(t,e,a){t.exports=a.p+"img/error.9a7c2d33.png"},2206:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("van-field",{attrs:{clearable:"",type:t.type,maxlength:t.maxlength,"input-align":"right",placeholder:t.placeholder},on:{input:t.onInput},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},[a("span",{attrs:{slot:"label"},slot:"label"},[a("span",[t._v(t._s(t.title))]),t.required?t._e():a("span",{staticStyle:{color:"gray","margin-left":"4px"}},[t._v("(选填)")])])])},r=[],o=(a("a9e3"),{props:{maxlength:{type:Number,default:99999},title:{type:String,default:"标题"},type:{type:String,default:"text"},required:{type:Boolean,default:!0},placeholder:{type:String,default:"请输入"},modelValue:{type:[String,Number]}},model:{prop:"modelValue",event:"returnBack"},data:function(){return{value:""}},watch:{modelValue:function(t){this.value||(this.value=t)}},methods:{onInput:function(t){this.$emit("returnBack",t)}},mounted:function(){this.value=this.modelValue}}),i=o,s=(a("5f56"),a("2877")),c=Object(s["a"])(i,n,r,!1,null,null,null);e["a"]=c.exports},"36fd":function(t,e,a){"use strict";var n=a("5443"),r=a.n(n);r.a},"3a97":function(t,e,a){},"431c":function(t,e,a){"use strict";var n=a("3a97"),r=a.n(n);r.a},"455d":function(t,e,a){"use strict";a("4160"),a("b64b"),a("d3b7"),a("159b");var n=a("d399"),r={isNonEmpty:function(t,e){if(""===t)return e},isNumber:function(t,e){if(!/^[+]{0,1}(\d+)$/.test(t))return e},isEmail:function(t,e){if(!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(t))return e},isPhone:function(t,e){if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(t))return e},isGateway:function(t,e){if(!/^192\.168(\.(\d|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))){2}$/.test(t))return e},isMac:function(t,e){if(!/^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/.test(t))return e}},o=function(){this.cache=[]};o.prototype.add=function(t,e,a){for(var n=this,o=function(){var o=e[i];o.required?o.validate?n.cache.push((function(){return o.validate(t,a)})):o.type?n.cache.push((function(){return r[o.type](t,o.message)})):n.cache.push((function(){return r.isNonEmpty(t,o.message)})):o.type?0==o.required?""!=t&&n.cache.push((function(){return r[o.type](t,o.message)})):n.cache.push((function(){return r[o.type](t,o.message)})):o.validate&&(0==o.required?""!=t&&n.cache.push((function(){return o.validate(t,a)})):n.cache.push((function(){return o.validate(t,a)})))},i=0;i<e.length;i++)o()},o.prototype.start=function(){for(var t=0;t<this.cache.length;t++){var e=this.cache[t]();if(e)return console.log(e),e}};var i=function(t,e){return new Promise((function(a,r){var i=new o;Object.keys(e).forEach((function(a){i.add(t[a],e[a],t)}));var s=i.start();s?(Object(n["a"])(s),a(!1)):a(!0)}))};e["a"]=i},5443:function(t,e,a){},"54a1":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-loading",{attrs:{color:t.color}})],1)},r=[],o={computed:{color:function(){return this.$store.state.app.theme.color}}},i=o,s=a("2877"),c=Object(s["a"])(i,n,r,!1,null,null,null);e["a"]=c.exports},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,a){var n=a("1d80"),r=a("5899"),o="["+r+"]",i=RegExp("^"+o+o+"*"),s=RegExp(o+o+"*$"),c=function(t){return function(e){var a=String(n(e));return 1&t&&(a=a.replace(i,"")),2&t&&(a=a.replace(s,"")),a}};t.exports={start:c(1),end:c(2),trim:c(3)}},"5f56":function(t,e,a){"use strict";var n=a("a4d7"),r=a.n(n);r.a},7156:function(t,e,a){var n=a("861d"),r=a("d2bb");t.exports=function(t,e,a){var o,i;return r&&"function"==typeof(o=e.constructor)&&o!==a&&n(i=o.prototype)&&i!==a.prototype&&r(t,i),t}},"885b":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"emptyComponentBox"},[a("img",{attrs:{src:t.imgsrc,alt:""}}),a("span",{staticStyle:{color:"#d0d0d0","font-size":"14px","margin-top":"10px",display:"block","margin-bottom":"20px"}},[t._v(" "+t._s(t.text)+" ")]),t.title&&""!=t.title?a("van-button",{staticClass:"buttonSquare",on:{click:t.btn}},[t._v(t._s(t.title))]):t._e()],1)},r=[],o={props:["text","title"],data:function(){return{imgsrc:a("1427")}},methods:{btn:function(){this.$emit("eventBtn")}}},i=o,s=(a("431c"),a("2877")),c=Object(s["a"])(i,n,r,!1,null,"4d207a0f",null);e["a"]=c.exports},"889c":function(t,e,a){},a4d7:function(t,e,a){},a9e3:function(t,e,a){"use strict";var n=a("83ab"),r=a("da84"),o=a("94ca"),i=a("6eeb"),s=a("5135"),c=a("c6b6"),u=a("7156"),l=a("c04e"),d=a("d039"),f=a("7c73"),m=a("241c").f,p=a("06cf").f,v=a("9bf2").f,h=a("58a8").trim,g="Number",b=r[g],_=b.prototype,x=c(f(_))==g,y=function(t){var e,a,n,r,o,i,s,c,u=l(t,!1);if("string"==typeof u&&u.length>2)if(u=h(u),e=u.charCodeAt(0),43===e||45===e){if(a=u.charCodeAt(2),88===a||120===a)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:n=2,r=49;break;case 79:case 111:n=8,r=55;break;default:return+u}for(o=u.slice(2),i=o.length,s=0;s<i;s++)if(c=o.charCodeAt(s),c<48||c>r)return NaN;return parseInt(o,n)}return+u};if(o(g,!b(" 0o1")||!b("0b1")||b("+0x1"))){for(var D,k=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof k&&(x?d((function(){_.valueOf.call(a)})):c(a)!=g)?u(new b(y(e)),a,k):y(e)},I=n?m(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),$=0;I.length>$;$++)s(b,D=I[$])&&!s(k,D)&&v(k,D,p(b,D));k.prototype=_,_.constructor=k,i(r,g,k)}},ada9:function(t,e,a){"use strict";var n=a("e1d30"),r=a.n(n);r.a},ae9f:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"emptyComponentBox"},[a("img",{attrs:{src:t.imgsrc,alt:""}}),a("span",{staticStyle:{display:"flex","margin-top":"10px"}},[a("span",{staticStyle:{color:"#d0d0d0","font-size":"14px"}},[t._v(" "+t._s(t.text)+" ")]),a("span",{staticClass:"errorTheme",on:{click:t.btn}},[t._v("重新加载")])])])},r=[],o={props:{text:{type:String,default:"加载失败"}},data:function(){return{imgsrc:a("1fe8")}},methods:{btn:function(){this.$emit("eventBtn")}}},i=o,s=(a("ada9"),a("2877")),c=Object(s["a"])(i,n,r,!1,null,"f9f26e0c",null);e["a"]=c.exports},b00a:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentLoad"},[a("span",{directives:[{name:"show",rawName:"v-show",value:0==t.pageStatues,expression:"pageStatues == 0"}],staticClass:"content"},[a("Loading")],1),1==t.pageStatues?a("span",[t._t("default")],2):t._e(),2==t.pageStatues?a("span",{staticClass:"content"},[t.$slots.empty?t._t("empty"):a("Empty",{attrs:{text:t.emptyText}})],2):t._e(),3==t.pageStatues?a("span",{staticClass:"content"},[t.$slots.error?t._t("error"):a("Error",{attrs:{text:"加载失败"},on:{eventBtn:t.getData}})],2):t._e()])},r=[],o=a("54a1"),i=a("ae9f"),s=a("885b"),c={components:{Loading:o["a"],Empty:s["a"],Error:i["a"]},props:{getInfo:{type:Function},emptyText:{type:String,default:"暂无信息"}},data:function(){return{pageStatues:0}},methods:{getData:function(){var t=this;this.pageStatues=0,this.getInfo().then((function(e){t.pageStatues=""!=e?1:2}))["catch"]((function(e){console.log(e,"ppppp"),t.pageStatues=3}))}},mounted:function(){this.getData()}},u=c,l=(a("36fd"),a("2877")),d=Object(l["a"])(u,n,r,!1,null,"5ccc5f6f",null);e["a"]=d.exports},d58f:function(t,e,a){var n=a("1c0b"),r=a("7b0b"),o=a("44ad"),i=a("50c4"),s=function(t){return function(e,a,s,c){n(a);var u=r(e),l=o(u),d=i(u.length),f=t?d-1:0,m=t?-1:1;if(s<2)while(1){if(f in l){c=l[f],f+=m;break}if(f+=m,t?f<0:d<=f)throw TypeError("Reduce of empty array with no initial value")}for(;t?f>=0:d>f;f+=m)f in l&&(c=a(c,l[f],f,u));return c}};t.exports={left:s(!1),right:s(!0)}},e1d30:function(t,e,a){},fa9f:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ContentLoad",{attrs:{getInfo:t.getData}},[a("cell-selected",{attrs:{title:"VOD品牌",dataList:t.vodBandsList},model:{value:t.formData.vod,callback:function(e){t.$set(t.formData,"vod",e)},expression:"formData.vod"}}),a("cell-input",{attrs:{title:"实际包厢数"},model:{value:t.formData.box,callback:function(e){t.$set(t.formData,"box",e)},expression:"formData.box"}}),a("cell-input",{attrs:{title:"软件系统版本号",maxlength:50},model:{value:t.formData.version,callback:function(e){t.$set(t.formData,"version",e)},expression:"formData.version"}}),a("cell-input",{attrs:{title:"VOD场所ID"},model:{value:t.formData.vod_ktv_id,callback:function(e){t.$set(t.formData,"vod_ktv_id",e)},expression:"formData.vod_ktv_id"}}),a("cell-input",{attrs:{title:"网关",required:!1,maxlength:50},model:{value:t.formData.gateway,callback:function(e){t.$set(t.formData,"gateway",e)},expression:"formData.gateway"}}),a("cell-input",{attrs:{title:"服务器",required:!1,maxlength:50},model:{value:t.formData.server,callback:function(e){t.$set(t.formData,"server",e)},expression:"formData.server"}}),a("div",{staticClass:"divider"}),a("cell-selected",{attrs:{title:"是否使用版权盒",dataList:t.dataList1},model:{value:t.formData.is_use,callback:function(e){t.$set(t.formData,"is_use",e)},expression:"formData.is_use"}}),a("cell-selected",{attrs:{title:"通讯模式",dataList:t.dataList2},model:{value:t.formData.communication_mode,callback:function(e){t.$set(t.formData,"communication_mode",e)},expression:"formData.communication_mode"}}),a("span",{directives:[{name:"show",rawName:"v-show",value:2==t.formData.communication_mode,expression:"formData.communication_mode == 2"}]},[a("cell-input",{attrs:{title:"VOD Sever地址",required:!1,maxlength:100},model:{value:t.formData.vod_server,callback:function(e){t.$set(t.formData,"vod_server",e)},expression:"formData.vod_server"}}),a("cell-input",{attrs:{title:"AD MAC地址",required:!1,maxlength:50},model:{value:t.formData.ad_mac,callback:function(e){t.$set(t.formData,"ad_mac",e)},expression:"formData.ad_mac"}})],1),a("div",{staticClass:"button"},[a("van-button",{staticClass:"buttonDefault",attrs:{size:"large"},on:{click:t.btnClick}},[t._v("保存")])],1)],1)],1)},r=[],o=(a("c975"),a("d81d"),a("13d5"),a("b64b"),a("d3b7"),a("4795"),a("b00a")),i=a("2206"),s=a("171c"),c=a("455d"),u=a("71a5"),l={components:{cellInput:i["a"],cellSelected:s["a"],ContentLoad:o["a"]},data:function(){var t=function(t){var e=/^(500|[1-4]{0,1}\d{0,1}\d)$/;return""===t?"包厢数不能为空":e.test(t)?void 0:"包厢数请输入0~500的正整数"};return{formData:{ktv:this.$store.state.ktv.ktvID,vod:"",box:"",version:"",vod_ktv_id:"",gateway:"",server:"",is_use:2,communication_mode:this.$route.query.isEdited?2:"",vod_server:"",ad_mac:"",id:""},implementationID:"",dataList1:[{label:"是",value:"1"},{label:"否",value:"2"}],dataList2:[{label:"VOD直连网云端",value:"1"},{label:"VOD连接娱网AD",value:"2"}],rules:{vod:[{required:!0,message:"VOD品牌不能为空"}],box:[{required:!0,validate:t}],version:[{required:!0,message:"软件系统版本号不能为空"}],vod_ktv_id:[{required:!0,message:"VOD场所ID不能为空"}],gateway:[{required:!1,type:"isGateway",message:"网关格式不正确"}],ad_mac:[{required:!1,type:"isMac",message:"Mac地址格式不正确"}],communication_mode:[{required:!0,message:"通讯模式不能为空"}]}}},watch:{"formData.communication_mode":{handler:function(t,e){console.log(t,e),2==t&&(this.formData.vod_server="",this.formData.ad_mac="")},immediate:!1}},computed:{isEdited:function(){return!!this.$route.query.isEdited},vodBandsList:function(){var t=this.$store.state.ktv.vodBandsList;return t.reduce((function(t,e){var a={value:e.id,label:e.brand};return t.push(a),t}),[])}},methods:{btnClick:function(){var t=this;Object(c["a"])(this.formData,this.rules).then((function(e){if(e){t.$toast.loading({duration:0,forbidClick:!0,message:t.isEdited?"创建中...":"修改中..."});var a={};Object.keys(t.formData).map((function(e){a[e]=t.formData[e]})),1==a.communication_mode&&(a.vod_server="",a.ad_mac=""),t.isEdited?Object(u["d"])(a,t.formData.id).then((function(e){t.$toast.success("修改成功"),setTimeout((function(){t.$router.go(-1)}),1e3)}))["catch"]((function(e){var a="修改失败，请稍后重试";400==e.status&&(a=e.data.non_field_errors[0]),t.$toast(a)})):Object(u["a"])(a).then((function(e){t.$toast.success("创建成功"),setTimeout((function(){t.$router.go(-1)}),1e3)}))["catch"]((function(e){console.log(e);var a="创建失败，请稍后重试";400==e.status&&(a=e.data.non_field_errors[0]),t.$toast(a)}))}}))},getData:function(){var t=this,e={ktv:this.$store.state.ktv.ktvID},a=["ktv"];return new Promise((function(n,r){Object(u["l"])(e).then((function(e){if(e.data.results.length>0){var r=e.data.results[0];Object.keys(t.formData).map((function(e){"无"!=r[e]&&-1==a.indexOf(e)&&(t.formData[e]=r[e])}))}n({})}))["catch"]((function(t){r()}))}))}},mounted:function(){}},d=l,f=(a("0e19"),a("2877")),m=Object(f["a"])(d,n,r,!1,null,"7381a1a8",null);e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-a2ed0cee.54d967fe.js.map