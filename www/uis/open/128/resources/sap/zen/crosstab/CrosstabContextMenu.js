jQuery.sap.declare("sap.zen.crosstab.CrosstabContextMenu");jQuery.sap.require("sap.zen.crosstab.rendering.RenderingConstants");
sap.zen.crosstab.CrosstabContextMenu=function(c){this.getContextMenuAction=function(C,d){var o=sap.ui.getCore();var e=d;while(!o.byId(e.attr("id"))){e=e.parent()}if(e.attr("id")===c.getId()){return null}var a=o.byId(e.attr("id"));var s=a.getCellType();var A=a.getArea().getAreaType();var b="";if(A===sap.zen.crosstab.rendering.RenderingConstants.TYPE_COLUMN_HEADER_AREA){b="COLS"}else if(A===sap.zen.crosstab.rendering.RenderingConstants.TYPE_ROW_HEADER_AREA){b="ROWS"}else if(A===sap.zen.crosstab.rendering.RenderingConstants.TYPE_DIMENSION_HEADER_AREA){var t=a.getText();if(t!==undefined&&t!==null&&t!==""){b="DIM"}else{var S=a.getSort();if(S!==undefined&&S!==null&&S!==""){b="DIM"}else{return null}}}else if(s===sap.zen.crosstab.rendering.RenderingConstants.TYPE_DATA_CELL){b="DATA"}else{return null}var r=a.getRow();var i=a.getCol();var f=c.getPropertyBag().getContextMenuCommand();f=f.replace("__AXIS__",b);f=f.replace("__ROW__",r);f=f.replace("__COL__",i);f=f.replace("__ID__",C);f=f.replace("__DOM_REF_ID__",d.attr("id"));return new Function(f)}};
