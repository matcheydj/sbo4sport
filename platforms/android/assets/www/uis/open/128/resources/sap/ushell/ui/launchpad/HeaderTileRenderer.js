// Copyright (c) 2013 SAP AG, All Rights Reserved
jQuery.sap.require("sap.ushell.resources");jQuery.sap.declare("sap.ushell.ui.launchpad.HeaderTileRenderer");sap.ushell.ui.launchpad.HeaderTileRenderer={};var translationBundle=sap.ushell.resources.i18n;
sap.ushell.ui.launchpad.HeaderTileRenderer.render=function(r,c){r.write("<");r.write(c.getHeaderLevel().toLowerCase());r.writeControlData(c);r.addClass("sapUshellHeaderTile");r.addClass("sapUiStrongBackgroundTextColor");if(!c.getVisible()){r.addClass("sapUshellHidden")}r.writeClasses();r.writeAccessibilityState(c,{label:c.getHeaderText()+translationBundle.getText("HeaderCategory")});r.write(">");r.writeEscaped(c.getHeaderText());r.write("</");r.write(c.getHeaderLevel().toLowerCase());r.write(">")};
