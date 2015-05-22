/*!
 * @copyright@
 */
jQuery.sap.declare("sap.collaboration.components.fiori.sharing.helper.ShareUtil");sap.ui.base.Object.extend("sap.collaboration.components.fiori.sharing.helper.ShareUtil",{constructor:function(l,o,s,c,j,C){this.oLangBundle=l;this.oODataUtil=o;this.oSMIODataModel=s;this.oJamODataModel=j;this.oCollaborationHostRestService=C;this.oCommonUtil=c;this.bShareError=false;this.bShareBusinessObjShared;this.bFileUploaded;this.aUploadAttachmentsUploaded=[];this.IdisplaySuccessMessageIntervalId},shareBusinessObject:function(s){var a=this;if(s.mappedExternalObject&&s.feedContent.uiUrl){this.oJamODataModel.create('/ExternalObjects',s.mappedExternalObject,{async:true,success:function(d,r){a._featureExternalObjectToGroup(s,d.results.Id)},error:function(e){a.displayErrorMessage()}})}else{this._createFeedEntry_ShareObjectLink(s)}},_featureExternalObjectToGroup:function(s,e){var a=this;this.oJamODataModel.create("/Groups('"+s.groupId+"')/$links/FeaturedExternalObjects",{uri:"ExternalObjects('"+e+"')"},{async:true,success:function(d,r){a._createGroupFeedEntry_SharedExternalObject(s)},error:function(E){if(E.response.statusCode==409||E.response.statusCode==400||E.response.statusCode==404){a._createGroupFeedEntry_SharedExternalObject(s)}else{a.displayErrorMessage()}}})},_createGroupFeedEntry_SharedExternalObject:function(s){var x='<?xml version="1.0" encoding="UTF-8"?>'+'<feed xmlns="http://www.w3.org/2005/Atom" xmlns:activity="http://activitystrea.ms/spec/1.0/">'+'<entry>'+'<title> </title>'+'<content type="html">'+jQuery.sap.encodeXML(s.feedContent.note)+'</content>'+'<author>'+'<email>'+jQuery.sap.encodeXML(s.memberEmail)+'</email>'+'<activity:object-type>http://activitystrea.ms/schema/1.0/person</activity:object-type>'+'</author>'+'<activity:verb>http://activitystrea.ms/schema/1.0/share</activity:verb>'+'<activity:object>'+'<id>'+jQuery.sap.encodeXML(s.mappedExternalObject.Exid)+'</id>'+'<title type="html">'+jQuery.sap.encodeXML(s.externalObject.name)+'</title>'+'<activity:object-type>'+jQuery.sap.encodeXML(s.mappedExternalObject.ObjectType)+'</activity:object-type>'+'<link type="text/html" rel="alternate" href="'+jQuery.sap.encodeXML(s.feedContent.uiUrl)+'"/>'+'<link rel="http://www.odata.org" href="'+jQuery.sap.encodeXML(s.mappedExternalObject.ODataLink)+'"/>'+'<link rel="http://www.odata.org/metadata" href="'+jQuery.sap.encodeXML(s.mappedExternalObject.ODataMetadata)+'"/>'+'<link rel="http://www.odata.org/annotation" href="'+jQuery.sap.encodeXML(s.mappedExternalObject.ODataAnnotations)+'"/>'+'<source>'+'<id>tag:www.cubetree.com,2013:/groups/'+jQuery.sap.encodeXML(s.groupId)+'</id>'+'</source>'+'</activity:object>'+'</entry>'+'</feed>';var a=this;var o=function(){if(this.readyState==4){if(this.status==200){a.bShareBusinessObjShared=true;a.displaySuccessMessage(s.groupName)}else{a.displayErrorMessage()}}};this._createFeedEntryViaRestAPI(x,o)},_createFeedEntry_ShareObjectLink:function(s){this.bShareBusinessObjShared=false;if(s.feedContent){if(s.feedContent.note!==undefined){var c=s.feedContent.note;if(s.feedContent.uiUrl){c=c+"<br/><a href='"+s.feedContent.uiUrl.replace(/'/g,"&apos;")+"'>"+this.oLangBundle.getText("SHARE_OBJECT_LINK")+'</a>'}var x='<?xml version="1.0" encoding="UTF-8"?>'+'<feed xmlns="http://www.w3.org/2005/Atom" xmlns:activity="http://activitystrea.ms/spec/1.0/">'+'<entry>'+'<title>'+jQuery.sap.encodeXML(this.oLangBundle.getText("SHARE_OBJECT_LINK_TITLE"))+'</title>'+'<content type="html">'+jQuery.sap.encodeXML(c)+'</content>'+'<author>'+'<email>'+jQuery.sap.encodeXML(s.memberEmail)+'</email>'+'<activity:object-type>http://activitystrea.ms/schema/1.0/person</activity:object-type>'+'</author>'+'<activity:verb>http://activitystrea.ms/schema/1.0/share</activity:verb>'+'<activity:object>'+'<source>'+'<id>tag:www.cubetree.com,2013:/groups/'+jQuery.sap.encodeXML(s.groupId)+'</id>'+'</source>'+'</activity:object>'+'</entry>'+'</feed>';var a=this;var o=function(){if(this.readyState==4){if(this.status==200){a.bShareBusinessObjShared=true;a.displaySuccessMessage(s.groupName)}else{a.displayErrorMessage()}}};this._createFeedEntryViaRestAPI(x,o)}else{jQuery.sap.log.debug("feedContent.note parameter should not be undefined","sap.collaboration.components.fiori.sharing.Component.createFeedEntry()");this.displayErrorMessage()}}else{jQuery.sap.log.debug("feedContent parameter should not be undefined","sap.collaboration.components.fiori.sharing.Component.createFeedEntry()");this.displayErrorMessage()}},_createFeedEntryViaRestAPI:function(x,o){if(!this.oJamODataModel.getHeaders()['x-csrf-token']){this.oJamODataModel.refreshSecurityToken()}var a={'Accept':'application/atom+xml','Content-Type':'application/atom+xml','x-csrf-token':this.oJamODataModel.getHeaders()['x-csrf-token']};var f=this.oCollaborationHostRestService.url+"/feed/post";if(this.oCollaborationHostRestService.urlParams!=undefined&&this.oCollaborationHostRestService.urlParams!=""){f=f+"?"+this.oCollaborationHostRestService.urlParams}var b=new window.XMLHttpRequest();b.open("POST",f,true);for(var h in a){b.setRequestHeader(h,a[h])}b.onreadystatechange=o;b.send(x)},uploadAttachments:function(s){var a=this;var g=s.groupId;var f=s.folderId;for(var i in s.aFilesToUpload){this.oSMIODataModel.create('/UploadTargetFile',null,{async:true,success:function(d,r){jQuery.sap.log.debug('File was uploaded',"sap.collaboration.components.fiori.sharing.Component.uploadAttachments()")},error:function(e){jQuery.sap.log.debug('Error, file was not uploaded',"sap.collaboration.components.fiori.sharing.Component.uploadAttachments()")},urlParameters:{FileMimeType:"'"+s.aFilesToUpload[i].mimeType+"'",FileName:"'"+s.aFilesToUpload[i].name+"'",FileURL:"'"+s.aFilesToUpload[i].url+"'",FolderId:"'"+s.folderId+"'",GroupId:"'"+s.groupId+"'"}})}},createGroupSelectionDialog:function(p,g,s,w,h,o){var a=this;var c=new sap.m.Button(p+"_GroupSelectionDialogCancelButton",{text:this.oLangBundle.getText("CANCEL_BUTTON_TEXT"),press:function(e){a.oGroupSelectionDialog.close()}});var G=this.createGroupSelectionView(p,g,s,w,h,o);this.oGroupSelectionDialog=new sap.m.Dialog(p+"_GroupSelectionDialog",{title:this.oLangBundle.getText("GROUP_SELECTION_DIALOG_TITLE"),content:G,beginButton:c}).addStyleClass("sapUiPopupWithPadding");if(sap.ui.Device.system.phone){this.oGroupSelectionDialog.setStretch(true)}this.oGroupSelectionDialog.refresh=function(b){};return this.oGroupSelectionDialog},createGroupSelectionView:function(p,g,s,w,h,o){var G=sap.ui.view({id:p+"_GroupSelectionView",viewData:{controlId:p,groupsLinkedToBO:g,selectGroupCallback:s,oDataModel:o},type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.collaboration.components.fiori.sharing.GroupSelection"});if(w){G.setWidth(w.toString()+"px")}if(h){G.setHeight(h.toString()+"px")}return G},displaySuccessMessage:function(g){var b=true;if(!(this.bShareBusinessObjShared===true||this.bShareBusinessObjShared===undefined)){b=false}var f=true;if(!(this.bFileUploaded===true||this.bFileUploaded===undefined)){b=false}if(this.bShareError===false){if(b===true&&f===true){this.oCommonUtil.showMessage(this.oLangBundle.getText("SHARING_SUCCESS_MSG",[g]),{width:"20em",autoClose:false});clearInterval(this.IdisplaySuccessMessageIntervalId)}}else{clearInterval(this.IdisplaySuccessMessageIntervalId)}},displayErrorMessage:function(){if(!this.bShareError){var e=this.oLangBundle.getText("SHARING_FAILURE_MSG");this.oCommonUtil.displayError(e)}this.bShareError=true}});
