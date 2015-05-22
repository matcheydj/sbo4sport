/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Renderer','sap/ui/core/ValueStateSupport'],function(q,R,V){"use strict";var I={};I.render=function(r,c){var v=c.getValueState();var t=c.getTextDirection();var T=R.getTextAlign(c.getTextAlign(),t);r.write("<div");r.writeControlData(c);this.addOuterStyles(r,c);if(c.getWidth()){r.addStyle("width",c.getWidth());}r.writeStyles();r.addClass("sapMInputBase");this.addCursorClass(r,c);this.addOuterClasses(r,c);if(!c.getEnabled()){r.addClass("sapMInputBaseDisabled");}if(!c.getEditable()){r.addClass("sapMInputBaseReadonly");}if(v!==sap.ui.core.ValueState.None){r.addClass("sapMInputBaseState");r.addClass("sapMInputBase"+v);}r.writeClasses();this.writeOuterAttributes(r,c);var s=V.enrichTooltip(c,c.getTooltip_AsString());if(s){r.writeAttributeEscaped("title",s);}r.write(">");this.prependInnerContent(r,c);if(c._bShowLabelAsPlaceholder){r.write('<label class="sapMInputBasePlaceholder"');r.writeAttribute("id",c.getId()+"-placeholder");r.writeAttribute("for",c.getId()+"-inner");if(T){r.addStyle("text-align",T);}this.addPlaceholderStyles(r,c);r.writeStyles();r.write(">");r.writeEscaped(c._getPlaceholder());r.write("</label>");}this.openInputTag(r,c);r.writeAttribute("id",c.getId()+"-inner");if(c.getName()){r.writeAttributeEscaped("name",c.getName());}if(!c._bShowLabelAsPlaceholder&&c._getPlaceholder()){r.writeAttributeEscaped("placeholder",c._getPlaceholder());}if(c.getMaxLength&&c.getMaxLength()>0){r.writeAttribute("maxlength",c.getMaxLength());}if(!c.getEnabled()){r.writeAttribute("disabled","disabled");r.addClass("sapMInputBaseDisabledInner");}else if(!c.getEditable()){r.writeAttribute("tabindex","-1");r.writeAttribute("readonly","readonly");r.addClass("sapMInputBaseReadonlyInner");}if(t!=sap.ui.core.TextDirection.Inherit){r.writeAttribute("dir",t.toLowerCase());}this.writeInnerValue(r,c);this.writeAccessibilityState(r,c);this.writeInnerAttributes(r,c);r.addClass("sapMInputBaseInner");if(v!==sap.ui.core.ValueState.None){r.addClass("sapMInputBaseStateInner");r.addClass("sapMInputBase"+v+"Inner");}this.addInnerClasses(r,c);r.writeClasses();if(T){r.addStyle("text-align",T);}this.addInnerStyles(r,c);r.writeStyles();r.write(">");this.writeInnerContent(r,c);this.closeInputTag(r,c);r.write("</div>");};I.writeAccessibilityState=function(r,c){r.writeAccessibilityState(c);};I.writeAttributes=function(r,c){q.sap.log.warning("Usage of deprecated function: sap.m.InputBaseRenderer#writeAttributes");this.writeInnerAttributes(r,c);};I.addClasses=function(r,c){q.sap.log.warning("Usage of deprecated function: sap.m.InputBaseRenderer#addClasses");this.addOuterClasses(r,c);};I.openInputTag=function(r,c){r.write("<input");};I.writeInnerValue=function(r,c){r.writeAttributeEscaped("value",c.getValue());};I.addCursorClass=function(r,c){};I.addOuterStyles=function(r,c){};I.addOuterClasses=function(r,c){};I.writeOuterAttributes=function(r,c){};I.addInnerStyles=function(r,c){};I.addInnerClasses=function(r,c){};I.writeInnerAttributes=function(r,c){};I.prependInnerContent=function(r,c){};I.writeInnerContent=function(r,c){};I.closeInputTag=function(r,c){};I.addPlaceholderStyles=function(r,c){};return I;},true);
