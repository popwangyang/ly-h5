(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0fbbab17"],{"075c":function(t,e,a){},"0db3":function(t){t.exports=JSON.parse('{"0":"银行卡借记卡","2":"信用卡","3":"准贷记卡","5":"虚拟卡","6":"基本户","7":"一般户"}')},1427:function(t,e,a){t.exports=a.p+"img/empty.d72b6a74.png"},"1fe8":function(t,e,a){t.exports=a.p+"img/error.9a7c2d33.png"},"3fc4":function(t,e,a){},"414d":function(t,e,a){},"4ab5":function(t,e,a){"use strict";var s=a("414d"),n=a.n(s);n.a},5332:function(t){t.exports=JSON.parse('{"10000":"职业国家机关、党群组织、企业、事业单位负责人","20000":"专业技术人员","30000":"办事人员和有关人员","40000":"商业、服务业人员","50000":"农、林、牧、渔、水利业生产人员","60000":"生产、运输设备操作人员及有关人员","70000":"军人","80000":"不便分类的其他从业人员"}')},"54a1":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-loading",{attrs:{color:t.color}})],1)},n=[],r={computed:{color(){return this.$store.state.app.theme.color}}},l=r,i=a("4023"),o=Object(i["a"])(l,s,n,!1,null,null,null);e["a"]=o.exports},"5e5c":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"accountBox"},[a("ContentLoad",{attrs:{getInfo:t.getData,emptyText:"暂无账户信息，请至PC端处理"}},[a(t.component,{tag:"component",attrs:{data:t.accountInfo}})],1)],1)},n=[],r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-cell",{attrs:{title:"账户类型",value:"对私账户"}}),a("van-cell",{attrs:{title:"审核状态"}},[a("accout-tag",{attrs:{state:t.formData.state}})],1),a("span",{staticClass:"accountBoxTitle"},[t._v(" 用户信息 ")]),a("van-cell",{attrs:{title:"用户类型",value:t._f("filterUser")(t.formData.profession)}}),a("van-cell",{attrs:{title:"姓名",value:t.formData.name}}),a("van-cell",{attrs:{title:"性别",value:t._f("filterGender")(t.formData.gender)}}),a("van-cell",{attrs:{title:"所在区域",value:t._f("filterArea")(t.formData.area_code_list)}}),a("van-cell",{attrs:{title:"详细地址",value:t.formData.address}}),a("van-cell",{attrs:{title:"身份证号",value:t.formData.id_number}}),a("van-cell",{attrs:{title:"身份证有效期"}},[a("span",[a("span",[t._v(t._s(t.formData.identity_valid_from))]),a("span",[t._v(" 至 ")]),a("span",[t._v(t._s(t.formData.identity_valid_until))])])]),a("cell-image",{attrs:{title:"身份证照片",dataList:t.formData.id_photos}}),a("span",{staticClass:"accountBoxTitle"},[t._v(" 开户信息 ")]),a("van-cell",{attrs:{title:"银行卡类型",value:t._f("filterCard")(t.formData.bank_card_type)}}),a("van-cell",{attrs:{title:"银行卡号",value:t.formData.bank_card_number}}),a("van-cell",{attrs:{title:"银行卡开户名",value:t.formData.bank_account_name}}),a("van-cell",{attrs:{title:"银行卡开户行",value:t.formData.bank_name}}),a("van-cell",{attrs:{title:"银行预留手机号",value:t.formData.bank_reserve_mobile}})],1)},l=[],i=a("b6f9"),o=a("5332"),c=a("0db3"),u=a("c276"),d={mixins:[i["a"]],filters:{filterArea:u["d"],filterUser(t){return o[t]},filterCard(t){return c[t]},filterGender(t){return"MALE"==t?"男":"女"}},data(){return{formData:{name:"",telephone:"",id_number:"",id_photos:[],bank:"",bank_card_number:"",state:"",profession:"",area_code_list:[],address:"",identity_valid_from:"",identity_valid_until:"",bank_reserve_mobile:"",bank_name:"",bank_account_name:"",bank_card_type:"",gender:""}}}},m=d,p=a("4023"),_=Object(p["a"])(m,r,l,!1,null,null,null),f=_.exports,B=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-cell",{attrs:{title:"账户类型",value:"对公账户"}}),a("van-cell",{attrs:{title:"审核状态"}},[a("accout-tag",{attrs:{state:t.formData.state}})],1),a("span",{staticClass:"accountBoxTitle"},[t._v(" 工商信息 ")]),a("van-cell",{attrs:{title:"商户类型",value:t._f("filterBusiness")(t.formData.profession)}}),a("van-cell",{attrs:{title:"工商登记名称",value:t.formData.business_registration_name}}),a("van-cell",{attrs:{title:"工商注册日期",value:t.formData.business_registration_date}}),a("van-cell",{attrs:{title:"营业执照注册号",value:t.formData.business_license_registration_number}}),a("van-cell",{attrs:{title:"营业执有效期"}},[a("span",[a("span",[t._v(t._s(t.formData.business_license_valid_from))]),a("span",[t._v(" 至 ")]),a("span",[t._v(t._s(t.formData.business_license_valid_until))])])]),a("cell-image",{attrs:{title:"营业执照附件",dataList:t.formData.business_license_accessory}}),a("van-cell",{attrs:{title:"工商注册地址"}},[a("span",[a("span",[t._v(t._s(t._f("filterArea")(t.formData.area_code_list)))]),a("span",[t._v(t._s(t.formData.address))])])]),a("span",{staticClass:"accountBoxTitle"},[t._v(" 法人信息 ")]),a("van-cell",{attrs:{title:"法人姓名",value:t.formData.name}}),a("van-cell",{attrs:{title:"手机号",value:t.formData.telephone}}),a("van-cell",{attrs:{title:"身份证号",value:t.formData.id_number}}),a("van-cell",{attrs:{title:"身份证有效期"}},[a("span",[a("span",[t._v(t._s(t.formData.identity_valid_from))]),a("span",[t._v(" 至 ")]),a("span",[t._v(t._s(t.formData.identity_valid_until))])])]),a("cell-image",{attrs:{title:"身份证照片",dataList:t.formData.id_photos}}),a("span",{staticClass:"accountBoxTitle"},[t._v(" 开户信息 ")]),a("van-cell",{attrs:{title:"银行卡类型",value:t._f("filterCard")(t.formData.bank_card_type)}}),a("van-cell",{attrs:{title:"银行卡号",value:t.formData.bank_card_number}}),a("van-cell",{attrs:{title:"银行卡开户名",value:t.formData.bank_account_name}}),a("van-cell",{attrs:{title:"银行卡开户行",value:t.formData.bank_name}}),a("van-cell",{attrs:{title:"银行预留手机号",value:t.formData.bank_reserve_mobile}})],1)},C=[],v=a("90d8"),b={mixins:[i["a"]],filters:{filterArea:u["d"],filterBusiness(t){return console.log(t),v[t]},filterCard(t){return c[t]}},data(){return{formData:{business_registration_name:"",business_registration_date:"",business_license_registration_number:"",business_license_accessory:[],area_code_list:[],name:"",telephone:"",id_number:"",id_photos:[],bank:"",bank_card_number:"",identity_valid_from:"",identity_valid_until:"",state:"",profession:"",bank_card_type:"",bank_account_name:"",bank_name:"",bank_reserve_mobile:"",business_license_valid_from:"",business_license_valid_until:"",address:""}}}},h=b,g=Object(p["a"])(h,B,C,!1,null,null,null),D=g.exports,A=a("b00a"),N=a("71a5"),S={components:{PublicAccout:D,PrivateAccout:f,ContentLoad:A["a"]},data(){return{accountType:"b2b",accountInfo:""}},computed:{component(){return"b2b"==this.accountType?"PublicAccout":"PrivateAccout"}},methods:{getData(){return new Promise((t,e)=>{Object(N["f"])(this.$store.state.ktv.ktvID).then(e=>{this.accountType=e.data.account_type,this.accountInfo=e.data,console.log(this.accountInfo),t(e.data)})})}}},K=S,x=(a("7216"),a("9460"),Object(p["a"])(K,s,n,!1,null,null,null));e["default"]=x.exports},7216:function(t,e,a){"use strict";var s=a("9dd8"),n=a.n(s);n.a},"885b":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"emptyComponentBox"},[a("img",{attrs:{src:t.imgsrc,alt:""}}),a("span",{staticStyle:{color:"#d0d0d0","font-size":"14px","margin-top":"10px",display:"block","margin-bottom":"20px"}},[t._v(" "+t._s(t.text)+" ")]),t.title&&""!=t.title?a("van-button",{staticClass:"buttonSquare",on:{click:t.btn}},[t._v(t._s(t.title))]):t._e()],1)},n=[],r={props:["text","title"],data(){return{imgsrc:a("1427")}},methods:{btn(){this.$emit("eventBtn")}}},l=r,i=(a("9399"),a("4023")),o=Object(i["a"])(l,s,n,!1,null,"daafecf6",null);e["a"]=o.exports},"90d8":function(t){t.exports=JSON.parse('{"A":"农、林、牧、渔业","B":"采矿业","C":"制造业","D":"电力、热力、燃气及水生产和供应业","E":"建筑业","F":"批发和零售业","G":"交通运输、仓储和邮政业","H":"住宿和餐饮业","I":"信息传输、软件和信息技术服务业","J":"金融业","K":"房地产业","L":"租赁和商务服务业","M":"科学研究和技术服务业","N":"水利、环境和公共设施管理业","O":"居民服务、修理和其他服务业","P":"教育","Q":"卫生和社会工作","R":"文化、体育和娱乐业","S":"公共管理、社会保障和社会组织","T":"国际组织","X":"未知"}')},9399:function(t,e,a){"use strict";var s=a("f709"),n=a.n(s);n.a},9460:function(t,e,a){"use strict";var s=a("ccdc"),n=a.n(s);n.a},"9dd8":function(t,e,a){},a489:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("van-cell",{attrs:{title:t.title}},[a("span",{attrs:{slot:"label"},slot:"label"},t._l(t.data,(function(e,s){return a("span",{key:s,staticClass:"cellImagLabel",on:{click:function(a){return t.imagePreview(e.fileUrl,e.name)}}},[a("van-icon",{attrs:{name:"photo",size:"20",color:"#FF5562"}}),a("span",[t._v(t._s(e.name))])],1)})),0)])},n=[],r=a("9688"),l=a("71a5"),i={props:{title:{type:String,default:"标题"},dataList:{type:Array,default:()=>[]},dataID:{type:Number}},data(){return{data:[]}},watch:{dataList:{handler(t,e){0!=t.length&&this.getInfo()},immediate:!0}},methods:{imagePreview(t,e){let a=e.split(".")[e.split(".").length-1];"pdf"===a?this.$router.push({path:"/PdfPreview",query:{url:t,name:e}}):Object(r["a"])({images:[t],asyncClose:!1,closeable:!0,showIndex:!1,closeOnPopstate:!0})},getInfo(){let t=[];this.dataList.forEach(e=>{let a=Object(l["q"])({id:e});t.push(a)}),Promise.all(t).then(t=>{this.data=t.reduce((t,e)=>{let a={fileUrl:e.data.results[0].path_auth,name:e.data.results[0].name};return t.push(a),t},[])})}}},o=i,c=(a("db95"),a("4023")),u=Object(c["a"])(o,s,n,!1,null,"55296a5c",null);e["a"]=u.exports},ae20:function(t,e,a){"use strict";var s=a("075c"),n=a.n(s);n.a},ae9f:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"emptyComponentBox"},[a("img",{attrs:{src:t.imgsrc,alt:""}}),a("span",{staticStyle:{display:"flex","margin-top":"10px"}},[a("span",{staticStyle:{color:"#d0d0d0","font-size":"14px"}},[t._v(" "+t._s(t.text)+" ")]),a("span",{staticClass:"errorTheme",on:{click:t.btn}},[t._v("重新加载")])])])},n=[],r={props:{text:{type:String,default:"加载失败"}},data(){return{imgsrc:a("1fe8")}},methods:{btn(){this.$emit("eventBtn")}}},l=r,i=(a("ae20"),a("4023")),o=Object(i["a"])(l,s,n,!1,null,"d0775eaa",null);e["a"]=o.exports},b00a:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentLoad"},[a("span",{directives:[{name:"show",rawName:"v-show",value:0==t.pageStatues,expression:"pageStatues == 0"}],staticClass:"content"},[a("Loading")],1),1==t.pageStatues?a("span",[t._t("default")],2):t._e(),2==t.pageStatues?a("span",{staticClass:"content"},[t.$slots.empty?t._t("empty"):a("Empty",{attrs:{text:t.emptyText}})],2):t._e(),3==t.pageStatues?a("span",{staticClass:"content"},[t.$slots.error?t._t("error"):a("Error",{attrs:{text:"加载失败"},on:{eventBtn:t.getData}})],2):t._e()])},n=[],r=a("54a1"),l=a("ae9f"),i=a("885b"),o={components:{Loading:r["a"],Empty:i["a"],Error:l["a"]},props:{getInfo:{type:Function},emptyText:{type:String,default:"暂无信息"}},data(){return{pageStatues:0}},methods:{getData(){this.pageStatues=0,this.getInfo().then(t=>{this.pageStatues=""!=t?1:2}).catch(t=>{console.log(t,"ppppp"),this.pageStatues=3})}},mounted(){this.getData()}},c=o,u=(a("4ab5"),a("4023")),d=Object(u["a"])(c,s,n,!1,null,"01a8e204",null);e["a"]=d.exports},b6f9:function(t,e,a){"use strict";a.d(e,"b",(function(){return _})),a.d(e,"a",(function(){return f}));var s=a("4360"),n=a("a489"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"accountInfTagBox"},[a("span",{staticClass:"textValue"},[t._v(" "+t._s(t.textValue)+" ")]),"succeeded"!=t.state?a("van-icon",{staticStyle:{"margin-left":"6px"},attrs:{name:"info",color:t.color},on:{click:t.dialogBtn}}):t._e()],1)},l=[],i=[{title:"已提交待激活",content:"信息提交后，ping++返回的银行开户状态；且账户信息不可编辑，提示文案:”银行正在审核中，预计需要1~5个工作日完成审核，审核通过后才可以将分配金额分配至该账户，还请耐心等待."},{title:"处理审核中",content:"即存管银行还在对结算信息进行审核的状态，ping++返回的银行开户状态；且账户信息不可编辑，需等待第三方返回审核结果，且须在审核状态下方提示”银行正在审核中，预计需要1~5个工作日完成审核，审核通过后才可以将分配金额分配至该账户，还请耐心等待"},{title:"开户成功",content:"第三方返回存管银行还在对结算信息审核通过的状态；可编辑账户信息，编辑后再次提交银行审核；开户成功后需向创建人发出通知（邮件&系统）：#场所名称#开户成功，可以开启扫码付费进行分润了。"},{title:"开户失败",content:"第三方返回存管银行还在对结算信息审核不通过的状态；并提示用户“账户信息未通过银行审核，请核实信息的准确性再提交审核”，可编辑账户信息，编辑后再次提交银行审核；开户失败后需向创建人发出通知（邮件&系统）：#场所名称#开户失败，请重新提交账户信息。"},{title:"账户冻结",content:"ping++返回的银行开户状态；提示文案：账户已被银行冻结，如有问题请咨询#华通银行客服电话#"}],o={props:{state:{type:String,default:"pending"}},computed:{color(){return this.$store.state.app.theme.color},textValue(){let t="开户成功";switch(this.state){case"succeeded":t="开户成功";break;case"submitted":t="已提交待激活";break;case"pending":t="处理审核中";break;case"failed":t="开户失败";break;case"frozen":t="账户冻结"}return t}},methods:{dialogBtn(){let t=i.find(t=>{if(t.title==this.textValue)return t});this.$dialog.alert({title:t.title,message:t.content,confirmButtonColor:this.color,confirmButtonText:"知道了"}).then(()=>{})}}},c=o,u=(a("e44c"),a("4023")),d=Object(u["a"])(c,r,l,!1,null,"bc016970",null),m=d.exports,p={SRCB:"深圳农村商业银行",BGB:"广西北部湾银行",SHRCB:"上海农村商业银行",BJBANK:"北京银行",WHCCB:"威海市商业银行",BOZK:"周口银行",KORLABANK:"库尔勒市商业银行",SPABANK:"平安银行",SDEB:"顺德农商银行",HURCB:"湖北省农村信用社",WRCB:"无锡农村商业银行",BOCY:"朝阳银行",CZBANK:"浙商银行",HDBANK:"邯郸银行",BOC:"中国银行",BOD:"东莞银行",CCB:"中国建设银行",ZYCBANK:"遵义市商业银行",SXCB:"绍兴银行",GZRCU:"贵州省农村信用社",ZJKCCB:"张家口市商业银行",BOJZ:"锦州银行",BOP:"平顶山银行",HKB:"汉口银行",SPDB:"上海浦东发展银行",NXRCU:"宁夏黄河农村商业银行",NYNB:"广东南粤银行",GRCB:"广州农商银行",BOSZ:"苏州银行",HZCB:"杭州银行",HSBK:"衡水银行",HBC:"湖北银行",JXBANK:"嘉兴银行",HRXJB:"华融湘江银行",BODD:"丹东银行",AYCB:"安阳银行",EGBANK:"恒丰银行",CDB:"国家开发银行",TCRCB:"江苏太仓农村商业银行",NJCB:"南京银行",ZZBANK:"郑州银行",DYCB:"德阳商业银行",YBCCB:"宜宾市商业银行",SCRCU:"四川省农村信用",KLB:"昆仑银行",LSBANK:"莱商银行",YDRCB:"尧都农商行",CCQTGB:"重庆三峡银行",FDB:"富滇银行",JSRCU:"江苏省农村信用联合社",JNBANK:"济宁银行",CMB:"招商银行",JINCHB:"晋城银行JCBANK",FXCB:"阜新银行",WHRCB:"武汉农村商业银行",HBYCBANK:"湖北银行宜昌分行",TZCB:"台州银行",TACCB:"泰安市商业银行",XCYH:"许昌银行",CEB:"中国光大银行",NXBANK:"宁夏银行",HSBANK:"徽商银行",JJBANK:"九江银行",NHQS:"农信银清算中心",MTBANK:"浙江民泰商业银行",LANGFB:"廊坊银行",ASCB:"鞍山银行",KSRB:"昆山农村商业银行",YXCCB:"玉溪市商业银行",DLB:"大连银行",DRCBCL:"东莞农村商业银行",GCB:"广州银行",NBBANK:"宁波银行",BOYK:"营口银行",SXRCCU:"陕西信合",GLBANK:"桂林银行",BOQH:"青海银行",CDRCB:"成都农商银行",QDCCB:"青岛银行",HKBEA:"东亚银行",HBHSBANK:"湖北银行黄石分行",WZCB:"温州银行",TRCB:"天津农商银行",QLBANK:"齐鲁银行",GDRCC:"广东省农村信用社联合社",ZJTLCB:"浙江泰隆商业银行",GZB:"赣州银行",GYCB:"贵阳市商业银行",CQBANK:"重庆银行",DAQINGB:"龙江银行",CGNB:"南充市商业银行",SCCB:"三门峡银行",CSRCB:"常熟农村商业银行",SHBANK:"上海银行",JLBANK:"吉林银行",CZRCB:"常州农村信用联社",BANKWF:"潍坊银行",ZRCBANK:"张家港农村商业银行",FJHXBC:"福建海峡银行",ZJNX:"浙江省农村信用社联合社",LZYH:"兰州银行",JSB:"晋商银行",BOHAIB:"渤海银行",CZCB:"浙江稠州商业银行",YQCCB:"阳泉银行",SJBANK:"盛京银行",XABANK:"西安银行",BSB:"包商银行",JSBANK:"江苏银行",FSCB:"抚顺银行",HNRCU:"河南省农村信用",COMM:"交通银行",XTB:"邢台银行",CITIC:"中信银行",HXBANK:"华夏银行",HNRCC:"湖南省农村信用社",DYCCB:"东营市商业银行",ORBANK:"鄂尔多斯银行",BJRCB:"北京农村商业银行",XYBANK:"信阳银行",ZGCCB:"自贡市商业银行",CDCB:"成都银行",HANABANK:"韩亚银行",CMBC:"中国民生银行",LYBANK:"洛阳银行",GDB:"广东发展银行",ZBCB:"齐商银行",CBKF:"开封市商业银行",H3CB:"内蒙古银行",CIB:"兴业银行",CRCBANK:"重庆农村商业银行",SZSBK:"石嘴山银行",DZBANK:"德州银行",SRBANK:"上饶银行",LSCCB:"乐山市商业银行",JXRCU:"江西省农村信用",ICBC:"中国工商银行",JZBANK:"晋中市商业银行",HZCCB:"湖州市商业银行",NHB:"南海农村信用联社",XXBANK:"新乡银行",JRCB:"江苏江阴农村商业银行",YNRCC:"云南省农村信用社",ABC:"中国农业银行",GXRCU:"广西省农村信用",PSBC:"中国邮政储蓄银行",BZMD:"驻马店银行",ARCU:"安徽省农村信用社",GSRCU:"甘肃省农村信用",LYCB:"辽阳市商业银行",JLRCU:"吉林农信",URMQCCB:"乌鲁木齐市商业银行",XLBANK:"中山小榄村镇银行",CSCB:"长沙银行",JHBANK:"金华银行",BHB:"河北银行",NBYZ:"鄞州银行",LSBC:"临商银行",BOCD:"承德银行",SDRCU:"山东农信",NCB:"南昌银行",TCCB:"天津银行",WJRCB:"吴江农商银行",CBBQS:"城市商业银行资金清算中心",HBRCU:"河北省农村信用社"};const _={computed:{pageScroll(){let t=this.$route.name;return s["a"].state.app.scrollTops[t]}},methods:{recordScrollPosition(t){this.$store.commit("SET_SCROLLTOP",{name:this.$route.name,scrollTop:t.target.scrollTop})}},activated(){this.$refs.scroll.scrollTop=this.pageScroll,this.$refs.scroll.addEventListener("scroll",this.recordScrollPosition)},deactivated(){this.$refs.scroll.removeEventListener("scroll",this.recordScrollPosition)},beforeRouteEnter(t,e,a){let n=s["a"].state.app.keepAliveList;s["a"].commit("SET_SCROLLNAME",t.name),-1==n.indexOf(t.name)&&n.push(t.name),s["a"].commit("SET_KEEPALIVE",n),a()},beforeRouteLeave(t,e,a){let n=s["a"].state.app.keepAliveList;e.meta.cacheTos&&-1==e.meta.cacheTos.indexOf(t.name)&&(n.splice(n.indexOf(e.name),1),this.$store.commit("SET_KEEPALIVE",n)),a()}},f={props:{data:{type:Object}},components:{cellImage:n["a"],accoutTag:m},mounted(){Object.keys(this.formData).map(t=>{/license_accessory|photo/.test(t)||(this.formData[t]=this.data[t])}),this.formData.business_license_accessory=[this.data.business_license_accessory],this.formData.id_photos=[this.data.id_front_photo,this.data.id_reverse_photo],this.formData.bank=p[this.data.bank],console.log(this.formData)}}},ccdc:function(t,e,a){},daa4:function(t,e,a){},db95:function(t,e,a){"use strict";var s=a("3fc4"),n=a.n(s);n.a},e44c:function(t,e,a){"use strict";var s=a("daa4"),n=a.n(s);n.a},f709:function(t,e,a){}}]);
//# sourceMappingURL=chunk-0fbbab17.7d6114fa.js.map