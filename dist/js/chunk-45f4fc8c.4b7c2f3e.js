(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45f4fc8c"],{"171c":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("van-cell",{attrs:{title:t.title,"is-link":""},on:{click:t.selectedBtn}},[i("span",[""!=t.selectValue?i("span",{staticStyle:{color:"#000000"}},[t._v(t._s(t.selectValue))]):i("span",[t._v(t._s(t.placeholder))])])]),i("van-popup",{staticStyle:{height:"300px"},attrs:{position:"bottom"},model:{value:t.showPicker,callback:function(e){t.showPicker=e},expression:"showPicker"}},[i("van-picker",{ref:"picker",attrs:{"show-toolbar":"","default-index":t.defaultIndex,columns:t.columns},on:{cancel:function(e){t.showPicker=!1},confirm:t.onConfirm,change:t.onChange}})],1)],1)},l=[],s={props:{title:{type:String,default:"标题"},modelvalue:{type:[String,Number],default:""},placeholder:{type:String,default:"请选择"},dataList:{type:Array,default:function(){return[]}}},model:{prop:"modelvalue",event:"returnBack"},watch:{modelvalue(t){this.dataList.forEach((t,e)=>{""!=this.modelvalue&&t.value==this.modelvalue&&(this.defaultIndex=e,this.currentIndex=e,this.selectValue=t.label)})}},data(){return{selectValue:"",columns:[],defaultIndex:0,showPicker:!1,currentIndex:0}},methods:{onConfirm(t){this.selectValue=this.dataList[this.currentIndex].label,this.$emit("returnBack",this.dataList[this.currentIndex].value),this.showPicker=!1},selectedBtn(){this.showPicker=!0,this.$nextTick(()=>{this.currentIndex=0,this.dataList.forEach((t,e)=>{""!=this.modelvalue&&t.value==this.modelvalue&&(this.currentIndex=e)}),this.$refs.picker.setIndexes([this.currentIndex])})},onChange(t){this.currentIndex=t.getIndexes()[0]},init(){let t=[];this.dataList.forEach((e,i)=>{t.push(e.label),""!=this.modelvalue&&e.value==this.modelvalue&&(this.defaultIndex=i,this.currentIndex=i,this.selectValue=e.label)}),this.columns=t}},mounted(){this.init()}},o=s,n=i("2877"),u=Object(n["a"])(o,a,l,!1,null,null,null);e["a"]=u.exports},"1e23":function(t,e,i){},2206:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("van-field",{ref:"input",attrs:{clearable:t.clearable,type:t.type,rows:t.rows,maxlength:t.maxlength,"input-align":t.inputAlign,"show-word-limit":t.showWordLimit,placeholder:t.placeholder},on:{input:t.onInput,click:t.onClick},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},[i("span",{attrs:{slot:"label"},slot:"label"},[i("span",[t._v(t._s(t.title))]),t.required?t._e():i("span",{staticStyle:{color:"gray","margin-left":"4px"}},[t._v("(选填)")])])])},l=[],s={props:{maxlength:{type:Number,default:99999},title:{type:String,default:"标题"},rows:{type:Number,default:1},inputAlign:{type:String,default:"right"},type:{type:String,default:"text"},required:{type:Boolean,default:!0},placeholder:{type:String,default:"请输入"},modelValue:{type:[String,Number]},showWordLimit:{type:Boolean,default:!1},clearable:{type:Boolean,default:!0}},model:{prop:"modelValue",event:"returnBack"},data(){return{value:""}},watch:{modelValue(t){this.value||(this.value=t)}},methods:{onInput(t){this.$emit("returnBack",t)},onClick(){this.value.length>0&&this.$refs.input.$refs.input.setSelectionRange(this.value.length,this.value.length)}},mounted(){this.value=null==this.modelValue?"":this.modelValue}},o=s,n=(i("5f569"),i("2877")),u=Object(n["a"])(o,a,l,!1,null,null,null);e["a"]=u.exports},"455d":function(t,e,i){"use strict";var a=i("d399"),l={isNonEmpty:function(t,e){if(""===t)return e},isNumber:function(t,e){if(!/^[+]{0,1}(\d+)$/.test(t))return e},isEmail:function(t,e){if(!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(t))return e},isPhone:function(t,e){if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(t))return e},isGateway:function(t,e){if(!/^192\.168(\.(\d|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))){2}$/.test(t))return e},isMac:function(t,e){if(!/^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/.test(t))return e}},s=function(){this.cache=[]};s.prototype.add=function(t,e,i){for(var a=0;a<e.length;a++){let s=e[a];s.required?s.validate?this.cache.push((function(){return s.validate(t,i)})):s.type?this.cache.push((function(){return l[s.type](t,s.message)})):this.cache.push((function(){return l.isNonEmpty(t,s.message)})):s.type?0==s.required?""!=t&&this.cache.push((function(){return l[s.type](t,s.message)})):this.cache.push((function(){return l[s.type](t,s.message)})):s.validate&&(0==s.required?""!=t&&this.cache.push((function(){return s.validate(t,i)})):this.cache.push((function(){return s.validate(t,i)})))}},s.prototype.start=function(){for(var t=0;t<this.cache.length;t++){let e=this.cache[t]();if(e)return console.log(e),e}};let o=function(t,e){return new Promise((i,l)=>{let o=new s;Object.keys(e).forEach(i=>{o.add(t[i],e[i],t)});let n=o.start();n?(Object(a["a"])(n),i(!1)):i(!0)})};e["a"]=o},5821:function(t,e,i){"use strict";var a=i("1e23"),l=i.n(a);l.a},"5f569":function(t,e,i){"use strict";var a=i("a4d7"),l=i.n(a);l.a},"87d0":function(t,e,i){"use strict";e["a"]={video:[{label:"MPG",value:"4"},{label:"MP4",value:"3"},{label:"MKV",value:"5"}],tv_picture:[{label:"png",value:"0"},{label:"jpg",value:"1"},{label:"gif",value:"2"}],vod_picture:[{label:"png",value:"0"},{label:"jpg",value:"1"}],tv_resolvingPower:[{label:"1280*720",value:"1"},{label:"1920*1080",value:"3"}],vod_resolvingPower:[{label:"720P",value:"1"},{label:"1080P",value:"3"}],TV720P:[{label:"946,373",value:"0"},{label:"154,373",value:"1"},{label:"自定义",value:"2"}],TV1080P:[{label:"1418,560",value:"0"},{label:"230,560",value:"1"},{label:"自定义",value:"2"}],SH720P:[{label:"946,352",value:"0"},{label:"自定义",value:"1"}],SV720P:[{label:"421,947",value:"0"},{label:"自定义",value:"1"}],SH1080P:[{label:"1418,527",value:"0"},{label:"自定义",value:"1"}],SV1080P:[{label:"631,1420",value:"0"},{label:"自定义",value:"1"}]}},a4d7:function(t,e,i){},cf88:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"QRCodeBox"},[i("cell-selected",{attrs:{title:"TV投射位置",dataList:t.dataList1},model:{value:t.formData.value1.value,callback:function(e){t.$set(t.formData.value1,"value",e)},expression:"formData.value1.value"}}),i("span",{staticClass:"spanBox transition",class:{spanBox1:"2"==t.formData.value1.value}},[i("cell-input",{attrs:{title:"屏幕X值",type:"number"},model:{value:t.formData.value1.position.positionX,callback:function(e){t.$set(t.formData.value1.position,"positionX",e)},expression:"formData.value1.position.positionX"}}),i("cell-input",{attrs:{title:"屏幕Y值",type:"number"},model:{value:t.formData.value1.position.positionY,callback:function(e){t.$set(t.formData.value1.position,"positionY",e)},expression:"formData.value1.position.positionY"}})],1),i("div",{staticClass:"divider"}),i("cell-selected",{attrs:{title:"点歌器投射位置(横屏)",dataList:t.dataList2},model:{value:t.formData.value2.value,callback:function(e){t.$set(t.formData.value2,"value",e)},expression:"formData.value2.value"}}),i("span",{staticClass:"spanBox transition",class:{spanBox1:"1"==t.formData.value2.value}},[i("cell-input",{attrs:{title:"屏幕X值",type:"number"},model:{value:t.formData.value2.position.positionX,callback:function(e){t.$set(t.formData.value2.position,"positionX",e)},expression:"formData.value2.position.positionX"}}),i("cell-input",{attrs:{title:"屏幕Y值",type:"number"},model:{value:t.formData.value2.position.positionY,callback:function(e){t.$set(t.formData.value2.position,"positionY",e)},expression:"formData.value2.position.positionY"}})],1),i("div",{staticClass:"divider"}),i("cell-selected",{attrs:{title:"点歌器投射位置(竖屏)",dataList:t.dataList3},model:{value:t.formData.value3.value,callback:function(e){t.$set(t.formData.value3,"value",e)},expression:"formData.value3.value"}}),i("span",{staticClass:"spanBox transition",class:{spanBox1:"1"==t.formData.value3.value}},[i("cell-input",{attrs:{title:"屏幕X值",type:"number"},model:{value:t.formData.value3.position.positionX,callback:function(e){t.$set(t.formData.value3.position,"positionX",e)},expression:"formData.value3.position.positionX"}}),i("cell-input",{attrs:{title:"屏幕Y值",type:"number"},model:{value:t.formData.value3.position.positionY,callback:function(e){t.$set(t.formData.value3.position,"positionY",e)},expression:"formData.value3.position.positionY"}})],1),i("div",{staticClass:"button"},[i("van-button",{staticClass:"buttonDefault",attrs:{size:"large"},on:{click:t.btnClick}},[t._v("保存")])],1)],1)},l=[],s=i("2f62"),o=i("87d0"),n=i("171c"),u=i("2206"),r=i("455d"),c=i("c276"),p={components:{cellSelected:n["a"],cellInput:u["a"]},data(){const t=(t,e)=>{if(""==t.value)return"TV投射位置不能为空";if("2"==t.value){if(""==t.position.positionX||""==t.position.positionY)return"TV投射位置坐标不完善";if(t.position.positionX<0||t.position.positionX>this.TVWidth)return`TV投射位置X坐标的范围为0~${this.TVWidth}`;if(t.position.positionY<0||t.position.positionY>this.TVHeight)return`TV投射位置Y坐标的范围为0~${this.TVHeight}`}},e=(t,e)=>{if(""==t.value)return"点歌器投射位置(横屏)不能为空";if("1"==t.value){if(""==t.position.positionX||""==t.position.positionY)return"点歌器投射位置(横屏)坐标不完善";if(t.position.positionX<0||t.position.positionX>this.VODWidth)return`点歌器投射位置(横屏)X坐标的范围为0~${this.VODWidth}`;if(t.position.positionY<0||t.position.positionY>this.VODHeight)return`点歌器投射位置(横屏)Y坐标的范围为0~${this.VODHeight}`}},i=(t,e)=>{if(""==t.value)return"点歌器投射位置(竖屏)不能为空";if("1"==t.value){if(""==t.position.positionX||""==t.position.positionY)return"点歌器投射位置(竖屏)坐标不完善";if(t.position.positionX<0||t.position.positionX>this.VODHeight)return`点歌器投射位置(竖屏)X坐标的范围为0~${this.VODHeight}`;if(t.position.positionY<0||t.position.positionY>this.VODWidth)return`点歌器投射位置(竖屏)Y坐标的范围为0~${this.VODWidth}`}};return{VODfbl:this.$store.state.ktv.QRCode.vod_resolution,TVfbl:this.$store.state.ktv.QRCode.tv_resolution,formData:{value1:{value:"0",position:{positionX:"",positionY:""}},value2:{value:"0",position:{positionX:"",positionY:""}},value3:{value:"0",position:{positionX:"",positionY:""}}},rules:{value1:[{required:!0,validate:t}],value2:[{required:!0,validate:e}],value3:[{required:!0,validate:i}]}}},computed:{TVWidth(){return"1"==this.TVfbl?1280:"3"==this.TVfbl?1920:0},TVHeight(){return"1"==this.TVfbl?720:"3"==this.TVfbl?1080:0},VODWidth(){return"1"==this.VODfbl?1280:"3"==this.VODfbl?1920:0},VODHeight(){return"1"==this.VODfbl?720:"3"==this.VODfbl?1080:0},dataList1(){return"1"==this.TVfbl?o["a"].TV720P:"3"==this.TVfbl?o["a"].TV1080P:[]},dataList2(){return"1"==this.VODfbl?o["a"].SH720P:"3"==this.VODfbl?o["a"].SH1080P:[]},dataList3(){return"1"==this.VODfbl?o["a"].SV720P:"3"==this.VODfbl?o["a"].SV1080P:[]}},methods:{...Object(s["b"])(["handlerSetQRCode"]),setPosition(t,e,i){t.value=Object(c["g"])(e,i),t.value==i[i.length-1].value&&(t.position={positionX:e.x.toString(),positionY:e.y.toString()}),console.log(t)},btnClick(){Object(r["a"])(this.formData,this.rules).then(t=>{if(t){let t={ktv_id:this.$store.state.ktv.ktvID,tv:[Object(c["k"])(this.formData.value1,this.dataList1,{type:1,width:this.TVWidth})],vod:[Object(c["k"])(this.formData.value2,this.dataList2,{type:2,width:"横"}),Object(c["k"])(this.formData.value3,this.dataList3,{type:2,width:"竖"})]};this.$toast.loading({duration:0,forbidClick:!0,message:"修改中..."}),this.handlerSetQRCode(t).then(t=>{this.$toast.success("修改成功"),setTimeout(()=>{this.$router.go(-1)},1e3)}).catch(t=>{this.$toast("修改失败，请稍后重试")}),console.log(t)}})}},mounted(){if(this.$store.state.ktv.QRCode.qr_tv&&1==this.$store.state.ktv.QRCode.qr_tv.length){let t=this.$store.state.ktv.QRCode,e=[t.qr_tv[0],...t.qr_vod];console.log(e),Object.keys(this.formData).map((t,i)=>{let a;a=0==i?this.dataList1:1==i?this.dataList2:this.dataList3,this.setPosition(this.formData[t],e[i],a)})}}},h=p,d=(i("5821"),i("2877")),v=Object(d["a"])(h,a,l,!1,null,"034acb25",null);e["default"]=v.exports}}]);
//# sourceMappingURL=chunk-45f4fc8c.4b7c2f3e.js.map