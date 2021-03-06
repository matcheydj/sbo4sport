/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.landvisz.internal.HeaderListRenderer");sap.landvisz.internal.HeaderListRenderer={};
sap.landvisz.internal.HeaderListRenderer.render=function(r,c){if(!this.initializationDone){c.initControls();c.initializationDone=true;r.write("<div tabIndex='0' ");r.writeControlData(c);if(c.getSelected()){r.addClass("sapLandviszMiniNavigationSelected");if(c.getType()==sap.landvisz.LandscapeObject.TechnicalSystem)r.addClass("sapLandviszTechnicalSystem");else if(c.getType()==sap.landvisz.LandscapeObject.ProductSystem)r.addClass("sapLandviszProductSystem");else if(c.getType()==sap.landvisz.LandscapeObject.SapComponent)r.addClass("sapLandviszSapComponent");r.writeClasses()}else if(c.inDisplay==true)r.addClass("sapLandviszMiniNavigationInDisplay");else r.addClass("sapLandviszMiniNavigationNormal");r.writeClasses();r.writeAttributeEscaped("id",c.getId()+"MiniHeader");r.writeAttributeEscaped("title",c.getHeaderTooltip());r.addStyle("width",c.headerWidth+"px");r.writeStyles();r.write(">");r.write("</div>")}};
