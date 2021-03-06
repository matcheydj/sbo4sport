/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.landvisz.LongTextFieldRenderer");sap.landvisz.LongTextFieldRenderer={};
sap.landvisz.LongTextFieldRenderer.render=function(r,c){var a=sap.ui.getCore().getLibraryResourceBundle("sap.landvisz");if(!this.initializationDone){c.initControls();c.initializationDone=true;r.write("<div");r.writeControlData(c);r.addClass("sapLandviszLongTextSizeCommon");if(c.getRenderingSize()==sap.landvisz.EntityCSSSize.RegularSmall)r.addClass("sapLandviszLongTextRegularSmallSize");if(c.getRenderingSize()==sap.landvisz.EntityCSSSize.Regular)r.addClass("sapLandviszLongTextRegularSize");if(c.getRenderingSize()==sap.landvisz.EntityCSSSize.Medium)r.addClass("sapLandviszLongTextMediumSize");if(c.getRenderingSize()==sap.landvisz.EntityCSSSize.Large)r.addClass("sapLandviszLongTextLargeSize");r.writeClasses();r.write(">");var b=c.getText();c.oLongText.setWrapping(true);c.oLongText.setText(b);r.renderControl(c.oLongText);r.write("</div>")}};
