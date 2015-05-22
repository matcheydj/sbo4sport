// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";sap.ui.getCore().loadLibrary("sap.m");jQuery.sap.require("sap.ui.core.IconPool");jQuery.sap.require("sap.ui.thirdparty.datajs");jQuery.sap.require("sap.ushell.components.tiles.utils");sap.ui.controller("sap.ushell.components.tiles.applauncherdynamic.DynamicTile",{timer:null,oDataRequest:null,onInit:function(){var v=this.getView(),V=v.getViewData(),t=V.chip,c=sap.ushell.components.tiles.utils.getConfiguration(t,t.configurationUi.isEnabled(),false),m,k,K,a=this,N=c.navigation_target_url,s;s=t.url.getApplicationSystem();if(s){N+=((N.indexOf("?")<0)?"?":"&")+"sap-system="+s}this.navigationTargetUrl=N;m=new sap.ui.model.json.JSONModel({config:c,data:sap.ushell.components.tiles.utils.getDataToDisplay(c,{number:(t.configurationUi.isEnabled()?1234:"...")}),nav:{navigation_target_url:(t.configurationUi&&t.configurationUi.isEnabled()?"":N)},search:{display_highlight_terms:[]}});v.setModel(m);if(t.search){k=v.getModel().getProperty("/config/display_search_keywords");K=jQuery.grep(k.split(/[, ]+/),function(n,i){return n&&n!==""});t.search.setKeywords(K);t.search.attachHighlight(function(h){v.getModel().setProperty("/search/display_highlight_terms",h)})}if(t.preview){t.preview.setTargetUrl(N);t.preview.setPreviewIcon(c.display_icon_url);t.preview.setPreviewTitle(c.display_title_text)}if(t.refresh){t.refresh.attachRefresh(this.refreshHandler.bind(null,this))}if(t.visible){t.visible.attachVisible(this.visibleHandler.bind(this))}if(t.configurationUi.isEnabled()){t.configurationUi.setUiProvider(function(){var C=sap.ushell.components.tiles.utils.getConfigurationUi(v,"sap.ushell.components.tiles.applauncherdynamic.Configuration");t.configurationUi.attachCancel(a.onCancelConfiguration.bind(null,C));t.configurationUi.attachSave(a.onSaveConfiguration.bind(null,C));return C});this.getView().getContent()[0].setTooltip(sap.ushell.components.tiles.utils.getResourceBundleModel().getResourceBundle().getText("edit_configuration.tooltip"))}else{if(!t.preview||!t.preview.isEnabled()){if(!s){sap.ushell.Container.addRemoteSystemForServiceUrl(c.service_url)}this.onUpdateDynamicData()}}},stopRequests:function(){if(this.timer){clearTimeout(this.timer)}if(this.oDataRequest){try{this.oDataRequest.abort()}catch(e){jQuery.sap.log.warning(e.name,e.message)}}},onExit:function(){this.stopRequests()},onPress:function(e){var v=this.getView(),V=v.getViewData(),t=V.chip;if(t.configurationUi.isEnabled()){t.configurationUi.display()}else if(this.navigationTargetUrl){if(this.navigationTargetUrl[0]==='#'){hasher.setHash(this.navigationTargetUrl)}else{window.open(this.navigationTargetUrl,'_blank')}}},onUpdateDynamicData:function(){var v=this.getView(),c=v.getModel().getProperty("/config"),n=c.service_refresh_interval;if(!n){n=0}else if(n<10){jQuery.sap.log.warning("Refresh Interval "+n+" seconds for service URL "+c.service_url+" is less than 10 seconds, which is not supported. "+"Increased to 10 seconds automatically.",null,"sap.ushell.components.tiles.applauncherdynamic.DynamicTile.controller");n=10}if(c.service_url){this.loadData(v,n)}},extractData:function(d){var n,k=["results","icon","title","number","numberUnit","info","infoState","infoStatus","targetParams","subtitle","stateArrow","numberState","numberDigits","numberFactor"];if(typeof d==="object"&&Object.keys(d).length===1){n=Object.keys(d)[0];if(jQuery.inArray(n,k)===-1){return d[n]}}return d},onSaveConfiguration:function(c){var d=jQuery.Deferred(),m=c.getModel(),t=m.getProperty("/tileModel"),T=c.getViewData().chip,a={display_icon_url:m.getProperty("/config/display_icon_url"),display_title_text:m.getProperty("/config/display_title_text"),display_subtitle_text:m.getProperty("/config/display_subtitle_text"),display_info_text:m.getProperty("/config/display_info_text"),display_number_unit:m.getProperty("/config/display_number_unit"),service_url:m.getProperty("/config/service_url"),service_refresh_interval:m.getProperty("/config/service_refresh_interval"),navigation_use_semantic_object:m.getProperty("/config/navigation_use_semantic_object"),navigation_target_url:m.getProperty("/config/navigation_target_url"),navigation_semantic_object:jQuery.trim(m.getProperty("/config/navigation_semantic_object"))||"",navigation_semantic_action:jQuery.trim(m.getProperty("/config/navigation_semantic_action"))||"",navigation_semantic_parameters:jQuery.trim(m.getProperty("/config/navigation_semantic_parameters")),display_search_keywords:m.getProperty("/config/display_search_keywords")};var r=sap.ushell.components.tiles.utils.checkInputOnSaveConfig(c);if(r){d.reject("mandatory_fields_missing");return d.promise()}if(a.navigation_use_semantic_object){a.navigation_target_url=sap.ushell.components.tiles.utils.getSemanticNavigationUrl(a);m.setProperty("/config/navigation_target_url",a.navigation_target_url)}var b=T.bag.getBag('tileProperties');b.setText('display_title_text',a.display_title_text);b.setText('display_subtitle_text',a.display_subtitle_text);b.setText('display_info_text',a.display_info_text);b.setText('display_search_keywords',a.display_search_keywords);function l(e){jQuery.sap.log.error(e,null,"sap.ushell.components.tiles.applauncherdynamic.DynamicTile.controller");d.reject(e)}T.writeConfiguration.setParameterValues({tileConfiguration:JSON.stringify(a)},function(){var C=sap.ushell.components.tiles.utils.getConfiguration(T,false,false),o=sap.ushell.components.tiles.utils.getConfiguration(T,true,false),m=new sap.ui.model.json.JSONModel({config:C,tileModel:t});c.setModel(m);t.setData({data:o,nav:{navigation_target_url:""}},false);if(T.preview){T.preview.setTargetUrl(C.navigation_target_url);T.preview.setPreviewIcon(C.display_icon_url);T.preview.setPreviewTitle(C.display_title_text)}b.save(function(){jQuery.sap.log.debug("property bag 'tileProperties' saved successfully");if(T.title){T.title.setTitle(a.display_title_text,function(){d.resolve()},l)}else{d.resolve()}},l)},l);return d.promise()},onCancelConfiguration:function(c){var v=c.getViewData(),m=c.getModel(),t=m.getProperty("/tileModel"),T=v.chip,C=sap.ushell.components.tiles.utils.getConfiguration(T,false,false);c.getModel().setData({config:C,tileModel:t},false)},loadData:function(d,n){var c=d.getModel().getProperty("/config"),u=c.service_url,t=this;var T=this.getView().getViewData().chip;if(/;o=([;\/?]|$)/.test(u)){u=T.url.addSystemToServiceUrl(u)}if(n>0){jQuery.sap.log.info("Wait "+n+" seconds before calling "+c.service_url+" again",null,"sap.ushell.components.tiles.applauncherdynamic.DynamicTile.controller");this.timer=setTimeout(t.loadData.bind(t,d,n,false),(n*1000))}if(T.visible.isVisible()&&!t.oDataRequest){t.oDataRequest=OData.read({requestUri:u},function(r){t.oDataRequest=undefined;var D=r,o;if(typeof r==="object"){D=t.extractData(D)}else if(typeof r==="string"){D={number:r}}o=sap.ushell.components.tiles.utils.getDataToDisplay(c,D);d.getModel().setProperty("/data",o);d.getModel().setProperty("/nav/navigation_target_url",sap.ushell.components.tiles.utils.addParamsToUrl(t.navigationTargetUrl,o))},function(m){t.oDataRequest=undefined;var M=m&&m.message?m.message:m,r=sap.ushell.components.tiles.utils.getResourceBundleModel().getResourceBundle();if(m.response){M+=" - "+m.response.statusCode+" "+m.response.statusText}jQuery.sap.log.error("Failed to update data via service "+c.service_url+": "+M,null,"sap.ushell.components.tiles.applauncherdynamic.DynamicTile");d.getModel().setProperty("/data",sap.ushell.components.tiles.utils.getDataToDisplay(c,{number:"???",info:r.getText("dynamic_data.error"),infoState:"Critical"}))})}},refreshHandler:function(d){var t=d.getView().getViewData().chip;if(!t.configurationUi.isEnabled()){d.loadData(d.getView(),0)}else{d.stopRequests()}},visibleHandler:function(i){if(i){this.refreshHandler(this)}}})}());
