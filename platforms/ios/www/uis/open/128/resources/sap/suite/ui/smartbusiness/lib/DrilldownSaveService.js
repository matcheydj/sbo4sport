jQuery.sap.declare("sap.suite.ui.smartbusiness.lib.DrilldownSaveService");sap.suite=sap.suite||{};sap.suite.smartbusiness=sap.suite.smartbusiness||{};sap.suite.smartbusiness.ddaconfig=sap.suite.smartbusiness.ddaconfig||{};sap.suite.smartbusiness.ddaconfig.DrilldownSaveService={fetchXSRFToken:function(S,e){jQuery.ajax({type:"HEAD",async:false,dataType:"json",url:"/sap/hba/r/sb/core/logic/__token.xsjs",headers:{"X-CSRF-Token":"Fetch"},success:function(d,s,x){if(S)S(d,s,x)},error:function(){if(e)e(d,s,x)}})},constants:{"write":{fn:"getWritePayload"},"delete":{fn:"getDeletePayload"},"update":{fn:"getUpdatePayload"},"viewServiceUrl":"/sap/hba/r/sb/core/logic/ddaViewConfiguration_cud.xsjs","evalServiceUrl":"/sap/hba/r/sb/core/logic/ddaEvaluation_cud.xsjs"},doUpdate:function(c){var t=this;this.fetchXSRFToken(function(d,s,x){jQuery.ajax({url:sap.suite.smartbusiness.utils.appendUrlParameters(c.url),type:"PUT",headers:{"X-CSRF-Token":x.getResponseHeader("X-CSRF-Token"),"Accept-Language":sap.suite.smartbusiness.utils.getLocaleLanguage()},data:JSON.stringify(c.payload)}).done(c.success||function(){}).fail(c.error||function(){})},c.error)},doWrite:function(c){var t=this;this.fetchXSRFToken(function(d,s,x){jQuery.ajax({url:sap.suite.smartbusiness.utils.appendUrlParameters(c.url),type:"POST",headers:{"X-CSRF-Token":x.getResponseHeader("X-CSRF-Token"),"Accept-Language":sap.suite.smartbusiness.utils.getLocaleLanguage()},data:JSON.stringify(c.payload)}).done(c.success||function(){}).fail(c.error||function(){})},c.error)},doDelete:function(c){var t=this;this.fetchXSRFToken(function(d,s,x){jQuery.ajax({url:sap.suite.smartbusiness.utils.appendUrlParameters(c.url),type:"DELETE",headers:{"X-CSRF-Token":x.getResponseHeader("X-CSRF-Token"),"Accept-Language":sap.suite.smartbusiness.utils.getLocaleLanguage()},data:JSON.stringify(c.payload)}).done(c.success||function(){}).fail(c.error||function(){})},c.error)},doServiceCall:function(c){var t=this;if(c.type=="POST"){this.doWrite(c)}else if(c.type=="PUT"){this.doUpdate(c)}else if(c.type="DELETE"){this.doDelete(c)}},saveEvalConfiguration:function(e,d,a,s,E){var t=(a=="delete"?"DELETE":(a=="update"?"PUT":"POST"));if(this.constants[a]){this.doServiceCall({type:t,payload:this[this.constants[a].fn](e,d),url:this.constants.evalServiceUrl,success:s,error:E})}else{E("Service Failed. Unrecognized action "+a)}},saveViewConfiguration:function(e,d,a,s,E){a=d.ID_EDITABLE?"write":a;var t=(a=="delete"?"DELETE":(a=="update"?"PUT":"POST"));if(this.constants[a]){this.doServiceCall({type:t,payload:this[this.constants[a].fn](e,d,true),url:this.constants.viewServiceUrl,success:s,error:E})}else{E("Service Failed. Unrecognized action "+a)}},getUpdatePayload:function(e,d,i){return{payload:this.getWritePayload(e,d,i),keys:this.getDeletePayload(e,d,i)}},getWritePayload:function(e,d,i){var c=d.ID,r;if(i){r={DDA_COLUMNS:this.getColumnsPayload(d,e,c),DDA_CHART:this.getChartPayload(d,e,c),DDA_MASTER_TEXT:this.getViewTextPayload(d,e,c)};if(d.ID_EDITABLE){r.DDA_MASTER=this.getNewViewPayload(d.ALL_VIEWS,e,c)}}else{r={DDA_FILTERS:this.getFilterPayload(d.CURRENT_FILTERS,e,c),DDA_HEADER:this.getHeaderPayload(d.HEADERS_VISIBLE,e,c),DDA_CONFIGURATION:this.getConfigurationPayload(d,e,c)};var v=this.getViewOrderPayload(d.ALL_VIEWS,e,c);if(v.length){r.DDA_MASTER=v}}return r},getDeletePayload:function(e,d,i){return{"EVALUATION_ID":e,"CONFIGURATION_ID":d.ID}},getViewTextPayload:function(d,e,c){var v=[];var a=d.CURRENT_LANGUAGE,b=d.TITLE;d=d.ADDITIONAL_LANGUAGE_TITLES||[];for(var i=0;i<d.length;i++){if(d[i].SAP_LANGUAGE_KEY==a)continue;v.push({"CONFIGURATION_ID":c,"EVALUATION_ID":e,"SAP_LANGUAGE_KEY":d[i].SAP_LANGUAGE_KEY,"TEXT":d[i].TEXT,"IS_ACTIVE":1})}v.push({"CONFIGURATION_ID":c,"EVALUATION_ID":e,"SAP_LANGUAGE_KEY":a,"TEXT":b,"IS_ACTIVE":1});return v},getChartPayload:function(d,e,c){return[{"EVALUATION_ID":e,"CONFIGURATION_ID":c,"VALUE_TYPE":d.VALUE_TYPE,"AXIS_TYPE":d.AXIS_TYPE,"CHART_TYPE":d.CHART_TYPE,"DATA_LIMIT":d.DATA_LIMITATIONS?d.DATA_LIMIT:-1,"COLOR_SCHEME":d.COLOR_SCHEME,"IS_ACTIVE":1,"THRESHOLD_MEASURE":d.THRESHOLD_MEASURE}]},getColumnsPayload:function(d,e,c){var a=[];var b=d.COLOR_SCHEME;d=d.items||[];for(var i=0;i<d.length;i++){if(d[i].SELECTED)a.push({"EVALUATION_ID":e,"CONFIGURATION_ID":c,"NAME":d[i].NAME,"TYPE":d[i].TYPE.toUpperCase(),"SORT_BY":d[i].SORT_BY,"VISIBILITY":d[i].VISIBILITY,"COLOR":(b=="MANUAL_NON_SEMANTIC"?d[i].COLOR1:b=="MANUAL_SEMANTIC"?d[i].COLOR2:"")||"","STACKING":d[i].STACKING,"AXIS":d[i].AXIS,"SORT_ORDER":d[i].SORT_ORDER,"COLUMNS_ORDER":i,"IS_ACTIVE":1})}return a},getFilterPayload:function(d,e,c){var f=[];d=d||[];for(var i=0;i<d.length;i++){f.push({"EVALUATION_ID":e,"CONFIGURATION_ID":c,"DIMENSION":d[i],"VISIBILITY":1,"IS_ACTIVE":1})}return f},_getHeaderConfiguration:function(h){var d;switch(h.VISUALIZATION_TYPE){case"CM":d=[{name:h.MEASURE1,color:h.COLOR1},{name:h.MEASURE2,color:h.COLOR2}];(h.MEASURE3&&h.MEASURE3!="_none^")?d.push({name:h.MEASURE3,color:h.COLOR3}):"";d=JSON.stringify({MEASURES:JSON.stringify(d)});break;case"CT":d={order:h.SORT_ORDER[1]=="D"?"desc":"asc",by:h.SORT_ORDER[0]};d=JSON.stringify({SORTING:JSON.stringify(d)});break}return d},getHeaderPayload:function(d,e,c){var h=[];d=d||[];for(var i=0;i<d.length;i++){if(d[i])h.push({"CONFIGURATION_ID":c,"EVALUATION_ID":e,"VISUALIZATION_TYPE":d[i].VISUALIZATION_TYPE,"VISIBILITY":1,"REFERENCE_EVALUATION_ID":d[i].REFERENCE_EVALUATION_ID,"VISUALIZATION_ORDER":i,"DIMENSION":d[i].DIMENSION,"IS_ACTIVE":1,"CONFIGURATION":this._getHeaderConfiguration(d[i])})}return h},getConfigurationPayload:function(d,e,c){var a={"SAP_FILTER":{value:"",visibility:1},"SAP_AGGREGATE_VALUE":{value:"",visibility:(d.CONFIG.SAP_AGGREGATE_VALUE?1:0)},"SAP_HEADER":{value:"",visibility:1},"QUERY_SERVICE_URI":{value:d.QUERY_SERVICE_URI,visibility:1},"QUERY_ENTITY_SET":{value:d.QUERY_ENTITY_SET,visibility:1},};var b=[];for(var f in a){b.push({"EVALUATION_ID":e,"CONFIGURATION_ID":c,"PROPERTY_TYPE":f,"PROPERTY_VALUE":a[f].value,"VISIBILITY":a[f].visibility,"IS_ACTIVE":1})}return b},getNewViewPayload:function(d,e,c){return[{"CONFIGURATION_ID":c,"EVALUATION_ID":e,"CONFIG_ORDER":(d.length+1),"IS_ACTIVE":1}]},getViewOrderPayload:function(d,e,c){var a=[];d=d||[];for(var i=0;i<d.length;i++){a.push({"CONFIGURATION_ID":d[i].ID,"EVALUATION_ID":e,"CONFIG_ORDER":i,"IS_ACTIVE":1})}return a}};
