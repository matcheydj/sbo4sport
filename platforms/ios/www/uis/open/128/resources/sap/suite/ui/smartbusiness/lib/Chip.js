jQuery.sap.declare("sap.suite.ui.smartbusiness.lib.Chip");jQuery.sap.require("sap.suite.ui.smartbusiness.lib.Util");sap.suite=sap.suite||{};sap.suite.smartbusiness=sap.suite.smartbusiness||{};sap.suite.smartbusiness.chip=(function(){var d=false;var c={"NT":"/sap/bc/ui5_ui5/ui2/ushell/resources/sap/ushell/components/tiles/indicatornumeric/NumericTileChip.xml","CT":"/sap/bc/ui5_ui5/ui2/ushell/resources/sap/ushell/components/tiles/indicatorcontribution/ContributionTileChip.xml","TT":"/sap/bc/ui5_ui5/ui2/ushell/resources/sap/ushell/components/tiles/indicatorArea/AreaChartTileChip.xml","AT":"/sap/bc/ui5_ui5/ui2/ushell/resources/sap/ushell/components/tiles/indicatordeviation/DeviationTileChip.xml"};var g=function(k,t){var u="ATH";try{if(sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getService){var l=sap.ushell.Container.getService("UserInfo");if(l&&l.getId){u=l.getId()||"ATH"}}}catch(e){}return k.ID+"_"+u+"_"+t};var a=function(e,t,s,k){return{"tileType":t,"frameType":"OneByOne","navType":0,"semanticObject":s||e.COLUMN_NAME,"semanticAction":k||"analyzeSBKPIDetails","appParameters":{}}};var E=["ID","INDICATOR","INDICATOR_TITLE","INDICATOR_TYPE","GOAL_TYPE","TITLE","SCALING","ODATA_URL","ODATA_ENTITYSET","VIEW_NAME","COLUMN_NAME","OWNER_NAME","VALUES_SOURCE"];var b=function(e){var k=[];e.FILTERS["results"].forEach(function(l){delete l.__metadata;var o={};for(var m in l){if(l.hasOwnProperty(m)){o[m]=l[m]}}k.push(o)});return k};var f=function(e,o){if(o){return o.evaluationValues}else{var v=[];e.VALUES["results"].forEach(function(k){delete k.__metadata;var l={};for(var m in k){if(k.hasOwnProperty(m)){l[m]=k[m]}}v.push(l)});return v}};var _=function(e){var k=[];if(e&&e.length){e.forEach(function(l){var o={};o["NAME"]=l[0];o["OPERATOR"]=l[1];o["VALUE_1"]=l[2];o["VALUE_2"]=l[3];o["TYPE"]="FI";k.push(o)})}return k};var h=function(e){var k={};E.forEach(function(l){k[l]=e[l]});return k};var i=function(u,s){if(sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getService){var e=sap.ushell.Container.getService("URLParsing");if(e){u=e.addSystemToServiceUrl(u,s)}}return u};var p=function(e,s,C,k){var l="/sap/hba/r/sb/core/odata/runtime/SMART_BUSINESS.xsodata";l=i(l,s);var O=sap.suite.smartbusiness.odata.getModelByServiceUri(l);O.create("/CHIPS_USER",e,null,function(){C.call()},function(m){k.call(null,m)},false)};var j=function(e,s,C,k){var l="/sap/hba/r/sb/core/logic/__token.xsjs";l=i(l,s);jQuery.ajax({url:l,type:"HEAD",async:false,headers:{"X-CSRF-Token":"Fetch"},success:function(m,n,x){l="/sap/hba/r/sb/core/logic/addToCatalog.xsjs";l=i(l,s);var t=x.getResponseHeader("x-csrf-token");jQuery.ajax({url:l,type:"POST",async:false,data:encodeURIComponent(JSON.stringify(e)),dataType:"json",headers:{"x-csrf-token":t},success:function(m){C.call(null,m)},error:function(o){k.call(null,o)}})},error:function(m){k.call(null,m)}})};return{savePersonalizedTile:function(P){var r={};if(P.evaluationId&&P.tileType){var e=sap.suite.smartbusiness.kpi.getEvaluationById({id:P.evaluationId,cache:true,filters:true,thresholds:true,useRuntimeService:true,sapSystem:P.sapSystem});if(e&&e.ID){var T=Date.now()+"";var C=g(e,T);var M={};M["id"]=C;M["tileType"]=P.tileType;M["url"]=c[P.tileType];M["description"]=P.title||e.TITLE;M["title"]=e.INDICATOR_TITLE;M["catalogId"]="HANA_CATALOG";M["configuration"]={tileConfiguration:{}};var k=a(e,P.tileType,P.semanticObject,P.semanticAction);k["id"]=C;k["dimension"]=P.dimension;var l=JSON.stringify(b(e));var m=f(e,P.evaluationValues);var n=JSON.stringify(h(e));M.configuration.tileConfiguration["TILE_PROPERTIES"]=JSON.stringify(k);M.configuration.tileConfiguration["EVALUATION_VALUES"]=JSON.stringify(m);M.configuration.tileConfiguration["EVALUATION"]=n;M.configuration.tileConfiguration["ADDITIONAL_FILTERS"]=JSON.stringify(_(P.additionalFilters));M.configuration.tileConfiguration["ADDITIONAL_APP_PARAMETERS"]=JSON.stringify(P.additionalAppParameters||{});M.configuration.tileConfiguration["timestamp"]=T;M.configuration["isSufficient"]="0";M["evaluationId"]=e.ID;M["keywords"]=P.keywords||null;var o=JSON.stringify(M.configuration).length;if(o>4096){M.configuration.tileConfiguration["EVALUATION_FILTERS"]=JSON.stringify([]);M.configuration["isSufficient"]="0"}M["configuration"].tileConfiguration=JSON.stringify(M["configuration"].tileConfiguration);M["configuration"]=JSON.stringify(M["configuration"]);j(M,P.sapSystem,function(q){r.status="Success",r.chipId=q.chipId,r.message="Tile Created Successfully"},function(q){r.status="Failed",r.message="Error Creating Tile";r.errorDescription=q})}else{r.status="Failed",r.message="Invalid Evaluation Id : "+P.evaluationId}}else{r.status="Failed",r.message="Mandatory Param evaluationId or TileType is Missing"}return r}}})();
