/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider'],function(q,E){"use strict";var a={EnumMember:true,Path:true,PropertyPath:true,NavigationPropertyPath:true,AnnotationPath:true};var t={Binary:true,Bool:true,Date:true,DateTimeOffset:true,Decimal:true,Duration:true,Float:true,Guid:true,Int:true,String:true,TimeOfDay:true,LabelElementReference:true,EnumMember:true,Path:true,PropertyPath:true,NavigationPropertyPath:true,AnnotationPath:true};var O=sap.ui.base.EventProvider.extend("sap.ui.model.odata.ODataAnnotations",{constructor:function(A,m,p){E.apply(this,arguments);this.oMetadata=m;this.oAnnotations=null;this.bLoaded=false;this.bAsync=p&&p.async;this.xPath=null;this.aAnnotationURI=A;this.error=null;this.bValidXML=true;this.oRequestHandles=[];this.oLoadEvent=null;this.oFailedEvent=null;this.xmlCompatVersion=false;if(A){this.loadXML();if(!this.bAsync){if(this.error){q.sap.log.error("OData annotations could not be loaded: "+this.error.message);}}}},metadata:{publicMethods:["parse","getAnnotationsData","attachFailed","detachAnnoationsFailed","attachLoaded","detachLoaded"]}});O.prototype.getAnnotationsData=function(){return this.oAnnotations;};O.prototype.isLoaded=function(){return this.bLoaded;};O.prototype.isFailed=function(){return this.error!==null;};O.prototype.fireLoaded=function(A){this.fireEvent("loaded",A);return this;};O.prototype.attachLoaded=function(d,f,l){this.attachEvent("loaded",d,f,l);return this;};O.prototype.detachLoaded=function(f,l){this.detachEvent("loaded",f,l);return this;};O.prototype.fireFailed=function(A){this.fireEvent("failed",A);return this;};O.prototype.attachFailed=function(d,f,l){this.attachEvent("failed",d,f,l);return this;};O.prototype.detachFailed=function(f,l){this.detachEvent("failed",f,l);return this;};O.prototype._parseAliases=function(x,A,o){var r=this.xPath.selectNodes(x,"//edmx:Reference",x);for(var i=0;i<r.length;i+=1){var b=this.xPath.nextNode(r,i);var c=this.xPath.selectNodes(x,"./edmx:Include",b);if(c&&c.length>0){var d=this.xPath.nextNode(c,0);if(d.getAttribute("Alias")){o[d.getAttribute("Alias")]=d.getAttribute("Namespace");}else{o[d.getAttribute("Namespace")]=d.getAttribute("Namespace");}}var e=this.xPath.selectNodes(x,"./edmx:IncludeAnnotations",b);if(e.length>0){for(var j=0;j<e.length;j+=1){var f=this.xPath.nextNode(e,j);if(f.getAttribute("TargetNamespace")){var s=f.getAttribute("TargetNamespace");if(!A[s]){A[s]={};}A[s][f.getAttribute("TermNamespace")]=b.getAttribute("Uri");}else{A[f.getAttribute("TermNamespace")]=b.getAttribute("Uri");}}}}};O.prototype.parse=function(x){var m={},s,S={},b,A={},c,T,d,e,M,f,g,h,l,n,p,o,r,u,v,w,y,z,B,C,D,F,G,i,H;var I={};this.xPath=this.getXPath();this.oServiceMetadata=this.oMetadata.getServiceMetadata();x=this.xPath.setNameSpace(x);s=this.xPath.selectNodes(x,"//d:Schema",x);for(i=0;i<s.length;i+=1){b=this.xPath.nextNode(s,i);S.Alias=b.getAttribute("Alias");S.Namespace=b.getAttribute("Namespace");}this._parseAliases(x,A,I);if(A){m.annotationReferences=A;}m.aliasDefinitions=I;c=this.xPath.selectNodes(x,"//d:Term",x);if(c.length>0){T={};for(H=0;H<c.length;H+=1){d=this.xPath.nextNode(c,H);e=this.replaceWithAlias(d.getAttribute("Type"),I);T["@"+S.Alias+"."+d.getAttribute("Name")]=e;}m.termDefinitions=T;}M=this.getAllPropertiesMetadata(this.oServiceMetadata);if(M.extensions){m.propertyExtensions=M.extensions;}f=this.xPath.selectNodes(x,"//d:Annotations ",x);for(H=0;H<f.length;H+=1){g=this.xPath.nextNode(f,H);if(g.hasChildNodes()===false){continue;}h=g.getAttribute("Target");l=h.split(".")[0];if(l&&I[l]){h=h.replace(new RegExp(l,""),I[l]);}n=h;p=null;var J=null;if(h.indexOf("/")>0){n=h.split("/")[0];var K=this.oServiceMetadata.dataServices&&this.oServiceMetadata.dataServices.schema&&this.oServiceMetadata.dataServices.schema.length;if(K){for(var j=this.oServiceMetadata.dataServices.schema.length-1;j>=0;j--){var L=this.oServiceMetadata.dataServices.schema[j];if(L.entityContainer){var N=n.split('.');for(var k=L.entityContainer.length-1;k>=0;k--){if(L.entityContainer[k].name===N[N.length-1]){J=h.replace(n+"/","");break;}}}}}if(!J){p=h.replace(n+"/","");}}if(p){if(!m.propertyAnnotations){m.propertyAnnotations={};}if(!m.propertyAnnotations[n]){m.propertyAnnotations[n]={};}if(!m.propertyAnnotations[n][p]){m.propertyAnnotations[n][p]={};}o=this.xPath.selectNodes(x,"./d:Annotation",g);for(var P=0;P<o.length;P+=1){r=this.xPath.nextNode(o,P);u=this.replaceWithAlias(r.getAttribute("Term"),I);var Q=g.getAttribute("Qualifier")||r.getAttribute("Qualifier");if(Q){u+="#"+Q;}if(r.hasChildNodes()===false){m.propertyAnnotations[n][p][u]=this.getPropertyValueAttributes(r,I);}else{m.propertyAnnotations[n][p][u]=this.getPropertyValue(x,r,I);}}}else{var R;if(J){if(!m["EntityContainer"]){m["EntityContainer"]={};}if(!m["EntityContainer"][n]){m["EntityContainer"][n]={};}R=m["EntityContainer"][n];}else{if(!m[n]){m[n]={};}R=m[n];}v=n.replace(I[l],l);o=this.xPath.selectNodes(x,"./d:Annotation",g);for(var U=0;U<o.length;U+=1){r=this.xPath.nextNode(o,U);w=g.getAttribute("Qualifier")||r.getAttribute("Qualifier");y=this.replaceWithAlias(r.getAttribute("Term"),I);if(w){y+="#"+w;}z=this.getPropertyValue(x,r,I);z=this.setEdmTypes(z,M.types,n,S);if(!J){R[y]=z;}else{if(!R[J]){R[J]={};}R[J][y]=z;}}B=this.xPath.selectNodes(x,"//d:Annotations[contains(@Target, '"+v+"')]//d:PropertyValue[contains(@Path, '/')]//@Path",x);for(i=0;i<B.length;i+=1){C=this.xPath.nextNode(B,i);D=C.value;if(m.propertyAnnotations){if(m.propertyAnnotations[n]){if(m.propertyAnnotations[n][D]){continue;}}}F=D.split('/');if(this.isNavProperty(n,F[0],this.oServiceMetadata)){if(!m.expand){m.expand={};}if(!m.expand[n]){m.expand[n]={};}m.expand[n][F[0]]=F[0];}}G=this.xPath.selectNodes(x,"//d:Annotations[contains(@Target, '"+v+"')]//d:Path[contains(., '/')]",x);for(i=0;i<G.length;i+=1){C=this.xPath.nextNode(G,i);D=this.xPath.getNodeText(C);if(m.propertyAnnotations&&m.propertyAnnotations[n]&&m.propertyAnnotations[n][D]){continue;}if(!m.expand){m.expand={};}if(!m.expand[n]){m.expand[n]={};}F=D.split('/');if(this.isNavProperty(n,F[0],this.oServiceMetadata)){if(!m.expand){m.expand={};}if(!m.expand[n]){m.expand[n]={};}m.expand[n][F[0]]=F[0];}}}}return m;};O.prototype.getXPath=function(){var x={};if(this.xmlCompatVersion){x={setNameSpace:function(o){o.setProperty("SelectionNamespaces",'xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx" xmlns:d="http://docs.oasis-open.org/odata/ns/edm"');o.setProperty("SelectionLanguage","XPath");return o;},selectNodes:function(o,x,i){return i.selectNodes(x);},nextNode:function(n){return n.nextNode();},getNodeText:function(n){return n.text;}};}else{x={setNameSpace:function(o){return o;},nsResolver:function(p){var n={"edmx":"http://docs.oasis-open.org/odata/ns/edmx","d":"http://docs.oasis-open.org/odata/ns/edm"};return n[p]||null;},selectNodes:function(o,p,i){var b=o.evaluate(p,i,this.nsResolver,7,null);b.length=b.snapshotLength;return b;},nextNode:function(n,i){return n.snapshotItem(i);},getNodeText:function(n){return n.textContent;}};}return x;};O.prototype.setXML=function(x,X,o){var d={success:function(){},error:function(){}};o=q.extend({},d,o);var b=this;var c=null;if(sap.ui.Device.browser.internet_explorer){c=new ActiveXObject("Microsoft.XMLDOM");c.preserveWhiteSpace=true;c.loadXML(X);this.xmlCompatVersion=true;}else if(x){c=x;}else{c=new DOMParser().parseFromString(X,'application/xml');}if(c.getElementsByTagName("parsererror").length>0){o.error({xmlDoc:c});return false;}else{if(q.isEmptyObject(this.oMetadata.getServiceMetadata())){this.oMetadata.attachLoaded(function(){var A=b.parse(c);if(A){o.success({annotations:A,xmlDoc:c});}else{o.error({xmlDoc:c});}});}else{var A=this.parse(c);if(A){o.success({annotations:A,xmlDoc:c});}else{o.error({xmlDoc:c});}}return true;}};O.prototype.loadXML=function(){var b=this;if(!q.isArray(this.aAnnotationURI)){this.aAnnotationURI=[this.aAnnotationURI];}var l=this.aAnnotationURI.length;this.mLoaded={length:l};var c=function(r){return function _handleFail(j,S){if(b.oRequestHandles[r]&&b.oRequestHandles[r].bSuppressErrorHandlerCall){return;}b.oRequestHandles[r]=null;b.error={message:S,statusCode:j.statusCode,statusText:j.statusText,url:b.aAnnotationURI[r],responseText:j.responseText};if(!b.bAsync){b.oFailedEvent=q.sap.delayedCall(0,b,b.fireFailed,[b.error]);}else{b.fireFailed(b.error);}};};var C=function(r,h){return function(d,T,j){b.oRequestHandles[r]=null;b.setXML(j.responseXML,j.responseText,{success:function(D){b.mLoaded[r]=D.annotations;b.checkAllLoaded();},error:function(D){b.mLoaded[r]=false;h(j,"Malformed XML document");b.checkAllLoaded();}});};};for(var i=0;i<l;++i){this.mLoaded[i]=false;var A={url:this.aAnnotationURI[i],async:this.bAsync};var f=c(i);var s=C(i,f);this.oRequestHandles[i]=q.ajax(A).done(s).fail(f);}};O.prototype.checkAllLoaded=function(){var i;var l=this.mLoaded.length;for(i=0;i<l;++i){if(!this.mLoaded[i]){return;}}this.oAnnotations={};for(i=0;i<l;++i){q.extend(true,this.oAnnotations,this.mLoaded[i]);}this.bLoaded=true;if(this.bAsync){this.fireLoaded({annotations:this.oAnnotations});}else{this.oLoadEvent=q.sap.delayedCall(0,this,this.fireLoaded,[{annotations:this.oAnnotations}]);}};O.prototype.getAllPropertiesMetadata=function(m){var M={},P={},o={},b=false,n,e,c,d={},f={},g={},h=false,r,C,s,T,u,R={types:P};if(!m.dataServices.schema){return R;}for(var i=m.dataServices.schema.length-1;i>=0;i-=1){M=m.dataServices.schema[i];if(M.entityType){n=M.namespace;e=M.entityType;c=M.complexType;for(var j in e){d=e[j];g={};f={};if(d.hasStream&&d.hasStream==="true"){continue;}for(var k in d.property){r=d.property[k];if(r.type.substring(0,n.length)===n){for(var l in c){if(c[l].name===r.type.substring(n.length+1)){for(k in c[l].property){C=c[l].property[k];f[c[l].name+"/"+C.name]=C.type;}}}}else{s=r.name;T=r.type;for(var p in r.extensions){u=r.extensions[p];if((u.name==="display-format")&&(u.value==="Date")){T="Edm.Date";}else{h=true;if(!g[s]){g[s]={};}if(u.namespace&&!g[s][u.namespace]){g[s][u.namespace]={};}g[s][u.namespace][u.name]=u.value;}}f[s]=T;}}if(!P[n+"."+d.name]){P[n+"."+d.name]={};}P[n+"."+d.name]=f;if(h){if(!o[n+"."+d.name]){b=true;}o[n+"."+d.name]={};o[n+"."+d.name]=g;}}}}if(b){R={types:P,extensions:o};}return R;};O.prototype.setEdmTypes=function(p,P,T,s){var o,e='';for(var b in p){if(p[b]){o=p[b];if(o.Value&&o.Value.Path){e=this.getEdmType(o.Value.Path,P,T,s);if(e){p[b].EdmType=e;}continue;}if(o.Path){e=this.getEdmType(o.Path,P,T,s);if(e){p[b].EdmType=e;}continue;}if(o.Facets){p[b].Facets=this.setEdmTypes(o.Facets,P,T,s);continue;}if(o.Data){p[b].Data=this.setEdmTypes(o.Data,P,T,s);continue;}if(b==="Data"){p.Data=this.setEdmTypes(o,P,T,s);continue;}if(o.Value&&o.Value.Apply){p[b].Value.Apply.Parameters=this.setEdmTypes(o.Value.Apply.Parameters,P,T,s);continue;}if(o.Value&&o.Type&&(o.Type==="Path")){e=this.getEdmType(o.Value,P,T,s);if(e){p[b].EdmType=e;}}}}return p;};O.prototype.getEdmType=function(p,P,T,s){if((p.charAt(0)==="@")&&(p.indexOf(s.Alias)===1)){p=p.slice(s.Alias.length+2);}if(p.indexOf("/")>=0){if(P[p.slice(0,p.indexOf("/"))]){T=p.slice(0,p.indexOf("/"));p=p.slice(p.indexOf("/")+1);}}for(var b in P[T]){if(p===b){return P[T][b];}}};O.prototype.getPropertyValueAttributes=function(d,A){var k="",v="",i,p={};for(i=0;i<d.attributes.length;i+=1){var s=d.attributes[i].name;if(s!=="Property"&&s!=="Term"&&s!=="Qualifier"){k=d.attributes[i].name;v=d.attributes[i].value;}if(k){p[k]=this.replaceWithAlias(v,A);}}return p;};O.prototype.getSimpleNodeValue=function(x,d){var v={};var V=this.xPath.selectNodes(x,"./d:String | ./d:Path | ./d:Apply",d);for(var i=0;i<V.length;++i){var o=this.xPath.nextNode(V,i);var b;switch(o.nodeName){case"Apply":b=this.getApplyFunctions(x,o,this.xPath);break;default:b=this.xPath.getNodeText(o);break;}v[o.nodeName]=b;}return v;};O.prototype.getPropertyValue=function(x,d,A){var p={},r,b,n,c,e,u,f,g,P={},h,j,k,l,m;var o=this.getXPath();if(d.hasChildNodes()){r=this.xPath.selectNodes(x,"./d:Record | ./d:Collection/d:Record | ./d:Collection/d:If/d:Record",d);if(r.length){b=0;for(n=0;n<r.length;n+=1){c=this.xPath.nextNode(r,n);e=this.getPropertyValues(x,c,A);if(c.getAttribute("Type")){e["RecordType"]=this.replaceWithAlias(c.getAttribute("Type"),A);}if(b===0){if(c.nextElementSibling||(c.parentNode.nodeName==="Collection")||(c.parentNode.nodeName==="If")){p=[];p.push(e);}else{p=e;}}else{p.push(e);}b+=1;}}else{u=this.xPath.selectNodes(x,"./d:UrlRef",d);if(u.length>0){for(n=0;n<u.length;n+=1){f=this.xPath.nextNode(u,n);p["UrlRef"]=this.getSimpleNodeValue(x,f);}}else{u=this.xPath.selectNodes(x,"./d:Url",d);if(u.length>0){for(n=0;n<u.length;n+=1){f=this.xPath.nextNode(u,n);p["Url"]=this.getSimpleNodeValue(x,f);}}else{m=this.xPath.selectNodes(x,"./d:Collection/d:AnnotationPath | ./d:Collection/d:PropertyPath",d);if(m.length>0){p=[];for(n=0;n<m.length;n+=1){g=this.xPath.nextNode(m,n);P={};P[g.nodeName]=o.getNodeText(g);p.push(P);}}else{p=this.getPropertyValueAttributes(d,A);h=this.xPath.selectNodes(x,"./d:Annotation",d);j={};for(k=0;k<h.length;k+=1){j=this.xPath.nextNode(h,k);if(j.hasChildNodes()===false){l=this.replaceWithAlias(j.getAttribute("Term"),A);p[l]=this.getPropertyValueAttributes(j,A);}}var s=o.selectNodes(x,"./d:*",d);if(s.length>0){for(var i=0;i<s.length;i++){var v=o.nextNode(s,i);if(v.nodeName!=="Annotation"){var V;if(v.hasChildNodes()){V=this.getPropertyValue(x,v,A);}else{V=this.getPropertyValueAttributes(v,A);}p[v.nodeName]=V;}}}else if(d.nodeName in t){if(d.nodeName in a){p=this.replaceWithAlias(this.xPath.getNodeText(d),A);}else{p=this.xPath.getNodeText(d);}if(d.nodeName!=="String"){p=p.replace(/^[ \t\n\r]*(.*?)[ \t\n\r]*$/,"$1");}}}}}}}else{p=this.getPropertyValueAttributes(d,A);}return p;};O.prototype.getPropertyValues=function(x,d,A){var p={},b={},c,n,e,f,g,h,i,j,k,l;c=this.xPath.selectNodes(x,"./d:Annotation",d);for(n=0;n<c.length;n+=1){b=this.xPath.nextNode(c,n);if(b.hasChildNodes()===false){e=this.replaceWithAlias(b.getAttribute("Term"),A);p[e]=this.getPropertyValueAttributes(b,A);}}f=this.xPath.selectNodes(x,"./d:PropertyValue",d);if(f.length>0){for(g=0;g<f.length;g+=1){h=this.xPath.nextNode(f,g);i=h.getAttribute("Property");p[i]=this.getPropertyValue(x,h,A);j=this.xPath.selectNodes(x,"./d:Apply",h);k=null;for(l=0;l<j.length;l+=1){k=this.xPath.nextNode(j,l);if(k){p[i]={};p[i]['Apply']=this.getApplyFunctions(x,k);}}}}else{p=this.getPropertyValue(x,d,A);}return p;};O.prototype.getApplyFunctions=function(x,b){var c={},p,d=null,e=[],i;p=this.xPath.selectNodes(x,"./d:*",b);for(i=0;i<p.length;i+=1){d=this.xPath.nextNode(p,i);switch(d.nodeName){case"Apply":e.push({"Type":"Apply","Value":this.getApplyFunctions(x,d)});break;case"LabeledElement":e.push({"Name":d.getAttribute("Name"),"Value":this.getSimpleNodeValue(x,d)});break;default:e.push({"Type":d.nodeName,"Value":this.xPath.getNodeText(d)});break;}}c['Name']=b.getAttribute('Function');c['Parameters']=e;return c;};O.prototype.isNavProperty=function(e,p,m){var M,i,n,b,j,k;for(i=m.dataServices.schema.length-1;i>=0;i-=1){M=m.dataServices.schema[i];if(M.entityType){n=M.namespace+".";b=M.entityType;for(k=b.length-1;k>=0;k-=1){if(n+b[k].name===e&&b[k].navigationProperty){for(j=0;j<b[k].navigationProperty.length;j+=1){if(b[k].navigationProperty[j].name===p){return true;}}}}}}return false;};O.prototype.replaceWithAlias=function(v,A){for(var s in A){if(v.indexOf(s+".")>=0&&v.indexOf("."+s+".")<0){v=v.replace(s+".",A[s]+".");return v;}}return v;};O.prototype.destroy=function(){for(var i=0;i<this.oRequestHandles.length;++i){if(this.oRequestHandles[i]){this.oRequestHandles[i].bSuppressErrorHandlerCall=true;this.oRequestHandles[i].abort();this.oRequestHandles[i]=null;}}sap.ui.base.Object.prototype.destroy.apply(this,arguments);if(this.oLoadEvent){q.sap.clearDelayedCall(this.oLoadEvent);}if(this.oFailedEvent){q.sap.clearDelayedCall(this.oFailedEvent);}};return O;},true);
