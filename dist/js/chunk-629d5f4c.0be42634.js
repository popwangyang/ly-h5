(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-629d5f4c"],{"455d":function(t,e,a){"use strict";var s=a("d399"),i={isNonEmpty:function(t,e){if(""===t)return e},isNumber:function(t,e){if(!/^[+]{0,1}(\d+)$/.test(t))return e},isEmail:function(t,e){if(!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(t))return e},isPhone:function(t,e){if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(t))return e},isGateway:function(t,e){if(!/^192\.168(\.(\d|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))){2}$/.test(t))return e},isMac:function(t,e){if(!/^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/.test(t))return e}},o=function(){this.cache=[]};o.prototype.add=function(t,e,a){for(var s=0;s<e.length;s++){let o=e[s];o.required?o.validate?this.cache.push((function(){return o.validate(t,a)})):o.type?this.cache.push((function(){return i[o.type](t,o.message)})):this.cache.push((function(){return i.isNonEmpty(t,o.message)})):o.type?0==o.required?""!=t&&this.cache.push((function(){return i[o.type](t,o.message)})):this.cache.push((function(){return i[o.type](t,o.message)})):o.validate&&(0==o.required?""!=t&&this.cache.push((function(){return o.validate(t,a)})):this.cache.push((function(){return o.validate(t,a)})))}},o.prototype.start=function(){for(var t=0;t<this.cache.length;t++){let e=this.cache[t]();if(e)return console.log(e),e}};let n=function(t,e){return new Promise((a,i)=>{let n=new o;Object.keys(e).forEach(a=>{n.add(t[a],e[a],t)});let r=n.start();r?(Object(s["a"])(r),a(!1)):a(!0)})};e["a"]=n},7131:function(t,e,a){},"7c11":function(t,e,a){"use strict";var s=a("d1a0"),i=a.n(s);i.a},"8bbf":function(t,e,a){"use strict";var s=a("b73e"),i=a.n(s);i.a},b73e:function(t,e,a){},d1a0:function(t,e,a){},e303:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"forgetPageBox"},[1==t.state?a("getCodeComponet",{on:{event1:t.event,event2:t.finish}}):t._e(),2==t.state?a("setNewPassword",{attrs:{username:t.username,code:t.code},on:{event2:t.finish}}):t._e()],1)},i=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"forgetPage"},[a("div",{staticClass:"title"},[a("div",{class:{selected:"phone"==t.state},on:{click:t.backBtn}},[t._v("手机号验证")]),a("div",{class:{selected:"email"==t.state},on:{click:t.backBtn}},[t._v("邮箱验证")])]),a("div",{staticClass:"item"},[a("h4",[t._v(t._s(t.textData.title))]),a("div",[a("van-field",{attrs:{left:"",placeholder:t.textData.placeholder},model:{value:t.fromData.username,callback:function(e){t.$set(t.fromData,"username",e)},expression:"fromData.username"}})],1)]),a("div",{staticClass:"item"},[a("h4",[t._v("验证码")]),a("div",[a("van-field",{attrs:{placeholder:"请输入验证码"},model:{value:t.fromData.code,callback:function(e){t.$set(t.fromData,"code",e)},expression:"fromData.code"}},[a("span",{staticClass:"loading",attrs:{slot:"button"},slot:"button"},[0==t.loadState?a("span",{staticClass:"code",on:{click:t.getCode}},[t._v("发送验证码")]):t._e(),1==t.loadState?a("van-loading",{attrs:{size:"20",color:"#4B74FF"}}):t._e(),2==t.loadState?a("span",{staticClass:"code"},[t._v(t._s(t.time)+"s")]):t._e()],1)])],1)]),a("div",{staticClass:"footer"},[a("van-button",{attrs:{type:"info",size:"large",disabled:!t.disabled},on:{click:t.handleFrom}},[t._v("下一步")])],1),a("div",{staticClass:"bottom"},[a("div",{on:{click:t.backLogin}},[t._v("已有密码? 返回登录")])])])},n=[],r=a("455d"),c=a("c24f"),l=a("c276"),d={data(){return{time:60,loadState:0,setInterval:null,fromData:{username:"",code:""},rulesPhone:{username:[{required:!0,message:"请输入手机号"},{type:"isPhone",message:"手机号格式不正确"}]},rulesEmail:{username:[{required:!0,message:"请输入邮箱账号"},{type:"isEmail",message:"邮箱号格式不正确"}]}}},computed:{state(){return this.$store.state.user.forgetPasswordKey},textData(){return"phone"==this.state?{title:"手机号",placeholder:"请输入手机号",codeToast:"验证码已发送至手机，请注意查收",backText:"通过邮箱找回密码"}:{title:"邮箱号",placeholder:"请输入邮箱号",codeToast:"验证码已发送至邮箱，请注意查收",backText:"通过手机号找回密码"}},disabled(){var t=!0;for(var e in this.fromData)""==this.fromData[e]&&(t=!1);return t}},methods:{backLogin(){this.$emit("event2")},backBtn(){let t="phone"==this.state?"email":"phone";this.$store.commit("setforgetPasswordKey",t),this.fromData.username="",this.fromData.code="",this.loadState=0,clearInterval(this.setInterval)},getCode(){let t="phone"==this.state?this.rulesPhone:this.rulesEmail;Object(r["a"])(this.fromData,t).then(async t=>{if(t){this.loadState=1;const{username:t}=this.fromData;let e=await Object(c["g"])({username:t});if(200==e.status){let t=e.data.user_type,a=Object(l["n"])(t,!0);if(a.flag){let t={[this.state]:this.fromData.username};Object(c["d"])(t).then(t=>{this.$toast(this.textData.codeToast),this.loadState=2,this.time=60,this.setInterval=setInterval(()=>{this.time<=0&&(clearInterval(this.setInterval),this.loadState=0,this.time=60),this.time--},1e3)}).catch(t=>{this.loadState=0})}else this.loadState=0,this.$toast(a.msg)}else this.loadState=0,this.$toast("获取验证码失败，请稍后重试！")}})},handleFrom(){let t={code:this.fromData.code,[this.state]:this.fromData.username};console.log(t),Object(c["j"])(t).then(t=>{const{username:e,code:a}=this.fromData;this.$emit("event1",{username:e,code:a,index:2})}).catch(t=>{console.log(t),406==t.status&&this.$toast(t.data.error)})}},mounted(){document.title="phone"==this.state?"手机验证":"邮箱验证"},destroyed(){null!=this.setInterval&&clearInterval(this.setInterval)}},h=d,u=(a("8bbf"),a("2877")),f=Object(u["a"])(h,o,n,!1,null,"021afe92",null),m=f.exports,v=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"setNewBox"},[a("h2",[t._v("新密码")]),a("div",{staticClass:"item"},[a("h4",[t._v("新密码")]),a("div",[a("van-field",{attrs:{left:"",placeholder:"请输入新密码"},model:{value:t.fromData.password1,callback:function(e){t.$set(t.fromData,"password1",e)},expression:"fromData.password1"}})],1)]),a("div",{staticClass:"item"},[a("h4",[t._v("确认密码")]),a("div",[a("van-field",{attrs:{left:"",placeholder:"请再次输入密码"},model:{value:t.fromData.password2,callback:function(e){t.$set(t.fromData,"password2",e)},expression:"fromData.password2"}})],1)]),a("div",{staticClass:"footer"},[a("van-button",{attrs:{type:"info",size:"large",loading:t.loading},on:{click:t.handleFrom}},[t._v("完成")])],1),a("div",{staticClass:"bottom"},[a("div",{on:{click:t.backLogin}},[t._v("已有密码? 返回登录")])])])},p=[],b={props:["username","code"],data(){const t=t=>{var e=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;return""==t?"密码不能为空":e.test(t)?void 0:"请输入6~20位数字和字母组合"},e=(t,e)=>""==t?"请再次输入密码":t!=e.password1?"两次输入密码不一致":void 0;return{loading:!1,fromData:{password1:"",password2:""},rules:{password1:[{required:!0,validate:t}],password2:[{required:!0,validate:e}]}}},computed:{state(){return this.$store.state.user.forgetPasswordKey}},methods:{backLogin(){this.$emit("event2")},handleFrom(){Object(r["a"])(this.fromData,this.rules).then(t=>{if(t){const t=this.fromData.password1,e=this.username,a=this.code;this.loading=!0;let s={username:e,code:a,password:t};Object(c["a"])(s).then(t=>{this.loading=!1,this.$toast("密码修改成功"),this.$emit("event2")}).catch(t=>{console.log(t),this.loading=!1,this.$toast("密码修改失败")})}})}}},g=b,w=(a("f9ba"),Object(u["a"])(g,v,p,!1,null,"3215c8fe",null)),D=w.exports,$={components:{getCodeComponet:m,setNewPassword:D},data(){return{state:1,username:"",code:""}},methods:{event(t){this.state=t.index,this.username=t.username,this.code=t.code},finish(){this.$emit("event")}}},_=$,k=(a("7c11"),Object(u["a"])(_,s,i,!1,null,"55e0e851",null));e["default"]=k.exports},f9ba:function(t,e,a){"use strict";var s=a("7131"),i=a.n(s);i.a}}]);
//# sourceMappingURL=chunk-629d5f4c.0be42634.js.map