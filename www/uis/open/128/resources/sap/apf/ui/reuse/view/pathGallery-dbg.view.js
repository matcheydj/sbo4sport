/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
sap.ui.jsview("sap.apf.ui.reuse.view.pathGallery", {
	getControllerName : function() {
		return "sap.apf.ui.reuse.controller.pathGallery";
	},
	createContent : function(oController) {
			this.viewData = this.getViewData();
	}
});