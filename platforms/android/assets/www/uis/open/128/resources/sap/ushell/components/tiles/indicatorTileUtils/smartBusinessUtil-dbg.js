jQuery.sap.declare("sap.ushell.components.tiles.indicatorTileUtils.smartBusinessUtil");

sap = sap || {};
sap.ushell = sap.ushell || {};
sap.ushell.components = sap.ushell.components || {};
sap.ushell.components.tiles.indicatorTileUtils = sap.ushell.components.tiles.indicatorTileUtils || {};
sap.ushell.components.tiles.indicatorTileUtils.util = sap.ushell.components.tiles.indicatorTileUtils.util || {};

sap.ushell.components.tiles.indicatorTileUtils.util = (function(global, $, undefined) {
    var fetchAuthToken = function() {
        var obj = {};
        $.ajax({
            type: "GET",
            async : false,
            dataType : "json",
            url: "/sap/hba/apps/kpi/s/logic/__token.xsjs",
            headers: {
                "X-CSRF-Token": "Fetch"
            },
            success: function( data, status, xhr ) {
                obj.userName = data.userName;
                obj.token = xhr.getResponseHeader("X-CSRF-Token");
            },
            error: function() {
                $.sap.log.error("Error Fetching AUTH TOKEN");
            }
        });
        return obj;
    };

    var getArray = function(stringArray) {
        var retArray = [];
        for(var itr = 0 ; itr < stringArray.length; itr++)
            retArray.push(JSON.parse(stringArray[itr]));
        return retArray;
    };

    "use strict";
    var cache = {};
    return {
        getAuthToken : function() {
            return fetchAuthToken().token;
        },
        getHanaUser : function() {
            return authObject.userName;
        },
        getEdmType : function(sUri, propertyName) {
            var oDataModel = null;
            if(sUri instanceof sap.ui.model.odata.ODataModel) {
                oDataModel = sUri;
            } else  {
                oDataModel = this.getODataModelByServiceUri(sUri);
            }
            if(oDataModel && oDataModel.getServiceMetadata()) {
                var serviceMetaData = oDataModel.getServiceMetadata();
                var entitySets = serviceMetaData.dataServices.schema[0].entityType;
                if(entitySets) {
                    for(var i = 0; i<entitySets.length;i++) {
                        var entity = entitySets[i];
                        var properties = entity.property;
                        for(var j=0;j<properties.length;j++) {
                            var property=  properties[j];
                            if(property.name == propertyName) {
                                return property.type;
                            }
                        }
                    }
                }
            }
            return null;
        },
        getODataModelByServiceUri : function(sServiceUri) {
            if(!cache[sServiceUri]) {
                var oModel = new sap.ui.model.odata.ODataModel(sServiceUri,true);
                cache[sServiceUri] = oModel;
            }
            return cache[sServiceUri];
        },
        getMantissaLength : function(num){
            var sNum = num.toString();
            var initPos = 0;
            if(num < 0){
                initPos = 1;
            }
            return (sNum.indexOf('.') === -1 ) ? (num < 0 ? sNum.length -1:sNum.length):  
                sNum.substring(initPos, sNum.indexOf('.')).length;
        },
        getLocaleFormattedValue: function(num, oScale){
            var locale = new sap.ui.core.Locale(sap.ui.getCore().getConfiguration().getLanguage());
            if(oScale == -2){
                var fNum;
                if(num > 9999)
                    fNum = "????";
                else if(num < 0.001)
                    fNum = "0";
                else{
                    if(num.toString().indexOf('.') != -1)
                        fNum = Number(num).toFixed(4-num.toString().indexOf('.'));
                    else
                        fNum = Number(num);
                    var valFormatter = sap.ca.ui.model.format.NumberFormat.getInstance({ style: "short"}, locale);
                    fNum = valFormatter.format(fNum);
                }
            }
            else{
                var sD = 2;
                var mantissaLength  = this.getMantissaLength(num)
                if(!(mantissaLength % 3))
                    sD = 1;
                if(Math.abs(num) % Math.pow(10, mantissaLength-1) == 0){
                    sD = 0;
                }
                else if((Math.abs(num) % Math.pow(10, mantissaLength-1)) < 6*Math.pow(10, mantissaLength - 4)){
                    sD = 0;
                }                
                var valFormatter = sap.ca.ui.model.format.NumberFormat.getInstance({ style: "short" , shortDecimals:sD}, locale);
                var fNum = valFormatter.format(num);
            }
            return fNum;
        },

        getModelerRuntimeServiceModel : function() {
            return this.getODataModelByServiceUri("/sap/hba/apps/kpi/s/odata/smart_business_runtime_services.xsodata");
        },
        getSapFontErrorCode : function() {
            return String.fromCharCode(0xe0b1);               
        },
        getSapFontBusyCode : function() {
            return String.fromCharCode(0xe1f2);
        },
        prepareFilterStructure : function(filter,addFilters){
            var variantData = [];
            if(addFilters){
                filter = filter.concat(addFilters);

            }

            for(var itr = 0 ; itr < filter.length; itr++){
                var pushObj = {};
                pushObj.comparator = filter[itr].OPERATOR;
                pushObj.filterPropertyName = filter[itr].NAME;

                if(filter[itr].ID)
                    pushObj.id = filter[itr].ID;    

                pushObj.type = filter[itr].TYPE;
                pushObj.value = filter[itr].VALUE_1;
                pushObj.valueTo = filter[itr].VALUE_2;
                variantData.push(pushObj);
            }

            return variantData;
        },



        getFilterFromRunTimeService: function(oConfig,callback){
            var KPI_RUNTIME_ODATA_MODEL =  this.getODataModelByServiceUri('/sap/hba/r/sb/core/odata/runtime/SMART_BUSINESS.xsodata');
            var filterValue = "ID eq '#EVALUATIONID'".replace("#EVALUATIONID",oConfig.EVALUATION.ID);
            var kpiEvaluationFilterODataReadRef = KPI_RUNTIME_ODATA_MODEL.read("/EVALUATION_FILTERS", null, {"$filter" : filterValue}, true, function(data) {
                var filters = [];
                if(data.results.length){
                    filters = data.results;
                }
                callback.call(this,filters);
            });
        },

        findTextPropertyForDimension : function(sUri, entitySet, dimension) {           
            try {
                var o4a = this._getOData4AnalyticsObject(sUri);
                var queryResult = o4a.findQueryResultByName(entitySet);
                var oDimension = queryResult.findDimensionByName(dimension);
                if(oDimension.getTextProperty()){
                    return oDimension.getTextProperty().name;
                } else {
                    return dimension;
                }
            } catch(e) {
                $.sap.log.error("Error Fetching Text Property for "+dimension+" : "+e.toString());
            }
        },

        getEvalValueMeasureName : function(oConfig, type, retType){
            var evalValue = oConfig.EVALUATION_VALUES;
            for(var i = 0; i < evalValue.length; i++){
                if(evalValue[i].TYPE == type)
                    if(retType === "FIXED")
                        return evalValue[i].FIXED;
                    else
                        return evalValue[i].COLUMN_NAME;
            }
        },


        /**
         * Read and initialize configuration object from given JSON string. Used by all indicator tiles.
         *
         * @param {string} sConfig
         *   Configuration string in JSON format
         * @returns {object}
         *   Returns parsed configuration object
         */

        getParsedChip : function(sConfig, callback){
            var parsedChipConfig = {};
            var chipJson = JSON.parse(sConfig);
            var evaluationId = JSON.parse(chipJson.TILE_PROPERTIES).evaluationId || "";
            var that = this;
            if(chipJson.ADDITIONAL_FILTERS) 
                parsedChipConfig["ADDITIONAL_FILTERS"] = JSON.parse(chipJson.ADDITIONAL_FILTERS);
            if(chipJson.ADDITIONAL_APP_PARAMETERS)
                parsedChipConfig["ADDITIONAL_APP_PARAMETERS"] = JSON.parse(chipJson.ADDITIONAL_APP_PARAMETERS);
            if(chipJson.EVALUATION_FILTERS) {
                parsedChipConfig["EVALUATION_FILTERS"] = JSON.parse(chipJson.EVALUATION_FILTERS);
                if(chipJson.EVALUATION_VALUES){
                    parsedChipConfig["EVALUATION_VALUES"] = JSON.parse(chipJson.EVALUATION_VALUES);
                    if(chipJson.EVALUATION){
                        parsedChipConfig.EVALUATION = JSON.parse(chipJson.EVALUATION);
                        parsedChipConfig.TILE_PROPERTIES = JSON.parse(chipJson.TILE_PROPERTIES);
                        callback(parsedChipConfig);
                    }
                    else 
                        that.getEvaluationDetailsFromRunTimeService("/EVALUATIONS", evaluationId, function(filters){
                            parsedChipConfig.EVALUATION = filters;
                            parsedChipConfig.TILE_PROPERTIES = JSON.parse(chipJson.TILE_PROPERTIES);
                            callback(parsedChipConfig);
                        });
                }
                else
                    that.getEvaluationDetailsFromRunTimeService("/EVALUATION_VALUES", evaluationId, function(filters){
                        parsedChipConfig["EVALUATION_VALUES"] = filters;
                        if(chipJson.EVALUATION){
                            parsedChipConfig.EVALUATION = JSON.parse(chipJson.EVALUATION);
                            parsedChipConfig.TILE_PROPERTIES = JSON.parse(chipJson.TILE_PROPERTIES);
                            callback(parsedChipConfig);
                        }
                        else 
                            that.getEvaluationDetailsFromRunTimeService("/EVALUATIONS", evaluationId, function(filters){
                                parsedChipConfig.EVALUATION = filters;
                                parsedChipConfig.TILE_PROPERTIES = JSON.parse(chipJson.TILE_PROPERTIES);
                                callback(parsedChipConfig);
                            });
                    }); 
            }
            else 
                that.getEvaluationDetailsFromRunTimeService("/EVALUATION_FILTERS", evaluationId, function(filters){
                    parsedChipConfig["EVALUATION_FILTERS"] = filters;
                    if(chipJson.EVALUATION_VALUES){
                        parsedChipConfig["EVALUATION_VALUES"] = JSON.parse(chipJson.EVALUATION_VALUES);
                        if(chipJson.EVALUATION){
                            parsedChipConfig.EVALUATION = JSON.parse(chipJson.EVALUATION);
                            parsedChipConfig.TILE_PROPERTIES = JSON.parse(chipJson.TILE_PROPERTIES);
                            callback(parsedChipConfig);
                        }
                        else 
                            that.getEvaluationDetailsFromRunTimeService("/EVALUATIONS", evaluationId, function(filters){
                                parsedChipConfig.EVALUATION = filters;
                                parsedChipConfig.TILE_PROPERTIES = JSON.parse(chipJson.TILE_PROPERTIES);
                                callback(parsedChipConfig);
                            });
                    }
                    else
                        that.getEvaluationDetailsFromRunTimeService("/EVALUATION_VALUES", evaluationId, function(filters){
                            parsedChipConfig["EVALUATION_VALUES"] = filters;
                            if(chipJson.EVALUATION){
                                parsedChipConfig.EVALUATION = JSON.parse(chipJson.EVALUATION);
                                parsedChipConfig.TILE_PROPERTIES = JSON.parse(chipJson.TILE_PROPERTIES);
                                callback(parsedChipConfig);
                            }
                            else 
                                that.getEvaluationDetailsFromRunTimeService("/EVALUATIONS", evaluationId, function(filters){
                                    parsedChipConfig.EVALUATION = filters;
                                    parsedChipConfig.TILE_PROPERTIES = JSON.parse(chipJson.TILE_PROPERTIES);
                                    callback(parsedChipConfig);
                                });
                        });            
                });

        },

        /**
         * Read entity set name and evaluation id and return the appropriate call results.
         *
         * @param {string} oEntitySet
         *   Entity set name
         * @param {string} oId  
         *   Evaluation Id
         * @returns {object}
         *   Returns call results
         */

        getEvaluationDetailsFromRunTimeService: function(oEntitySet, oId, callback){
            var KPI_RUNTIME_ODATA_MODEL =  this.getODataModelByServiceUri('/sap/hba/r/sb/core/odata/runtime/SMART_BUSINESS.xsodata');
            var filterValue = "ID eq '#EVALUATIONID'".replace("#EVALUATIONID",oId);
            var kpiEvaluationFilterODataReadRef = KPI_RUNTIME_ODATA_MODEL.read(oEntitySet, null, {"$filter" : filterValue}, true, function(data) {
                var filters = [];
                if(data.results.length){
                    filters = data.results;
                }
                callback.call(this,filters);
            });
        },

        /**
         * Read and create external target Nav Hash
         * 
         * @param {JSON} jConfig
         *  configuration object for CHIP
         * @return {string} 
         *  Returns navigation hash
         */

        getNavigationTarget: function(jConfig,system){
            var fgetService = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService;
            var oCrossAppNavigator = fgetService && fgetService("CrossApplicationNavigation");
            var param = {};
            param["evaluationId"] = jConfig.EVALUATION.ID;
            param["chipId"] = jConfig.TILE_PROPERTIES.id;
            if(system)
                param["sap-system"] = system;

            param["tileType"] = jConfig.TILE_PROPERTIES.tileType;

            if(jConfig.TILE_PROPERTIES.dimension)
                param["dimension"] = jConfig.TILE_PROPERTIES.dimension;
            if(jConfig.TILE_PROPERTIES.storyId)
                param["storyId"] = jConfig.TILE_PROPERTIES.storyId;

            if(jConfig.ADDITIONAL_APP_PARAMETERS){
                for(each in jConfig.ADDITIONAL_APP_PARAMETERS){
                    if(jConfig.ADDITIONAL_APP_PARAMETERS.hasOwnProperty(each)){
                        if(jConfig.ADDITIONAL_APP_PARAMETERS[each].constructor == Array){
                            var addApp=jConfig.ADDITIONAL_APP_PARAMETERS[each];
                            for(var i=0;i<addApp.length;i++)
                                param[each]=addApp[i]                
                        }
                        else
                            param[each]=jConfig.ADDITIONAL_APP_PARAMETERS[each];
                    }
                }
            }
            var toOurApp = oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
                target: {
                    semanticObject: jConfig.TILE_PROPERTIES.semanticObject,
                    action: jConfig.TILE_PROPERTIES.semanticAction
                },
                params: param
            }) || "";
            if(jConfig.ADDITIONAL_FILTERS){
                var addFilter = jConfig.ADDITIONAL_FILTERS;
                var addFilterString="&";
                for(var j=0;j<addFilter.length;j++){
                    if(addFilter[j].OPERATOR==="EQ")
                        addFilterString=addFilterString+"/"+addFilter[j].NAME+"="+addFilter[j].VALUE_1;
                }
                toOurApp+=addFilterString;
            } 
            return toOurApp;
        },

        /**
         * Read chipConfig object and return appropriate title
         * 
         * @param {JSON} CHIP config
         *  configuration object for CHIP
         * @return {string}
         *  returns title for tile
         */
        getChipTitle: function(jConfig){
            var title = "";
            if(jConfig){
                var chipIndicator = jConfig.EVALUATION || {}
                title = chipIndicator.INDICATOR_TITLE || ""
            }
            return title;
        },

        getstringifyTileConfig: function(jConfig){
            var sConfig = {};
            sConfig.EVALUATION = JSON.stringify(jConfig.EVALUATION);
            sConfig.EVALUATION_FILTERS = JSON.stringify(jConfig.EVALUATION_FILTERS);
            sConfig.EVALUATION_VALUES = JSON.stringify(jConfig.EVALUATION_VALUES);
            sConfig.TILE_PROPERTIES = JSON.stringify(jConfig.TILE_PROPERTIES);
            return JSON.stringify(sConfig);
        },
        /**
         * Read chipConfig object and return appropriate subTitle
         * 
         * @param {JSON} CHIP config
         *  configuration object for CHIP
         * @return {string}
         *  returns subtitle for tile
         */

        getChipSubTitle: function(jConfig){
            var sTitle = "";
            if(jConfig){
                var chipEvaluation = jConfig.EVALUATION || {}
                sTitle = chipEvaluation.TITLE || ""
            }
            return sTitle;
        },
        /**
         * Returns fully formed oData Query URI using oData4Analytics Library
         *
         * @param {string} sUri
         *   oData entry URI
         * @param {string} entitySet
         *   entitySet in oDataURI for query
         * @param {string} measure
         *   aggregation of value on column name measure
         * @param {string} dimension
         *   aggregation of value on column name group by dimension
         * @param {JSON} variants
         *   $filter parameter in oData URI
         * @param {string} orderByElements
         *   orderBy either asc or desc
         * @param {string} top
         *   how many top values to select
         * @returns {string}
         *   Returns fully formed oData URI
         */

        prepareQueryServiceUri : function(sUri, entitySet, measure, dimension, variants, orderByElements, top) {
            function _replaceSingleQuoteWithDoubleSingleQuote(str) {
                return str.replace(/'/g,"''");
            }
            var tmpDimension = null;
            try {
                var modelReferenceBy=null;
                if(sUri instanceof sap.ui.model.odata.ODataModel) {
                    modelReferenceBy = sap.ushell.components.tiles.indicatorTileUtils.odata4analytics.Model.ReferenceByModel(sUri);           
                } else {
                    var tempModel = this.getODataModelByServiceUri(sUri);
                    modelReferenceBy = sap.ushell.components.tiles.indicatorTileUtils.odata4analytics.Model.ReferenceByModel(tempModel);
                }
                var O4A = new sap.ushell.components.tiles.indicatorTileUtils.odata4analytics.Model(modelReferenceBy);
                var oQueryResult = O4A.findQueryResultByName(entitySet);
                var oQueryResultRequest = new sap.ushell.components.tiles.indicatorTileUtils.odata4analytics.QueryResultRequest(oQueryResult);
                if(measure) {
                    oQueryResultRequest.setMeasures(measure.split(","));
                    oQueryResultRequest.includeMeasureRawFormattedValueUnit(null, true, true, true);
                }
                if(dimension) {
                    if(typeof dimension =="string") { 
                        tmpDimension = dimension; 
                        tmpDimension = tmpDimension.split(",");
                    }

                    for(var i=0;i<tmpDimension.length;i++) { 
                        oQueryResultRequest.addToAggregationLevel([tmpDimension[i]]);
                        var tmp=oQueryResult.getAllDimensions();
                        if(tmp[tmpDimension[i]].getTextProperty() != null) { 
                            oQueryResultRequest.includeDimensionKeyTextAttributes([tmpDimension[i]], true, true, null)
                        }
                    }
//                  oQueryResultRequest.setAggregationLevel(dimension.split(","));
//                  oQueryResultRequest.includeDimensionKeyTextAttributes(null, true, false, null);                               
                }

                if(variants && variants.length) {
                    var filterVariants = new Array();
                    var inputParamsVariants = new Array();
                    for(var i=0, l=variants.length; i<l; i++) {
                        var each = variants[i];
                        if(each.type === "PA") {
                            inputParamsVariants.push(each);
                        } else if(each.type === "FI") {
                            filterVariants.push(each);
                        }
                    }
                    function changeToYYYYMMDDHHMMSS(odate){ 
                        var dateStr = odate.toJSON();
                        var lastChar = dateStr.charAt(dateStr.length-1).toUpperCase();
                        if(lastChar.charCodeAt(0) >= 65 && lastChar.charCodeAt(0) <= 90) {
                            dateStr = dateStr.slice(0,-1);
                        }
                        return dateStr;
                    }
                    function _processODataDateTime(junkValue) {
                        if(junkValue) {
                            try {
                                if(junkValue == +junkValue) {
                                    junkValue = window.parseInt(junkValue);
                                }
                                var date = new Date(junkValue);
                                var time = date.getTime();
                                if(isNaN(time)) {
                                    return junkValue;
                                } else {
                                    return changeToYYYYMMDDHHMMSS(date);
                                }
                            }catch(e) {

                            }
                        }
                        return junkValue;
                    }
                    if(filterVariants.length) {
                        var oFilterExpression = oQueryResultRequest.getFilterExpression();
                        for(var i=0, l=filterVariants.length; i<l; i++) {
                            var each = filterVariants[i];
                            if(this.getEdmType(sUri,each.filterPropertyName)=="Edm.DateTime") {
                                each.value = _processODataDateTime(each.value);
                                each.valueTo = _processODataDateTime(each.valueTo);
                            }
                            if(each.comparator == sap.ui.model.FilterOperator.BT) {
                                oFilterExpression.addCondition(each.filterPropertyName,each.comparator,window.encodeURIComponent(_replaceSingleQuoteWithDoubleSingleQuote(each.value)),window.encodeURIComponent(each.valueTo));
                            } else {
                                var multipleFilterValueArray = each.value.split(",");
                                for(var j=0, k=multipleFilterValueArray.length; j<k; j++) {
                                    oFilterExpression.addCondition(each.filterPropertyName,each.comparator,window.encodeURIComponent(_replaceSingleQuoteWithDoubleSingleQuote(multipleFilterValueArray[j].replace(/\^\|/g,","))),null);
                                }
                            }

                        }
                    }
                    if(inputParamsVariants.length) {
                        if(oQueryResult.getParameterization()) {
                            var oParamRequest = new sap.ushell.components.tiles.indicatorTileUtils.odata4analytics.ParameterizationRequest(oQueryResult.getParameterization());
                            for(var y=0, z = inputParamsVariants.length; y<z ; y++) {
                                var eachInputParam = inputParamsVariants[y];
                                oParamRequest.setParameterValue(eachInputParam.filterPropertyName,window.encodeURIComponent(_replaceSingleQuoteWithDoubleSingleQuote(eachInputParam.value)));
                            }
                            oQueryResultRequest.setParameterizationRequest(oParamRequest);
                        }
                    }
                }
                var finalUri = oQueryResultRequest.getURIToQueryResultEntries();

                if(orderByElements && orderByElements.length){
                    //finalUri=finalUri+"&$orderby="+orderByElements.join(",");
                    finalUri=finalUri+"&$orderby="; 
                    for(var y=0, z = orderByElements.length; y<z ; y++){ 
                        var order = orderByElements[y].sortOrder || "asc"; 
                        if(order) finalUri+=orderByElements[y].element+" "+order+","; 
                    }                           
                    finalUri=finalUri.slice(0,finalUri.length-1); 
                } 

                if(top){
                    finalUri=finalUri+"&$top="+top;
                }

                var oMeasureNames = oQueryResult.getAllMeasures();
                var unit = oMeasureNames[measure.split(",")[0]].getUnitProperty();


                return {
                    uri : finalUri,
                    model : O4A.getODataModel(),
                    unit : unit
                };
            } catch(e) {
                $.sap.log.error("Error Preparing Query Service Uri using OData4Analytics Library : "+e.toString());
                if(arguments.length) {
                    $.sap.log.error("Arguments Passed to this function");
                    $.sap.log.error(arguments[0] +","+arguments[1]+","+arguments[2]+","+arguments[3]);
                } else {
                    $.sap.log.error("NO Arguments passed to this function");
                }
                return null;
            }
        },
        _getOData4AnalyticsObject  : function(sUri) {
            var oModel = null;
            if(sUri instanceof sap.ui.model.odata.ODataModel) {
                oModel = sUri;
            } else if(typeof sUri == "string") {
                oModel = this.getODataModelByServiceUri(sUri);
            } else {
                throw new Error("Invalid Input to Create ODataModel Object : "+sUri);
            }
            var O4A = new sap.ushell.components.tiles.indicatorTileUtils.odata4analytics.Model(sap.ushell.components.tiles.indicatorTileUtils.odata4analytics.Model.ReferenceByModel(oModel));
            return O4A;
        },
        getAllEntitySet : function(sUri) {
            var entitySets = new Array();
            try {
                var o4a = this._getOData4AnalyticsObject(sUri);
                entitySets = o4a.getAllQueryResultNames();
            } catch(e) {
                $.sap.log.error("Error fetching Enity Set : "+e.toString());
            }
            return entitySets;

        },
        getAllMeasures : function(sUri, entitySet) {
            var measures = new Array();
            try {
                var o4a = this._getOData4AnalyticsObject(sUri);
                var queryResult = o4a.findQueryResultByName(entitySet);
                measures = queryResult.getAllMeasureNames();
            } catch(e) {
                $.sap.log.error("Error Fetching All Measures : "+e.toString());
            }
            return measures;
        },
        getAllMeasuresWithLabelText : function(sUri, entitySet) {
            var measures = new Array();
            try {
                var o4a = this._getOData4AnalyticsObject(sUri);
                var queryResult = o4a.findQueryResultByName(entitySet);
                var measureNames = queryResult.getAllMeasureNames();
                for(var i=0; i<measureNames.length; i++) {
                    var each = measureNames[i];
                    global.oMeasure = queryResult.findMeasureByName(each);
                    measures.push({
                        key : each,
                        value : oMeasure.getLabelText()
                    });
                }
            } catch(e) {
                $.sap.log.error("Error Fetching All Measures : "+e.toString());
            }
            return measures;
        },
        getAllDimensions : function(sUri, entitySet) {
            function intersectionOfArray(array1, array2) {
                var ai=0, bi=0;
                var result = new Array();
                while( ai < array1.length && bi < array2.length )
                {
                    if      (array1[ai] < array2[bi] ){ ai++; }
                    else if (array1[ai] > array2[bi] ){ bi++; }
                    else /* they're equal */
                    {
                        result.push(array1[ai]);
                        ai++;
                        bi++;
                    }
                }
                return result;
            }
            var dimensions = new Array();
            var aFilterablePropertyNames = new Array();
            try {
                var o4a = this._getOData4AnalyticsObject(sUri);
                var queryResult = o4a.findQueryResultByName(entitySet);
                var entityType= queryResult.getEntityType();
                aFilterablePropertyNames = entityType.getFilterablePropertyNames();
                dimensions = queryResult.getAllDimensionNames();
                if(aFilterablePropertyNames && aFilterablePropertyNames.length) {
                    dimensions = intersectionOfArray(aFilterablePropertyNames.sort(),dimensions.sort());
                }
            } catch(e) {
                $.sap.log.error("Error Fetching All Dimesions : "+e.toString());
            }
            return dimensions;
        },
        getAllDimensionsWithLabelText : function(sUri, entitySet) {
            var dimensions = new Array();
            try {
                var o4a = this._getOData4AnalyticsObject(sUri);
                var queryResult = o4a.findQueryResultByName(entitySet);
                var dimensionNames = queryResult.getAllDimensionNames();
                for(var i=0; i<dimensionNames.length ;i++) {
                    var each = dimensionNames[i];
                    var oDimension = queryResult.findDimensionByName(each);
                    var textProperty = null;
                    if(oDimension.getTextProperty() != null)textProperty = oDimension.getTextProperty().name;
                    dimensions.push({
                        key : each,
                        value : oDimension.getLabelText(),
                        textProperty: textProperty
                    });
                }
            } catch(e) {
                $.sap.log.error("Error Fetching All Dimesions : "+e.toString());
            }
            return dimensions;
        },
        getAllInputParams : function(sUri, entitySet) {
            var inputParams = new Array();
            try {
                var o4a = this._getOData4AnalyticsObject(sUri);
                var queryResult = o4a.findQueryResultByName(entitySet);
                if(queryResult.getParameterization()) {
                    var oParams = queryResult.getParameterization();
                    inputParams = oParams.getAllParameterNames();
                }
            } catch(e) {
                $.sap.log.error("Error Fetching Input Params : "+e.toString());
            }
            return inputParams;
        },
        getAllInputParamsWithFlag : function(sUri, entitySet) {
            var inputParams = new Array();
            try {
                var o4a = this._getOData4AnalyticsObject(sUri);
                var queryResult = o4a.findQueryResultByName(entitySet);
                if(queryResult.getParameterization()) {
                    var oParams = queryResult.getParameterization();
                    var inputParamsArray = oParams.getAllParameterNames();
                    for(var i=0; i<inputParamsArray.length; i++) {
                        var each = inputParamsArray[i];
                        var paramObject  = oParams.findParameterByName(each);
                        inputParams.push({
                            name : each,
                            optional : paramObject.isOptional()
                        });
                    }
                }
            } catch(e) {
                $.sap.log.error("Error Fetching Input Params : "+e.toString());
            }
            return inputParams;
        },

        formatOdataObjectToString : function (value){
            if(value && value.constructor == Object){
                if(value.__edmType=="Edm.Time"){
                    var milliseconds = value.ms;
                    var seconds = Math.floor((milliseconds / 1000) % 60 );
                    var minutes = Math.floor((milliseconds / 60000) % 60);
                    var hours   = Math.floor((milliseconds / 3600000) % 24);
                    return hours+"H"+minutes+"M"+seconds+"S";
                }
            }
            return value;
        },
        generateCombinations:function (array){
            function getPerfectBinary(maxLength,str){
                while(str.length<maxLength){
                    str='0'+str;
                }
                return str;
            }
            var max=Math.pow(2,array.length);
            var resultArray=[];
            var index=0;

            while(max>1){
                var str=(max-1).toString(2);
                str=getPerfectBinary(array.length,str);
                resultArray[index]=[];
                for(var i=0;i<str.length;i++){
                    if(Number(str[i]))
                        resultArray[index].push(array[i]);
                }
                max--,index++;
            }
            return resultArray;
        },

        logError : function(err){
            jQuery.sap.log.error(err.toString());
        },

        numberOfLeadingZeros : function(num) {
            num = String(num);
            var count = 0;
            var decimal_index = num.indexOf('.');
            if (decimal_index == -1) return 0;
            if(Number(num.split('.')[0]) != 0)
                return 0;
            var i = decimal_index + 1;
            while(num[i++] == '0') {
                ++count;
            }
            return count;
        },

        formatValue : function (val,scaleFactor,MAX_LEN) {              
            MAX_LEN= MAX_LEN || 3;
            var unit={3:"K",6:"M",9:"B",12:"T",0:""};
            unit["-3"] = "m";
            unit["-6"] = "u";
            unit["-9"] = "n";
            unit["-12"] = "t";
            unit["-2"] = "%";
            var temp,pre,suff;
            temp=Number(val).toPrecision(MAX_LEN);
            var zeroes = this.numberOfLeadingZeros(temp);
            if(zeroes > 0 && scaleFactor < 0){
                pre = temp*Math.pow(10,zeroes+MAX_LEN);
                suff = -(zeroes+MAX_LEN);
            }
            else
            {
                pre=Number(temp.split("e")[0]);
                suff=Number(temp.split("e")[1])||0;
            }
            if(!val && val!=0)
                return {value:"",unitPrefix:""};
                if(scaleFactor>=0)
                {
                    if(suff%3!=0){
                        if(suff%3==2){
                            if(suff+1==scaleFactor){
                                suff=suff+1;
                                pre=pre/10;
                            }
                            else{
                                suff=suff-2;
                                pre=pre*100;
                            }
                        }
                        else{
                            if(suff+2==scaleFactor){
                                suff=suff+2;
                                pre=pre/100;
                            }
                            else{
                                suff--;
                                pre=pre*10;
                            }
                        }
                    }


                    else if(suff==15){
                        pre=pre*1000;
                        suff=12;
                    }
                }
                // for negative scale factor and suff
                else{
                    if (scaleFactor=="-2"){
                        var x = this.formatValue((val*100),0);
                    }
                    else if (suff>=0 && val<10 && scaleFactor=="-3"){
                        pre = val*Math.pow(10,3);
                        suff = -3;
                    }
                    else if(suff>=0)
                        return this.formatValue(val,0);

                    else{
                        suff = Math.abs(suff);
                        scaleFactor = Math.abs(scaleFactor);
                        if(scaleFactor > suff){
                            pre = pre/(Math.pow(10,suff%3));
                            suff = suff - (suff%3);
                        }
                        else{
                            var diff = suff - scaleFactor;
                            pre = pre/(Math.pow(10,diff));
                            suff  = suff - diff;
                        }
                        suff = 0-suff;
                    }

                }
                // ending of neg scale factor
                pre+="";
                if(scaleFactor=="-2"){
                    var valstr = (x.unitPrefix == "") ? Number(x.value+"").toFixed(4 - (x.value+"").indexOf('.')) : Number(x.value+"").toFixed(3 - (x.value+"").indexOf('.')) ;
                    return {value:Number(valstr),unitPrefix:(x.unitPrefix)+unit[-2]};
                }
                pre = Number(pre).toFixed(4 - pre.indexOf('.'));
                return {value:Number(pre),unitPrefix:unit[suff]};
        },

        abortPendingODataCalls : function(oDataCallRef){
            try {
                if(oDataCallRef){
                    oDataCallRef.abort();
                }
            }catch(e) {
                this.logError(e);
            }
        }
    };

})(window, jQuery);

sap.ushell.components.tiles.indicatorTileUtils.cache = (function() {
    var BIGMAP = {};
    var KPIVALUE = {};
    return {
        getEvaluationById : function(key) {
            return this.getEvaluationByChipId(key);
        },
        getEvaluationByChipId : function(key) {
            if(BIGMAP[key]) {
                return BIGMAP[key];
            } 
            return null; 
        },
        setEvaluationById : function(key, data) {
            BIGMAP[key] = data;
        },
        getKpivalueById : function(key){
            if(KPIVALUE[key])
                return KPIVALUE[key];
            return null;
        },
        setKpivalueById : function(key, data) {
            KPIVALUE[key]  = data;
        }
    }
})();