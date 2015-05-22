/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./CustomStyleClassSupport','./Element'],function(q,C,E){"use strict";var a=E.extend("sap.ui.core.Control",{metadata:{stereotype:"control","abstract":true,publicMethods:["placeAt","attachBrowserEvent","detachBrowserEvent"],library:"sap.ui.core",properties:{"busy":{type:"boolean",defaultValue:false},"busyIndicatorDelay":{type:"int",defaultValue:1000},"visible":{type:"boolean",group:"Appearance",defaultValue:true}}},constructor:function(i,s){this.bAllowTextSelection=true;E.apply(this,arguments);this.bOutput=this.getDomRef()!=null;if(this._sapUiCoreLocalBusy_initBusyIndicator){this._sapUiCoreLocalBusy_initBusyIndicator();}},renderer:null});a.prototype.clone=function(){var c=E.prototype.clone.apply(this,arguments);if(this.aBindParameters){for(var i=0,l=this.aBindParameters.length;i<l;i++){var p=this.aBindParameters[i];c.attachBrowserEvent(p.sEventType,p.fnHandler,p.oListener!==this?p.oListener:undefined);}}c.bAllowTextSelection=this.bAllowTextSelection;return c;};C.apply(a.prototype);a.prototype.isActive=function(){return q.sap.domById(this.sId)!=null;};a.prototype.invalidate=function(o){var u;if(this.bOutput&&(u=this.getUIArea())){if(!this._bIsBeingDestroyed){u.addInvalidatedControl(this);}}else{var p=this.getParent();if(p&&(this.bOutput||!(this.getVisible&&this.getVisible()===false))){p.invalidate(this);}}};a.prototype.rerender=function(){sap.ui.core.UIArea.rerenderControl(this);};a.prototype.allowTextSelection=function(A){this.bAllowTextSelection=A;return this;};a.prototype.attachBrowserEvent=function(e,h,l){if(e&&(typeof(e)==="string")){if(h&&typeof(h)==="function"){if(!this.aBindParameters){this.aBindParameters=[];}l=l||this;var p=function(){h.apply(l,arguments);};this.aBindParameters.push({sEventType:e,fnHandler:h,oListener:l,fnProxy:p});if(!this._sapui_bInAfterRenderingPhase){this.$().bind(e,p);}}}return this;};a.prototype.detachBrowserEvent=function(e,h,l){if(e&&(typeof(e)==="string")){if(h&&typeof(h)==="function"){var $=this.$(),i,p;l=l||this;if(this.aBindParameters){for(i=this.aBindParameters.length-1;i>=0;i--){p=this.aBindParameters[i];if(p.sEventType===e&&p.fnHandler===h&&p.oListener===l){this.aBindParameters.splice(i,1);$.unbind(e,p.fnProxy);}}}}}return this;};a.prototype.getRenderer=function(){return sap.ui.core.RenderManager.getRenderer(this);};a.prototype.placeAt=function(r,p){var c=sap.ui.getCore();if(c.isInitialized()){var o=r;if(typeof o==="string"){o=c.byId(r);}var i=false;if(!(o instanceof E)){o=c.createUIArea(r);i=true;}if(!o){return this;}if(!i){var b=o.getMetadata().getAggregation("content");var d=true;if(b){if(!b.multiple||b.type!="sap.ui.core.Control"){d=false;}}else{if(!o.addContent||!o.insertContent||!o.removeAllContent){d=false;}}if(!d){q.sap.log.warning("placeAt cannot be processed because container "+o+" does not have an aggregation 'content'.");return this;}}if(typeof p==="number"){o.insertContent(this,p);}else{p=p||"last";switch(p){case"last":o.addContent(this);break;case"first":o.insertContent(this,0);break;case"only":o.removeAllContent();o.addContent(this);break;default:q.sap.log.warning("Position "+p+" is not supported for function placeAt.");}}}else{var t=this;c.attachInitEvent(function(){t.placeAt(r,p);});}return this;};a.prototype.onselectstart=function(b){if(!this.bAllowTextSelection){b.preventDefault();b.stopPropagation();}};a.prototype.getIdForLabel=function(){return this.getId();};a.prototype.destroy=function(s){this._bIsBeingDestroyed=true;this._cleanupBusyIndicator();sap.ui.core.ResizeHandler.deregisterAllForControl(this.getId());E.prototype.destroy.call(this,s);};(function(){var p="focusin focusout keydown keypress keyup mousedown touchstart mouseup touchend click",b={onAfterRendering:function(){if(this.getProperty("busy")===true&&this.$()){A.apply(this);}}},A=function(){var $=this.$(this._sBusySection),F=["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"];if(this._busyIndicatorDelayedCallId){q.sap.clearDelayedCall(this._busyIndicatorDelayedCallId);delete this._busyIndicatorDelayedCallId;}var t=$.get(0)&&$.get(0).tagName;if(t&&q.inArray(t.toLowerCase(),F)>=0){q.sap.log.warning("Busy Indicator cannot be placed in elements with tag "+t);return;}if($.css('position')=='static'){this._busyStoredPosition='static';$.css('position','relative');}var B=q('<div class="sapUiLocalBusyIndicator"><div class="sapUiLocalBusyIndicatorAnimation"><div class="sapUiLocalBusyIndicatorBox"></div><div class="sapUiLocalBusyIndicatorBox"></div><div class="sapUiLocalBusyIndicatorBox"></div></div></div>');B.attr("id",this.getId()+"-busyIndicator");$.append(B);$.addClass('sapUiLocalBusy');if(this._busyDelayedCallId){q.sap.clearDelayedCall(this._busyDelayedCallId);}this._busyDelayedCallId=q.sap.delayedCall(1200,this,f);h.apply(this,[true]);},h=function(B){var $=this.$(this._sBusySection);if(B){var t=$.find('[tabindex]'),c=this;this._busyTabIndices=[];this._busyTabIndices.push({ref:$,tabindex:$.attr('tabindex')});$.attr('tabindex',-1);$.bind(p,P);t.each(function(i,o){var r=q(o),T=r.attr('tabindex');if(T<0){return true;}c._busyTabIndices.push({ref:r,tabindex:T});r.attr('tabindex',-1);r.bind(p,P);});}else{if(this._busyTabIndices){q.each(this._busyTabIndices,function(i,o){o.ref.attr('tabindex',o.tabindex);o.ref.unbind(p,P);});}this._busyTabIndices=[];}},P=function(e){e.preventDefault();e.stopImmediatePropagation();},f=function(){var $=this.$(this._sBusySection).children('.sapUiLocalBusyIndicator').children('.sapUiLocalBusyIndicatorAnimation');var t=this;t._busyAnimationTimer1=setTimeout(function(){$.children(":eq(0)").addClass('active');$.children(":not(:eq(0))").removeClass('active');t._busyAnimationTimer2=setTimeout(function(){$.children(":eq(1)").addClass('active');$.children(":not(:eq(1))").removeClass('active');t._busyAnimationTimer3=setTimeout(function(){$.children(":eq(2)").addClass('active');$.children(":not(:eq(2))").removeClass('active');t._busyAnimationTimer4=setTimeout(function(){$.children().removeClass('active');},150);},150);},150);},150);this._busyDelayedCallId=q.sap.delayedCall(1200,this,f);};a.prototype.setBusy=function(B,s){this._sBusySection=s;var $=this.$(this._sBusySection);if(B==this.getProperty("busy")){return;}this.setProperty("busy",B,true);if(B){this.addDelegate(b,false,this);}else{this.removeDelegate(b);if(this._busyIndicatorDelayedCallId){q.sap.clearDelayedCall(this._busyIndicatorDelayedCallId);delete this._busyIndicatorDelayedCallId;}}if(!this.getDomRef()){return;}if(B){if(this.getBusyIndicatorDelay()<=0){A.apply(this);}else{this._busyIndicatorDelayedCallId=q.sap.delayedCall(this.getBusyIndicatorDelay(),this,A);}}else{this.$("busyIndicator").remove();this.$().removeClass('sapUiLocalBusy');if(this._busyStoredPosition){$.css('position',this._busyStoredPosition);delete this._busyStoredPosition;}h.apply(this,[false]);if(this._busyDelayedCallId){q.sap.clearDelayedCall(this._busyDelayedCallId);delete this._busyDelayedCallId;}}};a.prototype.isBusy=function(){return this.getProperty("busy");};a.prototype.setBusyIndicatorDelay=function(d){this.setProperty("busyIndicatorDelay",d,true);return this;};a.prototype._cleanupBusyIndicator=function(){if(this._busyIndicatorDelayedCallId){q.sap.clearDelayedCall(this._busyIndicatorDelayedCallId);delete this._busyIndicatorDelayedCallId;}if(this._busyDelayedCallId){q.sap.clearDelayedCall(this._busyDelayedCallId);delete this._busyDelayedCallId;}if(this._busyAnimationTimer1){clearTimeout(this._busyAnimationTimer1);delete this._busyAnimationTimer1;}if(this._busyAnimationTimer2){clearTimeout(this._busyAnimationTimer2);delete this._busyAnimationTimer2;}if(this._busyAnimationTimer3){clearTimeout(this._busyAnimationTimer3);delete this._busyAnimationTimer3;}if(this._busyAnimationTimer4){clearTimeout(this._busyAnimationTimer4);delete this._busyAnimationTimer4;}};})();return a;},true);
