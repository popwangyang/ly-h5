(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cdab3ec6"],{"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));r("d3b7"),r("e6cf");function n(t,e,r,n,a,o,i){try{var s=t[o](i),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(n,a)}function a(t){return function(){var e=this,r=arguments;return new Promise((function(a,o){var i=t.apply(e,r);function s(t){n(i,a,o,s,c,"next",t)}function c(t){n(i,a,o,s,c,"throw",t)}s(void 0)}))}}},"455d":function(t,e,r){"use strict";r("4160"),r("b64b"),r("d3b7"),r("159b");var n=r("d399"),a={isNonEmpty:function(t,e){if(""===t)return e},isNumber:function(t,e){if(!/^[+]{0,1}(\d+)$/.test(t))return e},isEmail:function(t,e){if(!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(t))return e},isPhone:function(t,e){if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(t))return e},isGateway:function(t,e){if(!/^192\.168(\.(\d|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))){2}$/.test(t))return e},isMac:function(t,e){if(!/^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/.test(t))return e}},o=function(){this.cache=[]};o.prototype.add=function(t,e,r){for(var n=this,o=function(){var o=e[i];o.required?o.validate?n.cache.push((function(){return o.validate(t,r)})):o.type?n.cache.push((function(){return a[o.type](t,o.message)})):n.cache.push((function(){return a.isNonEmpty(t,o.message)})):o.type?0==o.required?""!=t&&n.cache.push((function(){return a[o.type](t,o.message)})):n.cache.push((function(){return a[o.type](t,o.message)})):o.validate&&(0==o.required?""!=t&&n.cache.push((function(){return o.validate(t,r)})):n.cache.push((function(){return o.validate(t,r)})))},i=0;i<e.length;i++)o()},o.prototype.start=function(){for(var t=0;t<this.cache.length;t++){var e=this.cache[t]();if(e)return console.log(e),e}};var i=function(t,e){return new Promise((function(r,a){var i=new o;Object.keys(e).forEach((function(r){i.add(t[r],e[r],t)}));var s=i.start();s?(Object(n["a"])(s),r(!1)):r(!0)}))};e["a"]=i},7131:function(t,e,r){},"7c11":function(t,e,r){"use strict";var n=r("d1a0"),a=r.n(n);a.a},"8bbf":function(t,e,r){"use strict";var n=r("b73e"),a=r.n(n);a.a},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function c(t,e,r,n){var a=e&&e.prototype instanceof p?e:p,o=Object.create(a.prototype),i=new O(n||[]);return o._invoke=E(t,r,i),o}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}t.wrap=c;var l="suspendedStart",f="suspendedYield",h="executing",d="completed",v={};function p(){}function m(){}function y(){}var g={};g[o]=function(){return this};var w=Object.getPrototypeOf,b=w&&w(w(j([])));b&&b!==r&&n.call(b,o)&&(g=b);var x=y.prototype=p.prototype=Object.create(g);function _(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function k(t){function e(r,a,o,i){var s=u(t[r],t,a);if("throw"!==s.type){var c=s.arg,l=c.value;return l&&"object"===typeof l&&n.call(l,"__await")?Promise.resolve(l.__await).then((function(t){e("next",t,o,i)}),(function(t){e("throw",t,o,i)})):Promise.resolve(l).then((function(t){c.value=t,o(c)}),(function(t){return e("throw",t,o,i)}))}i(s.arg)}var r;function a(t,n){function a(){return new Promise((function(r,a){e(t,n,r,a)}))}return r=r?r.then(a,a):a()}this._invoke=a}function E(t,e,r){var n=l;return function(a,o){if(n===h)throw new Error("Generator is already running");if(n===d){if("throw"===a)throw o;return P()}r.method=a,r.arg=o;while(1){var i=r.delegate;if(i){var s=L(i,r);if(s){if(s===v)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===l)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var c=u(t,e,r);if("normal"===c.type){if(n=r.done?d:f,c.arg===v)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=d,r.method="throw",r.arg=c.arg)}}}function L(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,L(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var a=u(n,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,v;var o=a.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function D(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function $(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(D,this),this.reset(!0)}function j(t){if(t){var r=t[o];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var a=-1,i=function r(){while(++a<t.length)if(n.call(t,a))return r.value=t[a],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:P}}function P(){return{value:e,done:!0}}return m.prototype=x.constructor=y,y.constructor=m,y[s]=m.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},_(k.prototype),k.prototype[i]=function(){return this},t.AsyncIterator=k,t.async=function(e,r,n,a){var o=new k(c(e,r,n,a));return t.isGeneratorFunction(r)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},_(x),x[s]="Generator",x[o]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=j,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach($),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function a(n,a){return s.type="throw",s.arg=t,r.next=n,a&&(r.method="next",r.arg=e),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],s=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),$(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;$(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:j(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=n}catch(a){Function("r","regeneratorRuntime = r")(n)}},ade3:function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));r("7a82");function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}},b73e:function(t,e,r){},d1a0:function(t,e,r){},e303:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"forgetPageBox"},[1==t.state?r("getCodeComponet",{on:{event1:t.event,event2:t.finish}}):t._e(),2==t.state?r("setNewPassword",{attrs:{username:t.username,code:t.code},on:{event2:t.finish}}):t._e()],1)},a=[],o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"forgetPage"},[r("div",{staticClass:"title"},[r("div",{class:{selected:"phone"==t.state},on:{click:t.backBtn}},[t._v("手机号验证")]),r("div",{class:{selected:"email"==t.state},on:{click:t.backBtn}},[t._v("邮箱验证")])]),r("div",{staticClass:"item"},[r("h4",[t._v(t._s(t.textData.title))]),r("div",[r("van-field",{attrs:{left:"",placeholder:t.textData.placeholder},model:{value:t.fromData.username,callback:function(e){t.$set(t.fromData,"username",e)},expression:"fromData.username"}})],1)]),r("div",{staticClass:"item"},[r("h4",[t._v("验证码")]),r("div",[r("van-field",{attrs:{placeholder:"请输入验证码"},model:{value:t.fromData.code,callback:function(e){t.$set(t.fromData,"code",e)},expression:"fromData.code"}},[r("span",{staticClass:"loading",attrs:{slot:"button"},slot:"button"},[0==t.loadState?r("span",{staticClass:"code",on:{click:t.getCode}},[t._v("发送验证码")]):t._e(),1==t.loadState?r("van-loading",{attrs:{size:"20",color:"#4B74FF"}}):t._e(),2==t.loadState?r("span",{staticClass:"code"},[t._v(t._s(t.time)+"s")]):t._e()],1)])],1)]),r("div",{staticClass:"footer"},[r("van-button",{attrs:{type:"info",size:"large",disabled:!t.disabled},on:{click:t.handleFrom}},[t._v("下一步")])],1),r("div",{staticClass:"bottom"},[r("div",{on:{click:t.backLogin}},[t._v("已有密码? 返回登录")])])])},i=[],s=(r("4795"),r("ade3")),c=(r("96cf"),r("1da1")),u=r("455d"),l=r("c24f"),f=r("c276"),h={data:function(){return{time:60,loadState:0,setInterval:null,fromData:{username:"",code:""},rulesPhone:{username:[{required:!0,message:"请输入手机号"},{type:"isPhone",message:"手机号格式不正确"}]},rulesEmail:{username:[{required:!0,message:"请输入邮箱账号"},{type:"isEmail",message:"邮箱号格式不正确"}]}}},computed:{state:function(){return this.$store.state.user.forgetPasswordKey},textData:function(){return"phone"==this.state?{title:"手机号",placeholder:"请输入手机号",codeToast:"验证码已发送至手机，请注意查收",backText:"通过邮箱找回密码"}:{title:"邮箱号",placeholder:"请输入邮箱号",codeToast:"验证码已发送至邮箱，请注意查收",backText:"通过手机号找回密码"}},disabled:function(){var t=!0;for(var e in this.fromData)""==this.fromData[e]&&(t=!1);return t}},methods:{backLogin:function(){this.$emit("event2")},backBtn:function(){var t="phone"==this.state?"email":"phone";this.$store.commit("setforgetPasswordKey",t),this.fromData.username="",this.fromData.code="",this.loadState=0,clearInterval(this.setInterval)},getCode:function(){var t=this,e="phone"==this.state?this.rulesPhone:this.rulesEmail;Object(u["a"])(this.fromData,e).then(function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(r){var n,a,o,i,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=7;break}return t.loadState=1,n=t.fromData.username,e.next=5,Object(l["f"])({username:n});case 5:a=e.sent,200==a.status?(o=a.data.user_type,i=Object(f["m"])(o,!0),i.flag?(c=Object(s["a"])({},t.state,t.fromData.username),Object(l["c"])(c).then((function(e){t.$toast(t.textData.codeToast),t.loadState=2,t.time=60,t.setInterval=setInterval((function(){t.time<=0&&(clearInterval(t.setInterval),t.loadState=0,t.time=60),t.time--}),1e3)}))["catch"]((function(e){t.loadState=0}))):(t.loadState=0,t.$toast(i.msg))):(t.loadState=0,t.$toast("获取验证码失败，请稍后重试！"));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},handleFrom:function(){var t=this,e=Object(s["a"])({code:this.fromData.code},this.state,this.fromData.username);console.log(e),Object(l["i"])(e).then((function(e){var r=t.fromData,n=r.username,a=r.code;t.$emit("event1",{username:n,code:a,index:2})}))["catch"]((function(e){console.log(e),406==e.status&&t.$toast(e.data.error)}))}},mounted:function(){document.title="phone"==this.state?"手机验证":"邮箱验证"},destroyed:function(){null!=this.setInterval&&clearInterval(this.setInterval)}},d=h,v=(r("8bbf"),r("2877")),p=Object(v["a"])(d,o,i,!1,null,"021afe92",null),m=p.exports,y=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"setNewBox"},[r("h2",[t._v("新密码")]),r("div",{staticClass:"item"},[r("h4",[t._v("新密码")]),r("div",[r("van-field",{attrs:{left:"",placeholder:"请输入新密码"},model:{value:t.fromData.password1,callback:function(e){t.$set(t.fromData,"password1",e)},expression:"fromData.password1"}})],1)]),r("div",{staticClass:"item"},[r("h4",[t._v("确认密码")]),r("div",[r("van-field",{attrs:{left:"",placeholder:"请再次输入密码"},model:{value:t.fromData.password2,callback:function(e){t.$set(t.fromData,"password2",e)},expression:"fromData.password2"}})],1)]),r("div",{staticClass:"footer"},[r("van-button",{attrs:{type:"info",size:"large",loading:t.loading},on:{click:t.handleFrom}},[t._v("完成")])],1),r("div",{staticClass:"bottom"},[r("div",{on:{click:t.backLogin}},[t._v("已有密码? 返回登录")])])])},g=[],w={props:["username","code"],data:function(){var t=function(t){var e=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;return""==t?"密码不能为空":e.test(t)?void 0:"请输入6~20位数字和字母组合"},e=function(t,e){return""==t?"请再次输入密码":t!=e.password1?"两次输入密码不一致":void 0};return{loading:!1,fromData:{password1:"",password2:""},rules:{password1:[{required:!0,validate:t}],password2:[{required:!0,validate:e}]}}},computed:{state:function(){return this.$store.state.user.forgetPasswordKey}},methods:{backLogin:function(){this.$emit("event2")},handleFrom:function(){var t=this;Object(u["a"])(this.fromData,this.rules).then((function(e){if(e){var r=t.fromData.password1,n=t.username,a=t.code;t.loading=!0;var o={username:n,code:a,password:r};Object(l["a"])(o).then((function(e){t.loading=!1,t.$toast("密码修改成功"),t.$emit("event2")}))["catch"]((function(e){console.log(e),t.loading=!1,t.$toast("密码修改失败")}))}}))}}},b=w,x=(r("f9ba"),Object(v["a"])(b,y,g,!1,null,"3215c8fe",null)),_=x.exports,k={components:{getCodeComponet:m,setNewPassword:_},data:function(){return{state:1,username:"",code:""}},methods:{event:function(t){this.state=t.index,this.username=t.username,this.code=t.code},finish:function(){this.$emit("event")}}},E=k,L=(r("7c11"),Object(v["a"])(E,n,a,!1,null,"55e0e851",null));e["default"]=L.exports},f9ba:function(t,e,r){"use strict";var n=r("7131"),a=r.n(n);a.a}}]);
//# sourceMappingURL=chunk-cdab3ec6.b47efda9.js.map