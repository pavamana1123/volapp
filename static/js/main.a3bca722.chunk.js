(this.webpackJsonpmyfolk=this.webpackJsonpmyfolk||[]).push([[0],Array(19).concat([function(e,t,n){},function(e,t,n){},function(e,t){String.prototype.standardizeName=function(){var e=this,t=(e=(e=(e=e.replaceAll("."," ")).replace(/  +/g," ")).trim()).split(" ");if(t.length!=e.replaceAll(" ","").length)for(;1==t[0].length;)t.push(t.shift());return(e=t.join(" ")).toTitleCase()},String.prototype.toCamelCase=function(){return this.toLowerCase().replace(/['"]/g,"").replace(/\W+/g," ").replace(/ (.)/g,(function(e){return e.toUpperCase()})).replace(/ /g,"")},String.prototype.toTitleCase=function(){return this.replace(/\w\S*/g,(function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()}))}},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){"use strict";n.r(t);var c=n(1),i=n.n(c),s=n(12),a=n.n(s),r=(n(19),n(3)),l=(n(20),n(21),n(22),n(5)),o=n(6);n(23);var d={set:function e(t,n,c){if("object"===typeof t)for(var i in t)e(i,t[i]);else{var s=new Date;c=c||999,s.setTime(s.getTime()+24*c*60*60*1e3);var a=";expires="+s.toUTCString();document.cookie=t+"="+n+a}},get:function(e){for(var t=e+"=",n=document.cookie.split(";"),c=0;c<n.length;c++){for(var i=n[c];" "===i.charAt(0);)i=i.substring(1);if(0===i.indexOf(t))return i.substring(t.length,i.length)}return""},clear:function(e){e?document.cookie=e+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;":document.cookie.split(";").forEach((function(e){document.cookie=e.replace(/^ +/,"").replace(/=.*/,"=;expires="+(new Date).toUTCString()+";path=/")}))}},j=d,u=n(0),h=function(){function e(){Object(l.a)(this,e),this.show=function(){},this.hide=function(){}}return Object(o.a)(e,[{key:"setShowFunc",value:function(e){this.show=e}},{key:"setHideFunc",value:function(e){this.hide=e}}]),e}();function b(e){var t=e.list,n=e.ctl,i=Object(c.useState)(!1),s=Object(r.a)(i,2),a=s[0],l=s[1],o=this;return Object(c.useEffect)((function(){n.setShowFunc((function(){l.bind(o)(!0)})),n.setHideFunc((function(){l.bind(o)(!1)}))}),[]),Object(u.jsxs)("div",{children:[Object(u.jsxs)("div",{className:"mainMenu",id:a?"show":"hide",children:[Object(u.jsxs)("div",{className:"mainMenuProfile",children:[Object(u.jsx)("div",{className:"mainMenuProfileAvatar",children:j.get("name").charAt(0).toUpperCase()}),Object(u.jsx)("div",{className:"mainMenuProfileName",children:j.get("name")})]}),t.map((function(e){return Object(u.jsx)("div",{className:"mainMenuItem clickable",children:e})}))]}),a?Object(u.jsx)("div",{className:"glass",onClick:function(){l.bind(o)(!1)}}):null]})}n(25);var v=new h;var f=function(e){var t=e.onPageMenuClick,n=e.hideOptions,c=e.title;return Object(u.jsxs)("div",{children:[!n&&Object(u.jsx)(b,{ctl:v,list:[1,2,3,4]}),Object(u.jsxs)("div",{className:"appHeader",children:[!n&&Object(u.jsx)("i",{className:"bi bi-list clickable clickableIcon",id:"slideMenuButton",onClick:function(){v.show()}}),Object(u.jsx)("span",{children:c}),!n&&Object(u.jsx)("i",{className:"bi bi-three-dots-vertical clickable clickableIcon",id:"menuButton",onClick:t})]})]})};n(26);function m(e){var t=e.children,n=e.style;return Object(u.jsx)("div",{className:"paper",style:n,children:t})}n(27);var O=function(e){var t=Object(c.useState)(0),n=Object(r.a)(t,2),i=n[0],s=n[1],a=this,l=e.tabs;return Object(u.jsxs)("div",{className:"tab",children:[Object(u.jsxs)("div",{className:"tabHeader",children:[Object(u.jsx)("div",{className:"tabHeaderItems ",children:l.map((function(e,t){return Object(u.jsx)("div",{className:"tabHeaderItem",onClick:function(){s.bind(a)(t)},children:e.title},t)}))}),Object(u.jsx)("div",{className:"tabUnderline",style:{width:"".concat(100/l.length,"%"),left:"".concat(i*(100/l.length),"%")}})]}),Object(u.jsx)("div",{className:"tabChildren",children:l[i].component})]})},p=(n(28),n(7)),x=n.n(p);n(30);var N=function(e){return e.children,e.style,Object(u.jsx)("div",{className:"hsep"})};var g=function(e){var t=e.details;return Object(u.jsxs)("div",{className:"service",children:[Object(u.jsxs)("div",{className:"detailsDiv",children:[Object(u.jsx)("div",{className:"light",children:"Service"}),Object(u.jsx)("div",{className:"detailFeild",children:t.service})]}),Object(u.jsxs)("div",{className:"detailsDiv",children:[Object(u.jsx)("div",{className:"light",children:"Timings"}),Object(u.jsx)("div",{className:"detailFeild",children:"\u23f1\ufe0f ".concat(t.timings)})]}),Object(u.jsxs)("div",{className:"detailsDiv",children:[Object(u.jsx)("div",{className:"light",children:"Co-Ordinator"}),Object(u.jsx)("div",{className:"detailFeild",children:"".concat(t.coordinator)})]}),Object(u.jsxs)("div",{className:"detailsDiv",children:[Object(u.jsx)("div",{className:"light",children:"In-charge"}),Object(u.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(u.jsx)("div",{className:"detailFeild",style:{marginRight:"2vw"},children:"".concat(t.spoc)}),isNaN(t.spocPhone)?null:Object(u.jsx)("a",{href:"tel:+91".concat(t.spocPhone),children:Object(u.jsx)("i",{className:"bi bi-telephone-fill"})}),isNaN(t.spocPhone)?null:Object(u.jsx)("a",{href:"https://wa.me/91".concat(t.spocPhone),target:"_blank",children:Object(u.jsx)("i",{className:"bi bi-whatsapp"})})]})]}),Object(u.jsx)(N,{})]})},w=n(11);n(31);function y(e){var t=Object(c.useState)(e.show),n=Object(r.a)(t,2),i=n[0],s=n[1],a=this,l=e.style;return Object(c.useEffect)((function(){e.ctl&&(e.ctl.setShowFunc((function(){s.bind(a)(!0)})),e.ctl.setHideFunc((function(){s.bind(a)(!1)})))}),[]),Object(u.jsx)("div",{className:"spinner-bg-circle ".concat(i||!e.ctl?"spinner-show":"spinner-hide"),style:Object(w.a)(Object(w.a)({},{width:"".concat(e.size||2,"vw"),height:"".concat(e.size||2,"vw")}),l)})}n(32);var k=function(e){var t=Object(c.useState)(""),n=Object(r.a)(t,2),i=n[0],s=n[1],a=e.data,l=e.dates,o=a.volunteers;Object(c.useEffect)((function(){var e=new URLSearchParams(window.location.search);s(e.get("name"))}));var d=Object(u.jsx)("div",{style:{color:"#333",margin:"5vw",display:"flex",justifyContent:"center"},children:"No services"});return Object(u.jsxs)("div",{children:[Object(u.jsx)(f,{title:a.title,hideOptions:!0}),Object(u.jsxs)("div",{className:"vol",children:[Object(u.jsx)(m,{children:i}),l.length?Object(u.jsx)(m,{style:{marginTop:"2vw",padding:0,width:"86vw"},children:Object(u.jsx)(O,{tabs:l.map((function(e){var t=o.filter((function(t){return t.volunteerName==i&&t.date==e})).map((function(e){return Object(u.jsx)(g,{details:e})}));return{title:1==l.length?x()(e,"YYYY-MM-DD").format("dddd, Do MMMM YYYY"):x()(e,"YYYY-MM-DD").format("Do MMM"),component:t.length?t:d}}))})}):Object(u.jsx)(y,{style:{marginTop:"2vw"},size:5})]}),Object(u.jsx)("div",{style:{margin:"15vw"}})]})};n(33),n(34);var M=function(e){var t=e.service;return Object(u.jsx)("div",{className:"servIndiv",children:Object(u.jsxs)(m,{style:{margin:"2vw",width:"85%"},children:[Object(u.jsx)("div",{children:t.serviceName}),Object(u.jsx)("div",{className:"serviceDetails",children:"\u23f1\ufe0f ".concat(t.timings)}),Object(u.jsx)("div",{className:"serviceDetails",children:"\ud83d\udc51 ".concat(t.coordinator)}),Object(u.jsx)("div",{className:"serviceDetails",children:Object(u.jsxs)("div",{className:"spocPhoneDet",children:[Object(u.jsx)("div",{style:{marginRight:"3vw",color:"#555"},children:"\ud83e\udd47 ".concat(t.spoc)}),isNaN(t.spocPhone)?null:Object(u.jsx)("a",{href:"tel:+91".concat(t.spocPhone),children:Object(u.jsx)("i",{className:"bi bi-telephone-fill"})}),isNaN(t.spocPhone)?null:Object(u.jsx)("a",{href:"https://wa.me/91".concat(t.spocPhone),target:"_blank",children:Object(u.jsx)("i",{className:"bi bi-whatsapp"})})]})})]})})};n(35);var D=function(e){var t=e.volunteers;return Object(u.jsx)("div",{className:"volsIndiv",children:Object(u.jsx)(m,{style:{margin:"-3vw 2vw 2vw 2vw",width:"85%",borderTopLeftRadius:0,borderTopRightRadius:0},children:t.length?t.map((function(e){return e.volunteerName?Object(u.jsxs)("div",{className:"eachVol",children:[Object(u.jsxs)("div",{className:"eachVolDet",children:[Object(u.jsx)("div",{children:e.volunteerName}),Object(u.jsxs)("div",{children:[isNaN(e.volunteerPhone)?null:Object(u.jsx)("a",{href:"tel:+91".concat(e.volunteerPhone),children:Object(u.jsx)("i",{className:"bi bi-telephone-fill"})}),isNaN(e.volunteerPhone)?null:Object(u.jsx)("a",{href:"https://wa.me/91".concat(e.volunteerPhone),target:"_blank",children:Object(u.jsx)("i",{className:"bi bi-whatsapp"})}),isNaN(e.volunteerPhone)?null:Object(u.jsx)("a",{href:"https://wa.me/91".concat(e.volunteerPhone,"?text=").concat(encodeURI("https://vol.iskconmysore.org/vol?name=".concat(encodeURIComponent(e.volunteerName)))),target:"_blank",children:Object(u.jsx)("i",{className:"bi bi-share-fill"})}),Object(u.jsx)("a",{href:"https://vol.iskconmysore.org/vol?name=".concat(encodeURI(e.volunteerName)),target:"_blank",children:Object(u.jsx)("i",{className:"bi bi-box-arrow-up-right"})})]})]}),Object(u.jsx)(N,{})]}):null})):"No volunteers"})})};var Y=function(e){var t=e.data,n=e.dates,i=t.services,s=t.volunteers;return Object(c.useEffect)((function(){})),Object(u.jsxs)("div",{children:[Object(u.jsx)(f,{title:t.title,hideOptions:!0}),Object(u.jsx)("div",{className:"ser",children:n.length?Object(u.jsx)(O,{tabs:n.map((function(e){return{title:1==n.length?x()(e,"YYYY-MM-DD").format("dddd, Do MMMM YYYY"):x()(e,"YYYY-MM-DD").format("Do MMM"),component:Object(u.jsx)("div",{className:"serServ",children:i.filter((function(t){return t.date==e})).map((function(t){return Object(u.jsxs)("div",{className:"svHolder",children:[Object(u.jsx)(M,{service:t}),Object(u.jsx)(D,{volunteers:s.filter((function(n){return n.service==t.serviceName&&n.date==e}))})]})}))})}}))}):Object(u.jsx)(y,{size:3})}),Object(u.jsx)("div",{style:{margin:"15vw"}})]})},P=n(10),C=n.n(P),S=n(13),T=function(){function e(){Object(l.a)(this,e)}return Object(o.a)(e,[{key:"setFunc",value:function(e){return this.func=e,this}},{key:"setParams",value:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return this.params=t,this}},{key:"call",value:function(){var e=Object(S.a)(C.a.mark((function e(){var t;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({func:this.func,params:this.params})});case 2:return t=e.sent,e.abrupt("return",t.json().then((function(e){if(e.error)throw new Error(e.msg);if(!e.data)throw new Error("Unexpected response in data: ".concat(e.data));return e.data})));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}(),F=T,I=n(14),U=n(2);var E=function(){var e=Object(c.useState)({}),t=Object(r.a)(e,2),n=t[0],i=t[1],s=Object(c.useState)([]),a=Object(r.a)(s,2),l=a[0],o=a[1];return Object(c.useEffect)((function(){(new F).setFunc("getData").setParams("1ZqpOqIO7pLFAtt0mxRkO33qlQFEx9izwHR_K2ki2lzg").call().then((function(e){i(e);var t={};e.services.forEach((function(e){t[e.date]=null})),o(Object.keys(t).map((function(e){return e})).sort())})).catch((function(){}))}),[]),Object(u.jsx)("div",{className:"App",children:Object(u.jsx)(I.a,{children:Object(u.jsxs)(U.c,{children:[Object(u.jsx)(U.a,{path:"/vol",element:Object(u.jsx)(k,{data:n,dates:l})}),Object(u.jsx)(U.a,{path:"/ser",element:Object(u.jsx)(Y,{data:n,dates:l})})]})})})};a.a.render(Object(u.jsx)(i.a.StrictMode,{children:Object(u.jsx)(E,{})}),document.getElementById("root"))}]),[[37,1,2]]]);
//# sourceMappingURL=main.a3bca722.chunk.js.map