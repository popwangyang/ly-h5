(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8abba07e"],{1427:function(t,e,a){t.exports=a.p+"img/empty.d72b6a74.png"},"171c":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-cell",{attrs:{title:t.title,"is-link":""},on:{click:t.selectedBtn}},[a("span",[""!=t.selectValue?a("span",{staticStyle:{color:"#000000"}},[t._v(t._s(t.selectValue))]):a("span",[t._v(t._s(t.placeholder))])])]),a("van-popup",{staticStyle:{height:"300px"},attrs:{position:"bottom"},model:{value:t.showPicker,callback:function(e){t.showPicker=e},expression:"showPicker"}},[a("van-picker",{ref:"picker",attrs:{"show-toolbar":"","default-index":t.defaultIndex,columns:t.columns},on:{cancel:function(e){t.showPicker=!1},confirm:t.onConfirm,change:t.onChange}})],1)],1)},n=[],i={props:{title:{type:String,default:"标题"},modelvalue:{type:[String,Number],default:""},placeholder:{type:String,default:"请选择"},dataList:{type:Array,default:function(){return[]}}},model:{prop:"modelvalue",event:"returnBack"},watch:{modelvalue(t){this.dataList.forEach((t,e)=>{""!=this.modelvalue&&t.value==this.modelvalue&&(this.defaultIndex=e,this.currentIndex=e,this.selectValue=t.label)})}},data(){return{selectValue:"",columns:[],defaultIndex:0,showPicker:!1,currentIndex:0}},methods:{onConfirm(t){this.selectValue=this.dataList[this.currentIndex].label,this.$emit("returnBack",this.dataList[this.currentIndex].value),this.showPicker=!1},selectedBtn(){this.showPicker=!0,this.$nextTick(()=>{this.currentIndex=0,this.dataList.forEach((t,e)=>{""!=this.modelvalue&&t.value==this.modelvalue&&(this.currentIndex=e)}),this.$refs.picker.setIndexes([this.currentIndex])})},onChange(t){this.currentIndex=t.getIndexes()[0]},init(){let t=[];this.dataList.forEach((e,a)=>{t.push(e.label),""!=this.modelvalue&&e.value==this.modelvalue&&(this.defaultIndex=a,this.currentIndex=a,this.selectValue=e.label)}),this.columns=t}},mounted(){this.init()}},r=i,o=a("2877"),l=Object(o["a"])(r,s,n,!1,null,null,null);e["a"]=l.exports},"1fe8":function(t,e,a){t.exports=a.p+"img/error.9a7c2d33.png"},2206:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("van-field",{ref:"input",attrs:{clearable:t.clearable,type:t.type,rows:t.rows,maxlength:t.maxlength,"input-align":t.inputAlign,"show-word-limit":t.showWordLimit,placeholder:t.placeholder},on:{input:t.onInput,click:t.onClick},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},[a("span",{attrs:{slot:"label"},slot:"label"},[a("span",[t._v(t._s(t.title))]),t.required?t._e():a("span",{staticStyle:{color:"gray","margin-left":"4px"}},[t._v("(选填)")])])])},n=[],i={props:{maxlength:{type:Number,default:99999},title:{type:String,default:"标题"},rows:{type:Number,default:1},inputAlign:{type:String,default:"right"},type:{type:String,default:"text"},required:{type:Boolean,default:!0},placeholder:{type:String,default:"请输入"},modelValue:{type:[String,Number]},showWordLimit:{type:Boolean,default:!1},clearable:{type:Boolean,default:!0}},model:{prop:"modelValue",event:"returnBack"},data(){return{value:""}},watch:{modelValue(t){this.value||(this.value=t)}},methods:{onInput(t){this.$emit("returnBack",t)},onClick(){this.value.length>0&&this.$refs.input.$refs.input.setSelectionRange(this.value.length,this.value.length)}},mounted(){this.value=null==this.modelValue?"":this.modelValue}},r=i,o=(a("5f569"),a("2877")),l=Object(o["a"])(r,s,n,!1,null,null,null);e["a"]=l.exports},"3f49":function(t,e,a){},"455d":function(t,e,a){"use strict";var s=a("d399"),n={isNonEmpty:function(t,e){if(""===t)return e},isNumber:function(t,e){if(!/^[+]{0,1}(\d+)$/.test(t))return e},isEmail:function(t,e){if(!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(t))return e},isPhone:function(t,e){if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(t))return e},isGateway:function(t,e){if(!/^192\.168(\.(\d|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))){2}$/.test(t))return e},isMac:function(t,e){if(!/^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/.test(t))return e}},i=function(){this.cache=[]};i.prototype.add=function(t,e,a){for(var s=0;s<e.length;s++){let i=e[s];i.required?i.validate?this.cache.push((function(){return i.validate(t,a)})):i.type?this.cache.push((function(){return n[i.type](t,i.message)})):this.cache.push((function(){return n.isNonEmpty(t,i.message)})):i.type?0==i.required?""!=t&&null!=t&&this.cache.push((function(){return n[i.type](t,i.message)})):this.cache.push((function(){return n[i.type](t,i.message)})):i.validate&&(0==i.required?""!=t&&this.cache.push((function(){return i.validate(t,a)})):this.cache.push((function(){return i.validate(t,a)})))}},i.prototype.start=function(){for(var t=0;t<this.cache.length;t++){let e=this.cache[t]();if(e)return console.log(e),e}};let r=function(t,e){return new Promise((a,n)=>{let r=new i;Object.keys(e).forEach(a=>{r.add(t[a],e[a],t)});let o=r.start();o?(Object(s["a"])(o),a(!1)):a(!0)})};e["a"]=r},"4ab5":function(t,e,a){"use strict";var s=a("3f49"),n=a.n(s);n.a},"4dfb":function(t,e,a){},"51cf":function(t,e,a){},"54a1":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-loading",{attrs:{color:t.color}})],1)},n=[],i={computed:{color(){return this.$store.state.app.theme.color}}},r=i,o=a("2877"),l=Object(o["a"])(r,s,n,!1,null,null,null);e["a"]=l.exports},"5f569":function(t,e,a){"use strict";var s=a("a4d7"),n=a.n(s);n.a},"885b":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"emptyComponentBox"},[a("img",{attrs:{src:t.imgsrc,alt:""}}),a("span",{staticStyle:{color:"#d0d0d0","font-size":"14px","margin-top":"10px",display:"block","margin-bottom":"20px"}},[t._v(" "+t._s(t.text)+" ")]),t.title&&""!=t.title?a("van-button",{staticClass:"buttonSquare",on:{click:t.btn}},[t._v(t._s(t.title))]):t._e()],1)},n=[],i={props:["text","title"],data(){return{imgsrc:a("1427")}},methods:{btn(){this.$emit("eventBtn")}}},r=i,o=(a("9399"),a("2877")),l=Object(o["a"])(r,s,n,!1,null,"daafecf6",null);e["a"]=l.exports},9399:function(t,e,a){"use strict";var s=a("b21f"),n=a.n(s);n.a},a4d7:function(t,e,a){},ae20:function(t,e,a){"use strict";var s=a("51cf"),n=a.n(s);n.a},ae9f:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"emptyComponentBox"},[a("img",{attrs:{src:t.imgsrc,alt:""}}),a("span",{staticStyle:{display:"flex","margin-top":"10px"}},[a("span",{staticStyle:{color:"#d0d0d0","font-size":"14px"}},[t._v(" "+t._s(t.text)+" ")]),a("span",{staticClass:"errorTheme",on:{click:t.btn}},[t._v("重新加载")])])])},n=[],i={props:{text:{type:String,default:"加载失败"}},data(){return{imgsrc:a("1fe8")}},methods:{btn(){this.$emit("eventBtn")}}},r=i,o=(a("ae20"),a("2877")),l=Object(o["a"])(r,s,n,!1,null,"d0775eaa",null);e["a"]=l.exports},b00a:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentLoad"},[a("span",{directives:[{name:"show",rawName:"v-show",value:0==t.pageStatues,expression:"pageStatues == 0"}],staticClass:"content"},[a("Loading")],1),1==t.pageStatues?a("span",[t._t("default")],2):t._e(),2==t.pageStatues?a("span",{staticClass:"content"},[t.$slots.empty?t._t("empty"):a("Empty",{attrs:{text:t.emptyText}})],2):t._e(),3==t.pageStatues?a("span",{staticClass:"content"},[t.$slots.error?t._t("error"):a("Error",{attrs:{text:"加载失败"},on:{eventBtn:t.getData}})],2):t._e()])},n=[],i=a("54a1"),r=a("ae9f"),o=a("885b"),l={components:{Loading:i["a"],Empty:o["a"],Error:r["a"]},props:{getInfo:{type:Function},emptyText:{type:String,default:"暂无信息"}},data(){return{pageStatues:0}},methods:{getData(){this.pageStatues=0,this.getInfo().then(t=>{this.pageStatues=""!=t?1:2}).catch(t=>{console.log(t,"ppppp"),this.pageStatues=3})}},mounted(){this.getData()}},c=l,u=(a("4ab5"),a("2877")),d=Object(u["a"])(c,s,n,!1,null,"01a8e204",null);e["a"]=d.exports},b21f:function(t,e,a){},ec5e:function(t,e,a){"use strict";var s=a("4dfb"),n=a.n(s);n.a},fa9f:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"implementationInputBox"},[a("ContentLoad",{attrs:{getInfo:t.getData}},[a("cell-selected",{attrs:{title:"实施方式",dataList:t.methodList},model:{value:t.formData.mode,callback:function(e){t.$set(t.formData,"mode",e)},expression:"formData.mode"}}),a("cell-selected",{attrs:{title:"VOD品牌",dataList:t.vodBandsList},model:{value:t.formData.vod,callback:function(e){t.$set(t.formData,"vod",e)},expression:"formData.vod"}}),a("cell-input",{attrs:{title:"实际包厢数"},model:{value:t.formData.box,callback:function(e){t.$set(t.formData,"box",e)},expression:"formData.box"}}),a("cell-input",{attrs:{title:"软件系统版本号",maxlength:50},model:{value:t.formData.version,callback:function(e){t.$set(t.formData,"version",e)},expression:"formData.version"}}),a("cell-input",{attrs:{title:"VOD场所ID"},model:{value:t.formData.vod_ktv_id,callback:function(e){t.$set(t.formData,"vod_ktv_id",e)},expression:"formData.vod_ktv_id"}}),a("van-cell",{attrs:{title:"是否使用版权盒"}},[a("span",{staticClass:"bqBox"},[a("span",{class:{bqText:t.formData.is_use}},[t._v(t._s(t.banQuanBoxText))]),a("span",[a("van-switch",{attrs:{size:"24px"},model:{value:t.formData.is_use,callback:function(e){t.$set(t.formData,"is_use",e)},expression:"formData.is_use"}})],1)])]),a("cell-input",{attrs:{title:"网关",required:!1,maxlength:50},model:{value:t.formData.gateway,callback:function(e){t.$set(t.formData,"gateway",e)},expression:"formData.gateway"}}),a("cell-input",{attrs:{title:"服务器",required:!1,maxlength:50},model:{value:t.formData.server,callback:function(e){t.$set(t.formData,"server",e)},expression:"formData.server"}}),a("div",{staticClass:"divider"}),a("cell-selected",{attrs:{title:"通讯模式",dataList:t.dataList2},model:{value:t.formData.communication_mode,callback:function(e){t.$set(t.formData,"communication_mode",e)},expression:"formData.communication_mode"}}),a("span",{directives:[{name:"show",rawName:"v-show",value:2==t.formData.communication_mode,expression:"formData.communication_mode == 2"}]},[a("cell-input",{attrs:{title:"VOD Sever地址",required:!1,maxlength:100,placeholder:"请输入"},model:{value:t.formData.vod_server,callback:function(e){t.$set(t.formData,"vod_server",e)},expression:"formData.vod_server"}}),a("cell-input",{attrs:{title:"AD MAC地址",required:!1,maxlength:50},model:{value:t.formData.ad_mac,callback:function(e){t.$set(t.formData,"ad_mac",e)},expression:"formData.ad_mac"}})],1),a("cell-input",{attrs:{rows:3,title:"备注",placeholder:"请输入",type:"textarea",inputAlign:"left",clearable:!1,showWordLimit:!0,maxlength:500,required:!1},model:{value:t.formData.remarks,callback:function(e){t.$set(t.formData,"remarks",e)},expression:"formData.remarks"}}),a("div",{staticClass:"button"},[a("van-button",{staticClass:"buttonDefault",attrs:{size:"large"},on:{click:t.btnClick}},[t._v(t._s(t.btnText))])],1)],1)],1)},n=[],i=a("b00a"),r=a("2206"),o=a("171c"),l=a("455d"),c=a("71a5"),u={components:{cellInput:r["a"],cellSelected:o["a"],ContentLoad:i["a"]},data(){const t=t=>{let e=/^(500|[1-4]{0,1}\d{0,1}\d)$/;return""===t?"包厢数不能为空":e.test(t)?void 0:"包厢数请输入0~500的正整数"};return{checked:!1,formData:{ktv:this.$store.state.ktv.ktvID,mode:"",vod:"",box:"",version:"",vod_ktv_id:"",gateway:"",server:"",is_use:!1,communication_mode:this.$route.query.isEdited?2:"",vod_server:"http://",ad_mac:"",remarks:"",id:""},implementationID:"",methodList:[{label:"软件升级",value:"1"},{label:"硬件更换",value:"2"}],dataList1:[{label:"是",value:"1"},{label:"否",value:"2"}],dataList2:[{label:"VOD直连娱网云端",value:"1"},{label:"VOD连接娱网AD",value:"2"}],rules:{mode:[{required:!0,message:"实施方式不能为空"}],vod:[{required:!0,message:"VOD品牌不能为空"}],box:[{required:!0,validate:t}],version:[{required:!0,message:"软件系统版本号不能为空"}],vod_ktv_id:[{required:!0,message:"VOD场所ID不能为空"}],gateway:[{required:!1,type:"isGateway",message:"网关格式不正确"}],ad_mac:[{required:!1,type:"isMac",message:"Mac地址格式不正确"}],communication_mode:[{required:!0,message:"通讯模式不能为空"}]}}},watch:{"formData.communication_mode":{handler(t,e){console.log(t,e),2==t&&(this.formData.vod_server="http://",this.formData.ad_mac="")},immediate:!1}},computed:{banQuanBoxText(){return this.formData.is_use?"使用":"不使用"},isEdited(){return!!this.$route.query.isEdited},vodBandsList(){let t=this.$store.state.ktv.vodBandsList;return t.reduce((t,e)=>{let a={value:e.id,label:e.brand};return t.push(a),t},[])},btnText(){return this.isEdited?"编辑":"确认实施"}},methods:{btnClick(){Object(l["a"])(this.formData,this.rules).then(t=>{if(t){let t={};Object.keys(this.formData).map(e=>{t[e]=this.formData[e]}),t.is_use=t.is_use?1:2,1==t.communication_mode&&(t.vod_server="http://",t.ad_mac=""),this.isEdited?(this.$toast.loading({duration:0,forbidClick:!0,message:"修改中..."}),Object(c["e"])(t,this.formData.id).then(t=>{this.$toast.success("修改成功"),setTimeout(()=>{this.$router.go(-1)},1e3)}).catch(t=>{let e="修改失败，请稍后重试";400==t.status&&(e=t.data.non_field_errors[0]),this.$toast(e)})):this.$dialog.confirm({title:"提示",message:"是否已确认实施，请确认信息无误在提交"}).then(()=>{this.$toast.loading({duration:0,forbidClick:!0,message:"创建中..."}),Object(c["a"])(t).then(t=>{this.$toast.success("创建成功"),setTimeout(()=>{this.$router.go(-1)},1e3)}).catch(t=>{console.log(t);let e="创建失败，请稍后重试";400==t.status&&(e=t.data.non_field_errors[0]),this.$toast(e)})}).catch(()=>{})}})},getData(){let t={ktv:this.$store.state.ktv.ktvID},e=["ktv"];return new Promise((a,s)=>{Object(c["m"])(t).then(t=>{if(t.data.results.length>0){let a=t.data.results[0];Object.keys(this.formData).map(t=>{"无"!=a[t]&&-1==e.indexOf(t)&&(this.formData[t]=a[t])}),this.formData.is_use=1==this.formData.is_use}a({})}).catch(t=>{s()})})}},mounted(){}},d=u,m=(a("ec5e"),a("2877")),f=Object(m["a"])(d,s,n,!1,null,"5e209d61",null);e["default"]=f.exports}}]);
//# sourceMappingURL=chunk-8abba07e.f5e8f1e8.js.map