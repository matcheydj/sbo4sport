//Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";var p="sap.ushell.components.container.",c=p+"ApplicationContainer",d="sap.ushell.Container.dirtyState.",l,r;jQuery.sap.declare("sap.ushell.components.container.ApplicationContainer");jQuery.sap.require("sap.ushell.utils");jQuery.sap.require("sap.ushell.library");jQuery.sap.require("sap.ui.core.UIComponent");l=new sap.ushell.utils.Map();sap.ushell.components.container.ApplicationType={URL:"URL",WDA:"WDA",NWBC:"NWBC"};sap.ushell.utils.testPublishAt(sap.ushell.components.container);function g(C){return l.get(C.getId())}sap.ushell.utils.testPublishAt(sap.ushell.components.container);function a(u){return jQuery.sap.getUriParameters(u).mParams}sap.ushell.utils.testPublishAt(sap.ushell.components.container);function b(K,A){if(!r){r=jQuery.sap.resources({url:jQuery.sap.getModulePath(p)+"/resources/resources.properties",language:sap.ui.getCore().getConfiguration().getLanguage()})}return r.getText(K,A)}sap.ushell.utils.testPublishAt(sap.ushell.components.container);function f(){return new sap.ui.core.Icon({size:"2rem",src:"sap-icon://error",tooltip:b("an_error_has_occured")})}sap.ushell.utils.testPublishAt(sap.ushell.components.container);function h(C){var e=C.getAggregation("child"),u;if(e instanceof sap.ui.core.ComponentContainer){u=e.getComponentInstance().getMetadata().getName().replace(/\.Component$/,"");jQuery.sap.log.debug("unloading component "+u,null,c)}C.destroyAggregation("child")}sap.ushell.utils.testPublishAt(sap.ushell.components.container);function i(C,u,A){var e,v,I,L,M,N,V,w,x;I=u.indexOf("?");if(I>=0){V=a(u);u=u.slice(0,I)}if(u.slice(-1)!=='/'){u+='/'}if(/\.view\.(\w+)$/i.test(A)){M=/^SAPUI5=(?:([^\/]+)\/)?([^\/]+)\.view\.(\w+)$/i.exec(A);if(!M){jQuery.sap.log.error("Invalid SAPUI5 URL",A,c);return f()}N=M[1];w=M[2];x=M[3].toUpperCase();if(N){w=N+"."+w}else{L=w.lastIndexOf(".");if(L<1){jQuery.sap.log.error("Missing namespace",A,c);return f()}N=w.slice(0,L)}}else{N=A.replace(/^SAPUI5=/,"")}jQuery.sap.registerModulePath(N,u+N.replace(/\./g,'/'));h(C);if(w){v=sap.ui.view({id:C.getId()+"-content",type:x,viewData:V||{},viewName:w});C.fireEvent("applicationConfiguration")}else{jQuery.sap.log.debug("loading component "+N,null,c);e=sap.ui.component({id:C.getId()+"-component",componentData:V?{startupParameters:V}:{},name:N});C.fireEvent("applicationConfiguration",{"configuration":e.getMetadata().getConfig()});v=new sap.ui.core.ComponentContainer({id:C.getId()+"-content",component:e})}v.setWidth(C.getWidth());v.setHeight(C.getHeight());v.addStyleClass("sapUShellApplicationContainer");C.setAggregation("child",v,true);return v}sap.ushell.utils.testPublishAt(sap.ushell.components.container);function j(C,u,e){var I,v,w,x={};I=u.indexOf("?");if(I>=0){x={startupParameters:a(u)};u=u.slice(0,I)}if(u.slice(-1)!=='/'){u+='/'}jQuery.sap.registerModulePath(e,u);jQuery.sap.require("sap.ushell.services.CrossApplicationNavigation");h(C);jQuery.sap.log.debug("loading component "+e,null,c);v=sap.ui.component({id:C.getId()+"-component",name:e,componentData:x});C.fireEvent("applicationConfiguration",{"configuration":v.getMetadata().getConfig()});w=new sap.ui.core.ComponentContainer({id:C.getId()+"-content",component:v});w.setHeight(C.getHeight());w.setWidth(C.getWidth());w.addStyleClass("sapUShellApplicationContainer");C.setAggregation("child",w,true);return w}sap.ushell.utils.testPublishAt(sap.ushell.components.container);function k(u){var A=document.createElement("a"),C=jQuery.sap.getUriParameters(u).get("sap-client"),B;A.href=u;B=A.protocol+"//"+A.host;return new sap.ushell.System({alias:C?B+"?sap-client="+C:B,baseUrl:B,client:C||undefined,platform:"abap"})}function m(C,M){var T=false,D=C.getDomRef(),A=C.getApplicationType(),u,O;if(D){if(A===sap.ushell.components.container.ApplicationType.NWBC){u=URI(D.src);O=u.protocol()+"://"+u.host();T=(M.source===D.contentWindow)||(M.origin===O)}else if(A===sap.ushell.components.container.ApplicationType.URL){u=URI();O=u.protocol()+"://"+u.host();T=(M.origin===O)}}return T}sap.ushell.utils.testPublishAt(sap.ushell.components.container);function n(C,M,e){var P=jQuery.sap.getObject("sap-ushell-config.services.PostMessage.config",0),S=e&&e.service;if(!(S&&(S.indexOf("sap.ushell.services.CrossApplicationNavigation")===0))){return}if(!(P&&P.enabled===true)){jQuery.sap.log.error("Received message for CrossApplicationNavigation, but this feature is disabled."+" It can be enabled via launchpad configuration property 'services.PostMessage.config.enabled: true'",undefined,"sap.ushell.components.container.ApplicationContainer");return}if(!m(C,M)){jQuery.sap.log.warning("Received message from untrusted origin: "+M.origin,M.data,"sap.ushell.components.container.ApplicationContainer");return}if(e.service==="sap.ushell.services.CrossApplicationNavigation.hrefForExternal"&&e.type==="request"){M.source.postMessage(JSON.stringify({type:"response",service:e.service,request_id:e.request_id,status:"success",body:{result:sap.ushell.Container.getService("CrossApplicationNavigation").hrefForExternal(e.body.args)}}),M.origin)}else if(e.service==="sap.ushell.services.CrossApplicationNavigation.getSemanticObjectLinks"){try{sap.ushell.Container.getService("CrossApplicationNavigation").getSemanticObjectLinks(e.body.semanticObject,e.body.parameters,e.body.ignoreFormFactors).done(function(R){M.source.postMessage(JSON.stringify({type:"response",service:e.service,request_id:e.request_id,status:"success",body:{result:R}}),M.origin)})}catch(E){M.source.postMessage(JSON.stringify({type:"response",service:e.service,request_id:e.request_id,status:"error",body:{message:E.message}}),M.origin)}}else if(e.service==="sap.ushell.services.CrossApplicationNavigation.isIntentSupported"){sap.ushell.Container.getService("CrossApplicationNavigation").isIntentSupported(e.body.intents).done(function(R){M.source.postMessage(JSON.stringify({type:"response",service:e.service,request_id:e.request_id,status:"success",body:{result:R}}),M.origin)})}else if(e.service==="sap.ushell.services.CrossApplicationNavigation.toExternal"&&e.type==="request"){sap.ushell.Container.getService("CrossApplicationNavigation").toExternal(e.body.args);M.source.postMessage(JSON.stringify({type:"response",service:e.service,request_id:e.request_id,status:"success",body:{}}),M.origin)}}sap.ushell.utils.testPublishAt(sap.ushell.components.container);function o(C,M){var u=M.data;if(typeof u==="string"){try{u=JSON.parse(M.data)}catch(e){jQuery.sap.log.debug("Message received from origin '"+M.origin+"' cannot be parsed: "+e,u,"sap.ushell.components.container.ApplicationContainer");return}}if(u.action==="pro54_setGlobalDirty"&&localStorage.getItem(C.globalDirtyStorageKey)===sap.ushell.Container.DirtyState.PENDING){if(!m(C,M)){jQuery.sap.log.warning("Received message from untrusted origin: "+M.origin,u,"sap.ushell.components.container.ApplicationContainer");return}jQuery.sap.log.debug("getGlobalDirty() pro54_setGlobalDirty SetItem key:"+C.globalDirtyStorageKey+" value: "+u.parameters.globalDirty,null,"sap.ushell.components.container.ApplicationContainer");sap.ushell.utils.localStorageSetItem(C.globalDirtyStorageKey,u.parameters.globalDirty,true)}else{n(C,M,u)}}sap.ushell.utils.testPublishAt(sap.ushell.components.container);function q(C,e){var I=C.getDomRef();if(C.getApplicationType()===sap.ushell.components.container.ApplicationType.NWBC&&I&&I.tagName==="IFRAME"){I.contentWindow.postMessage(JSON.stringify({action:"pro54_disableDirtyHandler"}),'*');e.preventDefault()}}sap.ushell.utils.testPublishAt(sap.ushell.components.container);function s(R,C,e){R.write("<div").writeControlData(C).writeAccessibilityState(C).addClass("sapUShellApplicationContainer").writeClasses(C).addStyle("height",C.getHeight()).addStyle("width",C.getWidth()).writeStyles().write(">").renderControl(e);R.write("</div>")}sap.ushell.utils.testPublishAt(sap.ushell.components.container);function t(R,C,A,u,e){var L;localStorage.removeItem(C.globalDirtyStorageKey);if(e&&e.indexOf("SAPUI5.Component=")===0&&A===sap.ushell.components.container.ApplicationType.URL){s(R,C,j(C,u,e.replace(/^SAPUI5\.Component=/,"")));return}if(e&&e.indexOf("SAPUI5=")===0&&A===sap.ushell.components.container.ApplicationType.URL){s(R,C,i(C,u,e));return}jQuery.sap.log.debug("Not resolved as \"SAPUI5.Component=\" or \"SAPUI5=\" , "+"will attempt to load into iframe "+e);try{u=C.getFrameSource(A,u,e)}catch(v){jQuery.sap.log.error(v.message||v,null,c);C.fireEvent("applicationConfiguration");R.renderControl(f());return}if(sap.ushell.Container){L=g(C);if(!L){if(A===sap.ushell.components.container.ApplicationType.NWBC){L=q.bind(null,C);l.put(C.getId(),L);sap.ushell.Container.attachLogoutEvent(L);sap.ushell.Container.addRemoteSystem(k(u))}}else{if(A!==sap.ushell.components.container.ApplicationType.NWBC){sap.ushell.Container.detachLogoutEvent(L);l.remove(C.getId())}}}if(A===sap.ushell.components.container.ApplicationType.NWBC){sap.ushell.utils.localStorageSetItem(C.globalDirtyStorageKey,sap.ushell.Container.DirtyState.INITIAL)}C.fireEvent("applicationConfiguration");R.write("<iframe").writeControlData(C).writeAccessibilityState(C).writeAttributeEscaped("src",u).addClass("sapUShellApplicationContainer").writeClasses(C).addStyle("height",C.getHeight()).addStyle("width",C.getWidth()).writeStyles().write("></iframe>")}sap.ui.core.Control.extend(c,{metadata:{properties:{additionalInformation:{defaultValue:"",type:"string"},application:{type:"object"},applicationType:{defaultValue:"URL",type:p+"ApplicationType"},height:{defaultValue:"100%",type:"sap.ui.core.CSSSize"},url:{defaultValue:"",type:"string"},visible:{defaultValue:true,type:"boolean"},width:{defaultValue:"100%",type:"sap.ui.core.CSSSize"}},events:{"applicationConfiguration":{}},aggregations:{child:{multiple:false,type:"sap.ui.core.Control",visibility:"hidden"}},library:"sap.ushell"},exit:function(){var L;if(sap.ushell.Container){L=g(this);if(L){sap.ushell.Container.detachLogoutEvent(L);l.remove(this.getId())}}localStorage.removeItem(this.globalDirtyStorageKey);if(this._unloadEventListener){removeEventListener("unload",this._unloadEventListener)}if(this._storageEventListener){removeEventListener("storage",this._storageEventListener)}if(this._messageEventListener){removeEventListener("message",this._messageEventListener)}h(this);if(sap.ui.core.Control.exit){sap.ui.core.Control.exit.apply(this)}},init:function(){var e=this;this.globalDirtyStorageKey=d+jQuery.sap.uid();this._unloadEventListener=this.exit.bind(this);addEventListener("unload",this._unloadEventListener);this._storageEventListener=function(S){if(S.key===e.globalDirtyStorageKey&&S.newValue===sap.ushell.Container.DirtyState.PENDING&&e.getApplicationType()===sap.ushell.components.container.ApplicationType.NWBC){var I=e.getDomRef();if(I&&I.tagName==="IFRAME"){jQuery.sap.log.debug("getGlobalDirty() send pro54_getGlobalDirty ",null,"sap.ushell.components.container.ApplicationContainer");I.contentWindow.postMessage(JSON.stringify({action:"pro54_getGlobalDirty"}),'*')}}};addEventListener('storage',this._storageEventListener);this._messageEventListener=o.bind(null,this);addEventListener('message',this._messageEventListener)},renderer:function(R,C){var A=C.getApplication(),L=C.launchpadData,e;if(!C.getVisible()){s(R,C);return}if(C.error){delete C.error;s(R,C,f())}else if(!A){t(R,C,C.getApplicationType(),C.getUrl(),C.getAdditionalInformation())}else if(!A.isResolvable()){t(R,C,A.getType(),A.getUrl(),"")}else if(L){t(R,C,L.applicationType,L.Absolute.url.replace(/\?$/,""),L.applicationData)}else{jQuery.sap.log.debug("Resolving "+A.getUrl(),null,c);A.resolve(function(u){jQuery.sap.log.debug("Resolved "+A.getUrl(),JSON.stringify(u),c);C.launchpadData=u;h(C)},function(E){var u=A.getMenu().getDefaultErrorHandler();if(u){u(E)}h(C);C.error=E});e=new sap.m.Text({text:b("loading",[A.getText()])});h(C);C.setAggregation("child",e);s(R,C,e)}}});sap.ushell.components.container.ApplicationContainer.prototype.getFrameSource=function(A,u,e){if(!Object.prototype.hasOwnProperty.call(sap.ushell.components.container.ApplicationType,A)){throw new Error("Illegal application type: "+A)}return u}}());
