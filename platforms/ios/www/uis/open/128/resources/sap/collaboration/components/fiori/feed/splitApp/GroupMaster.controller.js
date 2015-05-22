/*!
 * @copyright@
 */
sap.ui.controller("sap.collaboration.components.fiori.feed.splitApp.GroupMaster",{onInit:function(){this.oOdataModel=this.getView().getViewData().odataModel;this.oBusinessObject=this.getView().getViewData().object;this.sFeedType=this.getView().getViewData().feedType;this.sPageTitle=this.getView().getViewData().pageTitle;this.sJamToken=this.getView().getViewData().jamToken;this.oLangBundle=this.getView().getViewData().langBundle;this.sPrefixId=this.getView().getViewData().controlId},onBeforeRendering:function(){var s=this;this.getView().groupMasterPage.setTitle(this.sPageTitle);this.initializeUtils();this.setViewModel();var S=new sap.m.StandardListItem();S.bindProperty("title","Name");S.setType(sap.m.ListType.Active);S.attachPress(function(){var g=this.getBindingContext().getProperty(this.getBindingContext().getPath()).Id;var G=this.getBindingContext().getProperty(this.getBindingContext().getPath()).Name;var w=s.oJamUtil.prepareWidgetData(s.sJamToken,s.sFeedType,g);s.oJamUtil.createJamWidget(s.sPrefixId+"widgetContainer",w);sap.ui.getCore().byId(s.sPrefixId+"feedDetailsPage").setTitle(G)});sap.ui.getCore().byId(this.sPrefixId+"groupsList").bindItems("/groupsData",S);var o=new sap.m.StandardListItem({title:this.oLangBundle.getText("GROUP_MASTER_LIST_All_GROUPS")});o.setType(sap.m.ListType.Active);o.attachPress(function(){var g=s.oODataUtil.getGroupIds(s.aGroupData);var w=s.oJamUtil.prepareWidgetData(s.sJamToken,s.sFeedType,g);s.oJamUtil.createJamWidget(s.sPrefixId+"widgetContainer",w);sap.ui.getCore().byId(s.sPrefixId+"feedDetailsPage").setTitle(s.oLangBundle.getText("GROUP_MASTER_LIST_All_GROUPS"))});sap.ui.getCore().byId(this.sPrefixId+"groupsList").insertItem(o,0)},onAfterRendering:function(){},initializeUtils:function(){this.oODataUtil=new sap.collaboration.components.utils.OdataUtil();this.oJamUtil=new sap.collaboration.components.utils.JamUtil()},setViewModel:function(){this.aGroupData;this.sFeedType===sap.collaboration.FeedType.group?this.aGroupData=this.oODataUtil.getGroupsData(this.oOdataModel,"/Groups"):this.aGroupData=this.oODataUtil.getGroupsData(this.oOdataModel,"/BusinessObjects('"+this.oBusinessObject.id+"')/AssignedGroups");this.oViewData={groupsData:this.aGroupData};this.oViewModel=new sap.ui.model.json.JSONModel(this.oViewData);this.getView().setModel(this.oViewModel)},onNavButtonTap:function(){sap.ui.getCore().getEventBus().publish("nav","back")}});
