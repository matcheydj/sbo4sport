/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ushell.ui.launchpad.DeleteArea");jQuery.sap.require("sap.ushell.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ushell.ui.launchpad.DeleteArea",{metadata:{library:"sap.ushell",properties:{"type":{type:"sap.ushell.ui.launchpad.DeleteAreaType",group:"Misc",defaultValue:sap.ushell.ui.launchpad.DeleteAreaType.Dashboard},"message":{type:"string",group:"Misc",defaultValue:''},"icon":{type:"string",group:"Misc",defaultValue:''}},events:{"drop":{},"tileOver":{},"tileOut":{}}}});sap.ushell.ui.launchpad.DeleteArea.M_EVENTS={'drop':'drop','tileOver':'tileOver','tileOut':'tileOut'};
// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";sap.ushell.ui.launchpad.DeleteArea.prototype.init=function(){};sap.ushell.ui.launchpad.DeleteArea.prototype.onAfterRendering=function(){if(this.getType()===sap.ushell.ui.launchpad.DeleteAreaType.Dashboard){this.jqDeleteArea_visual=this.$().find(".sapUshellDeleteArea_dashboard_visual");this.jqDeleteArea_functional=this.$().find(".sapUshellDeleteArea_dashboard_functional");this.tileOver(false)}else{this.jqDeleteArea_visual=this.$().find(".sapUshellDeleteArea_grouplist_visual");this.jqDeleteArea_functional=this.$().find(".sapUshellDeleteArea_grouplist_functional");this.groupOver(false)}this.jqDeleteArea_HoverMessage=this.jqDeleteArea_visual.siblings(".sapUshellDeleteArea_HoverMessage");if(sap.ui.Device.system.desktop){this._addDroppable()}};sap.ushell.ui.launchpad.DeleteArea.prototype.setMessage=function(m){this.setProperty("message",m,true);this.$().find(".sapUshellDeleteArea_HoverMessage").text(m)};sap.ushell.ui.launchpad.DeleteArea.prototype._addDroppable=function(){if(this.jqDeleteArea_functional.is(".ui-droppable")){return}this.jqDeleteArea_functional.droppable({greedy:'true',tolerance:'touch',accept:jQuery.proxy(this._handleAccept,this),drop:jQuery.proxy(this._handleDrop,this),over:jQuery.proxy(this._handleOver,this),out:jQuery.proxy(this._handleOut,this)})};sap.ushell.ui.launchpad.DeleteArea.prototype.tileOver=function(b){this.jqDeleteArea_functional.data("tileOver",b)};sap.ushell.ui.launchpad.DeleteArea.prototype.groupOver=function(b){this.jqDeleteArea_functional.data("groupOver",b)};sap.ushell.ui.launchpad.DeleteArea.prototype.getFunctionalArea=function(){return this.jqDeleteArea_functional};sap.ushell.ui.launchpad.DeleteArea.prototype.getVisualArea=function(){return this.jqDeleteArea_visual};sap.ushell.ui.launchpad.DeleteArea.prototype.show=function(){this.jqDeleteArea_functional.removeClass("sapUshellDeleteArea_functional_hidden").addClass("sapUshellDeleteArea_functional_show");if(this.getType()===sap.ushell.ui.launchpad.DeleteAreaType.Dashboard){if(sap.ui.Device.os.android){this.jqDeleteArea_visual.removeClass("sapUshellDeleteArea_visual_hidden").addClass("sapUshellDeleteArea_visual_show sapUshellDeleteArea_dashboard_visual_show")}else{this.jqDeleteArea_visual.switchClass("sapUshellDeleteArea_visual_hidden","sapUshellDeleteArea_visual_show sapUshellDeleteArea_dashboard_visual_show",250,"swing")}}else{if(sap.ui.Device.os.android){this.jqDeleteArea_visual.removeClass("sapUshellDeleteArea_visual_hidden").addClass("sapUshellDeleteArea_visual_show sapUshellDeleteArea_grouplist_visual_show")}else{this.jqDeleteArea_visual.switchClass("sapUshellDeleteArea_visual_hidden","sapUshellDeleteArea_visual_show sapUshellDeleteArea_grouplist_visual_show",250,"swing")}}};sap.ushell.ui.launchpad.DeleteArea.prototype.hide=function(){this.jqDeleteArea_visual.removeClass("sapUshellDeleteArea_visual_hover");if(this.getType()===sap.ushell.ui.launchpad.DeleteAreaType.Dashboard){this.jqDeleteArea_visual.switchClass("sapUshellDeleteArea_visual_show sapUshellDeleteArea_dashboard_visual_show","sapUshellDeleteArea_visual_hidden",250,"swing");this.jqDeleteArea_visual.removeClass("sapUshellDeleteArea_dashboard_visual_hover")}else{this.jqDeleteArea_visual.switchClass("sapUshellDeleteArea_visual_show sapUshellDeleteArea_grouplist_visual_show","sapUshellDeleteArea_visual_hidden",250,"swing");this.jqDeleteArea_visual.removeClass("sapUshellDeleteArea_grouplist_visual_hover")}this.jqDeleteArea_functional.removeClass("sapUshellDeleteArea_functional_show").addClass("sapUshellDeleteArea_functional_hidden");this.jqDeleteArea_HoverMessage.switchClass("","sapUshellDeleteArea_HoverMessage_Hide",50,"swing")};sap.ushell.ui.launchpad.DeleteArea.prototype._handleAccept=function(d){if(this.getType()===sap.ushell.ui.launchpad.DeleteAreaType.GroupList){return d.hasClass("sapUshellGroupListItem")}else{return true}};sap.ushell.ui.launchpad.DeleteArea.prototype._handleDrop=function(e,u){this.fireEvent("drop",{functionalArea:this.jqDeleteArea_functional,ui:u});this.jqDeleteArea_HoverMessage.switchClass("","sapUshellDeleteArea_HoverMessage_Hide",50,"swing")};sap.ushell.ui.launchpad.DeleteArea.prototype.adjustStyleOnOverIn=function(i,o){if(i){this.jqDeleteArea_visual.switchClass("","sapUshellDeleteArea_visual_hover sapUshellDeleteArea_dashboard_visual_hover",100,"swing")}else{this.jqDeleteArea_visual.switchClass("","sapUshellDeleteArea_visual_hover sapUshellDeleteArea_grouplist_visual_hover",100,"swing")}this.jqDeleteArea_HoverMessage.switchClass("sapUshellDeleteArea_HoverMessage_Hide","",150,"swing");if(o){o.addClass("sapUshellDeletedObjectTranparency")}};sap.ushell.ui.launchpad.DeleteArea.prototype._handleOver=function(e,u){var t=this,i=(this.getType()===sap.ushell.ui.launchpad.DeleteAreaType.Dashboard);if(i){this.tileOver(true)}else{if(u.draggable){var d=sap.ui.getCore().byId(u.draggable.attr('id'));if(d){this.setDeleteAreaMessage(d)}}this.groupOver(true)}this.fireTileOver();this.adjustStyleOnOverIn(i,u.helper)};sap.ushell.ui.launchpad.DeleteArea.prototype.setDeleteAreaMessage=function(e){if(e.getRemovable()){this.setMessage(sap.ushell.resources.i18n.getText("deleteAreaMsgForGroup"))}else{this.setMessage(sap.ushell.resources.i18n.getText("reset_group"))}};sap.ushell.ui.launchpad.DeleteArea.prototype.isElementOverDeleteArea=function(e){var a=e.getBoundingClientRect(),d,b,c,f;d=this.jqDeleteArea_visual[0].offsetTop;b=this.jqDeleteArea_visual[0].offsetLeft;c=a.top+a.height;f=a.left+a.width;var i=f>=b+this.jqDeleteArea_visual[0].offsetWidth/5;var g=c>=d+this.jqDeleteArea_visual[0].offsetHeight/5;return i&&g};sap.ushell.ui.launchpad.DeleteArea.prototype.adjustStyleOnOverOut=function(i,o){if(i){this.jqDeleteArea_visual.switchClass("sapUshellDeleteArea_visual_hover sapUshellDeleteArea_dashboard_visual_hover","",100,"swing")}else{this.jqDeleteArea_visual.switchClass("sapUshellDeleteArea_visual_hover sapUshellDeleteArea_grouplist_visual_hover","",100,"swing")}this.jqDeleteArea_HoverMessage.switchClass("","sapUshellDeleteArea_HoverMessage_Hide",50,"swing");if(o){o.removeClass("sapUshellDeletedObjectTranparency")}};sap.ushell.ui.launchpad.DeleteArea.prototype._handleOut=function(e,u){var t=this,i=(this.getType()===sap.ushell.ui.launchpad.DeleteAreaType.Dashboard);if(i){this.tileOver(false)}else{this.groupOver(false)}this.fireTileOut();this.adjustStyleOnOverOut(i,u.helper)}}());
