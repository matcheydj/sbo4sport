/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.uiext.inbox.InboxToggleTextView");sap.ui.core.Control.extend("sap.uiext.inbox.InboxToggleTextView",{metadata:{properties:{showMore:{type:"string",defaultValue:'auto'}},aggregations:{fTV:{type:"sap.ui.commons.FormattedTextView",multiple:false,visibility:"public"},taskDescriptionLink:{type:"sap.ui.commons.Link",multiple:false,visibility:"hidden"}},events:{showMoreClick:{enablePreventDefault:true}}},init:function(){var t=this;this._oBundle=sap.ui.getCore().getLibraryResourceBundle("sap.uiext.inbox");this.setAggregation('taskDescriptionLink',new sap.ui.commons.Link({text:t._oBundle.getText("INBOX_SHOW_MORE_TEXT"),tooltip:t._oBundle.getText("INBOX_SHOW_MORE_LINK_TOOLTIP"),visible:false}).attachPress(jQuery.proxy(this.showMoreClick,this)))},renderer:{render:function(r,c){r.write("<div");r.writeControlData(c);r.addClass("InboxToggleTextView");r.writeClasses();r.write(">");r.write("<div");r.addClass("fTV");r.writeClasses();r.writeStyles();r.write(">");r.renderControl(c.getAggregation("fTV"));r.write("</div>");if(c.getAggregation('taskDescriptionLink').getVisible()){r.write("<div");r.addClass("taskDescriptionLink");r.writeClasses();r.writeStyles();r.write(">");r.renderControl(c.getAggregation("taskDescriptionLink"));r.write("</div>")}r.write("</div>")}},onAfterRendering:function(){var f=this.getAggregation('fTV');if(this.getShowMore()==='true'||(f.isClamped()&&this.getShowMore()==='auto')){this.getAggregation('taskDescriptionLink').setVisible(true)}},showMoreClick:function(e){var _=sap.ui.getCore().getLibraryResourceBundle("sap.uiext.inbox");var s=_.getText("INBOX_SHOW_MORE_TEXT");var S=_.getText("INBOX_SHOW_LESS_TEXT");if(e.getSource().getText()===s){e.getSource().setText(_.getText("INBOX_SHOW_LESS_TEXT"));e.getSource().setTooltip(_.getText("INBOX_SHOW_LESS_LINK_TOOLTIP"));this.fireShowMoreClick({text:s})}else{e.getSource().setText(s);e.getSource().setTooltip(_.getText("INBOX_SHOW_MORE_LINK_TOOLTIP"));this.fireShowMoreClick({text:S})}}});
