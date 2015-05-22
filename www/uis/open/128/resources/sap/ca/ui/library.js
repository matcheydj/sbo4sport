/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.library");jQuery.sap.require("sap.ui.core.Core");jQuery.sap.require("sap.ui.core.library");jQuery.sap.require("sap.m.library");sap.ui.getCore().initLibrary({name:"sap.ca.ui",dependencies:["sap.ui.core","sap.m"],types:["sap.ca.ui.charts.ChartColor","sap.ca.ui.charts.ChartSelectionMode","sap.ca.ui.charts.ChartSemanticColor"],interfaces:[],controls:["sap.ca.ui.AddPicture","sap.ca.ui.CustomerContext","sap.ca.ui.CustomerControlListItem","sap.ca.ui.DatePicker","sap.ca.ui.ExpansibleFeedListItem","sap.ca.ui.FileUpload","sap.ca.ui.GrowingTileContainer","sap.ca.ui.HierarchicalSelectDialog","sap.ca.ui.Hierarchy","sap.ca.ui.HierarchyItem","sap.ca.ui.InPlaceEdit","sap.ca.ui.Notes","sap.ca.ui.OverflowContainer","sap.ca.ui.OverviewTile","sap.ca.ui.PictureItem","sap.ca.ui.PictureTile","sap.ca.ui.PictureTileContainer","sap.ca.ui.PictureViewer","sap.ca.ui.PictureViewerItem","sap.ca.ui.ZoomableScrollContainer","sap.ca.ui.charts.BarListItem","sap.ca.ui.charts.BubbleChart","sap.ca.ui.charts.Chart","sap.ca.ui.charts.ChartToolBar","sap.ca.ui.charts.ClusterListItem","sap.ca.ui.charts.CombinedChart","sap.ca.ui.charts.HorizontalBarChart","sap.ca.ui.charts.LineChart","sap.ca.ui.charts.StackedHorizontalBarChart","sap.ca.ui.charts.StackedVerticalColumnChart","sap.ca.ui.charts.VerticalBarChart"],elements:["sap.ca.ui.HierarchicalSelectDialogItem"],version:"1.24.5"});jQuery.sap.declare("sap.ca.ui.charts.ChartColor");sap.ca.ui.charts.ChartColor={sapUiChart1:"sapUiChart1",sapUiChart2:"sapUiChart2",sapUiChart3:"sapUiChart3",sapUiChart4:"sapUiChart4",sapUiChart5:"sapUiChart5",sapUiChart6:"sapUiChart6",sapUiChart7:"sapUiChart7",sapUiChart8:"sapUiChart8",sapUiChart9:"sapUiChart9",sapUiChart10:"sapUiChart10",sapUiChart11:"sapUiChart11"};jQuery.sap.declare("sap.ca.ui.charts.ChartSelectionMode");sap.ca.ui.charts.ChartSelectionMode={None:"None",Single:"Single",Multiple:"Multiple"};jQuery.sap.declare("sap.ca.ui.charts.ChartSemanticColor");sap.ca.ui.charts.ChartSemanticColor={NeutralDark:"NeutralDark",Neutral:"Neutral",NeutralLight:"NeutralLight",GoodDark:"GoodDark",Good:"Good",GoodLight:"GoodLight",CriticalDark:"CriticalDark",Critical:"Critical",CriticalLight:"CriticalLight",BadDark:"BadDark",Bad:"Bad",BadLight:"BadLight"};
