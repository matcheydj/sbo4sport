/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.ui.unified.CalendarLegendRenderer");sap.ui.unified.CalendarLegendRenderer={};
sap.ui.unified.CalendarLegendRenderer.render=function(r,l){var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");var c=["Today","Selected","NormalDay","NonWorkingDay"];var s=["TODAY","SELECTED","NORMAL_DAY","NON_WORKING_DAY"];var C=l.getItems();r.write("<div");r.writeControlData(l);r.addClass("sapUiUnifiedLegend");r.writeClasses();var b=l.getColumnWidth();r.writeAttribute("style","column-width:"+b+";-moz-column-width:"+b+";-webkit-column-width:"+b+";");r.writeStyles();r.write(">");for(var i=0;i<s.length;i++){this.renderLegendItem(r,"sapUiUnifiedLegend"+c[i],a.getText("LEGEND_"+s[i]))}if(C&&C.length>0)for(var i=0;i<C.length;i++){var t=i+1;this.renderLegendItem(r,"sapUiCalLegDayType"+((t<10)?"0"+t:t),C[i].getText())}r.write("</div>")};
sap.ui.unified.CalendarLegendRenderer.renderLegendItem=function(r,c,t){r.write("<div");r.addClass("sapUiUnifiedLegendItem");r.writeClasses();r.writeStyles();r.write(">");r.write("<div");r.addClass("sapUiUnifiedLegendSquare");r.writeClasses();r.writeStyles();r.write(">");r.write("<div");r.addClass("sapUiUnifiedLegendSquareColor");r.addClass(c);r.writeClasses();r.writeStyles();r.write("></div></div>");r.write("<div");r.addClass("sapUiUnifiedLegendDescription");r.writeClasses();r.writeStyles();r.write(">");r.writeEscaped(t);r.write("</div></div>")}
