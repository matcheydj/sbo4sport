jQuery.sap.declare("sap.suite.ui.smartbusiness.tiles.Comparison");jQuery.sap.require("sap.suite.ui.smartbusiness.tiles.Generic");sap.suite.ui.smartbusiness.tiles.Generic.extend("sap.suite.ui.smartbusiness.tiles.Comparison",{metadata:{properties:{kpiValueRequired:{type:"boolean",defaultValue:false},tileType:{type:"string",defaultValue:"CT"}}},renderer:{}});
sap.suite.ui.smartbusiness.tiles.Comparison.prototype.init=function(){sap.suite.ui.smartbusiness.tiles.Generic.prototype.init.apply(this);this.setAggregation("_tile",new sap.suite.ui.commons.GenericTile({header:"{/header}",subheader:"{/subheader}",size:this.getSize(),frameType:this.getFrameType(),tileContent:new sap.suite.ui.commons.TileContent({unit:"{/unit}",size:this.getSize(),footer:"{/footerNum}",content:new sap.suite.ui.commons.ComparisonChart({scale:"{/scale}",size:this.getSize(),state:"{/state}",data:{template:new sap.suite.ui.commons.ComparisonData({title:"{title}",value:"{value}",color:"{color}",displayValue:"{displayValue}"}),path:"/data"}})}),press:jQuery.proxy(this.tilePressed,this)}));this.jsonModel=new sap.ui.model.json.JSONModel();this.setModel(this.jsonModel)};
sap.suite.ui.smartbusiness.tiles.Comparison.prototype.onBeforeRendering=function(){sap.suite.ui.smartbusiness.tiles.Generic.prototype.onBeforeRendering.apply(this);if(this.getContentOnly()){this.setAggregation("_tile",new sap.suite.ui.commons.ComparisonChart({scale:"{/scale}",size:this.getSize(),state:"{/state}",data:{template:new sap.suite.ui.commons.ComparisonData({title:"{title}",value:"{value}",color:"{color}",displayValue:"{displayValue}"}),path:"/data"}}))}};
sap.suite.ui.smartbusiness.tiles.Comparison.prototype.doProcess=function(){var t=this;this._fetchDataForComparisonTile(function(k){var d={};d.data=k.kpiData;if(k.unitPrefix){d.unit=k.unitPrefix}if(true||t.isAssociatedKpi()){d.subheader=this.evaluationApi.getTitle();d.header=this.evaluationApi.getKpiName()}t.jsonModel.setData(d);t.setDoneState()},this.logError)};
sap.suite.ui.smartbusiness.tiles.Comparison.prototype._fetchDataForComparisonTile=function(s,e){var _=function(a){var b=[{name:this.EVALUATION_DATA.COLUMN_NAME,order:"desc"}];if(a&&a.SORTING){var c=a.SORTING;if((c.order=='asc'||c.order=='desc')&&(c.by=='M'||c.by=='D')){var r=[];r.push({name:(c.by=='M'?this.evaluationApi.getKpiMeasureName():this.getDimension()),order:c.order});return r}}return b};var t=this;var p={};this.oConfig=this.EVALUATION_DATA;p.serviceUri=this._addSystemAliasToUri(this.evaluationApi.getODataUrl(),this.getSapSystem());p.entitySet=this.evaluationApi.getEntitySet();p.measure=this.evaluationApi.getKpiMeasureName();p.dimension=this.getDimension();p.filter=this.getAllFilters();p.sort=_.apply(this,[this.getTileConfiguration()]);p.dataLimit=3;t.oConfig.FINALVALUE={};p.sortingColumn=this.evaluationApi.getKpiMeasureName();var f=sap.suite.smartbusiness.odata.getUri(p);var u=this.UOM_PROPERTY_MAPPING[this.evaluationApi.getKpiMeasureName()];var d=this.TEXT_PROPERTY_MAPPING;this.comparisionChartODataRef=f.model.read(f.uri,null,null,true,function(a){if(a&&a.results&&a.results.length){if(u){t.oConfig.FINALVALUE.unitPrefix=a.results[0][u]}t.oConfig.FINALVALUE.kpiData=a;p.dimension=d[t.getDimension()];t.oConfig.FINALVALUE.kpiData=t._processDataForComparisonChart(t.oConfig.FINALVALUE.kpiData,p.measure,p.dimension);s.call(t,t.oConfig.FINALVALUE)}else{e.call(t,"no Response from QueryServiceUri")}},function(a){if(a&&a.response){jQuery.sap.log.error(a.message+" : "+a.request.requestUri)}})};
sap.suite.ui.smartbusiness.tiles.Comparison.prototype._processDataForComparisonChart=function(d,m,a){var s=this.oConfig.PROPERTIES.semanticMeasure;var f=[];var t;var b=this;for(var i=0;i<d.results.length;i++){var c=d.results[i];var g={};try{g.title=c[a].toString()}catch(e){g.title=""};g.value=Number(c[m]);var h=Number(c[m]);if(this.oConfig.SCALING==-2)h*=100;var t=sap.suite.smartbusiness.utils.getLocaleFormattedValue(h,this.oConfig.SCALING);g.displayValue=t.toString();if(this.oConfig.SCALING==-2)g.displayValue+=" %";if(typeof s==='undefined'){g.color="Neutral"}else{if(this.evaluationApi.isMaximizingKpi()){if(g.value>c[s]){g.color="Good"}else{g.color="Error"}}else if(this.evaluationApi.isMinimizingKpi()){if(g.value<c[s]){g.color="Good"}else{g.color="Error"}}else{g.color="Neutral"}}f.push(g)}return f};
sap.suite.ui.smartbusiness.tiles.Comparison.prototype.doDummyProcess=function(){this.jsonModel.setData(this.getDummyDataForComparisonTile())};
