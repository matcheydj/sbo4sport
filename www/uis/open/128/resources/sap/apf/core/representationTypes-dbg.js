/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */

jQuery.sap.declare("sap.apf.core.representationTypes");


/**
 * @memberOf sap.apf.core
 * @description Default configuration of representation types. Can be overwritten in the analytical configuration file.
 * @returns {object[]} representation types array with configuration objects for representation types
 */
sap.apf.core.representationTypes = function() {

	return [
			{
				"type" : "representationType",
				"id" : "LineChart",
				"constructor" : "sap.apf.ui.representations.lineChart",
				"picture" : "sap-icon://line-chart",
				"label" : {
					"type" : "label",
					"kind" : "text",
					"key" : "LineChart"
				}
			},
			{
				"type" : "representationType",
				"id" : "ColumnChartSorted",
				"constructor" : "sap.apf.ui.representations.columnChart",
				"picture" : "sap-icon://vertical-bar-chart",
				"label" : {
					"type" : "label",
					"kind" : "text",
					"key" : "ColumnChartSorted"
				}

			},

			{
				"type" : "representationType",
				"id" : "ColumnChartClustered",
				"constructor" : "sap.apf.ui.representations.columnChart",
				"picture" : "sap-icon://bar-chart",
				"label" : {
					"type" : "label",
					"kind" : "text",
					"key" : "ColumnChartClustered"
				}

			},
			{
				"type" : "representationType",
				"id" : "ColumnChartClusteredSorted",
				"constructor" : "sap.apf.ui.representations.columnChart",
				"picture" : "sap-icon://vertical-bar-chart-2",
				"label" : {
					"type" : "label",
					"kind" : "text",
					"key" : "ColumnChartClusteredSorted"
				}

			},
			{
				"type" : "representationType",
				"id" : "ColumnChart",
				"constructor" : "sap.apf.ui.representations.columnChart",
				"picture" : "sap-icon://bar-chart",
				"label" : {
					"type" : "label",
					"kind" : "text",
					"key" : "ColumnChart"
				}
			},
			{
				"type" : "representationType",
				"id" : "ScatterPlotChart",
				"constructor" : "sap.apf.ui.representations.scatterPlotChart",
				"picture" : "sap-icon://scatter-chart",
				"label" : {
					"type" : "label",
					"kind" : "text",
					"key" : "ScatterPlotChart"
				}
			},
			{
				"type" : "representationType",
				"id" : "TableRepresentation",
				"constructor" : "sap.apf.ui.representations.table",
				"picture" : "sap-icon://table-chart",
				"label" : {
					"type" : "label",
					"kind" : "text",
					"key" : "TableRepresentation"
				}
			},
			{
				"type" : "representationType",
				"id" : "StackedColumnChart",
				"constructor" : "sap.apf.ui.representations.stackedColumnChart",
				"picture" : "sap-icon://vertical-stacked-chart",
				"label" : {
					"type" : "label",
					"kind" : "text",
					"key" : "StackedColumnChart"
				}
			},
			{
				"type" : "representationType",
				"id" : "StackedColumnSorted",
				"constructor" : "sap.apf.ui.representations.stackedColumnChart",
				"picture" : "sap-icon://upstacked-chart",
				"label" : {
					"type" : "label",
					"kind" : "text",
					"key" : "StackedColumnSorted"
				}

			},

			{
				"type" : "representationType",
				"id" : "PieChart",
				"constructor" : "sap.apf.ui.representations.pieChart",
				"picture" : "sap-icon://pie-chart",
				"label" : {
					"type" : "label",
					"kind" : "text",
					"key" : "PieChart"
				}
			},
			{
				"type" : "representationType",
				"id" : "PercentageStackedColumnChart",
				"constructor" : "sap.apf.ui.representations.percentageStackedColumnChart",
				"picture" : "sap-icon://full-stacked-column-chart",
				"label" : {
					"type" : "label",
					"kind" : "text",
					"key" : "PercentageStackedColumnChart"
				}
			},
			{
				"type" : "representationType",
				"id" : "BubbleChart",
				"constructor" : "sap.apf.ui.representations.bubbleChart",
				"picture" : "sap-icon://bubble-chart",
				"label" : {
					"type" : "label",
					"kind" : "text",
					"key" : "BubbleChart"
				}
			}];

};
