(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{943:function(t,e,n){"use strict";n.r(e);n(284);var o={name:"JiraTasksOpener",components:{Editor:n(64).a},data:function(){return{dialog:!1,text:null,generatedText:null,tasks:[]}},computed:{jiraUrl:function(){return localStorage.getItem("opener_jira_host_url")}},methods:{convert:function(){var t=this,e=_.words(this.text,/[A-Z]+-\d+/gim),n=[];_.forEach(e,(function(code){n.push(t.prepareSingleTaskInfo(code))})),this.tasks=n},openAllTasks:function(t){_.forEach(t,(function(t){window.open(t.link,t.code)}))},prepareGeneratedText:function(){},prepareSingleTaskInfo:function(code){return{code:code.toUpperCase(),link:"".concat(this.jiraUrl,"/browse/").concat(code.toUpperCase())}}}},r=n(10),c=n(14),l=n.n(c),d=n(194),v=n(136),f=n(25),k=n(845),m=n(830),x=n(163),h=n(847),w=n(832),C=n(849),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-dialog",{attrs:{persistent:"","max-width":"1000px"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;e.attrs;return[n("v-btn",t._g({staticClass:"mr-2",attrs:{color:"default"},on:{click:function(t){t.stopPropagation()}}},o),[t._v("\n      Открыватор задач\n    ")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[t._v(" "),n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[t._v("Открыватор страниц с задачами")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){t.dialog=!1}}},[n("v-icon",[t._v("mdi-close")])],1)],1),t._v(" "),n("v-card-text",[n("v-row",[n("v-col",{attrs:{cols:"8",sm:"12",md:"8"}},[n("v-textarea",{staticStyle:{"font-size":"12px"},attrs:{label:"Текст для парсинга",outlined:"",dense:"",filled:"",required:"","auto-grow":""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.convert(e)}},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}}),t._v(" "),n("v-btn",{staticClass:"mb-4",attrs:{color:"success",block:"",disabled:!t.text},on:{click:t.convert}},[n("v-icon",[t._v("compare_arrows")])],1)],1),t._v(" "),n("v-col",{attrs:{cols:"4",sm:"12",md:"4"}},t._l(t.tasks,(function(e){return n("div",[n("li",[n("a",{attrs:{href:e.link,target:"_blank"}},[t._v(t._s(e.code))])])])})),0)],1)],1),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"success",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("Закрыть")])],1)],1)],1)}),[],!1,null,"0d0a6170",null),V=component.exports;l()(component,{VBtn:d.a,VCard:v.a,VCardActions:f.a,VCardText:f.b,VCardTitle:f.c,VCol:k.a,VDialog:m.a,VIcon:x.a,VRow:h.a,VSpacer:w.a,VTextarea:C.a});var T={name:"index",components:{JiraTasksOpener:V},props:{},asyncData:function(t){},data:function(){return{tab:0}},computed:{},watch:{},mounted:function(){},created:function(){}},y=Object(r.a)(T,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("jira-tasks-opener")],1)}),[],!1,null,"41c749a6",null);e.default=y.exports}}]);