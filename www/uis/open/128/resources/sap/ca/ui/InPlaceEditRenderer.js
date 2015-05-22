/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.InPlaceEditRenderer");sap.ca.ui.InPlaceEditRenderer={};
sap.ca.ui.InPlaceEditRenderer.render=function(r,i){var c=i.getContent();var w;if(c){if(c.getWidth){w=c.getWidth()}if(c.getVisible&&!c.getVisible()){return}}else{return}r.write("<div");r.writeControlData(i);r.addClass("sapCaUiIpe");if(!i.getEditable()){r.addClass("sapCaUiIpeRo")}else if(!i._bEditMode){r.writeAttribute("tabindex","-1");if(!i._sOldTextAvailable){if(c instanceof sap.m.Select){r.addClass("sapCaUiIpeCombo")}}if(c instanceof sap.m.Link){r.addClass("sapCaUiIpeLink")}}else{r.addClass("sapCaUiIpeEdit")}if(w){r.addStyle("width",w)}if(i.getUndoEnabled()&&i._sOldTextAvailable&&(!i._bEditMode||(i._bEditMode&&i._oEditControl.getValue()!=i._sOldText))){r.addClass("sapCaUiIpeUndo")}switch(i.getValueState()){case sap.ui.core.ValueState.Error:r.addClass('sapCaUiIpeErr');break;case sap.ui.core.ValueState.Success:r.addClass('sapCaUiIpeSucc');break;case sap.ui.core.ValueState.Warning:r.addClass('sapCaUiIpeWarn');break;default:break}r.writeClasses();r.writeStyles();r.write(">");if(i._sOldTextAvailable||c instanceof sap.m.Link){r.write("<div");r.addClass("sapCaUiIpeCont");r.addClass("sapCaUiIpeCont");if(c instanceof sap.m.Select){r.addClass("sapCaUiIpeCombo")}r.writeClasses();r.write(">")}if(i._bEditMode){this.renderEditContent(r,i)}else{this.renderDisplayContent(r,i)}if(i._sOldTextAvailable||c instanceof sap.m.Link){r.write("</div>");if(i.getUndoEnabled()&&i._sOldTextAvailable){r.renderControl(i._oUndoButton)}}r.write("</div>")};
sap.ca.ui.InPlaceEditRenderer.renderDisplayContent=function(r,i){if(i._oDisplayControl){r.renderControl(i._oDisplayControl);if(i.getEditable()&&i._oDisplayControl instanceof sap.m.Link){r.renderControl(i._oEditButton)}}};
sap.ca.ui.InPlaceEditRenderer.renderEditContent=function(r,i){if(i._oEditControl){r.renderControl(i._oEditControl)}};
