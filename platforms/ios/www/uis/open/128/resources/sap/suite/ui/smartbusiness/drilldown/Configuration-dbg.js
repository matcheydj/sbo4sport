jQuery.sap.declare("sap.suite.ui.smartbusiness.drilldown.Configuration");
jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");
jQuery.sap.require("sap.ca.scfld.md.app.Application");
sap.ca.scfld.md.ConfigurationBase.extend("sap.suite.ui.smartbusiness.drilldown.Configuration", {
    getServiceParams : function() {
        return [];
    },
    /**
     * @inherit
     */
    getServiceList : function() {
        return [];
    }
});