(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2192872e"],{"2c2a":function(t,e,a){},"6df3":function(t,e,a){"use strict";var s=a("2c2a"),i=a.n(s);i.a},8340:function(t,e,a){"use strict";var s=a("9f37"),i=a.n(s);i.a},"9f37":function(t,e,a){},a489:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("van-cell",{attrs:{title:t.title}},[a("span",{attrs:{slot:"label"},slot:"label"},t._l(t.data,(function(e,s){return a("span",{key:s,staticClass:"cellImagLabel",on:{click:function(a){return t.imagePreview(e.fileUrl,e.name)}}},[a("van-icon",{attrs:{name:"photo",size:"20",color:"#FF5562"}}),a("span",[t._v(t._s(e.name))])],1)})),0)])},i=[],n=a("28a2"),o=a("71a5"),r={props:{title:{type:String,default:"标题"},dataList:{type:Array,default:()=>[]}},data(){return{data:[]}},methods:{imagePreview(t,e){let a=e.split(".")[e.split(".").length-1];"pdf"===a?this.$router.push({path:"/PdfPreview",query:{url:t,name:e}}):Object(n["a"])([t])},getInfo(){let t=[];this.dataList.forEach(e=>{let a=Object(o["p"])({id:e});t.push(a)}),Promise.all(t).then(t=>{this.data=t.reduce((t,e)=>{let a={fileUrl:e.data.results[0].path_auth,name:e.data.results[0].name};return t.push(a),t},[])})}},mounted(){this.getInfo()}},l=r,c=(a("bc18"),a("2877")),B=Object(c["a"])(l,s,i,!1,null,"25c2579e",null);e["a"]=B.exports},b3d5:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"searchPage"},[a("van-search",{attrs:{placeholder:t.placeholder,shape:"round","show-action":"",autofocus:!0},on:{input:t.searchChange},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}},[a("div",{attrs:{slot:"action"},on:{click:t.onCancel},slot:"action"},[t._v("取消")])]),1==t.pageStatues?a("div",{ref:"scroll",staticClass:"content"},[a("van-list",{attrs:{finished:t.finished,"finished-text":t.finishedText},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.results,(function(t,e){return a("ItemWidget",{key:e,attrs:{data:t}})})),1)],1):t._e(),0==t.pageStatues?a("div",{staticClass:"loading"},[a("Loading")],1):t._e()],1)},i=[],n=a("4624"),o=a("54a1"),r=a("c276"),l=a("b6f9"),c=a("2b0e"),B={name:"searchPage",mixins:[l["b"]],components:{Loading:o["a"]},data(){return{total:0,pIndex:1,pSize:30,pageStatues:1,placeholder:n["a"][this.$route.query.type].placeholder,getData:n["a"][this.$route.query.type].api,searchValue:"",results:[],loading:!1,finished:!0}},computed:{finishedText(){return""==this.searchValue?"":"没有更多了"}},methods:{onCancel(){this.$router.go(-1)},onLoad(){this.pIndex++;let t={name:this.searchValue,page_index:this.pIndex,page_size:this.pSize};this.getData(t).then(t=>{let e=t.data;this.results.push(...e),this.loading=!1,this.results.length>=this.total&&(this.finished=!0)})},searchChange(){if(""==this.searchValue)return this.results=[],this.pageStatues=1,this.finished=!1,void(this.loading=!1);this.pageStatues=0,Object(r["b"])(this.searchEvent,200)()},searchEvent(){this.pIndex=1;let t={name:this.searchValue,page_index:this.pIndex,page_size:this.pSize};this.getData(t).then(t=>{this.total=t.total,this.results=""==this.searchValue?[]:t.data,this.pageStatues=1,this.finished=!1,this.loading=!1,this.results.length>=this.total&&(this.finished=!0)})}},created(){c["a"].component("ItemWidget",n["a"][this.$route.query.type].template)},mounted(){}},C=B,h=(a("6df3"),a("2877")),u=Object(h["a"])(C,s,i,!1,null,"4fed6340",null);e["default"]=u.exports},b6f9:function(t,e,a){"use strict";var s=a("4360"),i=(a("2f62"),a("a489")),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"accountInfTagBox"},[a("span",{staticClass:"textValue"},[t._v(" "+t._s(t.textValue)+" ")]),1!=t.state?a("van-icon",{staticStyle:{"margin-left":"6px"},attrs:{name:"info",color:t.color},on:{click:t.dialogBtn}}):t._e()],1)},o=[],r=[{title:"已提交待激活",content:"银行正在审核中，预计需要1~5个工作日完成审核，审核通过后才可以将分配金额分配至改账户，还请耐心等待。"},{title:"处理审核中",content:"银行正在审核中，预计需要1~5个工作日完成审核，审核通过后才可以将分配金额分配至改账户，还请耐心等待。"},{title:"开户失败",content:"银行正在审核中，预计需要1~5个工作日完成审核，审核通过后才可以将分配金额分配至改账户，还请耐心等待。"}],l={props:{state:{type:Number,default:1}},computed:{color(){return this.$store.state.app.theme.color},textValue(){let t="开户成功";switch(this.state){case 1:t="开户成功";break;case 2:t="已提交待激活";break;case 3:t="处理审核中";break;case 4:t="开户失败";break}return t}},methods:{dialogBtn(){let t=this.state-2,e=r[t];this.$dialog.alert({title:e.title,message:e.content,confirmButtonColor:this.color,confirmButtonText:"知道了"}).then(()=>{})}}},c=l,B=(a("8340"),a("2877")),C=Object(B["a"])(c,n,o,!1,null,"14bdeb4a",null),h=C.exports,u={SRCB:"深圳农村商业银行",BGB:"广西北部湾银行",SHRCB:"上海农村商业银行",BJBANK:"北京银行",WHCCB:"威海市商业银行",BOZK:"周口银行",KORLABANK:"库尔勒市商业银行",SPABANK:"平安银行",SDEB:"顺德农商银行",HURCB:"湖北省农村信用社",WRCB:"无锡农村商业银行",BOCY:"朝阳银行",CZBANK:"浙商银行",HDBANK:"邯郸银行",BOC:"中国银行",BOD:"东莞银行",CCB:"中国建设银行",ZYCBANK:"遵义市商业银行",SXCB:"绍兴银行",GZRCU:"贵州省农村信用社",ZJKCCB:"张家口市商业银行",BOJZ:"锦州银行",BOP:"平顶山银行",HKB:"汉口银行",SPDB:"上海浦东发展银行",NXRCU:"宁夏黄河农村商业银行",NYNB:"广东南粤银行",GRCB:"广州农商银行",BOSZ:"苏州银行",HZCB:"杭州银行",HSBK:"衡水银行",HBC:"湖北银行",JXBANK:"嘉兴银行",HRXJB:"华融湘江银行",BODD:"丹东银行",AYCB:"安阳银行",EGBANK:"恒丰银行",CDB:"国家开发银行",TCRCB:"江苏太仓农村商业银行",NJCB:"南京银行",ZZBANK:"郑州银行",DYCB:"德阳商业银行",YBCCB:"宜宾市商业银行",SCRCU:"四川省农村信用",KLB:"昆仑银行",LSBANK:"莱商银行",YDRCB:"尧都农商行",CCQTGB:"重庆三峡银行",FDB:"富滇银行",JSRCU:"江苏省农村信用联合社",JNBANK:"济宁银行",CMB:"招商银行",JINCHB:"晋城银行JCBANK",FXCB:"阜新银行",WHRCB:"武汉农村商业银行",HBYCBANK:"湖北银行宜昌分行",TZCB:"台州银行",TACCB:"泰安市商业银行",XCYH:"许昌银行",CEB:"中国光大银行",NXBANK:"宁夏银行",HSBANK:"徽商银行",JJBANK:"九江银行",NHQS:"农信银清算中心",MTBANK:"浙江民泰商业银行",LANGFB:"廊坊银行",ASCB:"鞍山银行",KSRB:"昆山农村商业银行",YXCCB:"玉溪市商业银行",DLB:"大连银行",DRCBCL:"东莞农村商业银行",GCB:"广州银行",NBBANK:"宁波银行",BOYK:"营口银行",SXRCCU:"陕西信合",GLBANK:"桂林银行",BOQH:"青海银行",CDRCB:"成都农商银行",QDCCB:"青岛银行",HKBEA:"东亚银行",HBHSBANK:"湖北银行黄石分行",WZCB:"温州银行",TRCB:"天津农商银行",QLBANK:"齐鲁银行",GDRCC:"广东省农村信用社联合社",ZJTLCB:"浙江泰隆商业银行",GZB:"赣州银行",GYCB:"贵阳市商业银行",CQBANK:"重庆银行",DAQINGB:"龙江银行",CGNB:"南充市商业银行",SCCB:"三门峡银行",CSRCB:"常熟农村商业银行",SHBANK:"上海银行",JLBANK:"吉林银行",CZRCB:"常州农村信用联社",BANKWF:"潍坊银行",ZRCBANK:"张家港农村商业银行",FJHXBC:"福建海峡银行",ZJNX:"浙江省农村信用社联合社",LZYH:"兰州银行",JSB:"晋商银行",BOHAIB:"渤海银行",CZCB:"浙江稠州商业银行",YQCCB:"阳泉银行",SJBANK:"盛京银行",XABANK:"西安银行",BSB:"包商银行",JSBANK:"江苏银行",FSCB:"抚顺银行",HNRCU:"河南省农村信用",COMM:"交通银行",XTB:"邢台银行",CITIC:"中信银行",HXBANK:"华夏银行",HNRCC:"湖南省农村信用社",DYCCB:"东营市商业银行",ORBANK:"鄂尔多斯银行",BJRCB:"北京农村商业银行",XYBANK:"信阳银行",ZGCCB:"自贡市商业银行",CDCB:"成都银行",HANABANK:"韩亚银行",CMBC:"中国民生银行",LYBANK:"洛阳银行",GDB:"广东发展银行",ZBCB:"齐商银行",CBKF:"开封市商业银行",H3CB:"内蒙古银行",CIB:"兴业银行",CRCBANK:"重庆农村商业银行",SZSBK:"石嘴山银行",DZBANK:"德州银行",SRBANK:"上饶银行",LSCCB:"乐山市商业银行",JXRCU:"江西省农村信用",ICBC:"中国工商银行",JZBANK:"晋中市商业银行",HZCCB:"湖州市商业银行",NHB:"南海农村信用联社",XXBANK:"新乡银行",JRCB:"江苏江阴农村商业银行",YNRCC:"云南省农村信用社",ABC:"中国农业银行",GXRCU:"广西省农村信用",PSBC:"中国邮政储蓄银行",BZMD:"驻马店银行",ARCU:"安徽省农村信用社",GSRCU:"甘肃省农村信用",LYCB:"辽阳市商业银行",JLRCU:"吉林农信",URMQCCB:"乌鲁木齐市商业银行",XLBANK:"中山小榄村镇银行",CSCB:"长沙银行",JHBANK:"金华银行",BHB:"河北银行",NBYZ:"鄞州银行",LSBC:"临商银行",BOCD:"承德银行",SDRCU:"山东农信",NCB:"南昌银行",TCCB:"天津银行",WJRCB:"吴江农商银行",CBBQS:"城市商业银行资金清算中心",HBRCU:"河北省农村信用社"};a.d(e,"b",(function(){return d})),a.d(e,"a",(function(){return p}));const d={computed:{pageScroll(){let t=this.$route.name;return s["a"].state.app.scrollTops[t]}},methods:{recordScrollPosition(t){this.$store.commit("SET_SCROLLTOP",{name:this.$route.name,scrollTop:t.target.scrollTop})}},activated(){this.$refs.scroll.scrollTop=this.pageScroll,this.$refs.scroll.addEventListener("scroll",this.recordScrollPosition)},deactivated(){this.$refs.scroll.removeEventListener("scroll",this.recordScrollPosition)},beforeRouteEnter(t,e,a){let i=s["a"].state.app.keepAliveList;s["a"].commit("SET_SCROLLNAME",t.name),-1==i.indexOf(t.name)&&i.push(t.name),s["a"].commit("SET_KEEPALIVE",i),a()},beforeRouteLeave(t,e,a){let i=s["a"].state.app.keepAliveList;e.meta.cacheTos&&-1==e.meta.cacheTos.indexOf(t.name)&&(i.splice(i.indexOf(e.name),1),this.$store.commit("SET_KEEPALIVE",i)),a()}},p={props:{data:{type:Object}},components:{cellImage:i["a"],accoutTag:h},mounted(){Object.keys(this.formData).map(t=>{/license_accessory|photo/.test(t)||(this.formData[t]=this.data[t])}),this.formData.business_license_accessory=[this.data.business_license_accessory],this.formData.id_photos=[this.data.id_front_photo,this.data.id_reverse_photo],this.formData.bank=u[this.data.bank]}}},bc18:function(t,e,a){"use strict";var s=a("f695"),i=a.n(s);i.a},f695:function(t,e,a){}}]);
//# sourceMappingURL=chunk-2192872e.afdccf3b.js.map