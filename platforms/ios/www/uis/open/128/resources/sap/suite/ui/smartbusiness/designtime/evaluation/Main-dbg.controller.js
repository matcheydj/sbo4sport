sap.ui.controller("sap.suite.ui.smartbusiness.designtime.evaluation.Main", {

	onInit : function() {
		jQuery.sap.require("sap.ca.scfld.md.Startup");				
		sap.ca.scfld.md.Startup.init('sap.suite.ui.smartbusiness.designtime.evaluation', this);
	}
});
