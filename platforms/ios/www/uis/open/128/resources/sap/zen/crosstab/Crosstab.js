jQuery.sap.declare("sap.zen.crosstab.Crosstab");jQuery.sap.require("sap.zen.crosstab.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.zen.crosstab.Crosstab",{metadata:{library:"sap.zen.crosstab",properties:{"width":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},"height":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null}}}});jQuery.sap.require("sap.zen.crosstab.paging.PageManager");jQuery.sap.require("sap.zen.crosstab.DataArea");jQuery.sap.require("sap.zen.crosstab.ColumnHeaderArea");jQuery.sap.require("sap.zen.crosstab.RowHeaderArea");jQuery.sap.require("sap.zen.crosstab.DimensionHeaderArea");jQuery.sap.require("sap.zen.crosstab.EventHandler");jQuery.sap.require("sap.zen.crosstab.rendering.RenderEngine");jQuery.sap.require("sap.zen.crosstab.utils.Utils");jQuery.sap.require("sap.zen.crosstab.PropertyBag");jQuery.sap.require("sap.zen.crosstab.CrosstabCellApi");jQuery.sap.require("sap.zen.crosstab.CrosstabTestProxy");jQuery.sap.require("sap.zen.crosstab.CellStyleHandler");jQuery.sap.require("sap.zen.crosstab.CrosstabContextMenu");
sap.zen.crosstab.Crosstab.prototype.init=function(){"use strict";this.scrolled=false;this.ensureIndexOf();var c=this.getId();var d=c+"_dataArea";this.dataArea=new sap.zen.crosstab.DataArea(this);this.dataArea.setId(d);var C=c+"_colHeaderArea";this.columnHeaderArea=new sap.zen.crosstab.ColumnHeaderArea(this);this.columnHeaderArea.setId(C);var r=c+"_rowHeaderArea";this.rowHeaderArea=new sap.zen.crosstab.RowHeaderArea(this);this.rowHeaderArea.setId(r);var D=c+"_dimHeaderArea";this.dimensionHeaderArea=new sap.zen.crosstab.DimensionHeaderArea(this);this.dimensionHeaderArea.setId(D);this.oPropertyBag=new sap.zen.crosstab.PropertyBag(this);this.oRenderEngine=new sap.zen.crosstab.rendering.RenderEngine(this);this.oEventHandler=new sap.zen.crosstab.EventHandler(this);this.oUtils=new sap.zen.crosstab.utils.Utils(this);this.iCalculatedWidth=-1;this.iCalculatedHeight=-1;this.fPageRequestHandler=null;this.bOnAfterRendering=true;this.bIsVResize=false;this.bIsHResize=false;this.iHierarchyIndentWidth=0;this.iHierarchyIndentHeight=0;this.iExceptionSymbolWidth=0;this.iRenderMode=sap.zen.crosstab.rendering.RenderingConstants.RENDERMODE_COMPACT;this.bRenderScrollbars=true;this.bHCutOff=false;this.bVCutOff=false;this.sOnSelectCommand=null;this.sTransferDataCommand=null;this.sCallValueHelpCommand=null;this.iTotalRowCnt=0;this.iTotalColCnt=0;this.oHScrollbar=null;this.oVScrollbar=null;this.oHorizontalHeaderScrollbar=null;this.iTimeoutCounter=0;this.oColHeaderHierarchyLevels={};this.oRowHeaderHierarchyLevels={};this.oTestProxy=new sap.zen.crosstab.CrosstabTestProxy(this,this.oEventHandler,this.oRenderEngine);this.bAdjustFrameDivs=true;this.iSavedWidthForPrepareDom=0;this.iSavedHeightForPrepareDom=0;this.bDataSelectionMode=false;this.oCellApi=null;this.iNewLinesCnt=0;this.sNewLinesPos="";this.bPlanningCheckMode=false;this.sScrollNotifyCommand=null;this.oContextMenu=null;this.iValueHelpStatus=0;this.bHeaderHScrolling=false;this.bWasRendered=false};
sap.zen.crosstab.Crosstab.prototype.ensureIndexOf=function(){if(!Array.prototype.indexOf){Array.prototype.indexOf=function(s){"use strict";if(this==null){throw new TypeError()}var t=Object(this);var l=t.length>>>0;if(l===0){return-1}var n=0;if(arguments.length>1){n=Number(arguments[1]);if(n!=n){n=0}else if(n!=0&&n!=Infinity&&n!=-Infinity){n=(n>0||-1)*Math.floor(Math.abs(n))}}if(n>=l){return-1}var k=n>=0?n:Math.max(l-Math.abs(n),0);for(;k<l;k++){if(k in t&&t[k]===s){return k}}return-1}}};
sap.zen.crosstab.Crosstab.prototype.getTableDiv=function(){var t=null;if(this.iRenderMode===sap.zen.crosstab.rendering.RenderingConstants.RENDERMODE_COMPACT){t=$('#'+this.getId()+"_altRenderModeTableDiv")}else{t=$('#'+this.getId())}return t};
sap.zen.crosstab.Crosstab.prototype.ensurePageManager=function(){if(!this.oPageManager){this.oPageManager=new sap.zen.crosstab.paging.PageManager(this)}return this.oPageManager};
sap.zen.crosstab.Crosstab.prototype.getIntWidth=function(){var w=-1;var W=this.getWidth();if(W&&W!=="auto"){w=parseInt(W,10)}else{w=this.iCalculatedWidth}return w};
sap.zen.crosstab.Crosstab.prototype.getContentWidth=function(){var w=this.getIntWidth();var t=this.getRenderEngine().getTableDivValues();w=w-t.borders.iLeftBorderWidth-t.borders.iRightBorderWidth;return w};
sap.zen.crosstab.Crosstab.prototype.getContentHeight=function(){var h=this.getIntHeight();var t=this.getRenderEngine().getTableDivValues();var T=this.oPropertyBag.getToolbarHeight();h=h-t.borders.iTopBorderWidth-t.borders.iBottomBorderWidth-T;return h};
sap.zen.crosstab.Crosstab.prototype.getIntHeight=function(){var h=-1;var H=this.getHeight();if(H&&H!=="auto"){h=parseInt(H,10)}else{h=this.iCalculatedHeight}return h};
sap.zen.crosstab.Crosstab.prototype.resize=function(e){var d=jQuery.sap.byId(this.getId());var n=parseInt(d.outerWidth(),10);var N=parseInt(d.outerHeight(),10);this.isHResize=n!==this.getIntWidth();this.isVResize=N!==this.getIntHeight();if(this.isHResize||this.isVResize){this.ensurePageManager().resizeEvent()}};
sap.zen.crosstab.Crosstab.prototype.determineRenderMode=function(c){var n=-1;if(c){if(c.alwaysfill){n=sap.zen.crosstab.rendering.RenderingConstants.RENDERMODE_FILL}else{n=sap.zen.crosstab.rendering.RenderingConstants.RENDERMODE_COMPACT}}if(n===-1){n=sap.zen.crosstab.rendering.RenderingConstants.RENDERMODE_COMPACT}if(n!==this.iRenderMode){this.oRenderEngine.reset();this.iRenderMode=n}};
sap.zen.crosstab.Crosstab.prototype.determineScrollMode=function(c){var n=c.pixelscrolling;if(n!==this.oPropertyBag.isPixelScrolling()){this.oRenderEngine.reset();this.oPropertyBag.setPixelScrolling(n)}};
sap.zen.crosstab.Crosstab.prototype.applyControlProperties=function(c){this.bPlanningCheckMode=c.pvcheck!==null&&c.pvcheck!==undefined;var i=this.ensurePageManager().checkResponseConsistency(c);if(!i){this.reset(c)}if(!this.bPlanningCheckMode){this.determineRenderMode(c);this.determineScrollMode(c);this.ensurePageManager().receiveData(c)}else{this.handlePlanningCheckData(c)}this.bPlanningCheckMode=false};
sap.zen.crosstab.Crosstab.prototype.calculateOffset=function(c){var o=0;var a=c.getArea();if(a.isRowHeaderArea()){for(var i=0;i<c.getCol();i++){var t=a.getCell(c.getRow(),i);if(!t){o++}else if(!t.isEntryEnabled()){o++}}}return o};
sap.zen.crosstab.Crosstab.prototype.calculateRowHeaderColOffsetsForRow=function(t){var c={};var T=0;var C=null;var e=0;var m=this.rowHeaderArea.getColCnt();for(T=0;T<m;T++){C=this.getTableCell(t,T);if(C!==null&&C.isEntryEnabled()){c[e]=T;e++}}return c};
sap.zen.crosstab.Crosstab.prototype.handlePlanningCheckData=function(c){var i=0;var C=c.pvcheck;var a=C.length;var o={};var b=null;var t=0;for(i=0;i<a;i++){var d=C[i];b=o[d.tabrow];if(!b){b=this.calculateRowHeaderColOffsetsForRow(d.tabrow);o[d.tabrow]=b}var t=b[d.tabcol]||d.tabcol;var e=this.getTableCell(d.tabrow,t);if(e){e.setText(d.text);if(d.valid===false){e.addStyle(sap.zen.crosstab.rendering.RenderingConstants.STYLE_INVALID_VALUE)}else{e.removeStyle(sap.zen.crosstab.rendering.RenderingConstants.STYLE_INVALID_VALUE)}if(d.newvalue===true){e.addStyle(sap.zen.crosstab.rendering.RenderingConstants.STYLE_NEW_VALUE)}this.oRenderEngine.updateRenderingOfInputCellAfterCheck(e)}}};
sap.zen.crosstab.Crosstab.prototype.determineKeepUserColWidths=function(c){if(c.dataproviderchanged){return false}if(c.resultsetchanged&&c.rootcause===undefined){return false}return true};
sap.zen.crosstab.Crosstab.prototype.determineKeepCalculatedColWidths=function(c){var v=(c.v_pos||1)-1;var s=c.sentdatarows||0;var C=c.clientvpos||0;var t=c.totaldatarows||0;var h=(c.h_pos||1)-1;var S=c.sentdatacols||0;var i=c.clienthpos||0;var T=c.totaldatacols||0;var I=c.ispaging||false;var k=false;var K=false;if(this.bWasRendered===true&&!I){if((C>0)&&(C<=t)&&(C>(v+s))){K=true}if((i>0)&&(i<=T)&&(i>(h+S))){k=true}if(K===true||k===true){return true}}return false};
sap.zen.crosstab.Crosstab.prototype.reset=function(c){var k=this.determineKeepUserColWidths(c);var K=this.determineKeepCalculatedColWidths(c);this.getDimensionHeaderArea().clear(k,K);this.getColumnHeaderArea().clear(k,K);this.getRowHeaderArea().clear(k,K);this.getDataArea().clear(k,K);this.oRenderEngine.reset();this.oPageManager.reset()};
sap.zen.crosstab.Crosstab.prototype.updateControlProperties=function(c){if(c&&c.changed){this.reset(c)}this.applyControlProperties(c)};
sap.zen.crosstab.Crosstab.prototype.expectOnAfterRenderingCall=function(){this.bOnAfterRendering=false};
sap.zen.crosstab.Crosstab.prototype.onAfterRendering=function(){if(this.bOnAfterRendering||((typeof sap.zen.Dispatcher!='undefined')&&sap.zen.Dispatcher.instance.isDeferredRendering())){this.doRendering()}};
sap.zen.crosstab.Crosstab.prototype.setSelectionInfo=function(a,p){this.oEventHandler.setSelectionInfo(a,p)};
sap.zen.crosstab.Crosstab.prototype.setHighlightingInfo=function(h){this.oEventHandler.setHighlightingInfo(h)};
sap.zen.crosstab.Crosstab.prototype.getSelectedCellData=function(){return this.oEventHandler.getSelectedCellData()};
sap.zen.crosstab.Crosstab.prototype.restoreSelection=function(){this.oEventHandler.restoreSelection()};
sap.zen.crosstab.Crosstab.prototype.restoreFocusOnCell=function(){this.oEventHandler.restoreFocusOnCell()};
sap.zen.crosstab.Crosstab.prototype.highlightCells=function(){this.oEventHandler.highlightCells()};
sap.zen.crosstab.Crosstab.prototype.prepareExistingDom=function(){if(!this.bPlanningCheckMode){var d=$('#'+this.getDimensionHeaderArea().getId()).find("tbody");d.empty();d=$('#'+this.getRowHeaderArea().getId()).find("tbody");d.empty();d=$('#'+this.getColumnHeaderArea().getId()).find("tbody");d.empty();d=$('#'+this.getDataArea().getId()).find("tbody");d.empty();this.bRenderScrollbars=false;this.determineNeedToAdjustOuterDivs()}};
sap.zen.crosstab.Crosstab.prototype.determineNeedToAdjustOuterDivs=function(){var w=this.getIntWidth();var h=this.getIntHeight();this.bAdjustFrameDivs=true;if(w===this.iSavedWidthForPrepareDom&&h===this.iSavedHeightForPrepareDom){this.bAdjustFrameDivs=false}else{this.getRenderEngine().removeOuterDivBorders()}if(!this.getDataArea().hasLoadingPages()){this.iSavedWidthForPrepareDom=w;this.iSavedHeightForPrepareDom=h}};
sap.zen.crosstab.Crosstab.prototype.determineHierarchyIndents=function(){var d=$('#'+this.getId()+"_measureDiv");if(d&&d.length>0){d.css("visibility","visible");this.iHierarchyIndentWidth=parseInt(d.outerWidth(),10);this.iHierarchyIndentHeight=parseInt(d.outerHeight(),10);d.css("visibility","none")}};
sap.zen.crosstab.Crosstab.prototype.determineAlertSymbolDimensions=function(){var d=$('#'+this.getId()+"_exceptionMeasureDiv");if(d&&d.length>0){d.css("visibility","visible");this.iExceptionSymbolWidth=parseInt(d.outerWidth(),10);d.css("visibility","none")}};
sap.zen.crosstab.Crosstab.prototype.isRenderingPossible=function(){if((typeof sap.zen.Dispatcher!='undefined')&&sap.zen.Dispatcher.instance.suppressRendering()){if(!sap.zen.Dispatcher.instance.isSingleDelta(this.getId())){sap.zen.Dispatcher.instance.registerForDeferredRendering(this);return false}}var e=[];e.push($('#'+this.getId()));e.push($('#'+this.getId()+'_upperSection'));e.push($('#'+this.getId()+'_lowerSection'));e.push($('#'+this.getId()+'_dimHeaderArea'));e.push($('#'+this.getId()+'_colHeaderArea'));e.push($('#'+this.getId()+'_dataArea'));for(var i=0;i<e.length;i++){if(e[i].length!==1){this.bOnAfterRendering=true;return false}}return true};
sap.zen.crosstab.Crosstab.prototype.determineCrosstabSize=function(){var s={};s.bContinueRendering=true;s.bAutoHeight=false;s.bAutoWidth=false;if(!this.getWidth()||!this.getHeight()){s.bContinueRendering=false}else{if(this.getWidth()==="auto"){s.bAutoWidth=true;var w=jQuery.sap.byId(this.getId()).parent().outerWidth();if(w&&w>0){this.iCalculatedWidth=w}}if(this.getHeight()==="auto"){s.bAutoHeight=true;var h=jQuery.sap.byId(this.getId()).parent().outerHeight();if(h&&h>0){this.iCalculatedHeight=h}}}return s};
sap.zen.crosstab.Crosstab.prototype.doRendering=function(){if(this.bPlanningCheckMode===true){return}if(!this.isRenderingPossible()){return}var s=this.determineCrosstabSize();if(!s.bContinueRendering){return}if((s.bAutoWidth&&this.iCalculatedWidth<=10)||(s.bAutoHeight&&this.iCalculatedHeight<=10)){this.iTimeoutCounter++;if(this.iTimeoutCounter>1000){return}setTimeout((function(a){return function(){a.doRendering()}})(this),10);return}this.determineHierarchyIndents();if(this.getPropertyBag().isDisplayExceptions()){this.determineAlertSymbolDimensions()}var r=this.getRenderEngine();r.setAdjustFrameDivs(this.bAdjustFrameDivs);if(r.hasCrosstabSizeChanged()){this.ensurePageManager().resizeEvent()}if(this.oPropertyBag.hasToolbar()){var t=$('#'+this.getId()+"_toolbar");var T=t.outerHeight();this.oPropertyBag.setToolbarHeight(T)}r.beginRendering();r.renderDimensionHeaderArea();r.setUserColWidths(this.getDimensionHeaderArea());r.renderRowHeaderArea(this.getRowHeaderArea().getRenderStartRow());r.setUserColWidths(this.getRowHeaderArea());r.adjustColWidths(this.getDimensionHeaderArea(),this.getRowHeaderArea());r.forceHeaderWidth();r.renderColHeaderArea(this.getColumnHeaderArea().getRenderStartCol());r.setUserColWidths(this.getColumnHeaderArea());r.renderDataArea();r.setUserColWidths(this.getDataArea());r.adjustColWidths(this.getColumnHeaderArea(),this.getDataArea());r.adjustRowHeights(this.getDimensionHeaderArea(),this.getColumnHeaderArea());r.adjustRowHeights(this.getRowHeaderArea(),this.getDataArea());r.calculateRenderSizeDivSize();if(!this.oPropertyBag.isPixelScrolling()){r.appendColumnsAfterResize();r.appendRowsAfterResize()}if(this.bRenderScrollbars){r.renderScrollbars()}r.adjustRenderSizeDivSize();if(this.bRenderScrollbars){r.setScrollbarSteps()}r.adjustScrollDivSizes();if(!this.bRenderScrollbars){r.checkScrollbarSize()}r.adjustScrollPositions(this.bRenderScrollbars);if(!this.oPropertyBag.isPixelScrolling()){r.moveScrollDivs()}r.updateHeaderScrollbarSizes();r.finishRendering();this.oEventHandler.attachEvents();this.bOnAfterRendering=true;this.bRenderScrollbars=true;this.bAdjustFrameDivs=true;this.bWasRendered=true};
sap.zen.crosstab.Crosstab.prototype.scrollHorizontal=function(c){this.oRenderEngine.scrollHorizontal(c)};
sap.zen.crosstab.Crosstab.prototype.scrollVertical=function(r){this.oRenderEngine.scrollVertical(r)};
sap.zen.crosstab.Crosstab.prototype.scrollHeaderHorizontal=function(p){this.oRenderEngine.scrollHeaderHorizontal(p)};
sap.zen.crosstab.Crosstab.prototype.getVScrollPos=function(){var v=-1;if(this.oVScrollbar){v=this.oVScrollbar.getScrollPosition()}return v};
sap.zen.crosstab.Crosstab.prototype.getHScrollPos=function(){var h=-1;if(this.oHScrollbar){h=this.oHScrollbar.getScrollPosition()}return h};
sap.zen.crosstab.Crosstab.prototype.renderResizeOutline=function(){this.oRenderEngine.renderResizeOutline()};
sap.zen.crosstab.Crosstab.prototype.removeResizeOutline=function(){this.oRenderEngine.removeResizeOutline()};
sap.zen.crosstab.Crosstab.prototype.registerPageRequestHandler=function(h){this.fPageRequestHandler=h};
sap.zen.crosstab.Crosstab.prototype.unregisterPageRequestHandler=function(){this.fPageRequestHandler=null};
sap.zen.crosstab.Crosstab.prototype.getPageRequestHandler=function(){return this.fPageRequestHandler};
sap.zen.crosstab.Crosstab.prototype.getReceivedPages=function(){return this.ensurePageManager().getReceivedPages()};
sap.zen.crosstab.Crosstab.prototype.getHierarchyIndentWidth=function(){return this.iHierarchyIndentWidth};
sap.zen.crosstab.Crosstab.prototype.getExceptionSymbolWidth=function(){return this.iExceptionSymbolWidth};
sap.zen.crosstab.Crosstab.prototype.getHierarchyIndentHeight=function(){return this.iHierarchyIndentHeight};
sap.zen.crosstab.Crosstab.prototype.hideLoadingIndicator=function(){this.oRenderEngine.hideLoadingIndicator()};
sap.zen.crosstab.Crosstab.prototype.showLoadingIndicator=function(){this.oRenderEngine.showLoadingIndicator()};
sap.zen.crosstab.Crosstab.prototype.setHCutOff=function(h){this.bHCutOff=h};
sap.zen.crosstab.Crosstab.prototype.isHCutOff=function(){return this.bHCutOff};
sap.zen.crosstab.Crosstab.prototype.setVCutOff=function(v){this.bVCutOff=v};
sap.zen.crosstab.Crosstab.prototype.isVCutOff=function(){return this.bVCutOff};
sap.zen.crosstab.Crosstab.prototype.getTotalRows=function(){return this.iTotalRowCnt};
sap.zen.crosstab.Crosstab.prototype.getTotalCols=function(){return this.iTotalColCnt};
sap.zen.crosstab.Crosstab.prototype.setTotalCols=function(c){this.iTotalColCnt=c};
sap.zen.crosstab.Crosstab.prototype.setTotalRows=function(r){this.iTotalRowCnt=r};
sap.zen.crosstab.Crosstab.prototype.setHScrollbar=function(h){this.oHScrollbar=h};
sap.zen.crosstab.Crosstab.prototype.setVScrollbar=function(v){this.oVScrollbar=v};
sap.zen.crosstab.Crosstab.prototype.getVScrollbar=function(){return this.oVScrollbar};
sap.zen.crosstab.Crosstab.prototype.getHScrollbar=function(){return this.oHScrollbar};
sap.zen.crosstab.Crosstab.prototype.getTestProxy=function(){return this.oTestProxy};
sap.zen.crosstab.Crosstab.prototype.setOnSelectCommand=function(o){this.sOnSelectCommand=o};
sap.zen.crosstab.Crosstab.prototype.getOnSelectCommand=function(){return this.sOnSelectCommand};
sap.zen.crosstab.Crosstab.prototype.setTransferDataCommand=function(t){this.sTransferDataCommand=t};
sap.zen.crosstab.Crosstab.prototype.getTransferDataCommand=function(){return this.sTransferDataCommand};
sap.zen.crosstab.Crosstab.prototype.setCallValueHelpCommand=function(c){this.sCallValueHelpCommand=c};
sap.zen.crosstab.Crosstab.prototype.getCallValueHelpCommand=function(){return this.sCallValueHelpCommand};
sap.zen.crosstab.Crosstab.prototype.getRenderMode=function(){return this.iRenderMode};
sap.zen.crosstab.Crosstab.prototype.getUtils=function(){return this.oUtils};
sap.zen.crosstab.Crosstab.prototype.getDataArea=function(){return this.dataArea};
sap.zen.crosstab.Crosstab.prototype.getDimensionHeaderArea=function(){return this.dimensionHeaderArea};
sap.zen.crosstab.Crosstab.prototype.getColumnHeaderArea=function(){return this.columnHeaderArea};
sap.zen.crosstab.Crosstab.prototype.getRowHeaderArea=function(){return this.rowHeaderArea};
sap.zen.crosstab.Crosstab.prototype.getRenderEngine=function(){return this.oRenderEngine};
sap.zen.crosstab.Crosstab.prototype.hResize=function(){return this.isHResize};
sap.zen.crosstab.Crosstab.prototype.vResize=function(){return this.isVResize};
sap.zen.crosstab.Crosstab.prototype.getPageManager=function(){return this.oPageManager};
sap.zen.crosstab.Crosstab.prototype.isRenderScrollbars=function(){return this.bRenderScrollbars};
sap.zen.crosstab.Crosstab.prototype.getPropertyBag=function(){return this.oPropertyBag};
sap.zen.crosstab.Crosstab.prototype.hasToolbar=function(){return this.bHasToolbar};
sap.zen.crosstab.Crosstab.prototype.setColHeaderHierarchyLevels=function(l){this.oColHeaderHierarchyLevels=l};
sap.zen.crosstab.Crosstab.prototype.getColHeaderHierarchyLevels=function(){return this.oColHeaderHierarchyLevels};
sap.zen.crosstab.Crosstab.prototype.setRowHeaderHierarchyLevels=function(l){this.oRowHeaderHierarchyLevels=l};
sap.zen.crosstab.Crosstab.prototype.getRowHeaderHierarchyLevels=function(){return this.oRowHeaderHierarchyLevels};
sap.zen.crosstab.Crosstab.prototype.isIE8Mode=function(){return this.oRenderEngine.isIE8Mode()};
sap.zen.crosstab.Crosstab.prototype.hasDimensionHeaderArea=function(){var r=false;if(this.dimensionHeaderArea!==undefined){r=(this.dimensionHeaderArea.getColCnt()>0&&this.dimensionHeaderArea.getRowCnt()>0)}return r};
sap.zen.crosstab.Crosstab.prototype.hasRowHeaderArea=function(){var r=false;if(this.rowHeaderArea!==undefined){r=(this.rowHeaderArea.getColCnt()>0&&this.rowHeaderArea.getRowCnt()>0)}return r};
sap.zen.crosstab.Crosstab.prototype.hasColHeaderArea=function(){var r=false;if(this.columnHeaderArea!==undefined){r=(this.columnHeaderArea.getColCnt()>0&&this.columnHeaderArea.getRowCnt()>0)}return r};
sap.zen.crosstab.Crosstab.prototype.hasDataArea=function(){var r=false;if(this.dataArea!==undefined){r=(this.dataArea.getColCnt()>0&&this.dataArea.getRowCnt()>0)}return r};
sap.zen.crosstab.Crosstab.prototype.setDataSelectionMode=function(i){this.bDataSelectionMode=i};
sap.zen.crosstab.Crosstab.prototype.isDataSelectionMode=function(){return this.bDataSelectionMode};
sap.zen.crosstab.Crosstab.prototype.setSingleDataCellSelection=function(i){this.bSingleDataCellSelection=i};
sap.zen.crosstab.Crosstab.prototype.isSingleDataCellSelection=function(){return this.bSingleDataCellSelection};
sap.zen.crosstab.Crosstab.prototype.setSingleDataCellSelectionInfo=function(r,c){this.oEventHandler.setSingleDataCellSelectionInfo(r,c)};
sap.zen.crosstab.Crosstab.prototype.getTableCell=function(t,T){return this.oCellApi.getTableCell(t,T)};
sap.zen.crosstab.Crosstab.prototype.getTableCellWithSpans=function(r,c){return this.oCellApi.getTableCellWithSpans(r,c)};
sap.zen.crosstab.Crosstab.prototype.getTableRowCnt=function(t,T){return this.oCellApi.getTableRowCnt()};
sap.zen.crosstab.Crosstab.prototype.getTableColCnt=function(t,T){return this.oCellApi.getTableColCnt()};
sap.zen.crosstab.Crosstab.prototype.getTableFixedRowHeaderColCnt=function(){return this.oCellApi.getTableFixedRowHeaderColCnt()};
sap.zen.crosstab.Crosstab.prototype.getTableFixedColHeaderRowCnt=function(){return this.oCellApi.getTableFixedColHeaderRowCnt()};
sap.zen.crosstab.Crosstab.prototype.getTableMaxScrollColCnt=function(){return this.oCellApi.getTableMaxScrollColCnt()};
sap.zen.crosstab.Crosstab.prototype.getTableMaxScrollRowCnt=function(){return this.oCellApi.getTableMaxScrollRowCnt()};
sap.zen.crosstab.Crosstab.prototype.setCellApi=function(p){this.oCellApi=p};
sap.zen.crosstab.Crosstab.prototype.hasLoadingPages=function(){return this.dataArea.hasLoadingPages()||this.rowHeaderArea.hasLoadingPages()||this.columnHeaderArea.hasLoadingPages()};
sap.zen.crosstab.Crosstab.prototype.getRenderRowCnt=function(){if(this.dataArea){return this.dataArea.getRenderRowCnt()}else if(this.rowHeaderArea){return this.rowHeaderArea.getRenderRowCnt()}};
sap.zen.crosstab.Crosstab.prototype.getRenderStartRow=function(){if(this.dataArea){return this.dataArea.getRenderStartRow()}else if(this.rowHeaderArea){return this.rowHeaderArea.getRenderStartRow()}};
sap.zen.crosstab.Crosstab.prototype.getRenderColCnt=function(){if(this.dataArea){return this.dataArea.getRenderColCnt()}else if(this.columnHeaderArea){return this.columnHeaderArea.getRenderColCnt()}};
sap.zen.crosstab.Crosstab.prototype.getRenderStartCol=function(){if(this.dataArea){return this.dataArea.getRenderStartCol()}else if(this.columnHeaderArea){return this.columnHeaderArea.getRenderStartCol()}};
sap.zen.crosstab.Crosstab.prototype.setNewLinesCnt=function(n){this.iNewLinesCnt=n};
sap.zen.crosstab.Crosstab.prototype.getNewLinesCnt=function(){return this.iNewLinesCnt};
sap.zen.crosstab.Crosstab.prototype.setNewLinesPos=function(n){this.sNewLinesPos=n};
sap.zen.crosstab.Crosstab.prototype.getNewLinesPos=function(){return this.sNewLinesPos};
sap.zen.crosstab.Crosstab.prototype.isNewLinesTop=function(){if(!this.sNewLinesPos){return false}return(this.sNewLinesPos==="TOP")};
sap.zen.crosstab.Crosstab.prototype.isNewLinesBottom=function(){if(!this.sNewLinesPos){return false}return(this.sNewLinesPos==="BOTTOM")};
sap.zen.crosstab.Crosstab.prototype.setScrollNotifyCommand=function(s){this.sScrollNotifyCommand=s};
sap.zen.crosstab.Crosstab.prototype.getScrollNotifyCommand=function(){return this.sScrollNotifyCommand};
sap.zen.crosstab.Crosstab.prototype.getContextMenuAction=function(c,d){var a=null;if(this.oContextMenu){a=this.oContextMenu.getContextMenuAction(c,d)}return a};
sap.zen.crosstab.Crosstab.prototype.createContextMenu=function(){if(!this.oContextMenu){this.oContextMenu=new sap.zen.crosstab.CrosstabContextMenu(this)}};
sap.zen.crosstab.Crosstab.prototype.setValueHelpStatus=function(v){this.iValueHelpStatus=v};
sap.zen.crosstab.Crosstab.prototype.getValueHelpStatus=function(){return this.iValueHelpStatus};
sap.zen.crosstab.Crosstab.prototype.getHorizontalHeaderScrollbar=function(){return this.oHorizontalHeaderScrollbar};
sap.zen.crosstab.Crosstab.prototype.setHorizontalHeaderScrollbar=function(h){this.oHorizontalHeaderScrollbar=h};
sap.zen.crosstab.Crosstab.prototype.setHeaderHScrolling=function(h){this.bHeaderHScrolling=h;if(!this.bHeaderHScrolling){this.oHorizontalHeaderScrollbar=null}};
sap.zen.crosstab.Crosstab.prototype.isHeaderHScrolling=function(){return this.bHeaderHScrolling};