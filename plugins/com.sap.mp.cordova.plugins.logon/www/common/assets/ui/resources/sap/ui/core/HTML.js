/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP SE. All rights reserved
 */
sap.ui.define(['./library','./Control'],function(){"use strict";sap.ui.core.Control.extend("sap.ui.core.HTML",{metadata:{library:"sap.ui.core",properties:{"content":{type:"string",group:"Misc",defaultValue:null},"preferDOM":{type:"boolean",group:"Misc",defaultValue:true},"sanitizeContent":{type:"boolean",group:"Misc",defaultValue:false}},events:{"afterRendering":{}}}});sap.ui.core.HTML.M_EVENTS={'afterRendering':'afterRendering'};sap.ui.core.HTML.prototype.getDomRef=function(s){var i=s?this.getId()+"-"+s:this.getId();return jQuery.sap.domById("sap-ui-dummy-"+i)||jQuery.sap.domById(i)};sap.ui.core.HTML.prototype.setContent=function(c){function p(s){if(jQuery.parseHTML){var a=jQuery.parseHTML(s);if(a){var b=0,e=a.length;while(b<e&&a[b].nodeType!=1){b++}while(b<e&&a[e-1].nodeType!=1){e--}if(b>0||e<a.length){a=a.slice(b,e)}return jQuery(a)}}return jQuery(s)}if(this.getSanitizeContent()){c=jQuery.sap._sanitizeHTML(c)}this.setProperty("content",c,true);if(this.getDomRef()){var $=p(this.getContent());jQuery(this.getDomRef()).replaceWith($);this._postprocessNewContent($)}else{this.invalidate()}return this};sap.ui.core.HTML.prototype.onBeforeRendering=function(){if(this.getPreferDOM()&&this.getDomRef()&&!sap.ui.core.RenderManager.isPreservedContent(this.getDomRef())){sap.ui.core.RenderManager.preserveContent(this.getDomRef(),true,false)}};sap.ui.core.HTML.prototype.onAfterRendering=function(){var $=jQuery(jQuery.sap.domById("sap-ui-dummy-"+this.getId()));var a=sap.ui.core.RenderManager.findPreservedContent(this.getId());var b=undefined;var i=false;if((!this.getPreferDOM()||a.size()==0)){a.remove();b=new jQuery(this.getContent());$.replaceWith(b)}else if(a.size()>0){$.replaceWith(a);b=a;i=true}else{$.remove()}this._postprocessNewContent(b);this.fireAfterRendering({isPreservedDOM:i})};sap.ui.core.HTML.prototype._postprocessNewContent=function($){if($&&$.size()>0){if($.length>1){jQuery.sap.log.warning("[Unsupported Feature]: "+this+" has rendered "+$.length+" root nodes!")}else{var c=$.attr("id");if(c&&c!=this.getId()){jQuery.sap.log.warning("[Unsupported Feature]: Id of HTML Control '"+this.getId()+"' does not match with content id '"+c+"'!")}}sap.ui.core.RenderManager.markPreservableContent($,this.getId());if($.find("#"+this.getId().replace(/(:|\.)/g,'\\$1')).length===0){$.filter(":not([id])").first().attr("id",this.getId())}}else{jQuery.sap.log.debug(""+this+" is empty after rendering, setting bOutput to false");this.bOutput=false}};sap.ui.core.HTML.prototype.setDOMContent=function(d){var $=jQuery(d);if(this.getDomRef()){jQuery(this.getDomRef()).replaceWith($);this._postprocessNewContent($)}else{$.appendTo(sap.ui.core.RenderManager.getPreserveAreaRef());if(this.getUIArea()){this.getUIArea().invalidate()}this._postprocessNewContent($)}return this};sap.ui.core.HTML.prototype.setTooltip=function(t){jQuery.sap.log.warning("The sap.ui.core.HTML control doesn't support tooltips. Add the tooltip to the HTML content instead.");return sap.ui.core.Control.prototype.setTooltip.apply(this,arguments)};return sap.ui.core.HTML},true);
