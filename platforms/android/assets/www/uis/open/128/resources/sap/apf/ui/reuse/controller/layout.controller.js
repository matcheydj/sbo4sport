/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
sap.ui.controller("sap.apf.ui.reuse.controller.layout",{onInit:function(){this.oCoreApi=this.getView().getViewData().oCoreApi;this.oUiApi=this.getView().getViewData().uiApi;this.oUiApi.initializeContextHandling();var a=this.oCoreApi.getApplicationConfigProperties().appName;this.applicationTitle=this.oCoreApi.getTextNotHtmlEncoded(a);this.getView().byId("application").addStyleClass("sapApfHeader");this.getView().byId("application").setText(this.applicationTitle);var m=this.oUiApi.getNotificationBar();this.getView().byId("applicationPage").addContent(m);var c=m.initializeHandler;this.oCoreApi.setCallbackForMessageHandling(c.bind(m));this.loadLayout()},loadLayout:function(){var c=this.oUiApi.getStepContainer();var a=this.oUiApi.getAnalysisPath();this.getView().byId("application").setText(this.applicationTitle);this.getView().byId("masterFooter").addStyleClass("applicationFooter");this.getView().byId("detailFooter").addStyleClass("applicationFooter");this.getView().byId("stepContainer").addContent(c);this.getView().byId("analysisPath").addContent(a)},onAfterRendering:function(){this.oUiApi.drawFacetFilter();var s=this;var a=new sap.m.Button({text:this.oCoreApi.getTextNotHtmlEncoded("showAnalyticalPath"),press:function(){s.getView().byId("applicationView").showMaster()},lite:true,type:"Transparent"});this.getView().byId("applicationView").attachAfterMasterClose(function(){s.getView().byId("detailFooter").removeContentLeft(a);s.addDetailFooterContentLeft(a)});this.getView().byId("applicationView").attachAfterMasterOpen(function(){if(s.getView().byId('detailFooter')){s.getView().byId("detailFooter").removeAllContentLeft()}});if(this.getView().byId("applicationView").isMasterShown()===false){this.addDetailFooterContentLeft(a)}},hideMaster:function(){if(sap.ui.Device.system.phone||sap.ui.Device.system.tablet){this.getView().byId("applicationView").hideMaster();if(sap.ui.Device.system.phone){this.getView().byId("applicationView").toDetail(this.getView().byId("stepContainer").getId())}}},showMaster:function(){this.getView().byId("applicationView").showMaster()},addMasterFooterContentLeft:function(c){this.getView().byId("masterFooter").addContentLeft(c)},addMasterFooterContentRight:function(c){if(this.getView().byId("masterFooter").getContentRight().length===0){this.getView().byId("masterFooter").insertContentRight(c)}else{this.addMasterFooterContent(c)}},addMasterFooterContent:function(c){var s=this;if(this.oActionListPopover===undefined){this.oActionListPopover=new sap.m.Popover({showHeader:false,placement:sap.m.PlacementType.Top})}if(typeof c.getWidth==="function"){c.setWidth("100%")}if(this.footerContentButton===undefined){this.getView().byId("masterFooter").getContentRight()[0].setWidth("71%");this.footerContentButton=new sap.m.Button({text:'...',press:function(e){s.oActionListPopover.openBy(e.getSource())},lite:true,type:"Transparent"})}this.oActionListPopover.addContent(c);this.getView().byId("masterFooter").insertContentRight(this.footerContentButton,1)},addDetailFooterContentLeft:function(c){this.getView().byId("detailFooter").addContentLeft(c)},addFacetFilter:function(f){this.getView().byId("subHeader").addItem(f)}});