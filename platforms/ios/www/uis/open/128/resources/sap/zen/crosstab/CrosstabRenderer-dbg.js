jQuery.sap.declare("sap.zen.crosstab.CrosstabRenderer");
jQuery.sap.require("sap.zen.crosstab.rendering.RenderingConstants");

/**
 * @class Crosstab renderer.
 * @static
 */
sap.zen.crosstab.CrosstabRenderer = {};

/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 * 
 * @param {sap.ui.core.RenderManager}
 *            oRenderManager the RenderManager that can be used for writing to the Render-Output-Buffer
 * @param {sap.ui.core.Control}
 *            oControl an object representation of the control that should be rendered
 */
sap.zen.crosstab.CrosstabRenderer.render = function (oRenderManager, oControl) {
	"use strict";
	// convenience variable
	var rm = oRenderManager;
	var sClasses = "";

	var sCrosstabWidth = oControl.getWidth();
	if (sCrosstabWidth === "auto") {
		sCrosstabWidth = "100%";
	}
	var sCrosstabHeight = oControl.getHeight();
	if (sCrosstabHeight === "auto") {
		sCrosstabHeight = "100%";
	}

	// write the HTML into the render manager
	rm.write("<div");
	rm.writeControlData(oControl);
	rm.addStyle("overflow", "hidden");
	if (sCrosstabWidth) {
		rm.addStyle("width", sCrosstabWidth);
	}
	if (sCrosstabHeight) {
		rm.addStyle("height", sCrosstabHeight);
	}

	if (oControl.aCustomStyleClasses && oControl.aCustomStyleClasses.length > 0) {
		var i = 0;
		for (i = 0; i < oControl.aCustomStyleClasses.length; i++) {
			sClasses = sClasses + oControl.aCustomStyleClasses[i] + " ";
		}
	}

	if (oControl.getRenderMode() === sap.zen.crosstab.rendering.RenderingConstants.RENDERMODE_FILL) {
		rm.addStyle("visibility", "hidden");
		sClasses += "sapzencrosstab-TableDiv sapzencrosstab-TableDivBackground";
	}

	rm.writeAttribute("class", sClasses);

	rm.writeStyles();
	rm.write(">");

	if (oControl.getRenderMode() === sap.zen.crosstab.rendering.RenderingConstants.RENDERMODE_COMPACT) {
		rm.write("<div");
		rm.writeAttribute("id", oControl.getId() + "_altRenderModeTableDiv");
		rm.addStyle("visibility", "hidden");
		rm.addStyle("width", "100%");
		rm.addStyle("height", "100%");
		rm.writeAttribute("class", "sapzencrosstab-TableDiv sapzencrosstab-TableDivBackground");
		rm.writeStyles();
		rm.write(">");
	}

	rm.write("<div");
	rm.writeAttribute("id", oControl.getId() + "_renderSizeDiv");
	rm.writeAttribute("class", "sapzencrosstab-RenderSizeDiv");
	rm.write(">");

	rm.write("<table");
	rm.writeAttribute("id", oControl.getId() + "_table");
	rm.writeAttribute("class", "sapzencrosstab-Crosstab");
	rm.write(">"); // table element

	// first row
	rm.write("<tr");
	rm.writeAttribute("id", oControl.getId() + "_upperSection");
	rm.write(">");

	sap.zen.crosstab.CrosstabRenderer.writeCell(rm, oControl.getId() + "_upperLeft", oControl.getDimensionHeaderArea(),
			oControl);
	sap.zen.crosstab.CrosstabRenderer.writeCell(rm, oControl.getId() + "_upperRight", oControl.getColumnHeaderArea(),
			oControl);

	rm.write("</tr>");

	// second row
	rm.write("<tr");
	rm.writeAttribute("id", oControl.getId() + "_lowerSection");
	rm.write(">");

	sap.zen.crosstab.CrosstabRenderer.writeCell(rm, oControl.getId() + "_lowerLeft", oControl.getRowHeaderArea(),
			oControl);
	sap.zen.crosstab.CrosstabRenderer.writeCell(rm, oControl.getId() + "_lowerRight", oControl.getDataArea(), oControl);

	rm.write("</tr>");

	rm.write("</table>");
	rm.write("</div>");

	// Toolbar
	if (oControl.getPropertyBag().hasToolbar()) {
		rm.write("<div");
		rm.writeAttribute("id", oControl.getId() + "_toolbar");
		rm.writeAttribute("class", "sapzencrosstab-ToolbarDiv");
		rm.addStyle("position", "absolute");
		rm.addStyle("bottom", "0px");
		rm.writeStyles();
		rm.write(">");
		rm.write("</div>");
	}
	
	rm.write("<div");
	rm.writeAttribute("id", oControl.getId() + "_resizeFrame");
	rm.writeAttribute("class", "sapzencrosstab-TableDiv");
	rm.addStyle("visibility", "hidden");
	rm.addStyle("width", sCrosstabWidth);
	rm.addStyle("height", sCrosstabHeight);
	rm.writeStyles();
	rm.write(">");
	rm.write("</div>");

	rm.write("<div");
	rm.writeAttribute("id", oControl.getId() + "_resizeDiv");
	rm.writeAttribute("class", "sapzencrosstab-ResizeDiv");
	rm.addStyle("width", "100%");
	rm.addStyle("height", "100%");
	rm.addStyle("visibility", "hidden");
	rm.writeStyles();
	rm.write(">");
	rm.write("</div>");

	rm.write("<div");
	rm.writeAttribute("id", oControl.getId() + "_loadingAnimationDiv");
	rm.writeAttribute("class", "sapzencrosstab-loadingAnimationDiv");
	rm.addStyle("visibility", "hidden");
	rm.writeStyles();
	rm.write(">");

	rm.write("<div");
	rm.writeAttribute("class", "sapzencrosstab-loadingAnimation");
	rm.write(">");
	rm.write("</div>");

	rm.write("</div>");

	// measure div to determine hierarchy width/height
	rm.write("<div");
	rm.writeAttribute("id", oControl.getId() + "_measureDiv");
	rm.writeAttribute("class", "sapzencrosstab-HierarchyIndent");
	rm.addStyle("visibility", "none");
	rm.writeStyles();
	rm.write(">");
	rm.write("</div>");
	
	// exception measure div to determine symbol width
	rm.write("<div");
	rm.writeAttribute("id", oControl.getId() + "_exceptionMeasureDiv");
	rm.writeAttribute("class", "sapzencrosstab-SymbolAlertDimensions");
	rm.addStyle("visibility", "none");
	rm.writeStyles();
	rm.write(">");
	rm.write("</div>");

	if (oControl.getRenderMode() === sap.zen.crosstab.rendering.RenderingConstants.RENDERMODE_COMPACT) {
		rm.write("</div>");
	}

	rm.write("</div>");
};

sap.zen.crosstab.CrosstabRenderer.writeCell = function (rm, sId, oArea, oControl) {
	rm.write("<td");
	rm.writeAttribute("id", sId);
	rm.addStyle("padding", "0px");
	rm.writeStyles();
	rm.write(">");
	rm.write("<div");
	rm.writeAttribute("id", sId + "_scrollDiv");
	rm.addStyle("overflow", "hidden");
	rm.writeStyles();
	rm.write(">");
	oArea.renderArea(rm, oControl);
	rm.write("</div>");
	rm.write("</td>");
};
