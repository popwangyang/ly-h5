(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-98068e3c"],{"13d5":function(t,e,a){"use strict";var n=a("23e7"),s=a("d58f").left,r=a("a640"),i=a("ae40"),c=r("reduce"),o=i("reduce",{1:0});n({target:"Array",proto:!0,forced:!c||!o},{reduce:function(t){return s(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},1427:function(t,e,a){t.exports=a.p+"img/empty.d72b6a74.png"},1942:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"scroll",staticClass:"contractDetail"},[a("ContentLoad",{attrs:{getInfo:t.getData}},[a("van-cell",{attrs:{title:"合同类型","value-class":"cellValue",value:t.formData.type}}),a("van-cell",{attrs:{title:"合同状态","value-class":"cellValue",value:t._f("filterState")(t.formData.state)}}),a("van-cell",{attrs:{title:"合同编号","value-class":"cellValue",value:t.formData.number}}),a("van-cell",{attrs:{title:"合同起始日期","value-class":"cellValue",value:t.formData.begin_date}}),2==t.contractStatues?a("expensesDetails",{attrs:{isPerson:t.showPersonContract,data:t.formData.expensesDetails}}):t._e(),2==t.contractStatues?a("div",{staticClass:"divider"}):t._e(),a("van-cell",{attrs:{title:"计费方式","value-class":"cellValue",value:t._f("filterBillingMethod")(t.formData.billingMethod)}}),2!=t.contractStatues?a("van-cell",{attrs:{title:"计费价格","value-class":"cellValue",value:t.formData.billingPrice}}):t._e(),2==t.contractStatues?a("van-cell",{attrs:{title:"扫码费用(综合技术服务费)","value-class":"cellValue",value:t._f("filterUnitB")(t.formData.scan_code_payment)}}):t._e(),2==t.contractStatues?a("van-cell",{attrs:{title:"支付方式","value-class":"cellValue",value:t._f("filterPayMethod")(t.formData.pay_method)}}):t._e(),2==t.contractStatues&&t.formData.substitute?a("van-cell",{attrs:{title:"代垫方","value-class":"cellValue",value:t.formData.substitute}}):t._e(),a("van-cell",{attrs:{title:"承若最晚支付时间","value-class":"cellValue",value:t.formData.latestPaymentDate}}),1!=t.contractStatues?a("van-cell",{attrs:{title:"变更历史","is-link":""},on:{click:t.goHistory}}):t._e(),a("div",{staticClass:"divider"}),t.showPersonContract?t._e():a("div",[0!=t.contractStatues&&t.formData.billing_state_time?a("van-cell",{attrs:{title:"开始计费时间","value-class":"cellValue",value:t.formData.billing_state_time}}):t._e(),0!=t.contractStatues&&t.formData.billing_state_time_end?a("van-cell",{attrs:{title:"暂停计费时间","value-class":"cellValue",value:t.formData.billing_state_time_end}}):t._e()],1),a("div",{staticClass:"divider"}),0!=t.contractStatues?a("van-cell",{attrs:{title:"机构","value-class":"cellValue",value:t.formData.mechanism}}):t._e(),2==t.contractStatues?a("van-cell",{attrs:{title:"机构分成比例","value-class":"cellValue",value:t.formData.proportion_of_mechanism}}):t._e(),2==t.contractStatues?a("van-cell",{attrs:{title:"场所分成比例","value-class":"cellValue",value:t.formData.proportion_of_places}}):t._e(),a("div",{staticClass:"divider"}),a("cell-image",{attrs:{title:"确认函",dataList:t.formData.replies}}),a("cell-image",{attrs:{title:"合同附件",dataList:t.formData.annex}}),2!=t.contractStatues?a("div",{staticClass:"divider"}):t._e(),a("time-note",{attrs:{contractType:t.contractStatues}}),t.showPersonContract?t._e():a("div",[a("div",{staticClass:"divider"}),2!=t.contractStatues&&null!=t.formData.tag_full?a("van-cell",{attrs:{title:"审批记录","is-link":""},on:{click:t.goApprovalRecord}}):t._e(),2!=t.contractStatues&&null!=t.formData.tag_full?a("approval-steps",{attrs:{tag_full:t.formData.tag_full}}):t._e()],1)],1)],1)},s=[],r=(a("a9e3"),a("d3b7"),a("d279")),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"expensesDetailsBox"},[a("div",{staticClass:"header"},[t._v("费用明细")]),a("div",{staticClass:"content"},[a("van-grid",{attrs:{"column-num":2}},[a("van-grid-item",{staticClass:"title"},[t._v("项目")]),a("van-grid-item",{staticClass:"title"},[t._v("费用（元/年）")]),a("van-grid-item",{staticClass:"tableItem"},[t._v("曲库内容管理、CDN内容推送、风险内容预警等服务")]),a("van-grid-item",[t._v(t._s(t.data.music_library_cdn_risk_warning_service))]),a("van-grid-item",{staticClass:"tableItem"},[t._v("扫码付费/精确计次实现服务费")]),a("van-grid-item",[t._v(t._s(t.data.scan_code_payment_accurate_counting))]),a("van-grid-item",{staticClass:"tableItem"},[t._v("机顶盒采购/升级成本")]),a("van-grid-item",[t._v(t._s(t.data.set_top_box_purchase_upgrade_cost))]),a("van-grid-item",{directives:[{name:"show",rawName:"v-show",value:!t.isPerson,expression:"!isPerson"}],staticClass:"tableItem"},[t._v("交换机(数字通讯设备)采购/升级成本")]),a("van-grid-item",{directives:[{name:"show",rawName:"v-show",value:!t.isPerson,expression:"!isPerson"}]},[t._v(t._s(t.data.switch_purchase_upgrade_cost))]),a("van-grid-item",{staticClass:"tableItem"},[t._v("其他综合技术维护费")]),a("van-grid-item",[t._v(t._s(t.data.other_comprehensive_service_payment))]),a("van-grid-item",{staticClass:"tableItem bolder"},[t._v("综合技术维护费合计")]),a("van-grid-item",{staticClass:"bolder"},[t._v(t._s(t.data.total_comprehensive_service_payment))])],1)],1)])},c=[],o={props:{data:{type:Object,required:!0},isPerson:{type:Boolean,required:!1}}},l=o,u=(a("b03d"),a("9759"),a("2877")),f=Object(u["a"])(l,i,c,!1,null,"d572c380",null),_=f.exports,p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"timeNoteBox"},[t.formData.create_date?a("van-cell",{attrs:{"title-class":"titleClass",title:"创建时间","value-class":"cellValue",value:t.formData.create_date}}):t._e(),t.formData.effective_time?a("van-cell",{attrs:{"title-class":"titleClass",title:"生效时间","value-class":"cellValue",value:t.formData.effective_time}}):t._e(),0!=t.contractType&&t.formData.termination_time?a("van-cell",{attrs:{"title-class":"titleClass",title:"终止时间","value-class":"cellValue",value:t.formData.termination_time}}):t._e(),t.formData.billing_state_time?a("van-cell",{attrs:{"title-class":"titleClass",title:"开始计费时间","value-class":"cellValue",value:t.formData.billing_state_time}}):t._e(),0!=t.contractType&&t.formData.billing_state_time_end?a("van-cell",{attrs:{"title-class":"titleClass",title:"暂停计费时间","value-class":"cellValue",value:t.formData.billing_state_time_end}}):t._e()],1)},d=[],m={props:{contractType:{type:Number,default:0}},computed:{formData:function(){var t=this.$store.state.ktv.contractDetail.contract,e=t.create_date,a=t.effective_time,n=t.termination_time,s=t.billing_state_time,r=t.billing_state_time_end;return{create_date:e,effective_time:a,termination_time:n,billing_state_time:s,billing_state_time_end:r}}},data:function(){return{}}},v=m,C=(a("c707"),Object(u["a"])(v,p,d,!1,null,"0a5876c0",null)),h=C.exports,B=a("b00a"),g=a("a489"),b=a("b6f9"),D=a("71a5"),S={name:"contractDetail",mixins:[b["b"]],components:{ContentLoad:B["a"],cellImage:g["a"],expensesDetails:_,approvalSteps:r["a"],timeNote:h},filters:{filterUnitB:function(t){return"￥".concat(t)},filterPayMethod:function(t){var e=null;switch(t){case 1:e="甲方一次性支付";break;default:e="乙方先行垫付";break}return e},filterState:function(t){var e=null;switch(t){case 1:e="合同创建中";break;case 2:e="已生效";break;case 3:e="已过期";break;case 4:e="合同终止";break;default:e="合同创建中";break}return e},filterBillingMethod:function(t){var e=null;switch(t){case 1:e="扫码支付";break;case 2:e="精确计次";break;case 3:e="综合计费";break;default:e="扫码支付";break}return e}},mounted:function(){this.showPersonContract="true"===String(this.$route.query.showPersonContract)},data:function(){return{showPersonContract:!1,contractStatues:0,formData:{tag_full:"",contractID:"",type:"",state:"",number:"",begin_date:"",end_date:"",writeDate:"",latestPaymentDate:"",billing_state_time:"",billing_state_time_end:"",billingMethod:"",billingPrice:"",scan_code_payment:"",pay_method:"",substitute:"",mechanism:"",proportion_of_mechanism:"",proportion_of_places:"",replies:[],annex:[],expensesDetails:{music_library_cdn_risk_warning_service:"",scan_code_payment_accurate_counting:"",set_top_box_purchase_upgrade_cost:"",switch_purchase_upgrade_cost:"",other_comprehensive_service_payment:"",total_comprehensive_service_payment:""}}}},methods:{goApprovalRecord:function(){this.$router.push({name:"approvalRecord",query:{contractID:this.formData.contractID}})},goHistory:function(){this.$router.push({name:"contractChangeHistory"})},getData:function(){var t=this;return new Promise((function(e,a){Object(D["j"])(t.$route.query.contractType,t.$route.query.contractID).then((function(a){console.log(a),t.$store.commit("setContractDetail",a.data),1==a.data.contract.type&&4!=a.data.contract.state&&(t.contractStatues=0),1==a.data.contract.type&&4==a.data.contract.state&&(t.contractStatues=1),2==a.data.contract.type&&(t.contractStatues=2),t.formData.tag_full=a.data.contract.tag_full,t.formData.contractID=a.data.contract.id,t.formData.type=1==a.data.contract.type?"曲库服务协议合同":"技术综合服务协议合同",t.formData.state=a.data.contract.state,t.formData.number=a.data.contract.number,t.formData.writeDate=a.data.contract.write_date,t.formData.billingMethod=a.data.billing_method,t.formData.billingPrice=1==a.data.billing_method?"".concat(a.data.billing_price,"元/次/终端"):"".concat(a.data.billing_price,"元"),t.formData.scan_code_payment=a.data.scan_code_payment,t.formData.pay_method=a.data.contract.pay_method,t.formData.billing_state_time=a.data.contract.billing_state_time,t.formData.billing_state_time_end=a.data.contract.billing_state_time_end,t.formData.begin_date=a.data.contract.begin_date,t.formData.end_date=a.data.contract.end_date,t.formData.mechanism=a.data.mechanism_name,t.formData.substitute=a.data.substitute_name,t.formData.proportion_of_mechanism=Number(a.data.proportion_of_mechanism)+"%",t.formData.proportion_of_places=Number(a.data.proportion_of_places)+"%",t.formData.latestPaymentDate=a.data.latest_payment_date,t.formData.replies=JSON.parse(a.data.replies),t.formData.annex=JSON.parse(a.data.annex),t.formData.expensesDetails.music_library_cdn_risk_warning_service=a.data.music_library_cdn_risk_warning_service,t.formData.expensesDetails.scan_code_payment_accurate_counting=a.data.scan_code_payment_accurate_counting,t.formData.expensesDetails.set_top_box_purchase_upgrade_cost=a.data.set_top_box_purchase_upgrade_cost,t.formData.expensesDetails.switch_purchase_upgrade_cost=a.data.switch_purchase_upgrade_cost,t.formData.expensesDetails.other_comprehensive_service_payment=a.data.other_comprehensive_service_payment,t.formData.expensesDetails.total_comprehensive_service_payment=a.data.total_comprehensive_service_payment,e(a)}))["catch"]((function(t){a(t)}))}))}}},y=S,N=(a("d3fe"),Object(u["a"])(y,n,s,!1,null,"a2da834a",null));e["default"]=N.exports},"1fe8":function(t,e,a){t.exports=a.p+"img/error.9a7c2d33.png"},"36fd":function(t,e,a){"use strict";var n=a("5443"),s=a.n(n);s.a},"3a97":function(t,e,a){},"431c":function(t,e,a){"use strict";var n=a("3a97"),s=a.n(n);s.a},5443:function(t,e,a){},"54a1":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-loading",{attrs:{color:t.color}})],1)},s=[],r={computed:{color:function(){return this.$store.state.app.theme.color}}},i=r,c=a("2877"),o=Object(c["a"])(i,n,s,!1,null,null,null);e["a"]=o.exports},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,a){var n=a("1d80"),s=a("5899"),r="["+s+"]",i=RegExp("^"+r+r+"*"),c=RegExp(r+r+"*$"),o=function(t){return function(e){var a=String(n(e));return 1&t&&(a=a.replace(i,"")),2&t&&(a=a.replace(c,"")),a}};t.exports={start:o(1),end:o(2),trim:o(3)}},7156:function(t,e,a){var n=a("861d"),s=a("d2bb");t.exports=function(t,e,a){var r,i;return s&&"function"==typeof(r=e.constructor)&&r!==a&&n(i=r.prototype)&&i!==a.prototype&&s(t,i),t}},"7d78":function(t,e,a){},8340:function(t,e,a){"use strict";var n=a("9f37"),s=a.n(n);s.a},"885b":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"emptyComponentBox"},[a("img",{attrs:{src:t.imgsrc,alt:""}}),a("span",{staticStyle:{color:"#d0d0d0","font-size":"14px","margin-top":"10px",display:"block","margin-bottom":"20px"}},[t._v(" "+t._s(t.text)+" ")]),t.title&&""!=t.title?a("van-button",{staticClass:"buttonSquare",on:{click:t.btn}},[t._v(t._s(t.title))]):t._e()],1)},s=[],r={props:["text","title"],data:function(){return{imgsrc:a("1427")}},methods:{btn:function(){this.$emit("eventBtn")}}},i=r,c=(a("431c"),a("2877")),o=Object(c["a"])(i,n,s,!1,null,"4d207a0f",null);e["a"]=o.exports},8927:function(t,e,a){},9759:function(t,e,a){"use strict";var n=a("fcc7"),s=a.n(n);s.a},"99af2":function(t,e,a){"use strict";var n=a("e72d"),s=a.n(n);s.a},"9f37":function(t,e,a){},a434:function(t,e,a){"use strict";var n=a("23e7"),s=a("23cb"),r=a("a691"),i=a("50c4"),c=a("7b0b"),o=a("65f0"),l=a("8418"),u=a("1dde"),f=a("ae40"),_=u("splice"),p=f("splice",{ACCESSORS:!0,0:0,1:2}),d=Math.max,m=Math.min,v=9007199254740991,C="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!_||!p},{splice:function(t,e){var a,n,u,f,_,p,h=c(this),B=i(h.length),g=s(t,B),b=arguments.length;if(0===b?a=n=0:1===b?(a=0,n=B-g):(a=b-2,n=m(d(r(e),0),B-g)),B+a-n>v)throw TypeError(C);for(u=o(h,n),f=0;f<n;f++)_=g+f,_ in h&&l(u,f,h[_]);if(u.length=n,a<n){for(f=g;f<B-n;f++)_=f+n,p=f+a,_ in h?h[p]=h[_]:delete h[p];for(f=B;f>B-n+a;f--)delete h[f-1]}else if(a>n)for(f=B-n;f>g;f--)_=f+n-1,p=f+a-1,_ in h?h[p]=h[_]:delete h[p];for(f=0;f<a;f++)h[f+g]=arguments[f+2];return h.length=B-n+a,u}})},a489:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("van-cell",{attrs:{title:t.title}},[a("span",{attrs:{slot:"label"},slot:"label"},t._l(t.data,(function(e,n){return a("span",{key:n,staticClass:"cellImagLabel",on:{click:function(a){return t.imagePreview(e.fileUrl,e.name)}}},[a("van-icon",{attrs:{name:"photo",size:"20",color:"#FF5562"}}),a("span",[t._v(t._s(e.name))])],1)})),0)])},s=[],r=(a("4160"),a("13d5"),a("b0c0"),a("d3b7"),a("ac1f"),a("3ca3"),a("1276"),a("159b"),a("ddb0"),a("28a2")),i=a("71a5"),c={props:{title:{type:String,default:"标题"},dataList:{type:Array,default:function(){return[]}}},data:function(){return{data:[]}},methods:{imagePreview:function(t,e){var a=e.split(".")[e.split(".").length-1];"pdf"===a?this.$router.push({path:"/PdfPreview",query:{url:t,name:e}}):Object(r["a"])([t])},getInfo:function(){var t=this,e=[];this.dataList.forEach((function(t){var a=Object(i["p"])({id:t});e.push(a)})),Promise.all(e).then((function(e){t.data=e.reduce((function(t,e){var a={fileUrl:e.data.results[0].path_auth,name:e.data.results[0].name};return t.push(a),t}),[])}))}},mounted:function(){this.getInfo()}},o=c,l=(a("bc18"),a("2877")),u=Object(l["a"])(o,n,s,!1,null,"25c2579e",null);e["a"]=u.exports},a9e3:function(t,e,a){"use strict";var n=a("83ab"),s=a("da84"),r=a("94ca"),i=a("6eeb"),c=a("5135"),o=a("c6b6"),l=a("7156"),u=a("c04e"),f=a("d039"),_=a("7c73"),p=a("241c").f,d=a("06cf").f,m=a("9bf2").f,v=a("58a8").trim,C="Number",h=s[C],B=h.prototype,g=o(_(B))==C,b=function(t){var e,a,n,s,r,i,c,o,l=u(t,!1);if("string"==typeof l&&l.length>2)if(l=v(l),e=l.charCodeAt(0),43===e||45===e){if(a=l.charCodeAt(2),88===a||120===a)return NaN}else if(48===e){switch(l.charCodeAt(1)){case 66:case 98:n=2,s=49;break;case 79:case 111:n=8,s=55;break;default:return+l}for(r=l.slice(2),i=r.length,c=0;c<i;c++)if(o=r.charCodeAt(c),o<48||o>s)return NaN;return parseInt(r,n)}return+l};if(r(C,!h(" 0o1")||!h("0b1")||h("+0x1"))){for(var D,S=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof S&&(g?f((function(){B.valueOf.call(a)})):o(a)!=C)?l(new h(b(e)),a,S):b(e)},y=n?p(h):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;y.length>N;N++)c(h,D=y[N])&&!c(S,D)&&m(S,D,d(h,D));S.prototype=B,B.constructor=S,i(s,C,S)}},ada9:function(t,e,a){"use strict";var n=a("e1d30"),s=a.n(n);s.a},ae9f:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"emptyComponentBox"},[a("img",{attrs:{src:t.imgsrc,alt:""}}),a("span",{staticStyle:{display:"flex","margin-top":"10px"}},[a("span",{staticStyle:{color:"#d0d0d0","font-size":"14px"}},[t._v(" "+t._s(t.text)+" ")]),a("span",{staticClass:"errorTheme",on:{click:t.btn}},[t._v("重新加载")])])])},s=[],r={props:{text:{type:String,default:"加载失败"}},data:function(){return{imgsrc:a("1fe8")}},methods:{btn:function(){this.$emit("eventBtn")}}},i=r,c=(a("ada9"),a("2877")),o=Object(c["a"])(i,n,s,!1,null,"f9f26e0c",null);e["a"]=o.exports},b00a:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentLoad"},[a("span",{directives:[{name:"show",rawName:"v-show",value:0==t.pageStatues,expression:"pageStatues == 0"}],staticClass:"content"},[a("Loading")],1),1==t.pageStatues?a("span",[t._t("default")],2):t._e(),2==t.pageStatues?a("span",{staticClass:"content"},[t.$slots.empty?t._t("empty"):a("Empty",{attrs:{text:t.emptyText}})],2):t._e(),3==t.pageStatues?a("span",{staticClass:"content"},[t.$slots.error?t._t("error"):a("Error",{attrs:{text:"加载失败"},on:{eventBtn:t.getData}})],2):t._e()])},s=[],r=a("54a1"),i=a("ae9f"),c=a("885b"),o={components:{Loading:r["a"],Empty:c["a"],Error:i["a"]},props:{getInfo:{type:Function},emptyText:{type:String,default:"暂无信息"}},data:function(){return{pageStatues:0}},methods:{getData:function(){var t=this;this.pageStatues=0,this.getInfo().then((function(e){t.pageStatues=""!=e?1:2}))["catch"]((function(e){console.log(e,"ppppp"),t.pageStatues=3}))}},mounted:function(){this.getData()}},l=o,u=(a("36fd"),a("2877")),f=Object(u["a"])(l,n,s,!1,null,"5ccc5f6f",null);e["a"]=f.exports},b03d:function(t,e,a){"use strict";var n=a("d5c5"),s=a.n(n);s.a},b6f9:function(t,e,a){"use strict";a("c975"),a("d81d"),a("a434"),a("b0c0"),a("b64b");var n=a("4360"),s=(a("2f62"),a("a489")),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"accountInfTagBox"},[a("span",{staticClass:"textValue"},[t._v(" "+t._s(t.textValue)+" ")]),1!=t.state?a("van-icon",{staticStyle:{"margin-left":"6px"},attrs:{name:"info",color:t.color},on:{click:t.dialogBtn}}):t._e()],1)},i=[],c=(a("a9e3"),[{title:"已提交待激活",content:"银行正在审核中，预计需要1~5个工作日完成审核，审核通过后才可以将分配金额分配至改账户，还请耐心等待。"},{title:"处理审核中",content:"银行正在审核中，预计需要1~5个工作日完成审核，审核通过后才可以将分配金额分配至改账户，还请耐心等待。"},{title:"开户失败",content:"银行正在审核中，预计需要1~5个工作日完成审核，审核通过后才可以将分配金额分配至改账户，还请耐心等待。"}]),o={props:{state:{type:Number,default:1}},computed:{color:function(){return this.$store.state.app.theme.color},textValue:function(){var t="开户成功";switch(this.state){case 1:t="开户成功";break;case 2:t="已提交待激活";break;case 3:t="处理审核中";break;case 4:t="开户失败";break}return t}},methods:{dialogBtn:function(){var t=this.state-2,e=c[t];this.$dialog.alert({title:e.title,message:e.content,confirmButtonColor:this.color,confirmButtonText:"知道了"}).then((function(){}))}}},l=o,u=(a("8340"),a("2877")),f=Object(u["a"])(l,r,i,!1,null,"14bdeb4a",null),_=f.exports,p={SRCB:"深圳农村商业银行",BGB:"广西北部湾银行",SHRCB:"上海农村商业银行",BJBANK:"北京银行",WHCCB:"威海市商业银行",BOZK:"周口银行",KORLABANK:"库尔勒市商业银行",SPABANK:"平安银行",SDEB:"顺德农商银行",HURCB:"湖北省农村信用社",WRCB:"无锡农村商业银行",BOCY:"朝阳银行",CZBANK:"浙商银行",HDBANK:"邯郸银行",BOC:"中国银行",BOD:"东莞银行",CCB:"中国建设银行",ZYCBANK:"遵义市商业银行",SXCB:"绍兴银行",GZRCU:"贵州省农村信用社",ZJKCCB:"张家口市商业银行",BOJZ:"锦州银行",BOP:"平顶山银行",HKB:"汉口银行",SPDB:"上海浦东发展银行",NXRCU:"宁夏黄河农村商业银行",NYNB:"广东南粤银行",GRCB:"广州农商银行",BOSZ:"苏州银行",HZCB:"杭州银行",HSBK:"衡水银行",HBC:"湖北银行",JXBANK:"嘉兴银行",HRXJB:"华融湘江银行",BODD:"丹东银行",AYCB:"安阳银行",EGBANK:"恒丰银行",CDB:"国家开发银行",TCRCB:"江苏太仓农村商业银行",NJCB:"南京银行",ZZBANK:"郑州银行",DYCB:"德阳商业银行",YBCCB:"宜宾市商业银行",SCRCU:"四川省农村信用",KLB:"昆仑银行",LSBANK:"莱商银行",YDRCB:"尧都农商行",CCQTGB:"重庆三峡银行",FDB:"富滇银行",JSRCU:"江苏省农村信用联合社",JNBANK:"济宁银行",CMB:"招商银行",JINCHB:"晋城银行JCBANK",FXCB:"阜新银行",WHRCB:"武汉农村商业银行",HBYCBANK:"湖北银行宜昌分行",TZCB:"台州银行",TACCB:"泰安市商业银行",XCYH:"许昌银行",CEB:"中国光大银行",NXBANK:"宁夏银行",HSBANK:"徽商银行",JJBANK:"九江银行",NHQS:"农信银清算中心",MTBANK:"浙江民泰商业银行",LANGFB:"廊坊银行",ASCB:"鞍山银行",KSRB:"昆山农村商业银行",YXCCB:"玉溪市商业银行",DLB:"大连银行",DRCBCL:"东莞农村商业银行",GCB:"广州银行",NBBANK:"宁波银行",BOYK:"营口银行",SXRCCU:"陕西信合",GLBANK:"桂林银行",BOQH:"青海银行",CDRCB:"成都农商银行",QDCCB:"青岛银行",HKBEA:"东亚银行",HBHSBANK:"湖北银行黄石分行",WZCB:"温州银行",TRCB:"天津农商银行",QLBANK:"齐鲁银行",GDRCC:"广东省农村信用社联合社",ZJTLCB:"浙江泰隆商业银行",GZB:"赣州银行",GYCB:"贵阳市商业银行",CQBANK:"重庆银行",DAQINGB:"龙江银行",CGNB:"南充市商业银行",SCCB:"三门峡银行",CSRCB:"常熟农村商业银行",SHBANK:"上海银行",JLBANK:"吉林银行",CZRCB:"常州农村信用联社",BANKWF:"潍坊银行",ZRCBANK:"张家港农村商业银行",FJHXBC:"福建海峡银行",ZJNX:"浙江省农村信用社联合社",LZYH:"兰州银行",JSB:"晋商银行",BOHAIB:"渤海银行",CZCB:"浙江稠州商业银行",YQCCB:"阳泉银行",SJBANK:"盛京银行",XABANK:"西安银行",BSB:"包商银行",JSBANK:"江苏银行",FSCB:"抚顺银行",HNRCU:"河南省农村信用",COMM:"交通银行",XTB:"邢台银行",CITIC:"中信银行",HXBANK:"华夏银行",HNRCC:"湖南省农村信用社",DYCCB:"东营市商业银行",ORBANK:"鄂尔多斯银行",BJRCB:"北京农村商业银行",XYBANK:"信阳银行",ZGCCB:"自贡市商业银行",CDCB:"成都银行",HANABANK:"韩亚银行",CMBC:"中国民生银行",LYBANK:"洛阳银行",GDB:"广东发展银行",ZBCB:"齐商银行",CBKF:"开封市商业银行",H3CB:"内蒙古银行",CIB:"兴业银行",CRCBANK:"重庆农村商业银行",SZSBK:"石嘴山银行",DZBANK:"德州银行",SRBANK:"上饶银行",LSCCB:"乐山市商业银行",JXRCU:"江西省农村信用",ICBC:"中国工商银行",JZBANK:"晋中市商业银行",HZCCB:"湖州市商业银行",NHB:"南海农村信用联社",XXBANK:"新乡银行",JRCB:"江苏江阴农村商业银行",YNRCC:"云南省农村信用社",ABC:"中国农业银行",GXRCU:"广西省农村信用",PSBC:"中国邮政储蓄银行",BZMD:"驻马店银行",ARCU:"安徽省农村信用社",GSRCU:"甘肃省农村信用",LYCB:"辽阳市商业银行",JLRCU:"吉林农信",URMQCCB:"乌鲁木齐市商业银行",XLBANK:"中山小榄村镇银行",CSCB:"长沙银行",JHBANK:"金华银行",BHB:"河北银行",NBYZ:"鄞州银行",LSBC:"临商银行",BOCD:"承德银行",SDRCU:"山东农信",NCB:"南昌银行",TCCB:"天津银行",WJRCB:"吴江农商银行",CBBQS:"城市商业银行资金清算中心",HBRCU:"河北省农村信用社"};a.d(e,"b",(function(){return d})),a.d(e,"a",(function(){return m}));var d={computed:{pageScroll:function(){var t=this.$route.name;return n["a"].state.app.scrollTops[t]}},methods:{recordScrollPosition:function(t){this.$store.commit("SET_SCROLLTOP",{name:this.$route.name,scrollTop:t.target.scrollTop})}},activated:function(){this.$refs.scroll.scrollTop=this.pageScroll,this.$refs.scroll.addEventListener("scroll",this.recordScrollPosition)},deactivated:function(){this.$refs.scroll.removeEventListener("scroll",this.recordScrollPosition)},beforeRouteEnter:function(t,e,a){var s=n["a"].state.app.keepAliveList;n["a"].commit("SET_SCROLLNAME",t.name),-1==s.indexOf(t.name)&&s.push(t.name),n["a"].commit("SET_KEEPALIVE",s),a()},beforeRouteLeave:function(t,e,a){var s=n["a"].state.app.keepAliveList;e.meta.cacheTos&&-1==e.meta.cacheTos.indexOf(t.name)&&(s.splice(s.indexOf(e.name),1),this.$store.commit("SET_KEEPALIVE",s)),a()}},m={props:{data:{type:Object}},components:{cellImage:s["a"],accoutTag:_},mounted:function(){var t=this;Object.keys(this.formData).map((function(e){/license_accessory|photo/.test(e)||(t.formData[e]=t.data[e])})),this.formData.business_license_accessory=[this.data.business_license_accessory],this.formData.id_photos=[this.data.id_front_photo,this.data.id_reverse_photo],this.formData.bank=p[this.data.bank]}}},bc18:function(t,e,a){"use strict";var n=a("f695"),s=a.n(n);s.a},c707:function(t,e,a){"use strict";var n=a("8927"),s=a.n(n);s.a},d279:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"approvalStepsBox"},[a("ContentLoad",{attrs:{getInfo:t.getData,noListText:"暂无审批记录"}},[a("van-steps",{attrs:{direction:"vertical"}},t._l(t.steps,(function(e,n){return a("van-step",{key:n},[a("span",{staticClass:"activeIcon",attrs:{slot:"active-icon"},slot:"active-icon"}),a("span",{staticClass:"activeIcon",attrs:{slot:"inactive-icon"},slot:"inactive-icon"}),a("span",{staticClass:"stepBox"},[a("span",[t._v(t._s(e.approval_name))]),a("span",[t._v(t._s(e.create_date))])]),1==e.approval_state?a("span",[a("p",{staticClass:"statues"},[t._v(t._s(t._f("filterApprovalType")(e.approve_type)))])]):2==e.approval_state?a("span",[a("p",{staticClass:"statues"},[t._v("审批通过")])]):a("span",[a("span",{staticClass:"error"},[t._v("审批退回")]),a("p",{staticClass:"reason"},[t._v("退回理由："+t._s(e.remark))])])])})),1)],1)],1)},s=[],r=(a("a9e3"),a("d3b7"),a("71a5")),i=a("b00a"),c={props:{tag_full:[Number,String]},components:{ContentLoad:i["a"]},data:function(){return{steps:[]}},filters:{filterApprovalType:function(t){console.log(t);var e=null;switch(t){case 1:e="提交合同审批";break;case 2:e="提交合同修改审批";break;case 3:e="提交合同终止审批";break;case 4:e="提交合同更改计费方式审批";break}return e}},methods:{getData:function(){var t=this;return new Promise((function(e,a){var n={tag_full:t.tag_full};Object(r["i"])(n).then((function(a){t.steps=a.data.results,e()}))["catch"]((function(t){a()}))}))}}},o=c,l=(a("99af2"),a("2877")),u=Object(l["a"])(o,n,s,!1,null,"86191b00",null);e["a"]=u.exports},d3fe:function(t,e,a){"use strict";var n=a("7d78"),s=a.n(n);s.a},d58f:function(t,e,a){var n=a("1c0b"),s=a("7b0b"),r=a("44ad"),i=a("50c4"),c=function(t){return function(e,a,c,o){n(a);var l=s(e),u=r(l),f=i(l.length),_=t?f-1:0,p=t?-1:1;if(c<2)while(1){if(_ in u){o=u[_],_+=p;break}if(_+=p,t?_<0:f<=_)throw TypeError("Reduce of empty array with no initial value")}for(;t?_>=0:f>_;_+=p)_ in u&&(o=a(o,u[_],_,l));return o}};t.exports={left:c(!1),right:c(!0)}},d5c5:function(t,e,a){},e1d30:function(t,e,a){},e72d:function(t,e,a){},f695:function(t,e,a){},fcc7:function(t,e,a){}}]);
//# sourceMappingURL=chunk-98068e3c.17e4fe0b.js.map