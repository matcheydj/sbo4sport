/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/LabelEnablement'],function(q,l,C,L){"use strict";var a=C.extend("sap.m.Label",{metadata:{interfaces:["sap.ui.core.Label","sap.ui.core.IShrinkable"],library:"sap.m",properties:{design:{type:"sap.m.LabelDesign",group:"Appearance",defaultValue:sap.m.LabelDesign.Standard},text:{type:"string",group:"Misc",defaultValue:null},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:sap.ui.core.TextAlign.Begin},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:''},required:{type:"boolean",group:"Misc",defaultValue:false}},associations:{labelFor:{type:"sap.ui.core.Control",multiple:false}}}});a.prototype.setText=function(t){var v=this.getText();if(v!==t){this.setProperty("text",t,true);this.$().html(q.sap.encodeHTML(this.getProperty("text")));if(t){this.$().removeClass("sapMLabelNoText");}else{this.$().addClass("sapMLabelNoText");}}return this;};a.prototype.setTooltip=function(t){var v=this.getTooltip();if(v!==t){this.setAggregation("tooltip",t,true);this.$().attr("title",this.getTooltip());}return this;};L.enrich(a.prototype);return a;},true);
