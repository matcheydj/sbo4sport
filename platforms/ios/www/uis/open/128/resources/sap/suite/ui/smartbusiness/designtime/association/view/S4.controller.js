jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");jQuery.sap.includeStyleSheet("../../resources/sap/suite/ui/smartbusiness/designtime/association/view/nameValueTable.css");sap.ca.scfld.md.controller.BaseDetailController.extend("sap.suite.ui.smartbusiness.designtime.association.view.S4",{onInit:function(){var t=this;var v=this.getView();this.oRouter.attachRouteMatched(function(e){t.viewMode=e.getParameter("name");t.directionChange=0;t.getView().byId("associationPropertyValue").setValueState("None");t.getView().byId("associationPropertyName").setValueState("None");if(e.getParameter("name")==="associationEdit"){var c=new sap.ui.model.Context(v.getModel(),'/'+(e.getParameter("arguments").contextPath));t.associationContext=new sap.ui.model.Context(v.getModel(),'/'+(e.getParameter("arguments").associationPath));v.sourceIndicatorContexts={contextPath:e.getParameter("arguments").contextPath,context:c};v.associationContexts={contextPath:e.getParameter("arguments").associationPath,context:t.associationContext};v.setBindingContext(t.associationContext);t.modelForSelectAssociation=new sap.ui.model.json.JSONModel();t.byId("associationTypeSelect").setModel(t.modelForSelectAssociation,"associationSelectModel");t.oApplicationFacade.getODataModel().read(v.associationContexts.contextPath,null,null,false,function(a){t.modelForSelectAssociation.setData({TITLE:a.TITLE,TYPE:a.TYPE});t.associationData=a;t.initialAssociationType=a.TYPE},function(){});t.sourceIndicatorModel=new sap.ui.model.json.JSONModel();t.byId("sourceIndicatorContent").setModel(t.sourceIndicatorModel,"sourceIndicator");t.targetIndicatorModel=new sap.ui.model.json.JSONModel();t.byId("targetIndicatorContent").setModel(t.targetIndicatorModel,"targetIndicator");t.associationPropertiesModel=new sap.ui.model.json.JSONModel();t.byId("propertyNameValueBox").setModel(t.associationPropertiesModel,"associationProp");if(c.getObject()){t.contextIndicatorId=v.getBindingContext().getProperty("ID")}else{this.oApplicationFacade.getODataModel().read(v.sourceIndicatorContexts.contextPath,null,null,true,function(a){t.contextIndicatorId=a.ID},function(){})}t.oApplicationFacade.getODataModel().read(v.associationContexts.contextPath+"/SOURCE_INDICATOR_INFO",null,null,false,function(a){if(a.results&&a.results.length){t.sourceIndicatorModel.setData({INDICATOR:a.results});t.byId("sourceIndicatorText").setText(t.oApplicationFacade.getResourceBundle().getText("CURRENT_KPI_OPI")+": "+(a.results[0].TITLE||""));t.initialSourceIndicatorId=a.results[0].ID}else{t.sourceIndicatorModel.setData({INDICATOR:a});t.byId("sourceIndicatorText").setText(t.oApplicationFacade.getResourceBundle().getText("CURRENT_KPI_OPI")+": "+(a.TITLE||""));t.initialSourceIndicatorId=a.ID}},function(){});t.oApplicationFacade.getODataModel().read(v.associationContexts.contextPath+"/TARGET_INDICATOR_INFO",null,null,false,function(a){if(a.results&&a.results.length){t.targetIndicatorModel.setData({INDICATOR:a.results});t.byId("selectedKpiOpiId").setValue(a.results[0].TITLE);t.initialTargetIndicatorId=a.results[0].ID}else{t.targetIndicatorModel.setData({INDICATOR:a});t.byId("selectedKpiOpiId").setValue(a.TITLE);t.initialTargetIndicatorId=a.ID}},function(){});t.oApplicationFacade.getODataModel().read(v.associationContexts.contextPath+"/PROPERTIES",null,null,true,function(a){t.associationPropertiesModel.setData({PROPERTIES:a.results});t.oldPropertiesList=$.extend(true,{},t.getView().byId('propertyNameValueBox').getModel("associationProp"))},function(){})}else if(e.getParameter("name")==="associationCreate"){t.sourceIndicatorModel=new sap.ui.model.json.JSONModel();t.byId("sourceIndicatorContent").setModel(t.sourceIndicatorModel,"sourceIndicator");t.associationData={};t.targetIndicatorModel=new sap.ui.model.json.JSONModel();t.targetIndicatorModel.setData({INDICATOR:[]});t.byId("targetIndicatorContent").setModel(t.targetIndicatorModel,"targetIndicator");t.associationPropertiesModel=new sap.ui.model.json.JSONModel();t.byId("propertyNameValueBox").setModel(t.associationPropertiesModel,"associationProp");t.associationPropertiesModel.setData({PROPERTIES:[]});t.oldPropertiesList=$.extend(true,{},t.associationPropertiesModel);this.byId("selectedKpiOpiId").setEditable(true);var c=new sap.ui.model.Context(v.getModel(),'/'+(e.getParameter("arguments").contextPath));t.associationContext=new sap.ui.model.Context(v.getModel(),'/'+(e.getParameter("arguments").associationPath));v.sourceIndicatorContexts={contextPath:e.getParameter("arguments").contextPath,context:c};v.associationContexts={contextPath:e.getParameter("arguments").associationPath,context:t.associationContext};v.setBindingContext(c);t.byId("selectedKpiOpiId").setValue("");if(c.getObject()){t.contextIndicatorId=v.getBindingContext().getProperty("ID");this.byId("sourceIndicatorText").setText(t.oApplicationFacade.getResourceBundle().getText("CURRENT_KPI_OPI")+": "+(v.getBindingContext().getProperty("TITLE")||""));t.sourceIndicatorModel.setData({INDICATOR:t.oApplicationFacade.getODataModel().oData[e.getParameter("arguments").contextPath]})}else{this.oApplicationFacade.getODataModel().read(v.sourceIndicatorContexts.contextPath,null,null,true,function(a){t.byId("sourceIndicatorText").setText(t.oApplicationFacade.getResourceBundle().getText("CURRENT_KPI_OPI")+": "+(a.TITLE||""));t.sourceIndicatorModel.setData({INDICATOR:a});t.contextIndicatorId=a.ID},function(){})}}},this);this.oHeaderFooterOptions={bSuppressBookmarkButton:{},onBack:function(){var b=new sap.m.Dialog({icon:"sap-icon://warning2",title:t.oApplicationFacade.getResourceBundle().getText("WARNING"),state:"Error",type:"Message",content:[new sap.m.Text({text:t.oApplicationFacade.getResourceBundle().getText("ON_BACK_WARNING")})],beginButton:new sap.m.Button({text:t.oApplicationFacade.getResourceBundle().getText("CONTINUE"),press:function(){if(t.viewMode=="associationEdit"){sap.suite.smartbusiness.utils.replaceHash({action:"manageSBKPIAssociation",route:"detail",context:t.getView().sourceIndicatorContexts.contextPath.replace("INDICATORS","INDICATORS_MODELER")})}else if(t.viewMode=="associationCreate"){sap.suite.smartbusiness.utils.replaceHash({action:"manageSBKPIAssociation",route:"detail",context:t.getView().sourceIndicatorContexts.contextPath})}}}),endButton:new sap.m.Button({text:t.oApplicationFacade.getResourceBundle().getText("CANCEL"),press:function(){b.close()}})});if(t.anythingChangedOnBack()==true){b.open()}else{if(t.viewMode=="associationEdit"){sap.suite.smartbusiness.utils.replaceHash({action:"manageSBKPIAssociation",route:"detail",context:t.getView().sourceIndicatorContexts.contextPath.replace("INDICATORS","INDICATORS_MODELER")})}else if(t.viewMode=="associationCreate"){sap.suite.smartbusiness.utils.replaceHash({action:"manageSBKPIAssociation",route:"detail",context:t.getView().sourceIndicatorContexts.contextPath})}}},oEditBtn:{sId:"SAVE",sI18nBtnTxt:"SAVE",onBtnPressed:function(e){v.getController().saveAndExit(0)}},buttonList:[{sI18nBtnTxt:"SAVE_AND_ACTIVATE",onBtnPressed:function(e){v.getController().saveAndExit(1);v.getController().activateAssociation()}},{sI18nBtnTxt:"SAVE_CREATE_NEW",onBtnPressed:function(e){v.getController().saveAndCreateNew()}},{sI18nBtnTxt:"CANCEL",onBtnPressed:function(e){var b=new sap.m.Dialog({icon:"sap-icon://warning2",title:t.oApplicationFacade.getResourceBundle().getText("WARNING"),state:"Error",type:"Message",content:[new sap.m.Text({text:t.oApplicationFacade.getResourceBundle().getText("ON_BACK_WARNING")})],beginButton:new sap.m.Button({text:t.oApplicationFacade.getResourceBundle().getText("CONTINUE"),press:function(){v.getController().cancel()}}),endButton:new sap.m.Button({text:t.oApplicationFacade.getResourceBundle().getText("CANCEL"),press:function(){b.close()}})});if(t.anythingChangedOnBack()==true){b.open()}else{if(t.viewMode=="associationEdit"){sap.suite.smartbusiness.utils.replaceHash({action:"manageSBKPIAssociation",route:"detail",context:t.getView().sourceIndicatorContexts.contextPath.replace("INDICATORS","INDICATORS_MODELER")})}else if(t.viewMode=="associationCreate"){sap.suite.smartbusiness.utils.replaceHash({action:"manageSBKPIAssociation",route:"detail",context:t.getView().sourceIndicatorContexts.contextPath})}}}}]};var d=t.oApplicationFacade.getResourceBundle().getText("DELETE")+" "+t.oApplicationFacade.getResourceBundle().getText("DRAFT");this.oHeaderFooterOptionsForDraft={bSuppressBookmarkButton:{},onBack:function(){var b=new sap.m.Dialog({icon:"sap-icon://warning2",title:t.oApplicationFacade.getResourceBundle().getText("WARNING"),state:"Error",type:"Message",content:[new sap.m.Text({text:t.oApplicationFacade.getResourceBundle().getText("ON_BACK_WARNING")})],beginButton:new sap.m.Button({text:t.oApplicationFacade.getResourceBundle().getText("CONTINUE"),press:function(){if(t.viewMode=="associationEdit"){sap.suite.smartbusiness.utils.replaceHash({action:"manageSBKPIAssociation",route:"detail",context:t.getView().sourceIndicatorContexts.contextPath.replace("INDICATORS","INDICATORS_MODELER")})}else if(t.viewMode=="associationCreate"){sap.suite.smartbusiness.utils.replaceHash({action:"manageSBKPIAssociation",route:"detail",context:t.getView().sourceIndicatorContexts.contextPath})}}}),endButton:new sap.m.Button({text:t.oApplicationFacade.getResourceBundle().getText("CANCEL"),press:function(){b.close()}})});if(t.anythingChangedOnBack()==true){b.open()}else{if(t.viewMode=="associationEdit"){sap.suite.smartbusiness.utils.replaceHash({action:"manageSBKPIAssociation",route:"detail",context:t.getView().sourceIndicatorContexts.contextPath.replace("INDICATORS","INDICATORS_MODELER")})}else if(t.viewMode=="associationCreate"){sap.suite.smartbusiness.utils.replaceHash({action:"manageSBKPIAssociation",route:"detail",context:t.getView().sourceIndicatorContexts.contextPath})}}},oEditBtn:{sI18nBtnTxt:"SAVE",onBtnPressed:function(e){v.getController().saveAndExit(0)}},buttonList:[{sI18nBtnTxt:"SAVE_AND_ACTIVATE",onBtnPressed:function(e){v.getController().saveAndExit(1);v.getController().activateAssociation()}},{sI18nBtnTxt:"SAVE_CREATE_NEW",onBtnPressed:function(e){v.getController().saveAndCreateNew()}},{sI18nBtnTxt:"CANCEL",onBtnPressed:function(e){var b=new sap.m.Dialog({icon:"sap-icon://warning2",title:t.oApplicationFacade.getResourceBundle().getText("WARNING"),state:"Error",type:"Message",content:[new sap.m.Text({text:t.oApplicationFacade.getResourceBundle().getText("ON_BACK_WARNING")})],beginButton:new sap.m.Button({text:t.oApplicationFacade.getResourceBundle().getText("CONTINUE"),press:function(){v.getController().cancel()}}),endButton:new sap.m.Button({text:t.oApplicationFacade.getResourceBundle().getText("CANCEL"),press:function(){b.close()}})});b.open()}},{sI18nBtnTxt:d,onBtnPressed:function(e){var c=new sap.m.Dialog({title:d,type:"Message",beginButton:new sap.m.Button({text:t.oApplicationFacade.getResourceBundle().getText("OK"),press:function(){c.close();t.deleteDraft();if(t.viewMode=="associationEdit"){sap.suite.smartbusiness.utils.replaceHash({action:"manageSBKPIAssociation",route:"detail",context:t.getView().sourceIndicatorContexts.contextPath.replace("INDICATORS","INDICATORS_MODELER")})}}}),endButton:new sap.m.Button({text:t.oApplicationFacade.getResourceBundle().getText("CANCEL"),press:function(){c.close()}})});c.open()}}]};t.byId("directionArrowAssociation").setColor(sap.ui.core.theming.Parameters.get("sapUiLightText"));t.byId("deleteAssociationProp").setColor(sap.ui.core.theming.Parameters.get("sapUiLightText"))},formOldAssociationObject:function(s){var t=this;var o={};o.TYPE=s.substring(s.indexOf("'",s.search("TYPE"))+1,s.indexOf("'",s.indexOf("'",s.search("TYPE"))+1));o.SOURCE_INDICATOR=s.substring(s.indexOf("'",s.search("SOURCE_INDICATOR"))+1,s.indexOf("'",s.indexOf("'",s.search("SOURCE_INDICATOR"))+1));o.TARGET_INDICATOR=s.substring(s.indexOf("'",s.search("TARGET_INDICATOR"))+1,s.indexOf("'",s.indexOf("'",s.search("TARGET_INDICATOR"))+1));o.IS_ACTIVE=parseInt(s.substring(s.indexOf("=",s.search("IS_ACTIVE"))+1,s.indexOf("=",s.search("IS_ACTIVE"))+2));return o},anythingChangedOnBack:function(){var t=this;var p=(t.viewMode!="associationCreate")?t.associationContext.sPath:null;var o=p?t.formOldAssociationObject(p):{TARGET_INDICATOR:"",SOURCE_INDICATOR:"",TYPE:this.byId("associationTypeSelect").getItems()[0].getKey(),IS_ACTIVE:0};var n=t.getView().byId('propertyNameValueBox').getModel("associationProp").getData().PROPERTIES;var a=t.oldPropertiesList?t.oldPropertiesList.getData().PROPERTIES:[];var u=sap.suite.smartbusiness.utils.dirtyBitCheck({oldPayload:a,newPayload:n,objectType:"ASSOCIATION_PROPERTIES"});if(o.TARGET_INDICATOR!=(t.targetIndicatorModel.getData().INDICATOR.ID||"")||t.directionChange==1||o.TYPE!=t.byId("associationTypeSelect").getSelectedItem().getKey()||u.updates.length>0||u.deletes.length>0){return true}else{return false}},deleteDraft:function(){var t=this;var p=t.associationContext.sPath;var d=t.formOldAssociationObject(p);sap.suite.smartbusiness.utils.remove(sap.suite.smartbusiness.utils.serviceUrl("ASSOCIATIONS_CUD"),d,function(a){sap.m.MessageToast.show(t.oApplicationFacade.getResourceBundle().getText("DELETION_SUCCESSFUL"))},function(e){sap.suite.smartbusiness.utils.showErrorMessage(t.oApplicationFacade.getResourceBundle().getText("DELETION_FAILED"))})},changeValueState:function(){var t=this;t.getView().byId("associationPropertyValue").setValueState("None");t.getView().byId("associationPropertyName").setValueState("None")},getHeaderFooterOptions:function(){var t=this;var p=t.associationContext.sPath;var I=parseInt(p.charAt(p.indexOf("=",p.search("IS_ACTIVE"))+1));if(t.viewMode=="associationEdit"){if(I==1){return this.oHeaderFooterOptions}else{return this.oHeaderFooterOptionsForDraft}}else if(t.viewMode=="associationCreate"){return this.oHeaderFooterOptions}},handleAssociationTypeChange:function(){var t=this;var m=this.getView().byId('propertyNameValueBox').getModel("associationProp");m.getData().PROPERTIES=m.getData().PROPERTIES||[];for(i=0;i<m.getData().PROPERTIES.length;i++){if(m.getData().PROPERTIES[i].TYPE=="SUPPORTING"){m.getData().PROPERTIES[i].TYPE="CONFLICTING"}else{m.getData().PROPERTIES[i].TYPE="SUPPORTING"}}m.updateBindings()},handleReverseAssociationDirection:function(){var t=this;if(t.directionChange==0){t.directionChange=1}else{t.directionChange=0}var i,a;var s=this.byId("sourceIndicatorContent").getModel("sourceIndicator").getData().INDICATOR;var b=this.byId("targetIndicatorContent").getModel("targetIndicator").getData().INDICATOR;if(b.length==0){this.getView().byId("selectedKpiOpiId").setValueState("Error");sap.suite.smartbusiness.utils.showErrorMessage(t.oApplicationFacade.getResourceBundle().getText("TARGET_KPI_NOT_SELECTED"))}else{this.byId("sourceIndicatorContent").getModel("sourceIndicator").setData({INDICATOR:b});this.byId("targetIndicatorContent").getModel("targetIndicator").setData({INDICATOR:s});var m=this.getView().byId('propertyNameValueBox').getModel("associationProp");m.getData().PROPERTIES=m.getData().PROPERTIES||[];for(i=0;i<m.getData().PROPERTIES.length;i++){a=null;a=m.getData().PROPERTIES[i].SOURCE_INDICATOR;m.getData().PROPERTIES[i].SOURCE_INDICATOR=m.getData().PROPERTIES[i].TARGET_INDICATOR;m.getData().PROPERTIES[i].TARGET_INDICATOR=a}m.updateBindings()}},listAllKpis:function(){var t=this;t.hanaViewValueHelpDialog=t.hanaViewValueHelpDialog||new sap.m.SelectDialog({title:t.oApplicationFacade.getResourceBundle().getText("SELECT_VIEW"),noDataText:t.oApplicationFacade.getResourceBundle().getText("NO_DATA_FOUND"),items:{path:"/INDICATORS_MODELER",template:new sap.m.ObjectListItem({title:"{TITLE}",number:"{parts:[{path:'ASSOCIATION_SOURCE_COUNT'},{path:'ASSOCIATION_TARGET_COUNT'}], formatter:'.formatAssociationCount'}",firstStatus:new sap.m.ObjectStatus({text:t.oApplicationFacade.getResourceBundle().getText("ASSOCIATIONS"),}),attributes:[new sap.m.ObjectAttribute({text:"{ID}"})]}),},confirm:function(e){var i;if(t.viewMode==="associationEdit"){}else if(t.viewMode==="associationCreate"){if(t.getView().byId("selectedKpiOpiId").getValueState()==="Error"){t.getView().byId("selectedKpiOpiId").setValueState("None")}}t.byId("selectedKpiOpiId").setValue(e.getParameter("selectedItem").getBindingContext().getProperty("TITLE"));t.targetIndicatorModel.setData({INDICATOR:e.getParameter("selectedItem").getBindingContext().getObject()});t.targetIndicatorModel.updateBindings();var m=t.getView().byId('propertyNameValueBox').getModel("associationProp");m.getData().PROPERTIES=m.getData().PROPERTIES||[];for(i=0;i<m.getData().PROPERTIES.length;i++){m.getData().PROPERTIES[i].TARGET_INDICATOR=e.getParameter("selectedItem").getBindingContext().getProperty("ID")}m.updateBindings()},liveChange:function(e){var s="'"+e.getParameter("value").toLowerCase()+"'";var F=new sap.ui.model.Filter("tolower(ID)",sap.ui.model.FilterOperator.Contains,s);var o=new sap.ui.model.Filter("tolower(TITLE)",sap.ui.model.FilterOperator.Contains,s);var a=new sap.ui.model.Filter("ID",sap.ui.model.FilterOperator.NE,t.contextIndicatorId);var b=new sap.ui.model.Filter("IS_ACTIVE",sap.ui.model.FilterOperator.EQ,1);var B=e.getSource().getBinding("items");var c=new sap.ui.model.Filter([F,o],false);var d=new sap.ui.model.Filter([a,b],true);B.filter(new sap.ui.model.Filter([c,d],true))}});t.hanaViewValueHelpDialog.setModel(t.oApplicationFacade.getODataModel());var f=[];f.push(new sap.ui.model.Filter("IS_ACTIVE",sap.ui.model.FilterOperator.EQ,1));f.push(new sap.ui.model.Filter("ID",sap.ui.model.FilterOperator.NE,t.contextIndicatorId));t.hanaViewValueHelpDialog.getBinding("items").filter(new sap.ui.model.Filter(f,true));t.hanaViewValueHelpDialog.open()},addNewProperty:function(){var t=this;var p=0;if(this.getView().byId("associationPropertyName").getValue()&&this.getView().byId("associationPropertyValue").getValue()){if(this.viewMode=="associationEdit"){this.isActiveValue=0}else if(this.viewMode=="associationCreate"){var a=this.byId("targetIndicatorContent").getModel("targetIndicator").getData().INDICATOR;if(a.length==0){this.getView().byId("selectedKpiOpiId").setValueState("Error");sap.suite.smartbusiness.utils.showErrorMessage(t.oApplicationFacade.getResourceBundle().getText("TARGET_KPI_NOT_SELECTED"));return}this.isActiveValue=0}this.getView().byId("associationPropertyName").setValueState("None");if(this.getView().byId("associationPropertyValue").getValue()){this.getView().byId("associationPropertyValue").setValueState("None");var b=this.getView().byId('propertyNameValueBox').getModel("associationProp");b.getData().PROPERTIES=b.getData().PROPERTIES||[];for(var i=0;i<b.getData().PROPERTIES.length;i++){if(b.getData().PROPERTIES[i].NAME==this.getView().byId("associationPropertyName").getValue()&&b.getData().PROPERTIES[i].VALUE==this.getView().byId("associationPropertyValue").getValue()){p=1}}if(p==0){b.getData().PROPERTIES.push({NAME:this.getView().byId("associationPropertyName").getValue(),VALUE:this.getView().byId("associationPropertyValue").getValue(),TYPE:this.byId("associationTypeSelect").getSelectedItem().getKey(),SOURCE_INDICATOR:(this.byId("sourceIndicatorContent").getModel("sourceIndicator").getData().INDICATOR.ID||this.byId("sourceIndicatorContent").getModel("sourceIndicator").getData().INDICATOR[0].ID),TARGET_INDICATOR:(this.byId("targetIndicatorContent").getModel("targetIndicator").getData().INDICATOR.ID||this.byId("targetIndicatorContent").getModel("targetIndicator").getData().INDICATOR[0].ID),IS_ACTIVE:this.isActiveValue});b.updateBindings();this.getView().byId("associationPropertyName").setValue("");this.getView().byId("associationPropertyValue").setValue("")}else{this.getView().byId("associationPropertyValue").setValueState("Error");this.getView().byId("associationPropertyName").setValueState("Error");sap.suite.smartbusiness.utils.showErrorMessage(t.oApplicationFacade.getResourceBundle().getText("ERROR_DUPLICATE_PROPERTY_VALUE"))}}else{this.getView().byId("associationPropertyValue").setValueState("Error");sap.suite.smartbusiness.utils.showErrorMessage(t.oApplicationFacade.getResourceBundle().getText("ENTER_PROPERTY_VALUE"))}}else{this.getView().byId("associationPropertyName").setValueState("Error");sap.suite.smartbusiness.utils.showErrorMessage(t.oApplicationFacade.getResourceBundle().getText("EMTER_PROPERTY_NAME"))}},removeProperty:function(e){var t=this;var p=e.getSource().getBindingContext("associationProp").getPath();e.getSource().getBindingContext("associationProp").getModel().getData().PROPERTIES.splice(p.substring(p.lastIndexOf("/")+1),1);e.getSource().getBindingContext("associationProp").getModel().updateBindings()},saveAndExit:function(i){var t=this;this.saveAssociation(i);if(i==0){if(this.viewMode=="associationEdit"){sap.suite.smartbusiness.utils.replaceHash({action:"manageSBKPIAssociation",route:"detail",context:t.getView().sourceIndicatorContexts.contextPath.replace("INDICATORS","INDICATORS_MODELER")})}else if(this.viewMode=="associationCreate"){sap.suite.smartbusiness.utils.replaceHash({action:"manageSBKPIAssociation",route:"detail",context:t.getView().sourceIndicatorContexts.contextPath})}}},activateAssociation:function(){var t=this;var s=this.byId("sourceIndicatorContent").getModel("sourceIndicator").getData().INDICATOR.length?this.byId("sourceIndicatorContent").getModel("sourceIndicator").getData().INDICATOR[0]:this.byId("sourceIndicatorContent").getModel("sourceIndicator").getData().INDICATOR;var a=this.byId("targetIndicatorContent").getModel("targetIndicator").getData().INDICATOR.length?this.byId("targetIndicatorContent").getModel("targetIndicator").getData().INDICATOR[0]:this.byId("targetIndicatorContent").getModel("targetIndicator").getData().INDICATOR;t.ODataModel=t.oApplicationFacade.getODataModel();sap.suite.smartbusiness.utils.create(sap.suite.smartbusiness.utils.serviceUrl("ACTIVATE_ASSOCIATION_SERVICE_URI"),t.payload,null,function(){sap.m.MessageToast.show(t.oApplicationFacade.getResourceBundle().getText("STATUS_ACTIVATED"));t.oApplicationFacade.getODataModel().refresh();if(t.viewMode=="associationEdit"){sap.suite.smartbusiness.utils.replaceHash({action:"manageSBKPIAssociation",route:"detail",context:t.getView().sourceIndicatorContexts.contextPath.replace("INDICATORS","INDICATORS_MODELER")})}else if(t.viewMode=="associationCreate"){sap.suite.smartbusiness.utils.replaceHash({action:"manageSBKPIAssociation",route:"detail",context:t.getView().sourceIndicatorContexts.contextPath})}},function(e){sap.suite.smartbusiness.utils.showErrorMessage(t.oApplicationFacade.getResourceBundle().getText("ASSOCIATION_ACTIVATION_FAILED"),e.responseText)})},saveAndCreateNew:function(){var t=this;this.saveAssociation();t.byId("selectedKpiOpiId").setValue("");t.targetIndicatorModel.setData({});t.targetIndicatorModel.updateBindings();var m=t.getView().byId('propertyNameValueBox').getModel("associationProp");m.getData().PROPERTIES=m.getData().PROPERTIES||[];m.getData().PROPERTIES=[];m.updateBindings()},cancel:function(){var t=this;if(t.viewMode=="associationEdit"){sap.suite.smartbusiness.utils.replaceHash({action:"manageSBKPIAssociation",route:"detail",context:t.getView().sourceIndicatorContexts.contextPath.replace("INDICATORS","INDICATORS_MODELER")})}else if(t.viewMode=="associationCreate"){sap.suite.smartbusiness.utils.replaceHash({action:"manageSBKPIAssociation",route:"detail",context:t.getView().sourceIndicatorContexts.contextPath})}},formOldObjectForAssociation:function(s,t){var a=this;var b=a.sourceIndicatorModel.getData().INDICATOR.length?a.sourceIndicatorModel.getData().INDICATOR[0]:a.sourceIndicatorModel.getData().INDICATOR;var o={TYPE:this.byId("associationTypeSelect").getSelectedItem().getKey(),SOURCE_INDICATOR:s.ID,TARGET_INDICATOR:t.ID,IS_ACTIVE:0,CREATED_BY:b.CREATED_BY,CREATED_ON:b.CREATED_ON,CHANGED_BY:null,CHANGED_ON:null};var c=a.associationContext.sPath;o.TYPE=c.substring(c.indexOf("'",c.search("TYPE"))+1,c.indexOf("'",c.indexOf("'",c.search("TYPE"))+1));o.SOURCE_INDICATOR=c.substring(c.indexOf("'",c.search("SOURCE_INDICATOR"))+1,c.indexOf("'",c.indexOf("'",c.search("SOURCE_INDICATOR"))+1));o.TARGET_INDICATOR=c.substring(c.indexOf("'",c.search("TARGET_INDICATOR"))+1,c.indexOf("'",c.indexOf("'",c.search("TARGET_INDICATOR"))+1));o.IS_ACTIVE=parseInt(c.substring(c.indexOf("=",c.search("IS_ACTIVE"))+1,c.indexOf("=",c.search("IS_ACTIVE"))+2));return o},performBatchOperation:function(b){var t=this;t.oDataModel=t.oApplicationFacade.getODataModel();t.oDataModel.addBatchChangeOperations(b);t.oDataModel.submitBatch(function(d,r,e){if(e.length){sap.suite.smartbusiness.utils.showErrorMessage(t.oApplicationFacade.getResourceBundle().getText("ASSOCIATION_SAVED_FAILED"));return}var a=false;var c=d.__batchResponses[0].__changeResponses;for(var k in c)if(c[k].statusCode!="201"&&c[k].statusCode!="204"&&c[k].statusCode!="200")a=true;if(a)sap.suite.smartbusiness.utils.showErrorMessage(t.oApplicationFacade.getResourceBundle().getText("ASSOCIATION_SAVED_FAILED"));else{sap.m.MessageToast.show(t.oApplicationFacade.getResourceBundle().getText("ASSOCIATION_SAVED"))}},function(e){sap.suite.smartbusiness.utils.showErrorMessage(t.oApplicationFacade.getResourceBundle().getText("ASSOCIATION_SAVED_FAILED"))},false)},savePropertiesHelper:function(a,u,s,t,b){var c=this;c.batchArray=[];var p;var d=[];c.oDataModel=c.oApplicationFacade.getODataModel();for(var i=0;i<a.PROPERTIES.length;i++){p={};p.IS_ACTIVE=0;p.TYPE=a.PROPERTIES[i].TYPE;p.NAME=a.PROPERTIES[i].NAME;p.VALUE=a.PROPERTIES[i].VALUE;p.SOURCE_INDICATOR=a.PROPERTIES[i].SOURCE_INDICATOR;p.TARGET_INDICATOR=a.PROPERTIES[i].TARGET_INDICATOR;d.push(p)}if((c.viewMode==="associationEdit"&&!(c.associationData.IS_ACTIVE))||(c.viewMode==="associationEdit"&&c.associationData.IS_ACTIVE&&b)){var f={};f.DELETE={};f.CREATE={};var c=this;var s=this.byId("sourceIndicatorContent").getModel("sourceIndicator").getData().INDICATOR.length?this.byId("sourceIndicatorContent").getModel("sourceIndicator").getData().INDICATOR[0]:this.byId("sourceIndicatorContent").getModel("sourceIndicator").getData().INDICATOR;var t=this.byId("targetIndicatorContent").getModel("targetIndicator").getData().INDICATOR.length?this.byId("targetIndicatorContent").getModel("targetIndicator").getData().INDICATOR[0]:this.byId("targetIndicatorContent").getModel("targetIndicator").getData().INDICATOR;c.ODataModel=c.oApplicationFacade.getODataModel();c.payload={TYPE:c.byId("associationTypeSelect").getSelectedItem().getKey(),SOURCE_INDICATOR:s.ID,TARGET_INDICATOR:t.ID};if(u.updates.length!=0){var e=c.associationContext.sPath;c.batchArray.push(c.oDataModel.createBatchOperation(e,"DELETE"));c.batchArray.push(c.oDataModel.createBatchOperation("/ASSOCIATIONS","POST",u.updates[0]))}var o=c.oldPropertiesList.getData().PROPERTIES;var g=sap.suite.smartbusiness.utils.dirtyBitCheck({oldPayload:o,newPayload:d,objectType:"ASSOCIATION_PROPERTIES"});if(u.updates.length!=0){f.DELETE={"TYPE":u.deletes[0].TYPE,"SOURCE_INDICATOR":u.deletes[0].SOURCE_INDICATOR,"TARGET_INDICATOR":u.deletes[0].TARGET_INDICATOR,"IS_ACTIVE":u.deletes[0].IS_ACTIVE,"PROPERTY":o};f.CREATE={"TYPE":u.updates[0].TYPE,"SOURCE_INDICATOR":u.updates[0].SOURCE_INDICATOR,"TARGET_INDICATOR":u.updates[0].TARGET_INDICATOR,"IS_ACTIVE":u.updates[0].IS_ACTIVE,"PROPERTY":d};sap.suite.smartbusiness.utils.update(sap.suite.smartbusiness.utils.serviceUrl("ASSOCIATIONS_CUD"),f,null,function(){sap.m.MessageToast.show(c.oApplicationFacade.getResourceBundle().getText("ASSOCIATION_SAVED"));c.oApplicationFacade.getODataModel().refresh()},function(k){sap.suite.smartbusiness.utils.showErrorMessage(c.oApplicationFacade.getResourceBundle().getText("ASSOCIATION_SAVED_FAILED"),k.responseText)})}else{if(g.deletes.length>0){f.TYPE=g.deletes[0].TYPE;f.TARGET_INDICATOR=g.deletes[0].TARGET_INDICATOR;f.SOURCE_INDICATOR=g.deletes[0].SOURCE_INDICATOR;f.IS_ACTIVE=g.deletes[0].IS_ACTIVE}if(g.updates.length>0){f.TYPE=g.updates[0].TYPE;f.TARGET_INDICATOR=g.updates[0].TARGET_INDICATOR;f.SOURCE_INDICATOR=g.updates[0].SOURCE_INDICATOR;f.IS_ACTIVE=g.updates[0].IS_ACTIVE}f.PROPERTY={remove:g.deletes,create:g.updates};delete f.CREATE;delete f.DELETE;sap.suite.smartbusiness.utils.update(sap.suite.smartbusiness.utils.serviceUrl("ASSOCIATIONS_CUD"),f,null,function(){sap.m.MessageToast.show(c.oApplicationFacade.getResourceBundle().getText("ASSOCIATION_SAVED"));c.oApplicationFacade.getODataModel().refresh()},function(k){sap.suite.smartbusiness.utils.showErrorMessage(c.oApplicationFacade.getResourceBundle().getText("ASSOCIATION_SAVED_FAILED"),k.responseText)})}}if(c.viewMode==="associationCreate"||(c.viewMode==="associationEdit"&&c.associationData.IS_ACTIVE&&!b)){var h=c.sourceIndicatorModel.getData().INDICATOR.length?c.sourceIndicatorModel.getData().INDICATOR[0]:c.sourceIndicatorModel.getData().INDICATOR;var j={TYPE:c.byId("associationTypeSelect").getSelectedItem().getKey(),SOURCE_INDICATOR:s.ID,TARGET_INDICATOR:t.ID,IS_ACTIVE:0,CREATED_BY:h.CREATED_BY,CREATED_ON:h.CREATED_ON,CHANGED_BY:null,CHANGED_ON:null};c.finalAssociationPayload={};c.finalAssociationPayload.TYPE=j.TYPE;c.finalAssociationPayload.SOURCE_INDICATOR=j.SOURCE_INDICATOR;c.finalAssociationPayload.TARGET_INDICATOR=j.TARGET_INDICATOR;c.finalAssociationPayload.IS_ACTIVE=j.IS_ACTIVE;c.finalAssociationPayload.PROPERTY=d;var s=this.byId("sourceIndicatorContent").getModel("sourceIndicator").getData().INDICATOR.length?this.byId("sourceIndicatorContent").getModel("sourceIndicator").getData().INDICATOR[0]:this.byId("sourceIndicatorContent").getModel("sourceIndicator").getData().INDICATOR;var t=this.byId("targetIndicatorContent").getModel("targetIndicator").getData().INDICATOR.length?this.byId("targetIndicatorContent").getModel("targetIndicator").getData().INDICATOR[0]:this.byId("targetIndicatorContent").getModel("targetIndicator").getData().INDICATOR;c.ODataModel=c.oApplicationFacade.getODataModel();c.payload={TYPE:c.byId("associationTypeSelect").getSelectedItem().getKey(),SOURCE_INDICATOR:s.ID,TARGET_INDICATOR:t.ID};sap.suite.smartbusiness.utils.create(sap.suite.smartbusiness.utils.serviceUrl("ASSOCIATIONS_CUD"),c.finalAssociationPayload,null,function(){sap.m.MessageToast.show(c.oApplicationFacade.getResourceBundle().getText("ASSOCIATION_SAVED"));c.oApplicationFacade.getODataModel().refresh()},function(k){sap.suite.smartbusiness.utils.showErrorMessage(c.oApplicationFacade.getResourceBundle().getText("ASSOCIATION_SAVED_FAILED"),k.responseText)})}},saveAssociationHelper:function(s,t,i){var a=this;var b={};if(a.sourceIndicatorModel.getData().INDICATOR.length){b=a.sourceIndicatorModel.getData().INDICATOR[0]}else{b=a.sourceIndicatorModel.getData().INDICATOR}var c={TYPE:a.byId("associationTypeSelect").getSelectedItem().getKey(),SOURCE_INDICATOR:s.ID,TARGET_INDICATOR:t.ID,IS_ACTIVE:0,CREATED_BY:b.CREATED_BY,CREATED_ON:b.CREATED_ON,CHANGED_BY:null,CHANGED_ON:null};var d={PROPERTIES:a.getView().byId('propertyNameValueBox').getModel("associationProp").getData().PROPERTIES};var u=null;if((a.viewMode==="associationEdit"&&!(a.associationData.IS_ACTIVE))||(a.viewMode==="associationEdit"&&a.associationData.IS_ACTIVE&&i)){var o=a.formOldObjectForAssociation(s,t);u=sap.suite.smartbusiness.utils.dirtyBitCheck({oldPayload:o,newPayload:c,objectType:"ASSOCIATIONS"});a.savePropertiesHelper(d,u,s,t,i)}else if(a.viewMode==="associationCreate"||(a.viewMode==="associationEdit"&&a.associationData.IS_ACTIVE)){a.savePropertiesHelper(d,u,s,t)}},saveAssociation:function(i){var t=this;var s={};var a={};if(this.byId("sourceIndicatorContent").getModel("sourceIndicator").getData().INDICATOR.length&&this.byId("targetIndicatorContent").getModel("targetIndicator").getData().INDICATOR.length){s=this.byId("sourceIndicatorContent").getModel("sourceIndicator").getData().INDICATOR[0];a=this.byId("targetIndicatorContent").getModel("targetIndicator").getData().INDICATOR[0]}else{s=this.byId("sourceIndicatorContent").getModel("sourceIndicator").getData().INDICATOR;a=this.byId("targetIndicatorContent").getModel("targetIndicator").getData().INDICATOR}var p={};if(this.viewMode==="associationEdit"){t.saveAssociationHelper(s,a,i)}else if(t.viewMode==="associationCreate"){if(a==null){sap.suite.smartbusiness.utils.showErrorMessage(t.oApplicationFacade.getResourceBundle().getText("SELECT_A_KPI_TO_ASSOCIATE"));t.byId("selectedKpiOpiId").setValueState(sap.ui.core.ValueState.Error)}else{t.saveAssociationHelper(s,a,i)}t.oApplicationFacade.getODataModel().refresh()}},onBeforeRendering:function(){},onAfterRendering:function(){},onExit:function(){}});
