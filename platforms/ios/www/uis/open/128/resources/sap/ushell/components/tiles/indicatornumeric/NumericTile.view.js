(function(){"use strict";jQuery.sap.require("sap.ushell.components.tiles.indicatorTileUtils.smartBusinessUtil");jQuery.sap.require("sap.ushell.components.tiles.indicatorTileUtils.oData4Analytics");jQuery.sap.require("sap.ca.ui.model.format.NumberFormat");sap.ui.getCore().loadLibrary("sap.suite.ui.commons");sap.ui.jsview("tiles.indicatornumeric.NumericTile",{getControllerName:function(){return"tiles.indicatornumeric.NumericTile"},createContent:function(c){var p=this.getViewData().chip.preview;var h="Lorem ipsum";var s="Lorem ipsum";if(p&&p.getTitle()){h=p.getTitle();s=p.getDescription()}var g={subheader:s,header:h,footerNum:"",footerComp:"",scale:"",unit:"",value:"",size:"Auto",frameType:"OneByOne",state:sap.suite.ui.commons.LoadState.Loading,valueColor:sap.suite.ui.commons.InfoTileValueColor.Neutral,indicator:sap.suite.ui.commons.DeviationIndicator.None,title:"",footer:"",description:""};this.oNVConfContS=new sap.suite.ui.commons.NumericContent({value:"{/value}",scale:"{/scale}",unit:"{/unit}",indicator:"{/indicator}",valueColor:"{/valueColor}",size:"{/size}",formatterValue:true,truncateValueTo:6,nullifyValue:false});var n=new sap.suite.ui.commons.TileContent({unit:"{/unit}",size:"{/size}",footer:"{/footerNum}",content:this.oNVConfContS,});this.oGenericTile=new sap.suite.ui.commons.GenericTile({subheader:"{/subheader}",frameType:"{/frameType}",size:"{/size}",header:"{/header}",tileContent:[n]});var G=new sap.ui.model.json.JSONModel();G.setData(g);this.oGenericTile.setModel(G);return this.oGenericTile}})}());
