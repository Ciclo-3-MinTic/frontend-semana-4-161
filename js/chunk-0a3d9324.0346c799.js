(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0a3d9324"],{1681:function(t,e,a){},a844:function(t,e,a){"use strict";a("a9e3");var i=a("5530"),o=(a("1681"),a("8654")),n=a("58df"),s=Object(n["a"])(o["a"]);e["a"]=s.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(i["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},o["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var e=t.scrollHeight,a=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(a,e)+"px"}},genInput:function(){var t=o["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){o["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})},b3f7:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-layout",{attrs:{"align-start":"","d-block":"","flex-column":"",block:""}},[a("v-dialog",{attrs:{transition:"slide-x-reverse-transition"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v(t._s(t.title))])]),a("v-card-text",[a("v-container",{attrs:{"grid-list-md":""}},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs8:"",sm9:"",md10:""}},[a("v-text-field",{attrs:{label:"Nombre"},model:{value:t.nombre,callback:function(e){t.nombre=e},expression:"nombre"}})],1),a("v-flex",{attrs:{xs4:"",sm3:"",md2:""}},[a("v-text-field",{directives:[{name:"show",rawName:"v-show",value:t.typeDialog,expression:"typeDialog"}],attrs:{label:"codigo",disabled:"",type:"text"},model:{value:t.id,callback:function(e){t.id=e},expression:"id"}})],1),a("v-flex",{attrs:{xs12:""}},[a("v-textarea",{attrs:{outlined:"",rows:"3","auto-grow":"",label:"descripcion"},model:{value:t.descripcion,callback:function(e){t.descripcion=e},expression:"descripcion"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"error",small:""},on:{click:function(e){t.dialog=!1}}},[t._v("Cancelar")]),a("v-btn",{attrs:{color:"primary"},on:{click:t.dialogAcepter}},[t._v("Guardar")])],1)],1)],1),a("v-snackbar",{attrs:{timeout:t.timeout,center:"",shaped:"",bottom:"",right:"",transition:"slide-y-reverse-transition",color:t.coloAlert},scopedSlots:t._u([{key:"action",fn:function(e){var i=e.attrs;return[a("v-btn",t._b({staticClass:"elevation-0",attrs:{small:"",icon:""},on:{click:function(e){t.snackbar=t.dialogAlert}}},"v-btn",i,!1),[a("v-icon",[t._v("mdi-close")])],1)]}}]),model:{value:t.dialogAlert,callback:function(e){t.dialogAlert=e},expression:"dialogAlert"}},[a("div",{staticClass:" text-center title  text "},[t._v(" "+t._s(t.textDialogAler)+" ")])]),a("data-table-base",{attrs:{title:t.titles,data:t.dataCategorias,headers:t.headers,isloading:t.isloading,derechos:t.derechos},on:{reroll:t.reroll,add:t.add,edit:t.edit,desactive:t.desactive,active:t.active}})],1)},o=[],n=a("bc3a"),s=a.n(n),r=a("1db0"),c={components:{DataTableBase:r["a"]},data:function(){return{dialogpass:!1,dialog:!1,typeDialog:0,dialogAlert:!1,textDialogAler:"",coloAlert:"",timeout:2e3,derechos:{},isloading:!0,title:"Categoria",titles:"Categorias",dataCategorias:[],headers:[{text:"Código",value:"id",sortable:!0,align:"center"},{text:"Nombre",value:"nombre",sortable:!0,align:"center"},{text:"Descripcion",value:"descripcion",sortable:!1,align:"center"},{text:"Estado",value:"estado",sortable:!0,align:"center"},{text:"Opciones",value:"opciones",sortable:!1,align:"center"}],valida:0,id:"",nombre:"",descripcion:"",estado:0}},created:function(){this.listar(),this.derechos=this.$store.state.derechos.categorias},methods:{editItem:function(t){this.id=t.id,this.nombre=t.nombre,this.descripcion=t.descripcion,this.estado=t.estado},clearItem:function(){this.id="",this.nombre="",this.descripcion="",this.estado=""},reroll:function(){this.isloading=!0,this.listar()},add:function(){this.typeDialog=0,this.clearItem(),this.openDialog()},edit:function(t){this.typeDialog=1,this.editItem(t),this.openDialog()},desactive:function(t){this.isloading=!0,this.deactivateCategorias(t)},active:function(t){this.isloading=!0,this.activateCategorias(t)},openDialog:function(){this.dialog=!0},closeDialog:function(){this.clearItem(),this.dialog=!1,this.typeDialog=0},openDialogResponse:function(t,e){this.reroll(),this.textDialogAler=e,this.closeDialog(),this.coloAlert=t>0?"accent":"error",this.isloading=!1,this.dialogAlert=!0},validar:function(){return this.valida=0,this.nombre.length<1||this.nombre.length,this.descripcion,this.valida},dialogAcepter:function(){this.validar&&(this.typeDialog?this.updateCategorias({id:this.id,nombre:this.nombre,descripcion:this.descripcion}):this.newCategorias({nombre:this.nombre,descripcion:this.descripcion}))},headerToken:function(){var t={Token:this.$store.state.token};return{headers:t}},listar:function(){var t=this;s.a.get("categoria/list",this.headerToken()).then((function(e){t.dataCategorias=e.data,t.isloading=!1})).catch((function(e){t.isloading=!1,console.log(e)}))},newCategorias:function(t){var e=this;s.a.post("categoria/add",t,this.headerToken()).then((function(t){e.openDialogResponse(1,"nuevo categoria creado")})).catch((function(t){e.openDialogResponse(0,"no se puede crear categoria"),console.log(t)}))},updateCategorias:function(t){var e=this;s.a.put("categoria/update",t,this.headerToken()).then((function(t){e.openDialogResponse(1,"categoria actualizado")})).catch((function(t){e.openDialogResponse(0,"no se puede actualizar categoria"),console.log(t)}))},activateCategorias:function(t){var e=this;s.a.put("categoria/activate",{id:t.id},this.headerToken()).then((function(t){e.openDialogResponse(1,"categoria activado")})).catch((function(t){e.openDialogResponse(0,"no se puede activar categoria")}))},deactivateCategorias:function(t){var e=this;s.a.put("categoria/deactivate",{id:t.id},this.headerToken()).then((function(t){e.openDialogResponse(1,"categoria desactivada")})).catch((function(t){e.openDialogResponse(0,"no se puede desactivada categoria")}))}}},l=c,d=a("2877"),u=a("6544"),h=a.n(u),g=a("8336"),p=a("b0af"),v=a("99d9"),f=a("a523"),b=a("169a"),m=a("0e8f"),x=a("132d"),w=a("a722"),k=a("2db4"),D=a("2fa4"),C=a("8654"),y=a("a844"),I=Object(d["a"])(l,i,o,!1,null,null,null);e["default"]=I.exports;h()(I,{VBtn:g["a"],VCard:p["a"],VCardActions:v["a"],VCardText:v["b"],VCardTitle:v["c"],VContainer:f["a"],VDialog:b["a"],VFlex:m["a"],VIcon:x["a"],VLayout:w["a"],VSnackbar:k["a"],VSpacer:D["a"],VTextField:C["a"],VTextarea:y["a"]})}}]);
//# sourceMappingURL=chunk-0a3d9324.0346c799.js.map