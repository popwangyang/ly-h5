(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8cf973b2"],{"13d5":function(t,e,n){"use strict";var a=n("23e7"),r=n("d58f").left,i=n("a640"),s=n("ae40"),o=i("reduce"),c=s("reduce",{1:0});a({target:"Array",proto:!0,forced:!o||!c},{reduce:function(t){return r(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},1427:function(t,e,n){t.exports=n.p+"img/empty.d72b6a74.png"},"1fe8":function(t,e,n){t.exports=n.p+"img/error.9a7c2d33.png"},"4fad":function(t,e,n){var a=n("23e7"),r=n("6f53").entries;a({target:"Object",stat:!0},{entries:function(t){return r(t)}})},"51cf":function(t,e,n){},"54a1":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("van-loading",{attrs:{color:t.color}})],1)},r=[],i={computed:{color:function(){return this.$store.state.app.theme.color}}},s=i,o=n("2877"),c=Object(o["a"])(s,a,r,!1,null,null,null);e["a"]=c.exports},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,n){var a=n("1d80"),r=n("5899"),i="["+r+"]",s=RegExp("^"+i+i+"*"),o=RegExp(i+i+"*$"),c=function(t){return function(e){var n=String(a(e));return 1&t&&(n=n.replace(s,"")),2&t&&(n=n.replace(o,"")),n}};t.exports={start:c(1),end:c(2),trim:c(3)}},6025:function(t,e,n){"use strict";var a=n("d95f"),r=n.n(a);r.a},"6f53":function(t,e,n){var a=n("83ab"),r=n("df75"),i=n("fc6a"),s=n("d1e7").f,o=function(t){return function(e){var n,o=i(e),c=r(o),u=c.length,l=0,f=[];while(u>l)n=c[l++],a&&!s.call(o,n)||f.push(t?[n,o[n]]:o[n]);return f}};t.exports={entries:o(!0),values:o(!1)}},7156:function(t,e,n){var a=n("861d"),r=n("d2bb");t.exports=function(t,e,n){var i,s;return r&&"function"==typeof(i=e.constructor)&&i!==n&&a(s=i.prototype)&&s!==n.prototype&&r(t,s),t}},8234:function(t,e,n){"use strict";var a=n("e5e7"),r=n.n(a);r.a},"885b":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"emptyComponentBox"},[n("img",{attrs:{src:t.imgsrc,alt:""}}),n("span",{staticStyle:{color:"#d0d0d0","font-size":"14px","margin-top":"10px",display:"block","margin-bottom":"20px"}},[t._v(" "+t._s(t.text)+" ")]),t.title&&""!=t.title?n("van-button",{staticClass:"buttonSquare",on:{click:t.btn}},[t._v(t._s(t.title))]):t._e()],1)},r=[],i={props:["text","title"],data:function(){return{imgsrc:n("1427")}},methods:{btn:function(){this.$emit("eventBtn")}}},s=i,o=(n("9399"),n("2877")),c=Object(o["a"])(s,a,r,!1,null,"daafecf6",null);e["a"]=c.exports},9399:function(t,e,n){"use strict";var a=n("b21f"),r=n.n(a);r.a},a434:function(t,e,n){"use strict";var a=n("23e7"),r=n("23cb"),i=n("a691"),s=n("50c4"),o=n("7b0b"),c=n("65f0"),u=n("8418"),l=n("1dde"),f=n("ae40"),d=l("splice"),p=f("splice",{ACCESSORS:!0,0:0,1:2}),B=Math.max,C=Math.min,h=9007199254740991,v="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!d||!p},{splice:function(t,e){var n,a,l,f,d,p,m=o(this),g=s(m.length),b=r(t,g),N=arguments.length;if(0===N?n=a=0:1===N?(n=0,a=g-b):(n=N-2,a=C(B(i(e),0),g-b)),g+n-a>h)throw TypeError(v);for(l=c(m,a),f=0;f<a;f++)d=b+f,d in m&&u(l,f,m[d]);if(l.length=a,n<a){for(f=b;f<g-a;f++)d=f+a,p=f+n,d in m?m[p]=m[d]:delete m[p];for(f=g;f>g-a+n;f--)delete m[f-1]}else if(n>a)for(f=g-a;f>b;f--)d=f+a-1,p=f+n-1,d in m?m[p]=m[d]:delete m[p];for(f=0;f<n;f++)m[f+b]=arguments[f+2];return m.length=g-a+n,l}})},a489:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("van-cell",{attrs:{title:t.title}},[n("span",{attrs:{slot:"label"},slot:"label"},t._l(t.data,(function(e,a){return n("span",{key:a,staticClass:"cellImagLabel",on:{click:function(n){return t.imagePreview(e.fileUrl,e.name)}}},[n("van-icon",{attrs:{name:"photo",size:"20",color:"#FF5562"}}),n("span",[t._v(t._s(e.name))])],1)})),0)])},r=[],i=(n("4160"),n("13d5"),n("b0c0"),n("d3b7"),n("ac1f"),n("3ca3"),n("1276"),n("159b"),n("ddb0"),n("28a2")),s=n("71a5"),o={props:{title:{type:String,default:"标题"},dataList:{type:Array,default:function(){return[]}}},data:function(){return{data:[]}},methods:{imagePreview:function(t,e){var n=e.split(".")[e.split(".").length-1];"pdf"===n?this.$router.push({path:"/PdfPreview",query:{url:t,name:e}}):Object(i["a"])([t])},getInfo:function(){var t=this,e=[];this.dataList.forEach((function(t){var n=Object(s["p"])({id:t});e.push(n)})),Promise.all(e).then((function(e){t.data=e.reduce((function(t,e){var n={fileUrl:e.data.results[0].path_auth,name:e.data.results[0].name};return t.push(n),t}),[])}))}},mounted:function(){this.getInfo()}},c=o,u=(n("6025"),n("2877")),l=Object(u["a"])(c,a,r,!1,null,"f94abc22",null);e["a"]=l.exports},a9e3:function(t,e,n){"use strict";var a=n("83ab"),r=n("da84"),i=n("94ca"),s=n("6eeb"),o=n("5135"),c=n("c6b6"),u=n("7156"),l=n("c04e"),f=n("d039"),d=n("7c73"),p=n("241c").f,B=n("06cf").f,C=n("9bf2").f,h=n("58a8").trim,v="Number",m=r[v],g=m.prototype,b=c(d(g))==v,N=function(t){var e,n,a,r,i,s,o,c,u=l(t,!1);if("string"==typeof u&&u.length>2)if(u=h(u),e=u.charCodeAt(0),43===e||45===e){if(n=u.charCodeAt(2),88===n||120===n)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:a=2,r=49;break;case 79:case 111:a=8,r=55;break;default:return+u}for(i=u.slice(2),s=i.length,o=0;o<s;o++)if(c=i.charCodeAt(o),c<48||c>r)return NaN;return parseInt(i,a)}return+u};if(i(v,!m(" 0o1")||!m("0b1")||m("+0x1"))){for(var S,A=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof A&&(b?f((function(){g.valueOf.call(n)})):c(n)!=v)?u(new m(N(e)),n,A):N(e)},_=a?p(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),R=0;_.length>R;R++)o(m,S=_[R])&&!o(A,S)&&C(A,S,B(m,S));A.prototype=g,g.constructor=A,s(r,v,A)}},ae20:function(t,e,n){"use strict";var a=n("51cf"),r=n.n(a);r.a},ae9f:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"emptyComponentBox"},[n("img",{attrs:{src:t.imgsrc,alt:""}}),n("span",{staticStyle:{display:"flex","margin-top":"10px"}},[n("span",{staticStyle:{color:"#d0d0d0","font-size":"14px"}},[t._v(" "+t._s(t.text)+" ")]),n("span",{staticClass:"errorTheme",on:{click:t.btn}},[t._v("重新加载")])])])},r=[],i={props:{text:{type:String,default:"加载失败"}},data:function(){return{imgsrc:n("1fe8")}},methods:{btn:function(){this.$emit("eventBtn")}}},s=i,o=(n("ae20"),n("2877")),c=Object(o["a"])(s,a,r,!1,null,"d0775eaa",null);e["a"]=c.exports},b215:function(t,e,n){"use strict";var a=n("f546"),r=n.n(a);r.a},b21f:function(t,e,n){},b6f9:function(t,e,n){"use strict";n("c975"),n("d81d"),n("a434"),n("b0c0"),n("b64b");var a=n("4360"),r=(n("2f62"),n("a489")),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"accountInfTagBox"},[n("span",{staticClass:"textValue"},[t._v(" "+t._s(t.textValue)+" ")]),1!=t.state?n("van-icon",{staticStyle:{"margin-left":"6px"},attrs:{name:"info",color:t.color},on:{click:t.dialogBtn}}):t._e()],1)},s=[],o=(n("a9e3"),[{title:"已提交待激活",content:"银行正在审核中，预计需要1~5个工作日完成审核，审核通过后才可以将分配金额分配至改账户，还请耐心等待。"},{title:"处理审核中",content:"银行正在审核中，预计需要1~5个工作日完成审核，审核通过后才可以将分配金额分配至改账户，还请耐心等待。"},{title:"开户失败",content:"银行正在审核中，预计需要1~5个工作日完成审核，审核通过后才可以将分配金额分配至改账户，还请耐心等待。"}]),c={props:{state:{type:Number,default:1}},computed:{color:function(){return this.$store.state.app.theme.color},textValue:function(){var t="开户成功";switch(this.state){case 1:t="开户成功";break;case 2:t="已提交待激活";break;case 3:t="处理审核中";break;case 4:t="开户失败";break}return t}},methods:{dialogBtn:function(){var t=this.state-2,e=o[t];this.$dialog.alert({title:e.title,message:e.content,confirmButtonColor:this.color,confirmButtonText:"知道了"}).then((function(){}))}}},u=c,l=(n("8234"),n("2877")),f=Object(l["a"])(u,i,s,!1,null,"97306192",null),d=f.exports,p={SRCB:"深圳农村商业银行",BGB:"广西北部湾银行",SHRCB:"上海农村商业银行",BJBANK:"北京银行",WHCCB:"威海市商业银行",BOZK:"周口银行",KORLABANK:"库尔勒市商业银行",SPABANK:"平安银行",SDEB:"顺德农商银行",HURCB:"湖北省农村信用社",WRCB:"无锡农村商业银行",BOCY:"朝阳银行",CZBANK:"浙商银行",HDBANK:"邯郸银行",BOC:"中国银行",BOD:"东莞银行",CCB:"中国建设银行",ZYCBANK:"遵义市商业银行",SXCB:"绍兴银行",GZRCU:"贵州省农村信用社",ZJKCCB:"张家口市商业银行",BOJZ:"锦州银行",BOP:"平顶山银行",HKB:"汉口银行",SPDB:"上海浦东发展银行",NXRCU:"宁夏黄河农村商业银行",NYNB:"广东南粤银行",GRCB:"广州农商银行",BOSZ:"苏州银行",HZCB:"杭州银行",HSBK:"衡水银行",HBC:"湖北银行",JXBANK:"嘉兴银行",HRXJB:"华融湘江银行",BODD:"丹东银行",AYCB:"安阳银行",EGBANK:"恒丰银行",CDB:"国家开发银行",TCRCB:"江苏太仓农村商业银行",NJCB:"南京银行",ZZBANK:"郑州银行",DYCB:"德阳商业银行",YBCCB:"宜宾市商业银行",SCRCU:"四川省农村信用",KLB:"昆仑银行",LSBANK:"莱商银行",YDRCB:"尧都农商行",CCQTGB:"重庆三峡银行",FDB:"富滇银行",JSRCU:"江苏省农村信用联合社",JNBANK:"济宁银行",CMB:"招商银行",JINCHB:"晋城银行JCBANK",FXCB:"阜新银行",WHRCB:"武汉农村商业银行",HBYCBANK:"湖北银行宜昌分行",TZCB:"台州银行",TACCB:"泰安市商业银行",XCYH:"许昌银行",CEB:"中国光大银行",NXBANK:"宁夏银行",HSBANK:"徽商银行",JJBANK:"九江银行",NHQS:"农信银清算中心",MTBANK:"浙江民泰商业银行",LANGFB:"廊坊银行",ASCB:"鞍山银行",KSRB:"昆山农村商业银行",YXCCB:"玉溪市商业银行",DLB:"大连银行",DRCBCL:"东莞农村商业银行",GCB:"广州银行",NBBANK:"宁波银行",BOYK:"营口银行",SXRCCU:"陕西信合",GLBANK:"桂林银行",BOQH:"青海银行",CDRCB:"成都农商银行",QDCCB:"青岛银行",HKBEA:"东亚银行",HBHSBANK:"湖北银行黄石分行",WZCB:"温州银行",TRCB:"天津农商银行",QLBANK:"齐鲁银行",GDRCC:"广东省农村信用社联合社",ZJTLCB:"浙江泰隆商业银行",GZB:"赣州银行",GYCB:"贵阳市商业银行",CQBANK:"重庆银行",DAQINGB:"龙江银行",CGNB:"南充市商业银行",SCCB:"三门峡银行",CSRCB:"常熟农村商业银行",SHBANK:"上海银行",JLBANK:"吉林银行",CZRCB:"常州农村信用联社",BANKWF:"潍坊银行",ZRCBANK:"张家港农村商业银行",FJHXBC:"福建海峡银行",ZJNX:"浙江省农村信用社联合社",LZYH:"兰州银行",JSB:"晋商银行",BOHAIB:"渤海银行",CZCB:"浙江稠州商业银行",YQCCB:"阳泉银行",SJBANK:"盛京银行",XABANK:"西安银行",BSB:"包商银行",JSBANK:"江苏银行",FSCB:"抚顺银行",HNRCU:"河南省农村信用",COMM:"交通银行",XTB:"邢台银行",CITIC:"中信银行",HXBANK:"华夏银行",HNRCC:"湖南省农村信用社",DYCCB:"东营市商业银行",ORBANK:"鄂尔多斯银行",BJRCB:"北京农村商业银行",XYBANK:"信阳银行",ZGCCB:"自贡市商业银行",CDCB:"成都银行",HANABANK:"韩亚银行",CMBC:"中国民生银行",LYBANK:"洛阳银行",GDB:"广东发展银行",ZBCB:"齐商银行",CBKF:"开封市商业银行",H3CB:"内蒙古银行",CIB:"兴业银行",CRCBANK:"重庆农村商业银行",SZSBK:"石嘴山银行",DZBANK:"德州银行",SRBANK:"上饶银行",LSCCB:"乐山市商业银行",JXRCU:"江西省农村信用",ICBC:"中国工商银行",JZBANK:"晋中市商业银行",HZCCB:"湖州市商业银行",NHB:"南海农村信用联社",XXBANK:"新乡银行",JRCB:"江苏江阴农村商业银行",YNRCC:"云南省农村信用社",ABC:"中国农业银行",GXRCU:"广西省农村信用",PSBC:"中国邮政储蓄银行",BZMD:"驻马店银行",ARCU:"安徽省农村信用社",GSRCU:"甘肃省农村信用",LYCB:"辽阳市商业银行",JLRCU:"吉林农信",URMQCCB:"乌鲁木齐市商业银行",XLBANK:"中山小榄村镇银行",CSCB:"长沙银行",JHBANK:"金华银行",BHB:"河北银行",NBYZ:"鄞州银行",LSBC:"临商银行",BOCD:"承德银行",SDRCU:"山东农信",NCB:"南昌银行",TCCB:"天津银行",WJRCB:"吴江农商银行",CBBQS:"城市商业银行资金清算中心",HBRCU:"河北省农村信用社"};n.d(e,"b",(function(){return B})),n.d(e,"a",(function(){return C}));var B={computed:{pageScroll:function(){var t=this.$route.name;return a["a"].state.app.scrollTops[t]}},methods:{recordScrollPosition:function(t){this.$store.commit("SET_SCROLLTOP",{name:this.$route.name,scrollTop:t.target.scrollTop})}},activated:function(){this.$refs.scroll.scrollTop=this.pageScroll,this.$refs.scroll.addEventListener("scroll",this.recordScrollPosition)},deactivated:function(){this.$refs.scroll.removeEventListener("scroll",this.recordScrollPosition)},beforeRouteEnter:function(t,e,n){var r=a["a"].state.app.keepAliveList;a["a"].commit("SET_SCROLLNAME",t.name),-1==r.indexOf(t.name)&&r.push(t.name),a["a"].commit("SET_KEEPALIVE",r),n()},beforeRouteLeave:function(t,e,n){var r=a["a"].state.app.keepAliveList;e.meta.cacheTos&&-1==e.meta.cacheTos.indexOf(t.name)&&(r.splice(r.indexOf(e.name),1),this.$store.commit("SET_KEEPALIVE",r)),n()}},C={props:{data:{type:Object}},components:{cellImage:r["a"],accoutTag:d},mounted:function(){var t=this;Object.keys(this.formData).map((function(e){/license_accessory|photo/.test(e)||(t.formData[e]=t.data[e])})),this.formData.business_license_accessory=[this.data.business_license_accessory],this.formData.id_photos=[this.data.id_front_photo,this.data.id_reverse_photo],this.formData.bank=p[this.data.bank]}}},d58f:function(t,e,n){var a=n("1c0b"),r=n("7b0b"),i=n("44ad"),s=n("50c4"),o=function(t){return function(e,n,o,c){a(n);var u=r(e),l=i(u),f=s(u.length),d=t?f-1:0,p=t?-1:1;if(o<2)while(1){if(d in l){c=l[d],d+=p;break}if(d+=p,t?d<0:f<=d)throw TypeError("Reduce of empty array with no initial value")}for(;t?d>=0:f>d;d+=p)d in l&&(c=n(c,l[d],d,u));return c}};t.exports={left:o(!1),right:o(!0)}},d95f:function(t,e,n){},e5e7:function(t,e,n){},f546:function(t,e,n){},fe41:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"scroll",staticClass:"personInfo"},[n("van-pull-refresh",{directives:[{name:"show",rawName:"v-show",value:1==t.pageStatues,expression:"pageStatues == 1"}],on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[n("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.list,(function(e,a){return n("div",{key:"date"+a,staticClass:"personInfo-wrapper"},[n("span",{staticClass:"infodate"},[t._v(t._s(e.create_date_2str_date))]),t._l(e.info,(function(e,a){return n("div",{key:"info"+a,staticClass:"info-wrapper"},[n("p",{staticClass:"item-date"},[t._v(t._s(e.create_date))]),n("p",{staticClass:"text"},[t._v(t._s(e.msg_info))])])}))],2)})),0)],1),n("div",{directives:[{name:"show",rawName:"v-show",value:0==t.pageStatues,expression:"pageStatues == 0"}],staticClass:"pageLoading"},[n("Loading")],1),n("div",{directives:[{name:"show",rawName:"v-show",value:2==t.pageStatues,expression:"pageStatues == 2"}],staticClass:"pageLoading"},[n("Empty",{attrs:{text:"暂无消息"}})],1),n("div",{directives:[{name:"show",rawName:"v-show",value:3==t.pageStatues,expression:"pageStatues == 3"}],staticClass:"pageLoading"},[n("Error",{attrs:{text:"加载失败"},on:{eventBtn:t.onReload}})],1)],1)},r=[],i=(n("d81d"),n("13d5"),n("b0c0"),n("4fad"),n("2909"));n("277d");function s(t){if(Array.isArray(t))return t}n("a4d3"),n("e01a"),n("d28b"),n("e260"),n("0d03"),n("d3b7"),n("25f0"),n("3ca3"),n("ddb0");function o(t,e){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var n=[],a=!0,r=!1,i=void 0;try{for(var s,o=t[Symbol.iterator]();!(a=(s=o.next()).done);a=!0)if(n.push(s.value),e&&n.length===e)break}catch(c){r=!0,i=c}finally{try{a||null==o["return"]||o["return"]()}finally{if(r)throw i}}return n}}function c(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function u(t,e){return s(t)||o(t,e)||c()}var l=n("885b"),f=n("ae9f"),d=n("54a1"),p=n("ba41"),B=n("b6f9"),C={name:"personalInfo",mounted:function(){this.getToRead()},mixins:[B["b"]],components:{Loading:d["a"],Empty:l["a"],Error:f["a"]},data:function(){return{isLoading:!1,loading:!1,finished:!1,count:0,total:0,currentSize:1,pageSize:15,list:[],pageStatues:1}},methods:{onReload:function(){this.pageStatues=0,this.currentSize=1,this.finished=!1,this.getInfoList()},onLoad:function(){this.finished=!1,this.getInfoList()},onRefresh:function(){this.list=[],this.count=0,this.total=0,this.currentSize=1,this.finished=!0,this.getInfoList()},getInfoList:function(){var t=this;Object(p["a"])(this.currentSize,this.pageSize).then((function(e){if(t.isLoading=!1,e.status>=200&&e.status<400){var n,a=e.data.data;t.currentSize++,t.total=e.data.p_total,0==t.total?t.pageStatues=2:t.pageStatues=1;var r=Object.entries(a.reduce((function(t,e){var n=e.create_date_2str_date;return(t[n]||(t[n]=[])).push(e),t}),{})).map((function(t){var e=u(t,2),n=e[0],a=e[1];return{create_date_2str_date:n,info:a}}));(n=t.list).push.apply(n,Object(i["a"])(r)),t.count+=15,t.loading=!1,t.count>=t.total?t.finished=!0:t.finished=!1}}))["catch"]((function(e){t.pageStatues=3}))},getToRead:function(){var t=this;Object(p["c"])().then((function(e){e.status>=200&&e.status<400&&t.$notify({type:"success",message:"全部已读"})}))}},watch:{$route:function(t){"personalInfo"===t.name&&this.getToRead()}}},h=C,v=(n("b215"),n("2877")),m=Object(v["a"])(h,a,r,!1,null,"1276c6ac",null);e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-8cf973b2.09ff99bb.js.map