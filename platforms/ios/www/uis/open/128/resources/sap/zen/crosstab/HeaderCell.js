jQuery.sap.declare("sap.zen.crosstab.HeaderCell");jQuery.sap.require("sap.zen.crosstab.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.zen.crosstab.HeaderCell",{metadata:{publicMethods:["addStyle"],library:"sap.zen.crosstab",properties:{"rowSpan":{type:"int",group:"Misc",defaultValue:null},"colSpan":{type:"int",group:"Misc",defaultValue:null},"text":{type:"string",group:"Misc",defaultValue:null},"mergeKey":{type:"string",group:"Misc",defaultValue:null},"sort":{type:"string",group:"Misc",defaultValue:null},"sortAction":{type:"string",group:"Misc",defaultValue:null},"area":{type:"object",group:"Misc",defaultValue:null},"effectiveColSpan":{type:"int",group:"Misc",defaultValue:null},"effectiveRowSpan":{type:"int",group:"Misc",defaultValue:null},"row":{type:"int",group:"Misc",defaultValue:null},"col":{type:"int",group:"Misc",defaultValue:null},"level":{type:"int",group:"Misc",defaultValue:null},"drillState":{type:"string",group:"Misc",defaultValue:null},"hierarchyAction":{type:"string",group:"Misc",defaultValue:null},"hierarchyTooltip":{type:"string",group:"Misc",defaultValue:null},"htmlIE8RowSpan":{type:"int",group:"Misc",defaultValue:1},"sortTextIndex":{type:"int",group:"Misc",defaultValue:null},"tableRow":{type:"int",group:"Misc",defaultValue:null},"tableCol":{type:"int",group:"Misc",defaultValue:null}}}});jQuery.sap.require("sap.zen.crosstab.CellStyleHandler");jQuery.sap.require("sap.zen.crosstab.rendering.RenderingConstants");jQuery.sap.require("sap.zen.crosstab.utils.Utils");
sap.zen.crosstab.HeaderCell.prototype.init=function(){"use strict";this.aStyles=[];this.addStyle(sap.zen.crosstab.rendering.RenderingConstants.STYLE_HEADER_CELL);this.bLoading=false;this.bSelectable=false;this.bIsInnerMember=false;this.bIsResult=false;this.bIsMobileResize=false;this.sUnit="";this.bIsEntryEnabled=false;this.sPassiveCellType=sap.zen.crosstab.rendering.RenderingConstants.PASSIVE_CELL_TYPE_NORMAL;this.bTextHasLineBreaks=false};
sap.zen.crosstab.HeaderCell.prototype.getCellType=function(){return sap.zen.crosstab.rendering.RenderingConstants.TYPE_HEADER_CELL};
sap.zen.crosstab.HeaderCell.prototype.getCssClassNames=function(i){return sap.zen.crosstab.CellStyleHandler.getCssClasses(this.aStyles,i)};
sap.zen.crosstab.HeaderCell.prototype.getStyleIdList=function(){return this.aStyles};
sap.zen.crosstab.HeaderCell.prototype.setStyleIdList=function(n){this.aStyles=n};
sap.zen.crosstab.HeaderCell.prototype.addStyle=function(s){var S=sap.zen.crosstab.CellStyleHandler.getStyleId(s,sap.zen.crosstab.rendering.RenderingConstants.TYPE_HEADER_CELL);if(this.aStyles.indexOf(S)===-1){this.aStyles.push(S)}};
sap.zen.crosstab.HeaderCell.prototype.removeStyle=function(s){var S=sap.zen.crosstab.CellStyleHandler.getStyleId(s,sap.zen.crosstab.rendering.RenderingConstants.TYPE_HEADER_CELL);var i=this.aStyles.indexOf(S);if(i!==-1){this.aStyles.splice(i,1)}};
sap.zen.crosstab.HeaderCell.prototype.hasStyle=function(s){var S=sap.zen.crosstab.CellStyleHandler.getStyleId(s,sap.zen.crosstab.rendering.RenderingConstants.TYPE_HEADER_CELL);var i=this.aStyles.indexOf(S);if(i===-1){return false}else{return true}};
sap.zen.crosstab.HeaderCell.prototype.isLoading=function(){return this.bLoading};
sap.zen.crosstab.HeaderCell.prototype.setLoading=function(l){this.bLoading=l};
sap.zen.crosstab.HeaderCell.prototype.isSelectable=function(){return this.bSelectable};
sap.zen.crosstab.HeaderCell.prototype.setSelectable=function(s){this.bSelectable=s};
sap.zen.crosstab.HeaderCell.prototype.setInnerMember=function(i){this.bIsInnerMember=i};
sap.zen.crosstab.HeaderCell.prototype.isInnerMember=function(){return this.bIsInnerMember};
sap.zen.crosstab.HeaderCell.prototype.setResult=function(i){this.bIsResult=i};
sap.zen.crosstab.HeaderCell.prototype.isResult=function(){return this.bIsResult};
sap.zen.crosstab.HeaderCell.prototype.getUnescapedText=function(){return sap.zen.crosstab.utils.Utils.unEscapeDisplayString(this.getText())};
sap.zen.crosstab.HeaderCell.prototype.isMobileResize=function(){return this.bIsMobileResize};
sap.zen.crosstab.HeaderCell.prototype.setMobileResize=function(p){this.bIsMobileResize=p};
sap.zen.crosstab.HeaderCell.prototype.setEntryEnabled=function(i){this.bIsEntryEnabled=i};
sap.zen.crosstab.HeaderCell.prototype.isEntryEnabled=function(){return this.bIsEntryEnabled};
sap.zen.crosstab.HeaderCell.prototype.setUnit=function(u){this.sUnit=u};
sap.zen.crosstab.HeaderCell.prototype.getUnit=function(){return this.sUnit};
sap.zen.crosstab.HeaderCell.prototype.getPassiveCellType=function(){return this.sPassiveCellType};
sap.zen.crosstab.HeaderCell.prototype.setPassiveCellType=function(p){this.sPassiveCellType=p};
sap.zen.crosstab.HeaderCell.prototype.setTextHasLineBreaks=function(t){this.bTextHasLineBreaks=t};
sap.zen.crosstab.HeaderCell.prototype.textHasLineBreaks=function(){return this.bTextHasLineBreaks};
