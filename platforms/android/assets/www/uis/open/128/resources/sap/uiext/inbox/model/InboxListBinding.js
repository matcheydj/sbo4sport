/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.uiext.inbox.model.InboxListBinding");jQuery.sap.require("sap.ui.model.odata.ODataListBinding");sap.ui.model.odata.ODataListBinding.extend("sap.uiext.inbox.model.InboxListBinding",{filter:function(f,F){if(this.bRefreshDirty){this.bLengthFinal=true}if(!this.bStateSaved&&!this.bRefreshDirty){this.saveState()}else{this.resetState()}if(!f){f=[]}if(f instanceof sap.ui.model.Filter){f=[f]}if(F==sap.ui.model.FilterType.Application){this.aApplicationFilters=f}else{this.aFilters=f}f=this.aFilters.concat(this.aApplicationFilters);if(!f||!jQuery.isArray(f)||f.length==0){this.aFilters=[];this.aApplicationFilters=[]}if(this._hasFilter(f,'Status','EQ','COMPLETED')||this._hasFilter(f,'SubstitutedUser','EQ')){this.createFilterParams(f);this.resetData()}else{this.applyFilter();this.applySort();var u=this.oModel.sServiceUrl+this.sPath;this.oModel.fireRequestCompleted({url:u})}if(this.bInitialized){if(this.oRequestHandle){this.oRequestHandle.abort();this.oRequestHandle=null;this.bPendingRequest=false}this._fireChange({reason:sap.ui.model.ChangeReason.Filter});if(F==sap.ui.model.FilterType.Application){this._fireFilter({filters:this.aApplicationFilters})}else{this._fireFilter({filters:this.aFilters})}}return this},sort:function(s){if(!this.bStateSaved){this.saveState()}else{this.resetState()}this.applyFilter();if(s instanceof sap.ui.model.Sorter){s=[s]}this.aSorters=s;this.createSortParams(s);this.applySort();if(this.bInitialized){if(this.oRequestHandle){this.oRequestHandle.abort();this.oRequestHandle=null;this.bPendingRequest=false}this._fireChange({reason:sap.ui.model.ChangeReason.Sort});this._fireSort({sorter:s})}return this},loadData:function(s,l){var t=this;if(s||l){this.sRangeParams="$skip="+s+"&$top="+l;this.iStartIndex=s}else{s=this.iStartIndex}var p=[];if(this.sRangeParams){p.push(this.sRangeParams)}if(this.sSortParams){p.push(this.sSortParams)}if(this._hasFilter(this.aFilters.concat(this.aApplicationFilters),'Status','NE','COMPLETED')&&!this._hasFilter(this.aFilters.concat(this.aApplicationFilters),'SubstitutedUser','EQ')){p.push("$filter=Status%20ne%20%27COMPLETED%27")}else if(this.sFilterParams){p.push(this.sFilterParams)}if(this.sCustomParams){p.push(this.sCustomParams)}p.push("$inlinecount=allpages");function S(d){jQuery.each(d.results,function(i,a){t.aKeys[s+i]=t.oModel._getKey(a)});if(d.__count){t.iLength=parseInt(d.__count,10);t.bLengthFinal=true}if(t.iLength<s+d.results.length){t.iLength=s+d.results.length;t.bLengthFinal=false}if(d.results.length<l||l===undefined){t.iLength=s+d.results.length;t.bLengthFinal=true}if(d.results.length==0){t.iLength=0;t.bLengthFinal=true}t.oRequestHandle=null;t.bPendingRequest=false;if(!t.bStateSaved){if(t._hasFilter(t.aFilters.concat(t.aApplicationFilters),'Status','EQ','COMPLETED')||t._hasFilter(t.aFilters.concat(t.aApplicationFilters),'SubstitutedUser','EQ')){t.bStateSaved=true}else{t.saveState()}}if(t.bRefreshDirty){t.bRefreshDirty=false}if(t.sPath==='/TaskCollection'){t.applyFilter();t.applySort()}t.fireDataReceived()}function e(E){t.oRequestHandle=null;t.bPendingRequest=false;t.fireDataReceived()}function u(h){t.oRequestHandle=h}var P=this.sPath,c=this.oContext;if(this.isRelative()){P=this.oModel.resolve(P,c)}if(P){this.bPendingRequest=true;this.fireDataRequested();this.oModel._loadData(P,p,S,e,false,u)}}});
sap.uiext.inbox.model.InboxListBinding.prototype.saveState=function(){this.oModel._temp_oData=this.oModel.oData;this._temp_aKeys=this.aKeys;this.bStateSaved=true};
sap.uiext.inbox.model.InboxListBinding.prototype.resetState=function(){this.oModel.oData=this.oModel._temp_oData;if(this.oModel.oData&&!this._temp_aKeys){var t=this;t._temp_aKeys=[];jQuery.each(this.oModel.oData,function(i,e){t._temp_aKeys.push(t.oModel._getKey(e))})}this.aKeys=this._temp_aKeys;this.iLength=this.aKeys.length};
sap.uiext.inbox.model.InboxListBinding.prototype.applyFilter=function(){if(!this.aFilters){return}var t=this,f={},F,a=[],g=false,b=true,c=this.aFilters.concat(this.aApplicationFilters);jQuery.each(c,function(j,o){if(o.sPath){F=f[o.sPath];if(!F){F=f[o.sPath]=[]}}else{F=f["__multiFilter"];if(!F){F=f["__multiFilter"]=[]}}F.push(o)});jQuery.each(this.aKeys,function(i,I){b=true;jQuery.each(f,function(p,F){if(p!=="__multiFilter"){var v=t.oModel.getProperty(p,t.oModel.getContext('/'+I));if(typeof v=="string"){v=v.toUpperCase()}g=false;jQuery.each(F,function(j,o){var T=t.getFilterFunction(o);if(v!=undefined&&T(v)){g=true;return false}})}else{g=false;jQuery.each(F,function(j,o){g=t._resolveMultiFilter(o,I);if(g){return false}})}if(!g){b=false;return false}});if(b){a.push(I)}});this.aKeys=a;this.iLength=a.length};
sap.uiext.inbox.model.InboxListBinding.prototype.getFilterFunction=function(f){if(f.fnTest){return f.fnTest}if(f instanceof sap.ui.model.odata.Filter){var l,g;if(f.aValues.length>1&&f.bAND){jQuery.each(f.aValues,function(i,F){if(F.operator==='LE'){l=F.value1}else if(F.operator==='GE'){g=F.value1}});if(l&&g){f.fnTest=function(a){return(a>=g)&&(a<=l)};return f.fnTest}}}var v=f.oValue1,V=f.oValue2;if(typeof v=="string"){v=v.toUpperCase()}if(typeof V=="string"){V=V.toUpperCase()}switch(f.sOperator){case"EQ":f.fnTest=function(a){if(typeof a=="string"){return decodeURIComponent(a)==v}else{return a==v}};break;case"NE":f.fnTest=function(a){return a!=v};break;case"LT":f.fnTest=function(a){if(a){return a<v}return false};break;case"LE":f.fnTest=function(a){return a<=v};break;case"GT":f.fnTest=function(a){return a>v};break;case"GE":f.fnTest=function(a){return a>=v};break;case"BT":f.fnTest=function(a){return(a>=v)&&(a<=V)};break;case"Contains":f.fnTest=function(a){if(typeof a!="string"){throw new Error("Only \"String\" values are supported for the FilterOperator: \"Contains\".")}return a.indexOf(v)!=-1};break;case"StartsWith":f.fnTest=function(a){if(typeof a!="string"){throw new Error("Only \"String\" values are supported for the FilterOperator: \"StartsWith\".")}return a.indexOf(v)==0};break;case"EndsWith":f.fnTest=function(a){if(typeof a!="string"){throw new Error("Only \"String\" values are supported for the FilterOperator: \"EndsWith\".")}var p=a.indexOf(v);if(p==-1){return false}return p==a.length-new String(f.oValue1).length};break;default:f.fnTest=function(a){return true}}return f.fnTest};
sap.uiext.inbox.model.InboxListBinding.prototype.applySort=function(){var t=this,s=[],c=[],v,S;if(!this.aSorters||this.aSorters.length==0){return}for(var j=0;j<this.aSorters.length;j++){S=this.aSorters[j];c[j]=S.fnCompare;if(!c[j]){c[j]=function(a,b){if(b==null){return-1}if(a==null){return 1}if(typeof a=="string"&&typeof b=="string"){return a.localeCompare(b)}if(a<b){return-1}if(a>b){return 1}return 0}}jQuery.each(this.aKeys,function(i,I){if(S.sPath.indexOf('CustomAttributeData')!==-1){var C=t.oModel.getProperty('CustomAttributeData',t.oModel.getContext('/'+I));var a=S.sPath.replace('CustomAttributeData/','');if(C&&C.length>0){var b;jQuery.each(C,function(i,k){if(k.indexOf("Name='"+a+"'")!==-1){b=k;return false}})}if(b&&t.oModel.oData){v=t.oModel.oData[b].Value}}else{v=t.oModel.getProperty(S.sPath,t.oModel.getContext('/'+I))}if(typeof v=="string"){v=v.toLocaleUpperCase()}if(!s[j]){s[j]=[]}s[j][I]=v})}this.aKeys.sort(function(a,b){var d=s[0][a],e=s[0][b];return t._applySortCompare(a,b,d,e,s,c,0)})};
sap.uiext.inbox.model.InboxListBinding.prototype._applySortCompare=function(a,b,v,c,s,C,d){var S=this.aSorters[d],f=C[d],r;r=f(v,c);if(S.bDescending){r=-r}if(r==0&&this.aSorters[d+1]){v=s[d+1][a],c=s[d+1][b];r=this._applySortCompare(a,b,v,c,s,C,d+1)}return r};
sap.uiext.inbox.model.InboxListBinding.prototype.refresh=function(f){this.bStateSaved=false;this.bRefreshDirty=true;sap.ui.model.odata.ODataListBinding.prototype.refresh.apply(this,arguments)};
sap.uiext.inbox.model.InboxListBinding.prototype._hasFilter=function(f,p,o,v,V){var F=false;if(f&&f.length>0){jQuery.each(f,function(j,a){if(a.sPath===p&&a.sOperator===o){if(v){if(a.oValue1===v){F=true;return false}}else{F=true;return false}}})}return F};
