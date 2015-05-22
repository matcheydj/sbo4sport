/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','./library'],function(q,C,l){"use strict";var F=C.extend("sap.ui.unified.FileUploader",{metadata:{library:"sap.ui.unified",properties:{value:{type:"string",group:"Data",defaultValue:''},enabled:{type:"boolean",group:"Behavior",defaultValue:true},uploadUrl:{type:"sap.ui.core.URI",group:"Data",defaultValue:''},name:{type:"string",group:"Data",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:''},uploadOnChange:{type:"boolean",group:"Behavior",defaultValue:false},additionalData:{type:"string",group:"Data",defaultValue:null},sameFilenameAllowed:{type:"boolean",group:"Behavior",defaultValue:false},buttonText:{type:"string",group:"Misc",defaultValue:null},fileType:{type:"string[]",group:"Data",defaultValue:null},multiple:{type:"boolean",group:"Behavior",defaultValue:false},maximumFileSize:{type:"float",group:"Data",defaultValue:null},mimeType:{type:"string[]",group:"Data",defaultValue:null},sendXHR:{type:"boolean",group:"Behavior",defaultValue:false},placeholder:{type:"string",group:"Appearance",defaultValue:null},style:{type:"string",group:"Appearance",defaultValue:null},buttonOnly:{type:"boolean",group:"Appearance",defaultValue:false},useMultipart:{type:"boolean",group:"Behavior",defaultValue:true},maximumFilenameLength:{type:"int",group:"Data",defaultValue:null},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:sap.ui.core.ValueState.None},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:''},iconHovered:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:''},iconSelected:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:''},iconFirst:{type:"boolean",group:"Appearance",defaultValue:true},iconOnly:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{parameters:{type:"sap.ui.unified.FileUploaderParameter",multiple:true,singularName:"parameter"},headerParameters:{type:"sap.ui.unified.FileUploaderParameter",multiple:true,singularName:"headerParameter"}},events:{change:{parameters:{newValue:{type:"string"},files:{type:"object[]"}}},uploadComplete:{parameters:{fileName:{type:"string"},response:{type:"string"},readyStateXHR:{type:"string"},status:{type:"string"},responseRaw:{type:"string"},headers:{type:"object"},requestHeaders:{type:"object[]"}}},typeMissmatch:{parameters:{fileName:{type:"string"},fileType:{type:"string"},mimeType:{type:"string"}}},fileSizeExceed:{parameters:{fileName:{type:"string"},fileSize:{type:"string"}}},fileAllowed:{},uploadProgress:{parameters:{lengthComputable:{type:"boolean"},loaded:{type:"float"},total:{type:"float"},fileName:{type:"string"},requestHeaders:{type:"object[]"}}},uploadAborted:{parameters:{fileName:{type:"string"},requestHeaders:{type:"object[]"}}},filenameLengthExceed:{parameters:{fileName:{type:"string"}}}}}});F.prototype.init=function(){if(!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version==8){this.oFilePath=new sap.ui.commons.TextField(this.getId()+"-fu_input",{width:"225px"});this.oBrowse=new sap.ui.commons.Button({enabled:this.getEnabled(),text:"Browse..",width:"0px",height:"0px"});}else{this.oFilePath=sap.ui.unified.FileUploaderHelper.createTextField(this.getId()+"-fu_input");this.oBrowse=sap.ui.unified.FileUploaderHelper.createButton();}this.oFilePath.setParent(this);this.oBrowse.setParent(this);this.oFileUpload=null;this.bMobileLib=this.oBrowse.getMetadata().getName()=="sap.m.Button";if(!this.getIconOnly()){this.oBrowse.setText(this.getBrowseText());}};F.prototype.setButtonText=function(t){if(!this.getIconOnly()){this.oBrowse.setText(t||this.getBrowseText());this.setProperty("buttonText",t,false);return this;}};F.prototype.setIcon=function(i){this.oBrowse.setIcon(i);this.setProperty("icon",i,false);return this;};F.prototype.setIconHovered=function(i){this.setProperty("iconHovered",i,false);if(this.oBrowse.setIconHovered){this.oBrowse.setIconHovered(i);}return this;};F.prototype.setIconSelected=function(i){this.setProperty("iconSelected",i,false);if(this.oBrowse.setIconSelected){this.oBrowse.setIconSelected(i);}else{this.oBrowse.setActiveIcon(i);}return this;};F.prototype.setIconFirst=function(i){this.oBrowse.setIconFirst(i);this.setProperty("iconFirst",i,false);return this;};F.prototype.setIconOnly=function(i){this.oBrowse.setText("");this.setProperty("iconOnly",i,false);return this;};F.prototype.getIdForLabel=function(){return this.oBrowse.getId();};F.prototype.setFileType=function(t){var T=this._convertTypesToArray(t);this.setProperty("fileType",T,false);return this;};F.prototype.setMimeType=function(t){var T=this._convertTypesToArray(t);this.setProperty("mimeType",T,false);return this;};F.prototype._convertTypesToArray=function(t){if(typeof t==="string"){if(t===""){return[];}else{return t.split(",");}}return t;};F.prototype.exit=function(){this.oFilePath.destroy();this.oBrowse.destroy();if(this.oIFrameRef){q(this.oIFrameRef).unbind();sap.ui.getCore().getStaticAreaRef().removeChild(this.oIFrameRef);this.oIFrameRef=null;}};F.prototype.onBeforeRendering=function(){var s=sap.ui.getCore().getStaticAreaRef();q(this.oFileUpload).appendTo(s);q(this.oFileUpload).unbind();};F.prototype.onAfterRendering=function(){this.prepareFileUploadAndIFrame();q(this.oFileUpload).change(q.proxy(this.handlechange,this));if((!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<=8)){this.oBrowse.getDomRef().style.padding="0px";this.oBrowse.getDomRef().style.visibility="hidden";this.oFilePath.getDomRef().style.height="20px";this.oFilePath.getDomRef().style.visibility="hidden";q(this.oFilePath.getDomRef()).removeClass('sapUiTfBrd');}else{if(!this.bMobileLib){this.oFilePath.$().attr("tabindex","-1");}else{this.oFilePath.$().find('input').attr("tabindex","-1");}if((!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version==9)){this.oBrowse.$().attr("tabindex","-1");}q.sap.delayedCall(0,this,this._recalculateWidth);}};F.prototype._recalculateWidth=function(){if(this.getWidth()){if(this.getButtonOnly()&&this.oBrowse.getDomRef()){this.oBrowse.getDomRef().style.width=this.getWidth();}this._resizeDomElements();}};F.prototype.getFocusDomRef=function(){return this.$("fu").get(0);};F.prototype._resizeDomElements=function(){var i=this.getId();this._oBrowseDomRef=this.oBrowse.getDomRef();var $=q(this._oBrowseDomRef);var _=$.parent().outerWidth(true);this._oFilePathDomRef=this.oFilePath.getDomRef();var d=this._oFilePathDomRef;var w=this.getWidth();if(w.substr(-1)=="%"&&d){while(d.id!=i){d.style.width="100%";d=d.parentNode;}d.style.width=w;}else{if(d){d.style.width=w;var a=q(this._oFilePathDomRef);var b=a.outerWidth()-_;if(b<0){this.oFilePath.getDomRef().style.width="0px";if(!!!sap.ui.Device.browser.internet_explorer){this.oFileUpload.style.width=$.outerWidth(true);}}else{this.oFilePath.getDomRef().style.width=b+"px";}}}};F.prototype.onresize=function(){this._recalculateWidth();};F.prototype.onThemeChanged=function(){this._recalculateWidth();};F.prototype.setEnabled=function(e){this.setProperty("enabled",e,true);this.oFilePath.setEnabled(e);this.oBrowse.setEnabled(e);if(e){this.$("fu").removeAttr('disabled');}else{this.$("fu").attr('disabled','disabled');}return this;};F.prototype.setValueState=function(v){this.setProperty("valueState",v);if(this.oFilePath.setValueState){this.oFilePath.setValueState(v);}return this;};F.prototype.setUploadUrl=function(v,f){this.setProperty("uploadUrl",v,true);var $=this.$("fu_form");$.attr("action",this.getUploadUrl());return this;};F.prototype.setPlaceholder=function(p){this.setProperty("placeholder",p,true);this.oFilePath.setPlaceholder(p);return this;};F.prototype.setStyle=function(s){this.setProperty("style",s,true);if(s=="Transparent"){if(this.oBrowse.setLite){this.oBrowse.setLite(true);}else{this.oBrowse.setType("Transparent");}}else{if(this.oBrowse.setType){this.oBrowse.setType(s);}else{if(s=="Emphasized"){s="Emph";}this.oBrowse.setStyle(s);}}return this;};F.prototype.setValue=function(v,f,s){var o=this.getValue();if((o!=v)||this.getSameFilenameAllowed()){var u=this.getUploadOnChange()&&v;this.setProperty("value",v,u);if(this.oFilePath){this.oFilePath.setValue(v);if(!(!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version==8)&&this.oFilePath.getFocusDomRef()&&!s){this.oFilePath.getFocusDomRef().focus();}}var a=this.getDomRef("fu_form"),b=this.getDomRef("fu_input-inner");if(this.oFileUpload&&a&&!v){a.reset();this.getDomRef("fu_input").value="";if(b){b.value="";}this.$("fu_data").val(this.getAdditionalData());}if(f){if(window.File){var c=q.sap.domById(this.getId()+"-fu").files;}if(!this.getSameFilenameAllowed()||v){this.fireChange({id:this.getId(),newValue:v,files:c});}}if(u){this.upload();}}return this;};F.prototype.clear=function(){return this.setValue("",false,true);};F.prototype.onmousedown=function(e){if(!this.bMobileLib){this.oBrowse.onmousedown(e);}};F.prototype.onmouseup=function(e){if(!this.bMobileLib){this.oBrowse.onmouseup(e);}};F.prototype.onmouseover=function(e){if(!this.bMobileLib){q(this.oBrowse.getDomRef()).addClass('sapUiBtnStdHover');this.oBrowse.onmouseover(e);}};F.prototype.onmouseout=function(e){if(!this.bMobileLib){q(this.oBrowse.getDomRef()).removeClass('sapUiBtnStdHover');this.oBrowse.onmouseout(e);}};F.prototype.onfocusin=function(){if(!this.bMobileLib){q(this.oBrowse.getDomRef()).addClass('sapUiBtnStdFocus').attr("tabindex","-1");q(this.oFilePath.getDomRef()).removeClass('sapUiTfFoc');this.focus();}};F.prototype.onfocusout=function(){if(!this.bMobileLib){q(this.oBrowse.getDomRef()).removeClass('sapUiBtnStdFocus').attr("tabindex","0");}};F.prototype.setAdditionalData=function(a){this.setProperty("additionalData",a,true);var A=this.getDomRef("fu_data");if(A){var a=this.getAdditionalData()||"";A.value=a;}return this;};F.prototype.sendFiles=function(x,f,I){if(I>=f.length){return;}var t=this;var X=x[I];var s=f[I].name;if(sap.ui.Device.browser.internet_explorer&&f[I].type){var c=f[I].type;X.xhr.setRequestHeader("Content-Type",c);X.requestHeaders.push({name:"Content-Type",value:c});}var r=X.requestHeaders;var p=function(P){var o={lengthComputable:!!P.lengthComputable,loaded:P.loaded,total:P.total};t.fireUploadProgress({"lengthComputable":o.lengthComputable,"loaded":o.loaded,"total":o.total,"fileName":s,"requestHeaders":r});};var a=function(A){t.fireUploadAborted({"fileName":s,"requestHeaders":r});};X.xhr.upload.addEventListener("progress",p);X.xhr.upload.addEventListener("abort",a);X.xhr.onreadystatechange=function(){var R;var b;var h={};var P;var H;var d;var e;e=X.xhr.readyState;var S=X.xhr.status;if(X.xhr.readyState==4){if(X.xhr.responseXML){R=X.xhr.responseXML.documentElement.textContent;}b=X.xhr.response;P=X.xhr.getAllResponseHeaders();if(P){H=P.split("\u000d\u000a");for(var i=0;i<H.length;i++){if(H[i]){d=H[i].indexOf("\u003a\u0020");h[H[i].substring(0,d)]=H[i].substring(d+2);}}}t.fireUploadComplete({"fileName":s,"headers":h,"response":R,"responseRaw":b,"readyStateXHR":e,"status":S,"requestHeaders":r});I++;t.sendFiles(x,f,I);}t._bUploading=false;};X.xhr.send(f[I]);};F.prototype.upload=function(){if(!this.getEnabled()){return;}var u=this.getDomRef("fu_form");try{if(u){this._bUploading=true;if(this.getSendXHR()&&window.File){var f=q.sap.domById(this.getId()+"-fu").files;if(f.length>0){if(this.getUseMultipart()){var a=1;}else{var a=f.length;}var x=[];for(var j=0;j<a;j++){this._uploadXHR=new window.XMLHttpRequest();x[j]={xhr:this._uploadXHR,requestHeaders:[]};x[j].xhr.open("POST",this.getUploadUrl(),true);if(this.getHeaderParameters()){var h=this.getHeaderParameters();for(var i=0;i<h.length;i++){var H=h[i].getName();var v=h[i].getValue();x[j].xhr.setRequestHeader(H,v);x[j].requestHeaders.push({name:H,value:v});}}}if(this.getUseMultipart()){var b=new window.FormData();var n=q.sap.domById(this.getId()+"-fu").name;for(var i=0;i<f.length;i++){b.append(n,f[i]);}b.append("_charset_","UTF-8");var d=q.sap.domById(this.getId()+"-fu_data").name;if(this.getAdditionalData()){var D=this.getAdditionalData();b.append(d,D);}else{b.append(d,"");}if(this.getParameters()){var p=this.getParameters();for(var i=0;i<p.length;i++){var N=p[i].getName();var v=p[i].getValue();b.append(N,v);}}this.sendFiles(x,[b],0);}else{this.sendFiles(x,f,0);}this._bUploading=false;}}else{u.submit();}q.sap.log.info("File uploading to "+this.getUploadUrl());if(this.getSameFilenameAllowed()&&this.getUploadOnChange()){this.setValue("",true);}}}catch(e){q.sap.log.error("File upload failed:\n"+e.message);}};F.prototype.abort=function(){if(this._uploadXHR&&this._uploadXHR.abort){this._uploadXHR.abort();}};F.prototype.onkeypress=function(e){this.onkeydown(e);};F.prototype.onclick=function(e){if(this.getSameFilenameAllowed()){this.setValue("",true);}};F.prototype.onkeydown=function(e){if(!this.getEnabled()){return;}if(this.getSameFilenameAllowed()){this.setValue("",true);}var k=e.keyCode,a=q.sap.KeyCodes;if(k==a.DELETE||k==a.BACKSPACE){if(this.oFileUpload){this.setValue("",true);}}else if(k==a.SPACE||k==a.ENTER){if(!(!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<=9)&&this.oFileUpload){this.oFileUpload.click();e.preventDefault();e.stopPropagation();}}else if(k!=a.TAB&&k!=a.SHIFT&&k!=a.F6){e.preventDefault();e.stopPropagation();}};F.prototype._isFilenameTooLong=function(f){var m=this.getMaximumFilenameLength();if(m!==0&&f.length>m){q.sap.log.info("The filename of "+f+" ("+f.length+" characters)  is longer than the maximum of "+m+" characters.");return true;}return false;};F.prototype.handlechange=function(e){if(this.oFileUpload&&this.getEnabled()){var m=this.getMaximumFileSize();var f=this.getFileType();var M=this.getMimeType();var s='';if(window.File){var a=e.target.files;for(var i=0;i<a.length;i++){var n=a[i].name;var t=a[i].type;if(!t){t="unknown";}var S=((a[i].size/1024)/1024);if(m&&(S>m)){q.sap.log.info("File: "+n+" is of size "+S+" MB which exceeds the file size limit of "+m+" MB.");this.fireFileSizeExceed({fileName:n,fileSize:S});return;}if(this._isFilenameTooLong(n)){this.fireFilenameLengthExceed({fileName:n});return;}if(M&&M.length>0){var w=true;for(var j=0;j<M.length;j++){if(t==M[j]){w=false;}}if(w){q.sap.log.info("File: "+n+" is of type "+t+". Allowed types are: "+M+".");this.fireTypeMissmatch({fileName:n,mimeType:t});return;}}if(f&&f.length>0){var W=true;var I=n.lastIndexOf(".");var b=n.substring(I+1);for(var k=0;k<f.length;k++){if(b==f[k]){W=false;}}if(W){q.sap.log.info("File: "+n+" is of type "+b+". Allowed types are: "+f+".");this.fireTypeMissmatch({fileName:n,fileType:b});return;}}s=s+'"'+a[i].name+'" ';}if(s){this.fireFileAllowed();}}else if(f&&f.length>0){var W=true;var n=this.oFileUpload.value||"";var I=n.lastIndexOf(".");var b=n.substring(I+1);for(var k=0;k<f.length;k++){if(b==f[k]){W=false;}}if(W){q.sap.log.info("File: "+n+" is of type "+b+". Allowed types are: "+f+".");this.fireTypeMissmatch({fileName:n,fileType:b});return;}if(this._isFilenameTooLong(n)){this.fireFilenameLengthExceed({fileName:n});return;}if(n){this.fireFileAllowed();}}var v=this.oFileUpload.value||"";var c=v.lastIndexOf("\\");if(c>=0){v=v.substring(c+1);}if(this.getMultiple()){if(!(sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<=9)){v=s;}}if(v||sap.ui.Device.browser.chrome){this.setValue(v,true);}}};F.prototype.getBrowseText=function(){var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");var t;if(r){t=r.getText("FILEUPLOAD_BROWSE");}return t?t:"Browse...";};F.prototype.getShortenValue=function(){return this.getValue();};F.prototype.prepareFileUploadAndIFrame=function(){if(!this.oFileUpload){var f=[];f.push('<input ');f.push('type="file" ');if(this.getName()){if(this.getMultiple()){if(!(sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<=9)){f.push('name="'+this.getName()+'[]" ');}}else{f.push('name="'+this.getName()+'" ');}}else{if(this.getMultiple()){if(!(sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<=9)){f.push('name="'+this.getId()+'[]" ');}}else{f.push('name="'+this.getId()+'" ');}}f.push('id="'+this.getId()+'-fu" ');if(!(!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version==8)){if(!(!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version==9)){f.push('tabindex="-1" ');}f.push('size="1" ');}if(this.getTooltip_AsString()){f.push('title="'+q.sap.escapeHTML(this.getTooltip_AsString())+'" ');}else if(this.getValue()!=""){f.push('title="'+q.sap.escapeHTML(this.getValue())+'" ');}if(!this.getEnabled()){f.push('disabled="disabled" ');}if(this.getMultiple()){if(!(sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<=9)){f.push('multiple ');}}if(this.getMimeType()&&window.File){var m=this.getMimeType();var M=m.join(",");f.push('accept="'+M+'" ');}f.push('>');this.oFileUpload=q(f.join("")).prependTo(this.$().find(".sapUiFupInputMask")).get(0);}else{q(this.oFileUpload).prependTo(this.$().find(".sapUiFupInputMask"));}if(!this.oIFrameRef){var i=document.createElement("iframe");i.style.display="none";i.src="javascript:''";i.id=this.sId+"-frame";sap.ui.getCore().getStaticAreaRef().appendChild(i);i.contentWindow.name=this.sId+"-frame";var t=this;this._bUploading=false;q(i).load(function(e){if(t._bUploading){q.sap.log.info("File uploaded to "+t.getUploadUrl());var r;try{r=t.oIFrameRef.contentDocument.body.innerHTML;}catch(a){}t.fireUploadComplete({"response":r});t._bUploading=false;}});this.oIFrameRef=i;}};return F;},true);
