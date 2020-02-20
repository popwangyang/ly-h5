(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2a1761d4"],{1942:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{ref:"scroll",staticClass:"contractDetail"},[e("ContentLoad",{attrs:{getInfo:t.getData}},[e("van-cell",{attrs:{title:"合同类型","value-class":"cellValue",value:t.formData.type}}),e("van-cell",{attrs:{title:"合同状态","value-class":"cellValue",value:t._f("filterState")(t.formData.state)}}),e("van-cell",{attrs:{title:"合同编号","value-class":"cellValue",value:t.formData.number}}),e("van-cell",{attrs:{title:"合同起始日期","value-class":"cellValue",value:t.formData.begin_date}}),2==t.contractStatues?e("expensesDetails",{attrs:{isPerson:t.showPersonContract,data:t.formData.expensesDetails}}):t._e(),2==t.contractStatues?e("div",{staticClass:"divider"}):t._e(),e("van-cell",{attrs:{title:"计费方式","value-class":"cellValue",value:t._f("filterBillingMethod")(t.formData.billingMethod)}}),2!=t.contractStatues?e("van-cell",{attrs:{title:"计费价格","value-class":"cellValue",value:t.formData.billingPrice}}):t._e(),2==t.contractStatues&&t.formData.scan_code_payment?e("van-cell",{attrs:{title:"扫码费用(综合技术服务费)","value-class":"cellValue",value:t._f("filterUnitB")(t.formData.scan_code_payment)}}):t._e(),2==t.contractStatues?e("van-cell",{attrs:{title:"支付方式","value-class":"cellValue",value:t._f("filterPayMethod")(t.formData.pay_method)}}):t._e(),2==t.contractStatues&&t.formData.substitute?e("van-cell",{attrs:{title:"代垫方","value-class":"cellValue",value:t.formData.substitute}}):t._e(),t.formData.latestPaymentDate?e("van-cell",{attrs:{title:"承若最晚支付时间","value-class":"cellValue",value:t.formData.latestPaymentDate}}):t._e(),t.hasChangeHistory?e("van-cell",{attrs:{title:"变更历史","is-link":""},on:{click:t.goHistory}}):t._e(),e("div",{staticClass:"divider"}),t.showPersonContract?t._e():e("div",[0!=t.contractStatues&&t.formData.billing_state_time?e("van-cell",{attrs:{title:"开始计费时间","value-class":"cellValue",value:t.formData.billing_state_time}}):t._e(),0!=t.contractStatues&&t.formData.billing_state_time_end?e("van-cell",{attrs:{title:"暂停计费时间","value-class":"cellValue",value:t.formData.billing_state_time_end}}):t._e()],1),e("div",{staticClass:"divider"}),0!=t.contractStatues?e("van-cell",{attrs:{title:"机构","value-class":"cellValue",value:t.formData.mechanism}}):t._e(),2==t.contractStatues?e("van-cell",{attrs:{title:"机构分成比例","value-class":"cellValue",value:t.formData.proportion_of_mechanism}}):t._e(),2==t.contractStatues?e("van-cell",{attrs:{title:"场所分成比例","value-class":"cellValue",value:t.formData.proportion_of_places}}):t._e(),e("div",{staticClass:"divider"}),e("cell-image",{attrs:{title:"确认函",dataList:t.formData.replies}}),e("cell-image",{attrs:{title:"合同附件",dataList:t.formData.annex}}),2!=t.contractStatues?e("div",{staticClass:"divider"}):t._e(),e("time-note",{attrs:{contractType:t.contractStatues}}),t.showPersonContract?t._e():e("div",[e("div",{staticClass:"divider"}),2!=t.contractStatues&&null!=t.formData.tag_full?e("van-cell",{attrs:{title:"审批记录","is-link":""},on:{click:t.goApprovalRecord}}):t._e(),2!=t.contractStatues&&null!=t.formData.tag_full?e("approval-steps",{attrs:{tag_full:t.formData.tag_full}}):t._e()],1)],1)],1)},n=[],r=(e("a9e3"),e("d3b7"),e("d279")),i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"expensesDetailsBox"},[e("div",{staticClass:"header"},[t._v("费用明细")]),e("div",{staticClass:"content"},[e("van-grid",{attrs:{"column-num":2}},[e("van-grid-item",{staticClass:"title"},[t._v("项目")]),e("van-grid-item",{staticClass:"title"},[t._v("费用（元/年）")]),e("van-grid-item",{staticClass:"tableItem"},[t._v("曲库内容管理、CDN内容推送、风险内容预警等服务")]),e("van-grid-item",[t._v(t._s(t.data.music_library_cdn_risk_warning_service))]),e("van-grid-item",{staticClass:"tableItem"},[t._v("扫码付费/精确计次实现服务费")]),e("van-grid-item",[t._v(t._s(t.data.scan_code_payment_accurate_counting))]),e("van-grid-item",{staticClass:"tableItem"},[t._v("机顶盒采购/升级成本")]),e("van-grid-item",[t._v(t._s(t.data.set_top_box_purchase_upgrade_cost))]),e("van-grid-item",{directives:[{name:"show",rawName:"v-show",value:!t.isPerson,expression:"!isPerson"}],staticClass:"tableItem"},[t._v("交换机(数字通讯设备)采购/升级成本")]),e("van-grid-item",{directives:[{name:"show",rawName:"v-show",value:!t.isPerson,expression:"!isPerson"}]},[t._v(t._s(t.data.switch_purchase_upgrade_cost))]),e("van-grid-item",{staticClass:"tableItem"},[t._v("其他综合技术维护费")]),e("van-grid-item",[t._v(t._s(t.data.other_comprehensive_service_payment))]),e("van-grid-item",{staticClass:"tableItem bolder"},[t._v("综合技术维护费合计")]),e("van-grid-item",{staticClass:"bolder"},[t._v(t._s(t.data.total_comprehensive_service_payment))])],1)],1)])},l=[],c={props:{data:{type:Object,required:!0},isPerson:{type:Boolean,required:!1}}},o=c,u=(e("b03d"),e("eb07"),e("2877")),_=Object(u["a"])(o,i,l,!1,null,"d4957256",null),m=_.exports,p=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"timeNoteBox"},[t.formData.create_date?e("van-cell",{attrs:{"title-class":"titleClass",title:"创建时间","value-class":"cellValue",value:t.formData.create_date}}):t._e(),t.formData.effective_time?e("van-cell",{attrs:{"title-class":"titleClass",title:"生效时间","value-class":"cellValue",value:t.formData.effective_time}}):t._e(),0!=t.contractType&&t.formData.termination_time?e("van-cell",{attrs:{"title-class":"titleClass",title:"终止时间","value-class":"cellValue",value:t.formData.termination_time}}):t._e(),t.formData.billing_state_time?e("van-cell",{attrs:{"title-class":"titleClass",title:"开始计费时间","value-class":"cellValue",value:t.formData.billing_state_time}}):t._e(),0!=t.contractType&&t.formData.billing_state_time_end?e("van-cell",{attrs:{"title-class":"titleClass",title:"暂停计费时间","value-class":"cellValue",value:t.formData.billing_state_time_end}}):t._e()],1)},d=[],v={props:{contractType:{type:Number,default:0}},computed:{formData:function(){var t=this.$store.state.ktv.contractDetail.contract,a=t.create_date,e=t.effective_time,s=t.termination_time,n=t.billing_state_time,r=t.billing_state_time_end;return{create_date:a,effective_time:e,termination_time:s,billing_state_time:n,billing_state_time_end:r}}},data:function(){return{}}},f=v,g=(e("f462"),Object(u["a"])(f,p,d,!1,null,"a4700ef2",null)),b=g.exports,h=e("b00a"),D=e("a489"),y=e("b6f9"),C=e("71a5"),x={name:"contractDetail",mixins:[y["b"]],components:{ContentLoad:h["a"],cellImage:D["a"],expensesDetails:m,approvalSteps:r["a"],timeNote:b},computed:{hasChangeHistory:function(){var t=this.$store.state.ktv.contractDetail,a=(t.change_time,t.refund_total,t.old_billing_method),e=t.old_latest_payment_date;return null!=a&&null!=e}},filters:{filterUnitB:function(t){console.log(Number(t));var a=isNaN(Number(t))?0:t;return"￥".concat(a)},filterPayMethod:function(t){var a=null;switch(t){case 1:a="甲方一次性支付";break;default:a="乙方先行垫付";break}return a},filterState:function(t){var a=null;switch(t){case 1:a="合同创建中";break;case 2:a="已生效";break;case 3:a="已过期";break;case 4:a="合同终止";break;default:a="合同创建中";break}return a},filterBillingMethod:function(t){var a=null;switch(t){case 1:a="扫码支付";break;case 2:a="精确计次";break;case 3:a="综合计费";break;default:a="扫码支付";break}return a}},mounted:function(){this.showPersonContract="true"===String(this.$route.query.showPersonContract)},data:function(){return{showPersonContract:!1,contractStatues:0,formData:{tag_full:"",contractID:"",type:"",state:"",number:"",begin_date:"",end_date:"",writeDate:"",latestPaymentDate:"",billing_state_time:"",billing_state_time_end:"",billingMethod:"",billingPrice:"",scan_code_payment:"",pay_method:"",substitute:"",mechanism:"",proportion_of_mechanism:"",proportion_of_places:"",replies:[],annex:[],expensesDetails:{music_library_cdn_risk_warning_service:"",scan_code_payment_accurate_counting:"",set_top_box_purchase_upgrade_cost:"",switch_purchase_upgrade_cost:"",other_comprehensive_service_payment:"",total_comprehensive_service_payment:""}}}},methods:{goApprovalRecord:function(){this.$router.push({name:"approvalRecord",query:{contractID:this.formData.contractID}})},goHistory:function(){this.$router.push({name:"contractChangeHistory"})},getData:function(){var t=this;return new Promise((function(a,e){Object(C["j"])(t.$route.query.contractType,t.$route.query.contractID).then((function(e){console.log(e),t.$store.commit("setContractDetail",e.data),1==e.data.contract.type&&4!=e.data.contract.state&&(t.contractStatues=0),1==e.data.contract.type&&4==e.data.contract.state&&(t.contractStatues=1),2==e.data.contract.type&&(t.contractStatues=2),t.formData.tag_full=e.data.contract.tag_full,t.formData.contractID=e.data.contract.id,t.formData.type=1==e.data.contract.type?"曲库服务协议合同":"技术综合服务协议合同",t.formData.state=e.data.contract.state,t.formData.number=e.data.contract.number,t.formData.writeDate=e.data.contract.write_date,t.formData.billingMethod=e.data.billing_method,t.formData.billingPrice=1==e.data.billing_method?"".concat(e.data.billing_price,"元/次/终端"):"".concat(e.data.billing_price,"元"),t.formData.scan_code_payment=e.data.scan_code_payment,t.formData.pay_method=e.data.contract.pay_method,t.formData.billing_state_time=e.data.contract.billing_state_time,t.formData.billing_state_time_end=e.data.contract.billing_state_time_end,t.formData.begin_date=e.data.contract.begin_date,t.formData.end_date=e.data.contract.end_date,t.formData.mechanism=e.data.mechanism_name,t.formData.substitute=e.data.substitute_name,t.formData.proportion_of_mechanism=Number(e.data.proportion_of_mechanism)+"%",t.formData.proportion_of_places=Number(e.data.proportion_of_places)+"%",t.formData.latestPaymentDate=e.data.latest_payment_date,t.formData.replies=JSON.parse(e.data.replies),t.formData.annex=JSON.parse(e.data.annex),t.formData.expensesDetails.music_library_cdn_risk_warning_service=e.data.music_library_cdn_risk_warning_service,t.formData.expensesDetails.scan_code_payment_accurate_counting=e.data.scan_code_payment_accurate_counting,t.formData.expensesDetails.set_top_box_purchase_upgrade_cost=e.data.set_top_box_purchase_upgrade_cost,t.formData.expensesDetails.switch_purchase_upgrade_cost=e.data.switch_purchase_upgrade_cost,t.formData.expensesDetails.other_comprehensive_service_payment=e.data.other_comprehensive_service_payment,t.formData.expensesDetails.total_comprehensive_service_payment=e.data.total_comprehensive_service_payment,a(e)}))["catch"]((function(t){e(t)}))}))}}},S=x,w=(e("fcf8"),Object(u["a"])(S,s,n,!1,null,"37f4821e",null));a["default"]=w.exports},"1fe8":function(t,a,e){t.exports=e.p+"img/error.9a7c2d33.png"},"3f49":function(t,a,e){},4535:function(t,a,e){},"4ab5":function(t,a,e){"use strict";var s=e("3f49"),n=e.n(s);n.a},"4c80":function(t,a,e){},"4d33":function(t,a,e){},"51cf":function(t,a,e){},"54a1":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("van-loading",{attrs:{color:t.color}})],1)},n=[],r={computed:{color:function(){return this.$store.state.app.theme.color}}},i=r,l=e("2877"),c=Object(l["a"])(i,s,n,!1,null,null,null);a["a"]=c.exports},ae20:function(t,a,e){"use strict";var s=e("51cf"),n=e.n(s);n.a},ae9f:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"emptyComponentBox"},[e("img",{attrs:{src:t.imgsrc,alt:""}}),e("span",{staticStyle:{display:"flex","margin-top":"10px"}},[e("span",{staticStyle:{color:"#d0d0d0","font-size":"14px"}},[t._v(" "+t._s(t.text)+" ")]),e("span",{staticClass:"errorTheme",on:{click:t.btn}},[t._v("重新加载")])])])},n=[],r={props:{text:{type:String,default:"加载失败"}},data:function(){return{imgsrc:e("1fe8")}},methods:{btn:function(){this.$emit("eventBtn")}}},i=r,l=(e("ae20"),e("2877")),c=Object(l["a"])(i,s,n,!1,null,"d0775eaa",null);a["a"]=c.exports},b00a:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"contentLoad"},[e("span",{directives:[{name:"show",rawName:"v-show",value:0==t.pageStatues,expression:"pageStatues == 0"}],staticClass:"content"},[e("Loading")],1),1==t.pageStatues?e("span",[t._t("default")],2):t._e(),2==t.pageStatues?e("span",{staticClass:"content"},[t.$slots.empty?t._t("empty"):e("Empty",{attrs:{text:t.emptyText}})],2):t._e(),3==t.pageStatues?e("span",{staticClass:"content"},[t.$slots.error?t._t("error"):e("Error",{attrs:{text:"加载失败"},on:{eventBtn:t.getData}})],2):t._e()])},n=[],r=e("54a1"),i=e("ae9f"),l=e("885b"),c={components:{Loading:r["a"],Empty:l["a"],Error:i["a"]},props:{getInfo:{type:Function},emptyText:{type:String,default:"暂无信息"}},data:function(){return{pageStatues:0}},methods:{getData:function(){var t=this;this.pageStatues=0,this.getInfo().then((function(a){t.pageStatues=""!=a?1:2}))["catch"]((function(a){console.log(a,"ppppp"),t.pageStatues=3}))}},mounted:function(){this.getData()}},o=c,u=(e("4ab5"),e("2877")),_=Object(u["a"])(o,s,n,!1,null,"01a8e204",null);a["a"]=_.exports},b03d:function(t,a,e){"use strict";var s=e("d5c5"),n=e.n(s);n.a},be24:function(t,a,e){"use strict";var s=e("4c80"),n=e.n(s);n.a},d279:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"approvalStepsBox"},[e("ContentLoad",{attrs:{getInfo:t.getData,noListText:"暂无审批记录"}},[e("van-steps",{attrs:{direction:"vertical"}},t._l(t.steps,(function(a,s){return e("van-step",{key:s},[e("span",{staticClass:"activeIcon",attrs:{slot:"active-icon"},slot:"active-icon"}),e("span",{staticClass:"activeIcon",attrs:{slot:"inactive-icon"},slot:"inactive-icon"}),e("span",{staticClass:"stepBox"},[e("span",[t._v(t._s(a.approval_name))]),e("span",[t._v(t._s(a.create_date))])]),1==a.approval_state?e("span",[e("p",{staticClass:"statues"},[t._v(t._s(t._f("filterApprovalType")(a.approve_type)))])]):2==a.approval_state?e("span",[e("p",{staticClass:"statues"},[t._v("审批通过")])]):e("span",[e("span",{staticClass:"error"},[t._v("审批退回")]),e("p",{staticClass:"reason"},[t._v("退回理由："+t._s(a.remark))])])])})),1)],1)],1)},n=[],r=(e("a9e3"),e("d3b7"),e("71a5")),i=e("b00a"),l={props:{tag_full:[Number,String]},components:{ContentLoad:i["a"]},data:function(){return{steps:[]}},filters:{filterApprovalType:function(t){console.log(t);var a=null;switch(t){case 1:a="提交合同审批";break;case 2:a="提交合同修改审批";break;case 3:a="提交合同终止审批";break;case 4:a="提交合同更改计费方式审批";break}return a}},methods:{getData:function(){var t=this;return new Promise((function(a,e){var s={tag_full:t.tag_full};Object(r["i"])(s).then((function(e){t.steps=e.data.results,a()}))["catch"]((function(t){e()}))}))}}},c=l,o=(e("be24"),e("2877")),u=Object(o["a"])(c,s,n,!1,null,"fe64cb74",null);a["a"]=u.exports},d5c5:function(t,a,e){},eb07:function(t,a,e){"use strict";var s=e("f41e"),n=e.n(s);n.a},f41e:function(t,a,e){},f462:function(t,a,e){"use strict";var s=e("4535"),n=e.n(s);n.a},fcf8:function(t,a,e){"use strict";var s=e("4d33"),n=e.n(s);n.a}}]);
//# sourceMappingURL=chunk-2a1761d4.3a5e0e89.js.map