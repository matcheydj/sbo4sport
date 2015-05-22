jQuery.sap.declare("sap.zen.crosstab.EventHandler");jQuery.sap.require("sap.zen.crosstab.TouchHandler");jQuery.sap.require("sap.zen.crosstab.rendering.CrossRequestManager");jQuery.sap.require("sap.zen.crosstab.rendering.RenderingConstants");jQuery.sap.require("sap.zen.crosstab.utils.Utils");jQuery.sap.require("sap.zen.crosstab.keyboard.CrosstabKeyboardNavHandler");
sap.zen.crosstab.EventHandler=function(c){"use strict";var t=this;var C=c.getRenderEngine().getCrossRequestManager();var o=null;var s=null;var d=c.getDataArea();var r=c.getRowHeaderArea();var a=c.getColumnHeaderArea();var D=c.getDimensionHeaderArea();var h=null;var k=new sap.zen.crosstab.keyboard.CrosstabKeyboardNavHandler(c,this);var m=null;var p=false;var T=null;function b(e,i,c){var P=false;if(c.isDataSelectionMode()){if(e===i){P=true}}return P}this.removeHighlighting=function(H){var e=$('#'+H.getId());if(e.hasClass("sapzencrosstab-HighlightRowHeaderCell")||e.hasClass("sapzencrosstab-HighlightColHeaderCell")){this.applySelectionEffect(H,l(false))}};this.handleRowColSelection=function(e){if(!o&&c.getPropertyBag().isMobileMode()){o=g(e)}if(o){var i=t.getSelectedCell();if(!i){i=g(e);if(i){var F=j(true);t.applySelectionEffect(i,F);t.setSelectedCell(i);t.sendSelectCommand(i);sap.zen.crosstab.utils.Utils.cancelEvent(e)}}else{var x=g(e);if(x&&x.isSelectable&&x.isSelectable()){var y=false;if(i){y=b(i,x,c);if(!y){var F=j(false);t.applySelectionEffect(i,F)}}if(x===i){if(!y){i=null}}else{i=x}if(i){if(!y){t.highlightCells();var F=j(true);t.applySelectionEffect(i,F)}}if(!y){t.setSelectedCell(i);t.sendSelectCommand(i)}sap.zen.crosstab.utils.Utils.cancelEvent(e)}}if(c.getPropertyBag().isMobileMode()){o=null}return true}else{return false}};this.handleHierarchyClick=function(e,i,x){var y=v(i);var H=y.getHierarchyAction();var z=y.getDrillState();if(z!=="L"){if(y.getArea().isRowHeaderArea()){C.saveColWidths()}C.saveTableDimensions();C.saveHScrollInfo(x);C.saveVScrollInfo(x);w(H)}sap.zen.crosstab.utils.Utils.cancelEvent(e)};this.handleSortClick=function(e,i,x){var y=v(i);var S=y.getSortAction();if(S||c.getTestProxy().getTestAction()){C.saveVScrollInfo(x);C.saveHScrollInfo(x);C.saveColWidths();if(!c.getTestProxy().getTestAction()){w(S)}}sap.zen.crosstab.utils.Utils.cancelEvent(e)};this.handleDataCellSelection=function(e){if(o){if(!s){var F=j(true);t.applySelectionEffect(o,F);t.setSelectedCell(o);t.sendSelectCommand(o);sap.zen.crosstab.utils.Utils.cancelEvent(e)}else{var i=g(e);var x=d.getCell(s.iRow,s.iCol);var F=j(false);t.applySelectionEffect(x,F);if(i){if(i===x){x=null}else{x=i}if(x){var F=j(true);t.applySelectionEffect(x,F)}t.setSelectedCell(x);t.sendSelectCommand(x);sap.zen.crosstab.utils.Utils.cancelEvent(e)}}}};this.findTargetId=function(e){var i=null;var J=$(e).closest("div");if(J.length>0){var I=J.attr("id");if(I){var x=I.indexOf("_contentDiv");if(x>-1){i=I.slice(0,x)}}}return i};this.executeOnClickAction=function(e){if(p){return}m=null;p=false;var i=e.target.id;if(!i){i=t.findTargetId(e.target)}if(!i){return}var x=u(i);if(x==="sort"){t.handleSortClick(e,i,x)}else if(x==="hier"){t.handleHierarchyClick(e,i,x)}else if(x==="__ce"){if(c.hasLoadingPages()){sap.zen.crosstab.utils.Utils.cancelEvent(e);return}var I=c.getPropertyBag().isSelectionEnabled();if(I&&c.isSingleDataCellSelection()===true){t.handleDataCellSelection(e)}else if(I){var W=t.handleRowColSelection(e);if(!W){t.handleInputEnabledCell(i,-1,-1)}}else{t.handleInputEnabledCell(i,-1,-1)}}else if(x==="vhlp"){t.handleValueHelpClick(i)}sap.zen.crosstab.utils.Utils.cancelEvent(e)};this.getCellIdFromContenDivId=function(I){var i=I.indexOf("_contentDiv");if(i>-1){I=I.slice(0,i)}else{i=I.indexOf("_textContentDiv");if(i>-1){I=I.slice(0,i)}}return I};this.provideInputEnabledCell=function(M,i,x,S,y){var I=x.find("input");if(I.length===0){var R=x.text();var z=x.html();var A=M.getArea().isDataArea();var B=null;var E=function(V){var U=M.getUnit();if(U&&U!==""){var e=V.toUpperCase().indexOf(U.toUpperCase());if(e!==-1){if(e===0){V=V.substring(e+U.length)}else{V=V.substring(0,e)}}}var O=c.calculateOffset(M);V=$.trim(V);var L=c.getTransferDataCommand();L=L.replace("__ROW__",M.getRow()+"");L=L.replace("__COL__",(M.getCol()-O)+"");L=L.replace("__VALUE__",V);L=L.replace("__CTYPE__",M.getPassiveCellType());C.saveVScrollInfo("plan");C.saveHScrollInfo("plan");C.saveColWidths();w(L,true)};var F=function(e){if(I.val()!==R){E(I.val());var L=$('<div/>').text(R).html();z=z.replace(L,I.val())}H(e)};var G=function(e){var L=true;var i=null;var N=null;var O=null;if(e&&e.relatedTarget&&e.relatedTarget.id&&c.getValueHelpStatus()!==sap.zen.crosstab.VHLP_STATUS_OPENING){i=e.relatedTarget.id;O=$('#'+i);N=c.getTableDiv();L=O.closest(N).length>0}return L};var H=function(e){var L=$('#'+i+"_contentDiv");L.html(z);if(B&&A){L.width(B)}if(G(e)===true){L.focus()}else{k.reset()}};var J=function(e){if(e.which===27){H();sap.zen.crosstab.utils.Utils.cancelEvent(e)}if(e.which===13){if(I.val()!==R){sap.zen.crosstab.utils.Utils.cancelEvent(e);E(I.val())}else{H();if(c.isIE8Mode()){k.keyboardNavKeyHandler(e)}}}if(e.which===38||e.which===40){return true}if(e.which===37||e.which===39){if(!e.ctrkKey&&!e.altKey&&!e.shiftKey){sap.zen.crosstab.utils.Utils.stopEventPropagation(e)}return true}};var K=0;if(A){K=x.innerWidth();B=sap.zen.crosstab.utils.Utils.getWidthFromStyle(x)}x.html("<input id=\""+i+"_input"+"\" type=\"text\" value=\""+R+"\" />");if(A){x.width(K+"px")}I=$('#'+i+"_input");I.addClass("sapzencrosstab-EntryEnabledInput");I.keydown(J);I.focus();c.getUtils().selectTextInInputField(I,S,y);I.on("focusout",F)}else{c.getUtils().selectTextInInputField(I,S,y)}};this.handleValueHelpClick=function(e){var i=v(e);if(i){k.focusNewCell(i,-1,-1);var x=c.getCallValueHelpCommand();var O=c.calculateOffset(i);C.saveVScrollInfo("plan");C.saveHScrollInfo("plan");C.saveColWidths();x=x.replace("__ROW__",i.getRow());x=x.replace("__COL__",i.getCol()-O);x=x.replace("__DOM_REF_ID__",e);w(x,true)}};this.handleInputEnabledCell=function(e,S,i){if(e){e=this.getCellIdFromContenDivId(e);if(e){var M=sap.ui.getCore().getControl(e);if(M){if(M.getArea().isDataArea()||M.getArea().isRowHeaderArea()){k.focusNewCell(M,S,i)}}}}};this.sendSelectCommand=function(e){var R=-1;var i=-1;var A="";if(e){var x=e.getArea();if(x.isRowHeaderArea()){A="ROWS"}else if(x.isColHeaderArea()){A="COLUMNS"}else{A="DATA"}R=e.getRow();i=e.getCol()}var y=c.getOnSelectCommand();y=y.replace("__ROW__",R+"");y=y.replace("__COL__",i+"");y=y.replace("__AXIS__",A);w(y,true)};this.resetColWidths=function(e,U,L){var E=e.getCol()+e.getColSpan()-1;var i=0;var x=e.getCol()+e.getColSpan()-e.getEffectiveColSpan();for(i=E;i>=x;i--){U.resetColWidth(i);L.resetColWidth(i);U.setUserResizedCol(i);L.setUserResizedCol(i)}};this.doColResize=function(e){var U=e.getArea();if(U.isColHeaderArea()){var d=c.getDataArea();this.resetColWidths(e,U,d)}else if(U.isDimHeaderArea()){var r=c.getRowHeaderArea();this.resetColWidths(e,U,r)}c.invalidate()};this.executeOnDblClickAction=function(e){var i=e.target.id;var x=u(i);var y;if(x==="resi"){y=v(i);t.doColResize(y);sap.zen.crosstab.utils.Utils.cancelEvent(e)}};this.rowSelectAction=function(R,S,A,e){var i=0;var x=null;var y=S+A.getRenderColCnt();for(i=S;i<y;i++){x=A.getCell(R,i);if(x){var z=$('#'+x.getId());if(z&&z.length>0){e(z,x)}}}};this.colSelectAction=function(S,i,A,e){var R=0;var x=null;var y=S+A.getRenderRowCnt();for(R=S;R<y;R++){x=A.getCell(R,i);if(x){var z=$('#'+x.getId());if(z&&z.length>0){e(z,x)}}}};this.setSelectionInfo=function(A,P){if(!s){s={};if(A==="ROWS"){s.sAreaType=sap.zen.crosstab.rendering.RenderingConstants.TYPE_ROW_HEADER_AREA}else if(A==="COLUMNS"){s.sAreaType=sap.zen.crosstab.rendering.RenderingConstants.TYPE_COLUMN_HEADER_AREA}}if(A&&s){if(A==="ROWS"){if(s.sAreaType===sap.zen.crosstab.rendering.RenderingConstants.TYPE_ROW_HEADER_AREA){s.iRow=P}else{this.resetSelection()}}else if(A==="COLUMNS"){if(s.sAreaType===sap.zen.crosstab.rendering.RenderingConstants.TYPE_COLUMN_HEADER_AREA){s.iCol=P}else{this.resetSelection()}}else{this.resetSelection()}}else{this.resetSelection()}};this.setSingleDataCellSelectionInfo=function(R,i){if(!s){s={}}if(R>-1&&i>-1){s.iRow=R;s.iCol=i;s.sAreaType=sap.zen.crosstab.rendering.RenderingConstants.TYPE_DATA_AREA}else{this.resetSelection()}};this.setHighlightingInfo=function(H){h=H};this.getSelectedCellData=function(){return s};this.resetSelection=function(){s=null};this.setSelectedCell=function(e){if(e===null){s=null}else{if(!s){s={}}s.iRow=e.getRow();s.iCol=e.getCol();s.sAreaType=e.getArea().getAreaType()}};this.getSelectedCell=function(){var e=null;if(s){var A=sap.zen.crosstab.BaseArea.getArea(c,s.sAreaType);if(s.iCol===undefined){var i=A.getColCnt()-1;while(i>=0&&!e){e=A.getCell(s.iRow,i);if(e&&!((e.isSelectable&&e.isSelectable()))){e=null}i--}}else if(s.iRow===undefined){var R=A.getRowCnt()-1;while(R>=0&&!e){e=A.getCell(R,s.iCol);if(e&&!((e.isSelectable&&e.isSelectable()))){e=null}R--}}else{e=A.getCell(s.iRow,s.iCol)}}return e};this.restoreSelection=function(){var e=this.getSelectedCell();if(e&&((e.isSelectable&&e.isSelectable()||c.isSingleDataCellSelection()&&e.getArea().isDataArea())||e.isLoading())){var F=j(true);this.applySelectionEffect(e,F);this.setSelectedCell(e)}else{this.setSelectedCell(null)}o=null};this.doHighlighting=function(e,A,G,x){var i=0;var y=e.length;for(i=0;i<y;i++){var z=null;var B=e[i].pos;var E=G(A);while(E>=0&&!z){z=x(B,E,A);if(z&&!((z.isSelectable&&z.isSelectable()))){z=null}E--}if(z){this.applySelectionEffect(z,l(true))}}};this.highlightCells=function(){if(h){var e=h.rows;if(e){this.doHighlighting(e,c.getRowHeaderArea(),function(A){return A.getColCnt()-1},function(x,y,A){return A.getCell(x,y)})}var i=h.cols;if(i){this.doHighlighting(i,c.getColumnHeaderArea(),function(A){return A.getRowCnt()-1},function(x,y,A){return A.getCell(y,x)})}}};this.applySelectionEffect=function(e,F){var A=e.getArea();var R=e.getRow();var i=e.getCol();var S=null;if(A.isRowHeaderArea()){S=e;while(S&&S.isSelectable&&S.isSelectable()&&i>=0){i--;if(i>=0){S=A.getCell(R,i)}else{S=null}}this.rowSelectAction(R,i+1,A,F.fRowHeaderCellActionFunclet);this.rowSelectAction(R,d.getRenderStartCol(),d,F.fDataCellActionFunclet)}else if(A.isColHeaderArea()){S=e;while(S&&S.isSelectable&&S.isSelectable()&&R>=0){R--;if(R>=0){S=A.getCell(R,i)}else{S=null}}this.colSelectAction(R+1,i,A,F.fColHeaderCellActionFunclet);this.colSelectAction(d.getRenderStartRow(),i,d,F.fDataCellActionFunclet)}else if(A.isDataArea()){if(e){var x=$('#'+e.getId());if(x&&x.length>0){F.fDataCellActionFunclet(x,e)}}}};function g(e){var S=null;var i=0;var x=sap.ui.getCore().getControl(e.target.id);var y=null;var z=null;if(x&&(x.isSelectable&&x.isSelectable()||c.isSingleDataCellSelection())){S=x}else{var P=$(e.target).parents("td");if(P){for(i=0;i<P.length;i++){y=$(P[i]);z=y.attr("id");if(z&&z.length>0){x=sap.ui.getCore().getControl(z);if(x&&(x.isSelectable&&x.isSelectable()||c.isSingleDataCellSelection())){S=x;break}}}}}return S}this.executeOnMouseEnter=function(e){if(!o){if(!c.isSingleDataCellSelection()){o=g(e)}else if(c.isSingleDataCellSelection()===true){var i=g(e);if(i&&i.getArea().isDataArea()){o=i}}if(o){var F=f(true);t.applySelectionEffect(o,F);sap.zen.crosstab.utils.Utils.cancelEvent(e)}}};this.removeHoverEffect=function(){if(o){var F=f(false);t.applySelectionEffect(o,F);o=null}};this.executeOnMouseOut=function(e){if(o){var i=e.toElement||e.relatedTarget;var x=e.target;var F=null;var y=sap.ui.getCore().getControl(e.target.id);var z=null;var R=false;if(y&&(y.isSelectable&&y.isSelectable()||c.isSingleDataCellSelection()&&y.getArea().isDataArea())){if(y===o){F=$(x).find($(i));if(!(F&&F.length>0)){R=true}}}else{z=$('#'+o.getId());F=z.find($(x));if(F&&F.length>0){F=z.find($(i));if(!(F&&F.length>0)){R=true}}}if(R){t.removeHoverEffect();sap.zen.crosstab.utils.Utils.cancelEvent(e)}}};function f(H){var F={};if(H){F.fDataCellActionFunclet=function(e,i){e.addClass('sapzencrosstab-HoverDataCell');if(e.hasClass('sapzencrosstab-HighlightDataCell')){e.removeClass('sapzencrosstab-HighlightDataCell');i.bRestoreHighlight=true}};F.fRowHeaderCellActionFunclet=function(e,i){e.addClass('sapzencrosstab-HoverRowHeaderCell');if(e.hasClass('sapzencrosstab-HighlightRowHeaderCell')){e.removeClass('sapzencrosstab-HighlightRowHeaderCell');i.bRestoreHighlight=true}};F.fColHeaderCellActionFunclet=function(e,i){e.addClass('sapzencrosstab-HoverColHeaderCell');if(e.hasClass('sapzencrosstab-HighlightColHeaderCell')){e.removeClass('sapzencrosstab-HighlightColHeaderCell');i.bRestoreHighlight=true}}}else{F.fDataCellActionFunclet=function(e,i){e.removeClass('sapzencrosstab-HoverDataCell');if(i.bRestoreHighlight===true){i.bRestoreHighlight=false;e.addClass('sapzencrosstab-HighlightDataCell')}};F.fRowHeaderCellActionFunclet=function(e,i){e.removeClass('sapzencrosstab-HoverRowHeaderCell');if(i.bRestoreHighlight===true){i.bRestoreHighlight=false;e.addClass('sapzencrosstab-HighlightRowHeaderCell')}};F.fColHeaderCellActionFunclet=function(e,i){e.removeClass('sapzencrosstab-HoverColHeaderCell');if(i.bRestoreHighlight===true){i.bRestoreHighlight=false;e.addClass('sapzencrosstab-HighlightColheaderCell')}}}return F}function j(S){var F={};if(S){F.fDataCellActionFunclet=function(e,i){e.addClass('sapzencrosstab-SelectDataCell');e.removeClass('sapzencrosstab-HighlightDataCell');i.bRestoreHighlight=false};F.fRowHeaderCellActionFunclet=function(e,i){e.addClass('sapzencrosstab-SelectRowHeaderCell');e.removeClass('sapzencrosstab-HighlightRowHeaderCell');i.bRestoreHighlight=false};F.fColHeaderCellActionFunclet=function(e,i){e.addClass('sapzencrosstab-SelectColHeaderCell');e.removeClass('sapzencrosstab-HighlightColHeaderCell');i.bRestoreHighlight=false}}else{F.fDataCellActionFunclet=function(e,i){e.removeClass('sapzencrosstab-SelectDataCell')};F.fRowHeaderCellActionFunclet=function(e,i){e.removeClass('sapzencrosstab-SelectRowHeaderCell')};F.fColHeaderCellActionFunclet=function(e,i){e.removeClass('sapzencrosstab-SelectColHeaderCell')}}return F}function l(H){var F={};if(H){F.fDataCellActionFunclet=function(e,i){e.addClass('sapzencrosstab-HighlightDataCell')};F.fRowHeaderCellActionFunclet=function(e,i){e.addClass('sapzencrosstab-HighlightRowHeaderCell')};F.fColHeaderCellActionFunclet=function(e,i){e.addClass('sapzencrosstab-HighlightColHeaderCell')}}else{F.fDataCellActionFunclet=function(e,i){e.removeClass('sapzencrosstab-HighlightDataCell')};F.fRowHeaderCellActionFunclet=function(e,i){e.removeClass('sapzencrosstab-HighlightRowHeaderCell')};F.fColHeaderCellActionFunclet=function(e,i){e.removeClass('sapzencrosstab-HighlightColHeaderCell')}}return F}this.attachEvents=function(){var i=$("#"+c.getId()+"_renderSizeDiv");i.unbind("dblclick");i.bind("dblclick",this.executeOnDblClickAction);i.unbind("mousedown");i.bind("mousedown",this.executeOnMouseDown);if(c.getPropertyBag().isMobileMode()||c.getPropertyBag().isTestMobileMode()){i.unbind('click');i.bind('click',function(e){sap.zen.crosstab.utils.Utils.cancelEvent(e)});i.unbind('mousedown');i.bind('mousedown',function(e){sap.zen.crosstab.utils.Utils.cancelEvent(e)});T=new sap.zen.crosstab.TouchHandler(this,c);T.registerTouchEvents(i);k.setEnabled(false)}else{i.unbind("mouseup",this.executeOnMouseUp);i.bind("mouseup",this.executeOnMouseUp);i.unbind('click');i.bind('click',this.executeOnClickAction);if(c.getPropertyBag().isSelectionEnabled()){i.unbind('mouseover');i.bind('mouseover',this.executeOnMouseEnter);i.unbind('mouseout');i.bind('mouseout',this.executeOnMouseOut)}k.setEnabled(n());k.attachEvents(i)}};this.executeOnMouseDown=function(e){var i=e.target.id;var x=u(i);if(x==="resi"){sap.zen.crosstab.utils.Utils.cancelEvent(e)}else{m=i}};function n(){return(c.getTransferDataCommand()&&c.getTransferDataCommand()!=="")}function q(i,e){var I=false;var x=$('#'+i)[0];if(x){var R=x.getBoundingClientRect();var H=(R.left<e.clientX)&&(e.clientX<R.right);var V=(R.bottom>e.clientY)&&(e.clientY>R.top);I=H&&V}return I}this.executeOnMouseUp=function(e){p=false;if(m){var i=t.getCellIdFromContenDivId(m);if(q(i,e)){var x=sap.ui.getCore().getControl(i);if(x){if(n()){var y=$('#'+m)[0];var P=null;if(y){P=c.getUtils().getSelectionParams(y)}if(P.iSelectionStartPos>=0||P.iSelectionEndPos>=0){p=true;t.handleInputEnabledCell(e.target.id,P.iSelectionStartPos,P.iSelectionEndPos)}}}}else{sap.zen.crosstab.utils.Utils.cancelEvent(e);sap.zen.crosstab.utils.Utils.stopEventPropagation(e);p=true}}};this.restoreFocusOnCell=function(){k.restoreFocusOnCell()};function u(i){var A=i.slice(0,4);return A}function v(i){var e=i.slice(5);return sap.ui.getCore().getControl(e)}function w(A,e){if(A){if(!e){}var i=new Function(A);i()}}};
