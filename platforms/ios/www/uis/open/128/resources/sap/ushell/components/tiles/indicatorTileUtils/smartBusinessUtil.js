jQuery.sap.declare("sap.ushell.components.tiles.indicatorTileUtils.smartBusinessUtil");sap=sap||{};sap.ushell=sap.ushell||{};sap.ushell.components=sap.ushell.components||{};sap.ushell.components.tiles.indicatorTileUtils=sap.ushell.components.tiles.indicatorTileUtils||{};sap.ushell.components.tiles.indicatorTileUtils.util=sap.ushell.components.tiles.indicatorTileUtils.util||{};sap.ushell.components.tiles.indicatorTileUtils.util=(function(g,$,u){var f=function(){var o={};$.ajax({type:"GET",async:false,dataType:"json",url:"/sap/hba/apps/kpi/s/logic/__token.xsjs",headers:{"X-CSRF-Token":"Fetch"},success:function(d,s,x){o.userName=d.userName;o.token=x.getResponseHeader("X-CSRF-Token")},error:function(){$.sap.log.error("Error Fetching AUTH TOKEN")}});return o};var a=function(s){var r=[];for(var i=0;i<s.length;i++)r.push(JSON.parse(s[i]));return r};"use strict";var c={};return{getAuthToken:function(){return f().token},getHanaUser:function(){return authObject.userName},getEdmType:function(U,p){var d=null;if(U instanceof sap.ui.model.odata.ODataModel){d=U}else{d=this.getODataModelByServiceUri(U)}if(d&&d.getServiceMetadata()){var s=d.getServiceMetadata();var e=s.dataServices.schema[0].entityType;if(e){for(var i=0;i<e.length;i++){var b=e[i];var h=b.property;for(var j=0;j<h.length;j++){var k=h[j];if(k.name==p){return k.type}}}}}return null},getODataModelByServiceUri:function(s){if(!c[s]){var m=new sap.ui.model.odata.ODataModel(s,true);c[s]=m}return c[s]},getMantissaLength:function(n){var N=n.toString();var i=0;if(n<0){i=1}return(N.indexOf('.')===-1)?(n<0?N.length-1:N.length):N.substring(i,N.indexOf('.')).length},getLocaleFormattedValue:function(n,s){var l=new sap.ui.core.Locale(sap.ui.getCore().getConfiguration().getLanguage());if(s==-2){var N;if(n>9999)N="????";else if(n<0.001)N="0";else{if(n.toString().indexOf('.')!=-1)N=Number(n).toFixed(4-n.toString().indexOf('.'));else N=Number(n);var v=sap.ca.ui.model.format.NumberFormat.getInstance({style:"short"},l);N=v.format(N)}}else{var d=2;var m=this.getMantissaLength(n);if(!(m%3))d=1;if(Math.abs(n)%Math.pow(10,m-1)==0){d=0}else if((Math.abs(n)%Math.pow(10,m-1))<6*Math.pow(10,m-4)){d=0}var v=sap.ca.ui.model.format.NumberFormat.getInstance({style:"short",shortDecimals:d},l);var N=v.format(n)}return N},getModelerRuntimeServiceModel:function(){return this.getODataModelByServiceUri("/sap/hba/apps/kpi/s/odata/smart_business_runtime_services.xsodata")},getSapFontErrorCode:function(){return String.fromCharCode(0xe0b1)},getSapFontBusyCode:function(){return String.fromCharCode(0xe1f2)},prepareFilterStructure:function(b,d){var v=[];if(d){b=b.concat(d)}for(var i=0;i<b.length;i++){var p={};p.comparator=b[i].OPERATOR;p.filterPropertyName=b[i].NAME;if(b[i].ID)p.id=b[i].ID;p.type=b[i].TYPE;p.value=b[i].VALUE_1;p.valueTo=b[i].VALUE_2;v.push(p)}return v},getFilterFromRunTimeService:function(C,b){var K=this.getODataModelByServiceUri('/sap/hba/r/sb/core/odata/runtime/SMART_BUSINESS.xsodata');var d="ID eq '#EVALUATIONID'".replace("#EVALUATIONID",C.EVALUATION.ID);var k=K.read("/EVALUATION_FILTERS",null,{"$filter":d},true,function(e){var h=[];if(e.results.length){h=e.results}b.call(this,h)})},findTextPropertyForDimension:function(U,b,d){try{var o=this._getOData4AnalyticsObject(U);var q=o.findQueryResultByName(b);var D=q.findDimensionByName(d);if(D.getTextProperty()){return D.getTextProperty().name}else{return d}}catch(e){$.sap.log.error("Error Fetching Text Property for "+d+" : "+e.toString())}},getEvalValueMeasureName:function(C,t,r){var e=C.EVALUATION_VALUES;for(var i=0;i<e.length;i++){if(e[i].TYPE==t)if(r==="FIXED")return e[i].FIXED;else return e[i].COLUMN_NAME}},getParsedChip:function(C,b){var p={};var d=JSON.parse(C);var e=JSON.parse(d.TILE_PROPERTIES).evaluationId||"";var t=this;if(d.ADDITIONAL_FILTERS)p["ADDITIONAL_FILTERS"]=JSON.parse(d.ADDITIONAL_FILTERS);if(d.ADDITIONAL_APP_PARAMETERS)p["ADDITIONAL_APP_PARAMETERS"]=JSON.parse(d.ADDITIONAL_APP_PARAMETERS);if(d.EVALUATION_FILTERS){p["EVALUATION_FILTERS"]=JSON.parse(d.EVALUATION_FILTERS);if(d.EVALUATION_VALUES){p["EVALUATION_VALUES"]=JSON.parse(d.EVALUATION_VALUES);if(d.EVALUATION){p.EVALUATION=JSON.parse(d.EVALUATION);p.TILE_PROPERTIES=JSON.parse(d.TILE_PROPERTIES);b(p)}else t.getEvaluationDetailsFromRunTimeService("/EVALUATIONS",e,function(h){p.EVALUATION=h;p.TILE_PROPERTIES=JSON.parse(d.TILE_PROPERTIES);b(p)})}else t.getEvaluationDetailsFromRunTimeService("/EVALUATION_VALUES",e,function(h){p["EVALUATION_VALUES"]=h;if(d.EVALUATION){p.EVALUATION=JSON.parse(d.EVALUATION);p.TILE_PROPERTIES=JSON.parse(d.TILE_PROPERTIES);b(p)}else t.getEvaluationDetailsFromRunTimeService("/EVALUATIONS",e,function(h){p.EVALUATION=h;p.TILE_PROPERTIES=JSON.parse(d.TILE_PROPERTIES);b(p)})})}else t.getEvaluationDetailsFromRunTimeService("/EVALUATION_FILTERS",e,function(h){p["EVALUATION_FILTERS"]=h;if(d.EVALUATION_VALUES){p["EVALUATION_VALUES"]=JSON.parse(d.EVALUATION_VALUES);if(d.EVALUATION){p.EVALUATION=JSON.parse(d.EVALUATION);p.TILE_PROPERTIES=JSON.parse(d.TILE_PROPERTIES);b(p)}else t.getEvaluationDetailsFromRunTimeService("/EVALUATIONS",e,function(h){p.EVALUATION=h;p.TILE_PROPERTIES=JSON.parse(d.TILE_PROPERTIES);b(p)})}else t.getEvaluationDetailsFromRunTimeService("/EVALUATION_VALUES",e,function(h){p["EVALUATION_VALUES"]=h;if(d.EVALUATION){p.EVALUATION=JSON.parse(d.EVALUATION);p.TILE_PROPERTIES=JSON.parse(d.TILE_PROPERTIES);b(p)}else t.getEvaluationDetailsFromRunTimeService("/EVALUATIONS",e,function(h){p.EVALUATION=h;p.TILE_PROPERTIES=JSON.parse(d.TILE_PROPERTIES);b(p)})})})},getEvaluationDetailsFromRunTimeService:function(e,i,b){var K=this.getODataModelByServiceUri('/sap/hba/r/sb/core/odata/runtime/SMART_BUSINESS.xsodata');var d="ID eq '#EVALUATIONID'".replace("#EVALUATIONID",i);var k=K.read(e,null,{"$filter":d},true,function(h){var j=[];if(h.results.length){j=h.results}b.call(this,j)})},getNavigationTarget:function(C,s){var b=sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getService;var o=b&&b("CrossApplicationNavigation");var p={};p["evaluationId"]=C.EVALUATION.ID;p["chipId"]=C.TILE_PROPERTIES.id;if(s)p["sap-system"]=s;p["tileType"]=C.TILE_PROPERTIES.tileType;if(C.TILE_PROPERTIES.dimension)p["dimension"]=C.TILE_PROPERTIES.dimension;if(C.TILE_PROPERTIES.storyId)p["storyId"]=C.TILE_PROPERTIES.storyId;if(C.ADDITIONAL_APP_PARAMETERS){for(each in C.ADDITIONAL_APP_PARAMETERS){if(C.ADDITIONAL_APP_PARAMETERS.hasOwnProperty(each)){if(C.ADDITIONAL_APP_PARAMETERS[each].constructor==Array){var d=C.ADDITIONAL_APP_PARAMETERS[each];for(var i=0;i<d.length;i++)p[each]=d[i]}else p[each]=C.ADDITIONAL_APP_PARAMETERS[each]}}}var t=o&&o.hrefForExternal({target:{semanticObject:C.TILE_PROPERTIES.semanticObject,action:C.TILE_PROPERTIES.semanticAction},params:p})||"";if(C.ADDITIONAL_FILTERS){var e=C.ADDITIONAL_FILTERS;var h="&";for(var j=0;j<e.length;j++){if(e[j].OPERATOR==="EQ")h=h+"/"+e[j].NAME+"="+e[j].VALUE_1}t+=h}return t},getChipTitle:function(C){var t="";if(C){var b=C.EVALUATION||{};t=b.INDICATOR_TITLE||""}return t},getstringifyTileConfig:function(C){var s={};s.EVALUATION=JSON.stringify(C.EVALUATION);s.EVALUATION_FILTERS=JSON.stringify(C.EVALUATION_FILTERS);s.EVALUATION_VALUES=JSON.stringify(C.EVALUATION_VALUES);s.TILE_PROPERTIES=JSON.stringify(C.TILE_PROPERTIES);return JSON.stringify(s)},getChipSubTitle:function(C){var t="";if(C){var b=C.EVALUATION||{};t=b.TITLE||""}return t},prepareQueryServiceUri:function(U,b,m,d,v,o,t){function _(I){return I.replace(/'/g,"''")}var h=null;try{var n=null;if(U instanceof sap.ui.model.odata.ODataModel){n=sap.ushell.components.tiles.indicatorTileUtils.odata4analytics.Model.ReferenceByModel(U)}else{var p=this.getODataModelByServiceUri(U);n=sap.ushell.components.tiles.indicatorTileUtils.odata4analytics.Model.ReferenceByModel(p)}var O=new sap.ushell.components.tiles.indicatorTileUtils.odata4analytics.Model(n);var q=O.findQueryResultByName(b);var Q=new sap.ushell.components.tiles.indicatorTileUtils.odata4analytics.QueryResultRequest(q);if(m){Q.setMeasures(m.split(","));Q.includeMeasureRawFormattedValueUnit(null,true,true,true)}if(d){if(typeof d=="string"){h=d;h=h.split(",")}for(var i=0;i<h.length;i++){Q.addToAggregationLevel([h[i]]);var r=q.getAllDimensions();if(r[h[i]].getTextProperty()!=null){Q.includeDimensionKeyTextAttributes([h[i]],true,true,null)}}}if(v&&v.length){var s=new Array();var w=new Array();for(var i=0,l=v.length;i<l;i++){var x=v[i];if(x.type==="PA"){w.push(x)}else if(x.type==="FI"){s.push(x)}}function A(I){var J=I.toJSON();var K=J.charAt(J.length-1).toUpperCase();if(K.charCodeAt(0)>=65&&K.charCodeAt(0)<=90){J=J.slice(0,-1)}return J};function B(I){if(I){try{if(I==+I){I=window.parseInt(I)}var J=new Date(I);var K=J.getTime();if(isNaN(K)){return I}else{return A(J)}}catch(e){}}return I};if(s.length){var F=Q.getFilterExpression();for(var i=0,l=s.length;i<l;i++){var x=s[i];if(this.getEdmType(U,x.filterPropertyName)=="Edm.DateTime"){x.value=B(x.value);x.valueTo=B(x.valueTo)}if(x.comparator==sap.ui.model.FilterOperator.BT){F.addCondition(x.filterPropertyName,x.comparator,window.encodeURIComponent(_(x.value)),window.encodeURIComponent(x.valueTo))}else{var C=x.value.split(",");for(var j=0,k=C.length;j<k;j++){F.addCondition(x.filterPropertyName,x.comparator,window.encodeURIComponent(_(C[j].replace(/\^\|/g,","))),null)}}}}if(w.length){if(q.getParameterization()){var P=new sap.ushell.components.tiles.indicatorTileUtils.odata4analytics.ParameterizationRequest(q.getParameterization());for(var y=0,z=w.length;y<z;y++){var D=w[y];P.setParameterValue(D.filterPropertyName,window.encodeURIComponent(_(D.value)))}Q.setParameterizationRequest(P)}}}var E=Q.getURIToQueryResultEntries();if(o&&o.length){E=E+"&$orderby=";for(var y=0,z=o.length;y<z;y++){var G=o[y].sortOrder||"asc";if(G)E+=o[y].element+" "+G+","}E=E.slice(0,E.length-1)}if(t){E=E+"&$top="+t}var M=q.getAllMeasures();var H=M[m.split(",")[0]].getUnitProperty();return{uri:E,model:O.getODataModel(),unit:H}}catch(e){$.sap.log.error("Error Preparing Query Service Uri using OData4Analytics Library : "+e.toString());if(arguments.length){$.sap.log.error("Arguments Passed to this function");$.sap.log.error(arguments[0]+","+arguments[1]+","+arguments[2]+","+arguments[3])}else{$.sap.log.error("NO Arguments passed to this function")}return null}},_getOData4AnalyticsObject:function(U){var m=null;if(U instanceof sap.ui.model.odata.ODataModel){m=U}else if(typeof U=="string"){m=this.getODataModelByServiceUri(U)}else{throw new Error("Invalid Input to Create ODataModel Object : "+U)}var O=new sap.ushell.components.tiles.indicatorTileUtils.odata4analytics.Model(sap.ushell.components.tiles.indicatorTileUtils.odata4analytics.Model.ReferenceByModel(m));return O},getAllEntitySet:function(U){var b=new Array();try{var o=this._getOData4AnalyticsObject(U);b=o.getAllQueryResultNames()}catch(e){$.sap.log.error("Error fetching Enity Set : "+e.toString())}return b},getAllMeasures:function(U,b){var m=new Array();try{var o=this._getOData4AnalyticsObject(U);var q=o.findQueryResultByName(b);m=q.getAllMeasureNames()}catch(e){$.sap.log.error("Error Fetching All Measures : "+e.toString())}return m},getAllMeasuresWithLabelText:function(U,b){var m=new Array();try{var o=this._getOData4AnalyticsObject(U);var q=o.findQueryResultByName(b);var d=q.getAllMeasureNames();for(var i=0;i<d.length;i++){var h=d[i];g.oMeasure=q.findMeasureByName(h);m.push({key:h,value:oMeasure.getLabelText()})}}catch(e){$.sap.log.error("Error Fetching All Measures : "+e.toString())}return m},getAllDimensions:function(U,b){function i(j,k){var l=0,m=0;var r=new Array();while(l<j.length&&m<k.length){if(j[l]<k[m]){l++}else if(j[l]>k[m]){m++}else{r.push(j[l]);l++;m++}}return r}var d=new Array();var F=new Array();try{var o=this._getOData4AnalyticsObject(U);var q=o.findQueryResultByName(b);var h=q.getEntityType();F=h.getFilterablePropertyNames();d=q.getAllDimensionNames();if(F&&F.length){d=i(F.sort(),d.sort())}}catch(e){$.sap.log.error("Error Fetching All Dimesions : "+e.toString())}return d},getAllDimensionsWithLabelText:function(U,b){var d=new Array();try{var o=this._getOData4AnalyticsObject(U);var q=o.findQueryResultByName(b);var h=q.getAllDimensionNames();for(var i=0;i<h.length;i++){var j=h[i];var D=q.findDimensionByName(j);var t=null;if(D.getTextProperty()!=null)t=D.getTextProperty().name;d.push({key:j,value:D.getLabelText(),textProperty:t})}}catch(e){$.sap.log.error("Error Fetching All Dimesions : "+e.toString())}return d},getAllInputParams:function(U,b){var i=new Array();try{var o=this._getOData4AnalyticsObject(U);var q=o.findQueryResultByName(b);if(q.getParameterization()){var p=q.getParameterization();i=p.getAllParameterNames()}}catch(e){$.sap.log.error("Error Fetching Input Params : "+e.toString())}return i},getAllInputParamsWithFlag:function(U,b){var d=new Array();try{var o=this._getOData4AnalyticsObject(U);var q=o.findQueryResultByName(b);if(q.getParameterization()){var p=q.getParameterization();var h=p.getAllParameterNames();for(var i=0;i<h.length;i++){var j=h[i];var k=p.findParameterByName(j);d.push({name:j,optional:k.isOptional()})}}}catch(e){$.sap.log.error("Error Fetching Input Params : "+e.toString())}return d},formatOdataObjectToString:function(v){if(v&&v.constructor==Object){if(v.__edmType=="Edm.Time"){var m=v.ms;var s=Math.floor((m/1000)%60);var b=Math.floor((m/60000)%60);var h=Math.floor((m/3600000)%24);return h+"H"+b+"M"+s+"S"}}return v},generateCombinations:function(b){function d(h,s){while(s.length<h){s='0'+s}return s}var m=Math.pow(2,b.length);var r=[];var e=0;while(m>1){var s=(m-1).toString(2);s=d(b.length,s);r[e]=[];for(var i=0;i<s.length;i++){if(Number(s[i]))r[e].push(b[i])}m--,e++}return r},logError:function(e){jQuery.sap.log.error(e.toString())},numberOfLeadingZeros:function(n){n=String(n);var b=0;var d=n.indexOf('.');if(d==-1)return 0;if(Number(n.split('.')[0])!=0)return 0;var i=d+1;while(n[i++]=='0'){++b}return b},formatValue:function(v,s,M){M=M||3;var b={3:"K",6:"M",9:"B",12:"T",0:""};b["-3"]="m";b["-6"]="u";b["-9"]="n";b["-12"]="t";b["-2"]="%";var t,p,d;t=Number(v).toPrecision(M);var z=this.numberOfLeadingZeros(t);if(z>0&&s<0){p=t*Math.pow(10,z+M);d=-(z+M)}else{p=Number(t.split("e")[0]);d=Number(t.split("e")[1])||0}if(!v&&v!=0)return{value:"",unitPrefix:""};if(s>=0){if(d%3!=0){if(d%3==2){if(d+1==s){d=d+1;p=p/10}else{d=d-2;p=p*100}}else{if(d+2==s){d=d+2;p=p/100}else{d--;p=p*10}}}else if(d==15){p=p*1000;d=12}}else{if(s=="-2"){var x=this.formatValue((v*100),0)}else if(d>=0&&v<10&&s=="-3"){p=v*Math.pow(10,3);d=-3}else if(d>=0)return this.formatValue(v,0);else{d=Math.abs(d);s=Math.abs(s);if(s>d){p=p/(Math.pow(10,d%3));d=d-(d%3)}else{var e=d-s;p=p/(Math.pow(10,e));d=d-e}d=0-d}}p+="";if(s=="-2"){var h=(x.unitPrefix=="")?Number(x.value+"").toFixed(4-(x.value+"").indexOf('.')):Number(x.value+"").toFixed(3-(x.value+"").indexOf('.'));return{value:Number(h),unitPrefix:(x.unitPrefix)+b[-2]}}p=Number(p).toFixed(4-p.indexOf('.'));return{value:Number(p),unitPrefix:b[d]}},abortPendingODataCalls:function(d){try{if(d){d.abort()}}catch(e){this.logError(e)}}}})(window,jQuery);sap.ushell.components.tiles.indicatorTileUtils.cache=(function(){var B={};var K={};return{getEvaluationById:function(k){return this.getEvaluationByChipId(k)},getEvaluationByChipId:function(k){if(B[k]){return B[k]}return null},setEvaluationById:function(k,d){B[k]=d},getKpivalueById:function(k){if(K[k])return K[k];return null},setKpivalueById:function(k,d){K[k]=d}}})();
