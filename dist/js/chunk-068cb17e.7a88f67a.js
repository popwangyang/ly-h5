(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-068cb17e"],{"171c":function(t,e,a){"use strict";var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-cell",{attrs:{title:t.title,"is-link":""},on:{click:t.selectedBtn}},[a("span",[""!=t.selectValue?a("span",{staticStyle:{color:"#000000"}},[t._v(t._s(t.selectValue))]):a("span",[t._v(t._s(t.placeholder))])])]),a("van-popup",{staticStyle:{height:"300px"},attrs:{position:"bottom"},model:{value:t.showPicker,callback:function(e){t.showPicker=e},expression:"showPicker"}},[a("van-picker",{ref:"picker",attrs:{"show-toolbar":"","default-index":t.defaultIndex,columns:t.columns},on:{cancel:function(e){t.showPicker=!1},confirm:t.onConfirm,change:t.onChange}})],1)],1)},s=[],i={props:{title:{type:String,default:"标题"},modelvalue:{type:[String,Number],default:""},placeholder:{type:String,default:"请选择"},dataList:{type:Array,default:function(){return[]}}},model:{prop:"modelvalue",event:"returnBack"},watch:{modelvalue(t){this.dataList.forEach((t,e)=>{""!=this.modelvalue&&t.value==this.modelvalue&&(this.defaultIndex=e,this.currentIndex=e,this.selectValue=t.label)})}},data(){return{selectValue:"",columns:[],defaultIndex:0,showPicker:!1,currentIndex:0}},methods:{onConfirm(t){this.selectValue=this.dataList[this.currentIndex].label,this.$emit("returnBack",this.dataList[this.currentIndex].value),this.showPicker=!1},selectedBtn(){this.showPicker=!0,this.$nextTick(()=>{this.currentIndex=0,this.dataList.forEach((t,e)=>{""!=this.modelvalue&&t.value==this.modelvalue&&(this.currentIndex=e)}),this.$refs.picker.setIndexes([this.currentIndex])})},onChange(t){this.currentIndex=t.getIndexes()[0]},init(){let t=[];this.dataList.forEach((e,a)=>{t.push(e.label),""!=this.modelvalue&&e.value==this.modelvalue&&(this.defaultIndex=a,this.currentIndex=a,this.selectValue=e.label)}),this.columns=t}},mounted(){this.init()}},o=i,r=a("2877"),n=Object(r["a"])(o,l,s,!1,null,null,null);e["a"]=n.exports},"24d6":function(t,e,a){},"455d":function(t,e,a){"use strict";var l=a("d399"),s={isNonEmpty:function(t,e){if(""===t)return e},isNumber:function(t,e){if(!/^[+]{0,1}(\d+)$/.test(t))return e},isEmail:function(t,e){if(!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(t))return e},isPhone:function(t,e){if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(t))return e},isGateway:function(t,e){if(!/^192\.168(\.(\d|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))){2}$/.test(t))return e},isMac:function(t,e){if(!/^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/.test(t))return e}},i=function(){this.cache=[]};i.prototype.add=function(t,e,a){for(var l=0;l<e.length;l++){let i=e[l];i.required?i.validate?this.cache.push((function(){return i.validate(t,a)})):i.type?this.cache.push((function(){return s[i.type](t,i.message)})):this.cache.push((function(){return s.isNonEmpty(t,i.message)})):i.type?0==i.required?""!=t&&this.cache.push((function(){return s[i.type](t,i.message)})):this.cache.push((function(){return s[i.type](t,i.message)})):i.validate&&(0==i.required?""!=t&&this.cache.push((function(){return i.validate(t,a)})):this.cache.push((function(){return i.validate(t,a)})))}},i.prototype.start=function(){for(var t=0;t<this.cache.length;t++){let e=this.cache[t]();if(e)return console.log(e),e}};let o=function(t,e){return new Promise((a,s)=>{let o=new i;Object.keys(e).forEach(a=>{o.add(t[a],e[a],t)});let r=o.start();r?(Object(l["a"])(r),a(!1)):a(!0)})};e["a"]=o},"87d0":function(t,e,a){"use strict";e["a"]={video:[{label:"MPG",value:"4"},{label:"MP4",value:"3"},{label:"MKV",value:"5"}],tv_picture:[{label:"png",value:"0"},{label:"jpg",value:"1"},{label:"gif",value:"2"}],vod_picture:[{label:"png",value:"0"},{label:"jpg",value:"1"}],tv_resolvingPower:[{label:"1280*720",value:"1"},{label:"1920*1080",value:"3"}],vod_resolvingPower:[{label:"720P",value:"1"},{label:"1080P",value:"3"}],TV720P:[{label:"946,373",value:"0"},{label:"154,373",value:"1"},{label:"自定义",value:"2"}],TV1080P:[{label:"1418,560",value:"0"},{label:"230,560",value:"1"},{label:"自定义",value:"2"}],SH720P:[{label:"946,352",value:"0"},{label:"自定义",value:"1"}],SV720P:[{label:"421,947",value:"0"},{label:"自定义",value:"1"}],SH1080P:[{label:"1418,527",value:"0"},{label:"自定义",value:"1"}],SV1080P:[{label:"631,1420",value:"0"},{label:"自定义",value:"1"}]}},cddc:function(t,e,a){"use strict";var l=a("24d6"),s=a.n(l);s.a},d9ea:function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"formatResolutionBox"},[a("span",{staticClass:"formatResolutionBoxTitle"},[t._v(" TV端 ")]),a("cell-selected",{attrs:{title:"分辨率",dataList:t.dataList1},model:{value:t.formData.tv_resolving,callback:function(e){t.$set(t.formData,"tv_resolving",e)},expression:"formData.tv_resolving"}}),a("cell-selected",{attrs:{title:"视频格式",dataList:t.dataList2},model:{value:t.formData.tv_video,callback:function(e){t.$set(t.formData,"tv_video",e)},expression:"formData.tv_video"}}),a("cell-selected",{attrs:{title:"图片格式",dataList:t.dataList3},model:{value:t.formData.tv_picture,callback:function(e){t.$set(t.formData,"tv_picture",e)},expression:"formData.tv_picture"}}),a("span",{staticClass:"formatResolutionBoxTitle"},[t._v(" 点歌器端 ")]),a("cell-selected",{attrs:{title:"分辨率",dataList:t.dataList5},model:{value:t.formData.vod_resolving,callback:function(e){t.$set(t.formData,"vod_resolving",e)},expression:"formData.vod_resolving"}}),a("cell-selected",{attrs:{title:"视频格式",dataList:t.dataList6},model:{value:t.formData.vod_video,callback:function(e){t.$set(t.formData,"vod_video",e)},expression:"formData.vod_video"}}),a("cell-selected",{attrs:{title:"图片格式",dataList:t.dataList7},model:{value:t.formData.vod_picture,callback:function(e){t.$set(t.formData,"vod_picture",e)},expression:"formData.vod_picture"}}),a("div",{staticClass:"button"},[a("van-button",{staticClass:"buttonDefault",attrs:{size:"large"},on:{click:t.btnClick}},[t._v("保存")])],1)],1)},s=[],i=a("2f62"),o=a("171c"),r=a("87d0"),n=a("455d"),u={components:{cellSelected:o["a"]},computed:{data(){return this.$store.state.ktv.resolutionFormat}},data(){return{dataList1:r["a"].tv_resolvingPower,dataList2:r["a"].video,dataList3:r["a"].tv_picture,dataList4:r["a"].tv_picture,dataList5:r["a"].vod_resolvingPower,dataList6:r["a"].video,dataList7:r["a"].vod_picture,formData:{tv_resolving:"",tv_video:"",tv_picture:"",vod_resolving:"",vod_video:"",vod_picture:"",id:""},rules:{tv_resolving:[{required:!0,message:"TV端分辨率不能为空"}],tv_video:[{required:!0,message:"TV端视频格式不能为空"}],tv_picture:[{required:!0,message:"TV端图片格式不能为空"}],vod_resolving:[{required:!0,message:"点歌器端分辨率不能为空"}],vod_video:[{required:!0,message:"点歌器端视频格式不能为空"}],vod_picture:[{required:!0,message:"点歌器端图片格式不能为空"}]}}},methods:{...Object(i["b"])(["handlerPatchResolutionFormat","handlerAddResolutionFormat"]),btnClick(){Object(n["a"])(this.formData,this.rules).then(t=>{if(t){let t="修改",e=this.handlerPatchResolutionFormat;this.data||(this.formData.ktv=this.$store.state.ktv.ktvID,t="创建",e=this.handlerAddResolutionFormat),this.$toast.loading({duration:0,forbidClick:!0,message:`${t}中...`}),e(this.formData).then(e=>{this.$toast.success(`${t}成功`),setTimeout(()=>{this.$router.go(-1)},1e3)}).catch(e=>{console.log(e),this.$toast(`${t}失败，请稍后重试`)})}})}},mounted(){console.log(this.data),this.data&&(Object.keys(this.formData).map(t=>{this.formData[t]=this.data[t].toString()}),console.log(this.formData))}},c=u,d=(a("cddc"),a("2877")),v=Object(d["a"])(c,l,s,!1,null,"24b4bc1d",null);e["default"]=v.exports}}]);
//# sourceMappingURL=chunk-068cb17e.7a88f67a.js.map