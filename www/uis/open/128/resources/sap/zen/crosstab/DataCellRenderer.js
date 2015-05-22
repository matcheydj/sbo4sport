jQuery.sap.declare("sap.zen.crosstab.DataCellRenderer");jQuery.sap.require("sap.zen.crosstab.rendering.RenderingConstants");jQuery.sap.require("sap.zen.crosstab.IDataCell");sap.zen.crosstab.DataCellRenderer={};
sap.zen.crosstab.DataCellRenderer.render=function(r,c){"use strict";var a=c.getArea();var R=a.getRenderCellCallback();var s=c.getText();var A=null;if(R){var C=R(new sap.zen.crosstab.IDataCell(c));A=C.additionalStyles;s=C.renderText}var b=r;b.write("<td");b.writeControlData(c);var d=c.getCssClassNames(a.getCrosstab().isIE8Mode());b.writeAttribute("class",d);b.writeAttribute("tabindex",sap.zen.crosstab.rendering.RenderingConstants.TABINDEX);b.write(">");b.write("<div");b.writeAttribute("id",c.getId()+"_contentDiv");b.writeAttribute("tabindex",sap.zen.crosstab.rendering.RenderingConstants.TABINDEX);var e="sapzencrosstab-DataCellContentDiv";if(c.isLoading()){e+=" sapzencrosstab-LoadingCellContentDiv"}b.writeAttribute("class",e);if(A){for(var S in A){b.addStyle(S,A[S])}}b.writeStyles();b.write(">");b.write(s);b.write("</div>");b.write("</td>")};