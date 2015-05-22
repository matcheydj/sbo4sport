/*!
 * @copyright@
 */

/*************************************************************
* AttachmentsUtil helper class
*
**************************************************************/

jQuery.sap.declare("sap.collaboration.components.fiori.sharing.helper.AttachmentsUtil");

jQuery.sap.require("sap.collaboration.components.utils.CommonUtil");

sap.ui.base.Object.extend("sap.collaboration.components.fiori.sharing.helper.AttachmentsUtil",{
	
	constructor: function(oLangBundle, oODataUtil, oJamODataModel) {
		this.oCommonUtil = new sap.collaboration.components.utils.CommonUtil();
		this.oLangBundle = oLangBundle;
		this.oODataUtil = oODataUtil;
		this.oJamODataModel = oJamODataModel;
		
	},
	
	/**
	* Creates the file selection dialog
	* @private
	*/
	createFileSelectionDialog : function(sPrefixId, oAttachmentsModel, fOnFileSelectionDialogConfirm, iWidth, iHeight) {
		
		var handleSearch = function(oEvent) {
		
			    var sValue = oEvent.getParameter("value");
			    var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, sValue);
			    var oBinding = oEvent.getSource().getBinding("items");
			    oBinding.filter([oFilter]);
		};

		this.oFileSelectionDialog = new sap.m.SelectDialog(sPrefixId + "_FileSelectionDialog",{
			multiSelect: true,
			noDataText: ' ',
			rememberSelections: true,
			title: this.oLangBundle.getText("ATTACHMENTS_FIELD_TEXT",[""]),
			confirm: fOnFileSelectionDialogConfirm,
			search: handleSearch,
			liveChange: handleSearch
		});
		
			
		if(iWidth){
			this.oFileSelectionDialog.setContentWidth(iWidth.toString() + "px");
		}
		
		if(iHeight){
			this.oFileSelectionDialog.setContentHeight(iHeight.toString() + "px");
		}
		var oItemTemplate = new sap.m.StandardListItem({
			title : "{name}",
			icon : "{icon}",
			iconDensityAware : false,
			iconInset : true,
			type : sap.m.ListType.Active,
		});
		this.oFileSelectionDialog.setModel(oAttachmentsModel);
		this.oFileSelectionDialog.bindAggregation("items","/attachments", oItemTemplate);
		
		return this.oFileSelectionDialog;
	},
	/**
	* Creates the attachments model necessary for the file selection dialog
	* @private
	*/
	createAttachmentsModel : function(aFiles){
		// create attachment model
		var aAttachments = [];
		for(var i = 0; i < aFiles.length; i++) {
			aAttachments.push( { 
				name: aFiles[i].getName(), 
				mimeType: aFiles[i].getMimeType(),
				url: aFiles[i].getUrl(),
				icon: this.oCommonUtil.getIconFromMimeType(aFiles[i].getMimeType())
			}); 
		};
		var oAttachmentsModel = new sap.ui.model.json.JSONModel({
			attachments : aAttachments			
		});
		
		return oAttachmentsModel;
	},

	
	
	/**
	* Creates the folder selection dialog
	* @private
	*/
	createFolderSelectionDialog : function(sPrefixId, sGroupId, fOnFolderSelectionDialogConfirm, fOnFolderSelectionDialogCancel, iWidth, iHeight) {
		var self = this;
		
		// Header Bar
		var fnBack = function(oEvent){
			self.oFolderSelectionDialog.getContent()[0].getController().navigateBack();
		};
		var oHeaderBar = new sap.m.Bar(sPrefixId + "_FolderSelectionDialogHeaderBar", {
			contentLeft:[new sap.m.Button(sPrefixId + "_FolderSelectionDialogHeaderBarBackButton", { type: sap.m.ButtonType.Back,
											visible: false,
											press: fnBack })],
			contentMiddle: [new sap.m.Label(sPrefixId + "_FolderSelectionDialogHeaderBarTitle", {text:this.oLangBundle.getText("TARGET_FOLDER_FIELD_TEXT")})] 
		});
		
		var oOKButton = new sap.m.Button( sPrefixId + "_FolderSelectionDialogOKButton", {
			text: this.oLangBundle.getText("OK_BUTTON_TEXT"),
			press: function(evt){ 
				fOnFolderSelectionDialogConfirm(evt);
				self.oFolderSelectionDialog.close();
			}
		});
		var oCancelButton = new sap.m.Button(sPrefixId + "_FolderSelectionDialogCancelButton", {
			text: this.oLangBundle.getText("CANCEL_BUTTON_TEXT"),
			press: function(evt){ 
				fOnFolderSelectionDialogCancel(evt);
				self.oFolderSelectionDialog.close(); 
				}
		});
		
		this.oFolderSelectionDialog = new sap.m.Dialog(sPrefixId + "_FolderSelectionDialog", {
			beginButton: oOKButton,
			endButton: oCancelButton,
			customHeader: oHeaderBar
		}).addStyleClass("sapUiPopupWithPadding");
		var oFolderSelectionDialogContent = this.createFolderSelectionView(sPrefixId, sGroupId, iWidth, iHeight);
		this.oFolderSelectionDialog.addContent(oFolderSelectionDialogContent);
		
		if(sap.ui.Device.system.phone){
			this.oFolderSelectionDialog.setStretch(true);
		}
		
		return this.oFolderSelectionDialog;
	},
	/**
	* Creates the folder selection view
	* @private
	*/
	createFolderSelectionView : function(sPrefixId, sGroupId, iWidth, iHeight) {
		var oFolderView = sap.ui.view({
			id: sPrefixId + "_FolderSelectionView", 
			viewData : {
				controlId: sPrefixId,
				groupId: sGroupId,
				languageBundle: this.oLangBundle,
				oDataUtil: this.oODataUtil,
				oDataModel: this.oJamODataModel,
				folderSelectionDialog: this.oFolderSelectionDialog
			}, 
			type: sap.ui.core.mvc.ViewType.JS, 
			viewName: "sap.collaboration.components.fiori.sharing.FolderSelection"
		});
		
		if(iWidth){
			oFolderView.setWidth(iWidth.toString() + "px");
		}
		
		if(iHeight){
			oFolderView.setHeight(iHeight.toString() + "px");
		}
		
		return oFolderView;
	},	
	/**
	 * Returns the current selected folder 
	 * @private
	 */
	getCurrentFolder: function(){
		if(this.oFolderSelectionDialog){
			return this.oFolderSelectionDialog.getContent()[0].getController().getCurrentFolder();
		}
		return {name: this.oLangBundle.getText("TARGET_FOLDER_FIELD_TEXT"), id:"" };
	},
	/**
	 * Returns the current group id 
	 * @private
	 */
	getCurrentGroupId : function(){
		return this.oFolderSelectionDialog.getContent()[0].getController().sGroupId;
	},
	/**
	 * Reset parameters of folder dialog  
	 * @private
	 */
	resetFolderSelection: function(sGroupId){
		if(this.oFolderSelectionDialog){
			this.oFolderSelectionDialog.getContent()[0].getController().sGroupId = sGroupId;
			this.oFolderSelectionDialog.getContent()[0].getController().sCurrentFolderId = '';
			this.oFolderSelectionDialog.getContent()[0].getController().aFolderBuffer = [];
		}
	},
	/**
	 * Set current folder id 
	 * @private
	 */
	setCurrentFolderId : function(sFolderId){
		this.oFolderSelectionDialog.getContent()[0].getController().sCurrentFolderId = sFolderId;
	}
	
});
