jQuery.sap.declare("sap.zen.dsh.dsh");jQuery.sap.require("sap.zen.dsh.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.zen.dsh.dsh",{metadata:{publicMethods:["addParameter","executeScript","getDataSource","getComponent","getPage"],library:"sap.zen.dsh",properties:{"dshAppName":{type:"string",group:"Misc",defaultValue:null},"dshBaseUrl":{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},"dshBaseAppUrl":{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},"dshBaseAppUrl2":{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},"dshHost":{type:"string",group:"Misc",defaultValue:null},"dshPort":{type:"string",group:"Misc",defaultValue:null},"hanaAlias":{type:"string",group:"Misc",defaultValue:null},"width":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},"height":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},"embedded":{type:"boolean",group:"Misc",defaultValue:null},"deployment":{type:"string",group:"Misc",defaultValue:null},"protocol":{type:"string",group:"Misc",defaultValue:null},"client":{type:"string",group:"Misc",defaultValue:null},"language":{type:"string",group:"Misc",defaultValue:null}}}});jQuery.sap.require("sap.zen.crosstab.Crosstab");
sap.zen.dsh.dsh.prototype.init=function(){this.initial=true;this.parameters={};this.defaultDshBaseUrlHana="/sap/bi/aas/rt";this.defaultDshBaseAppUrlHana="/designstudio";this.defaultDshBaseAppUrlBW="/sap/bw/Mime";this.defaultDshBaseUrlBW="/sap/bw/Mime/TEMP_TEST"};
sap.zen.dsh.dsh.prototype.doInit=function(){var t=this;if(sap.zen.dsh.scriptLoaded){t.doIt()}else{var r="";var d=t.getDeployment();if((d==null)||(d.length==0)){d="hana"}if(d=="hana"){r=this.defaultDshBaseUrlHana}else if(d=="bw"){r=this.defaultDshBaseUrlBW}if(this.getDshBaseUrl().length>0){r=this.getDshBaseUrl()}$.ajax({url:r+"/all.js",dataType:'script',async:false,cache:true}).done(function(){t.doIt()}).fail(function(j,a,e){alert("error")})}};
sap.zen.dsh.dsh.prototype.doIt=function(){sap.zen.dsh.scriptLoaded=true;var t=this;{var l=t.getLanguage();if(l==""){l=navigator.language}var c=t.getClient();if(c==""){var a=document.cookie.split("&");for(var i=0;i<a.length;i++){var b=a[i];if(b.indexOf("sap-client")==0){c=b.substring(11);break}}}var p=t.getProtocol();if(p==""){if(window.location.protocol.indexOf("https")!=-1){p="https"}else{p="http"}}var d=t.getDeployment();if((d==null)||(d.length==0)){d="hana"}var e=t.getDshAppName();document.title=" Design Studio App: "+e;var r="";var f="";if(d=="hana"){r=this.defaultDshBaseAppUrlHana;f=this.defaultDshBaseUrlHana}else if(d=="bw"){r=this.defaultDshBaseAppUrlBW;f=this.defaultDshBaseUrlBW}if(this.getDshBaseUrl().length>0){f=this.getDshBaseUrl()}var g="";if(this.getDshBaseAppUrl().length>0){r=this.getDshBaseAppUrl();g=r+"/"+e}else if(this.getDshBaseAppUrl2().length>0){r=this.getDshBaseAppUrl2();g=r+"/"+e+"/content.biapp?"+new Date().getTime()}else{g=r+"/"+e+"/content.biapp?"+new Date().getTime()}var u=sap.firefly.XHashMapByString.create();for(var k in this.parameters){u.put(k,this.parameters[k])}var h=new sap.zen.DesignStudio();h.setHost(document.location.hostname);h.setPort(document.location.port);h.setProtocol(document.location.protocol.split(":")[0]);h.setClient(c);h.setLanguage(l);h.setApplicationPath(r);h.setApplicationName(e);h.setUrlParameter(u);h.setSdkLoaderPath("");h.setHanaMode(true);h.setDshControlId(t.getId());var j=h.createPage();window[t.getId()+"Buddha"]=j;jQuery(window).bind('beforeunload',function(){this.page.exec("APPLICATION.logoff()")});var s=s||{};s.staticMimeUrlPrefix=f+"/";s.getParameter=function(){return""};sapbi_MIMES_PIXEL="";window.sapbi_page=s;var m=j.getApplicationPropertiesComponent().getTheme();if(!m){m="sap_platinum"}var n=j.getApplicationPropertiesComponent().getCustomCSSName();if(n){var o=document.createElement('link');o.setAttribute("type","text/css");o.setAttribute("rel","stylesheet");o.setAttribute("href",j.getRelativePathToApp()+n);document.getElementsByTagName("head")[0].appendChild(o)}if(this.getEmbedded()==false){setTimeout(function(){j.executeInitialRendering()},1)}}};
sap.zen.dsh.dsh.prototype.exit=function(){var d=""};
sap.zen.dsh.dsh.prototype.addParameter=function(n,v){this.parameters[n]=v};
sap.zen.dsh.dsh.prototype.executeScript=function(s){this.page.exec(s)};
sap.zen.dsh.dsh.prototype.getDataSource=function(n){return this.page.getDataSource(n)};
sap.zen.dsh.dsh.prototype.getComponent=function(n){return this.page.getComponent(n)};
sap.zen.dsh.dsh.prototype.getPage=function(){return this.page};