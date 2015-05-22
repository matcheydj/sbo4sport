/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.suite.ui.commons.Timeline");jQuery.sap.require("sap.suite.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.suite.ui.commons.Timeline",{metadata:{publicMethods:["getCurrentFilter","setCurrentFilter"],library:"sap.suite.ui.commons",properties:{"data":{type:"object",group:"Misc",defaultValue:null},"sortOldestFirst":{type:"boolean",group:"Misc",defaultValue:false},"axisOrientation":{type:"sap.suite.ui.commons.TimelineAxisOrientation",group:"Misc",defaultValue:sap.suite.ui.commons.TimelineAxisOrientation.Vertical},"alignment":{type:"sap.suite.ui.commons.TimelineAlignment",group:"Misc",defaultValue:sap.suite.ui.commons.TimelineAlignment.Right},"showIcons":{type:"boolean",group:"Misc",defaultValue:true},"noDataText":{type:"string",group:"Misc",defaultValue:null},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},"enableBusyIndicator":{type:"boolean",group:"Misc",defaultValue:true},"showHeaderBar":{type:"boolean",group:"Misc",defaultValue:true},"growing":{type:"boolean",group:"Misc",defaultValue:true},"growingThreshold":{type:"int",group:"Misc",defaultValue:5},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"enableBackendFilter":{type:"boolean",group:"",defaultValue:false},"enableAllInFilterItem":{type:"boolean",group:"Behavior",defaultValue:true}},aggregations:{"content":{type:"sap.suite.ui.commons.TimelineItem",multiple:true,singularName:"content"},"filterList":{type:"sap.suite.ui.commons.TimelineFilterListItem",multiple:true,singularName:"filterList"}},events:{"filterSelectionChange":{}}}});sap.suite.ui.commons.Timeline.M_EVENTS={'filterSelectionChange':'filterSelectionChange'};jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.IconPool");jQuery.sap.require("sap.ui.core.Icon");jQuery.sap.require("sap.ui.core.delegate.ItemNavigation");jQuery.sap.require("sap.suite.ui.commons.TimelineFilterListItem");sap.suite.ui.commons.Timeline.INTERNAL_MODEL_NAME="sapsuiteuicommonsTimelineInternalModel";
sap.suite.ui.commons.Timeline.prototype.init=function(){sap.m.DisplayListItem.extend("sap.suite.ui.commons.DisplayListItemWithKey",{metadata:{properties:{"key":{type:"string",defaultValue:""},}},renderer:'sap.m.DisplayListItemRenderer'});var t=this;this._prevTargetId="";this._internalModel=new sap.ui.model.json.JSONModel();this._finishLoading=false;this.setModel(this._internalModel,sap.suite.ui.commons.Timeline.INTERNAL_MODEL_NAME);var l=sap.ui.getCore().getConfiguration().getLanguage();this.resBundle=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons",l);this._emptyList=new sap.m.List();this._emptyList.setNoDataText(this.resBundle.getText('TIMELINE_NO_DATA'));this._filterIcon=new sap.m.Button(this.getId()+"-filter",{type:sap.m.ButtonType.Transparent,icon:"sap-icon://filter",tooltip:this.resBundle.getText("TIMELINE_FILTER_BY"),press:function(e){t._openFilterDialog()}});var T=new sap.m.ToolbarSpacer();this._headerBar=new sap.m.Toolbar({id:this.getId()+"-filterToolBar",content:[T,this._filterIcon]});this._filterInfoText=new sap.m.Text({maxLines:1,width:"100%"});this._headerInfoBar=new sap.m.Toolbar({id:this.getId()+"-filterInfoBar",content:[this._filterInfoText],design:sap.m.ToolbarDesign.Info,visible:false});this._filterChange=false;this._contentChange=true;this._filterDialog=new sap.m.ResponsivePopover(this.getId()+"-popover_filter",{title:this.resBundle.getText("TIMELINE_FILTER_BY"),placement:sap.m.PlacementType.Auto,contentHeight:"15rem",contentWidth:"15rem"});var d=new sap.suite.ui.commons.DisplayListItemWithKey({key:"{key}",label:"{text}"});this._filterList=new sap.m.List(this.getId()+"-filterlist",{mode:sap.m.ListMode.SingleSelectMaster,items:{path:"/items",template:d},selectionChange:function(e){var f=t._filterList.getSelectedItem().getLabel();t._setFilterInfoText(f);if(t._filterList.getSelectedItem()&&!t.getEnableBackendFilter()){t._filterChange=true;t._filterText=f;t._resetDisplayItems(f)}t.fireFilterSelectionChange({selectedItem:t._filterList.getSelectedItem()});t._currentFilterKey=t._filterList.getSelectedItem().getKey();t._filterDialog.close()}});this._filterText=this.resBundle.getText("TIMELINE_ALL");this._growing=false;if(this.getGrowing()){this._iItemCount=this.getGrowingThreshold();this._getMoreButton=new sap.m.Button(this.getId()+"-getmore",{text:this.resBundle.getText("TIMELINE_MORE"),width:"100%",press:function(){t._iItemCount+=t.getGrowingThreshold();if(t._iItemCount>t.getMaxItemsCount()){t._iItemCount=t.getMaxItemsCount()}var b=t.getBindingInfo("content");if(t._growing){b.startIndex=0;b.length=t._iItemCount;t.getBinding("content").getContexts(0,t._iItemCount)}else{t.rerender()}}})}jQuery.sap.require("sap.ui.core.delegate.ScrollEnablement");this._oScroller=new sap.ui.core.delegate.ScrollEnablement(this,this.getId()+"-scroll",{horizontal:false,vertical:true,zynga:false,preventDefault:false,nonTouchScrolling:"scrollbar"});this._scHeight=0;this._height=0;this._aFilterList=[]};
sap.suite.ui.commons.Timeline.prototype.getScrollDelegate=function(){return this._oScroller};
sap.suite.ui.commons.Timeline.prototype.scrollTo=function(x,y,t){if(this._oScroller){if(this.getDomRef()){this._oScroller.scrollTo(x,y,t)}else{this._oScroller._scrollX=x;this._oScroller._scrollY=y}}return this};
sap.suite.ui.commons.Timeline.prototype._setFilterInfoText=function(f){var F=this.resBundle.getText("TIMELINE_FILTER_INFO_BY",[f]);this._filterInfoText.setText(F);this._filterInfoText.setTooltip(F);if(f===this.resBundle.getText("TIMELINE_ALL")){this._headerInfoBar.setVisible(false)}else{this._headerInfoBar.setVisible(true)}this._filterText=f};
sap.suite.ui.commons.Timeline.prototype._setFilterList=function(){this._aFilterList=[];this._filteredItems={};if(this.getEnableBackendFilter()){var f=this.getFilterList();var F=[];f.forEach(function(o){F.push({key:o.getKey(),text:o.getText()})});this._aFilterList=F}else{var I=this.getContent();for(var i=0;i<I.length;i++){var k=I[i].getFilterValue();if(!k){continue}if(k in this._filteredItems){this._filteredItems[k].push(I[i])}else{var c=[];c.push(I[i]);this._filteredItems[k]=c;this._aFilterList.push({key:k,text:k})}}};if(!this.getEnableBackendFilter()){this._aFilterList.sort(function(a,b){return a.text.toLowerCase().localeCompare(b.text.toLowerCase())})}var e="";if(this.getEnableAllInFilterItem()&&!(this._aFilterList[0]&&this._aFilterList[0].key=="")){this._aFilterList.unshift({key:"",text:this.resBundle.getText("TIMELINE_ALL")})};var j=new sap.ui.model.json.JSONModel({items:this._aFilterList});this._filterList.setModel(j);if(this._currentFilterKey){this.setCurrentFilter(this._currentFilterKey)}else if(this.getEnableAllInFilterItem()){this._filterList.setSelectedItem(this._filterList.getItems()[0])}};
sap.suite.ui.commons.Timeline.prototype._resetFilter=function(){if(this._aFilterList.length!==0&&!this.getEnableBackendFilter()){this._filterList.setSelectedItem(this._filterList.getItems()[0]);this._headerInfoBar.setVisible(false)}};
sap.suite.ui.commons.Timeline.prototype._openFilterDialog=function(){if((this.getEnableBackendFilter()&&(this._aFilterList.length===0))||(this._contentChange&&!this.getEnableBackendFilter())){this._setFilterList();this._contentChange=false}this._filterDialog.addContent(this._filterList);this._filterDialog.openBy(this._filterIcon)};
sap.suite.ui.commons.Timeline.prototype._resetDisplayItems=function(f){this.invalidate();var i=this.getContent();var I=[];if(f===this.resBundle.getText("TIMELINE_ALL")){I=i}else{I=this._filteredItems[f]}this._displayItems=I};
sap.suite.ui.commons.Timeline.prototype.setData=function(d){if(d==undefined){return}var p=this._buildPath("/",sap.suite.ui.commons.Timeline.INTERNAL_MODEL_NAME);this._internalModel.setData(d);this.setProperty("data",d,true);this.bindAggregation("content",{path:p,sorter:this._getDefaultSorter('dateTime',this.getSortOldestFirst()),factory:jQuery.proxy(this._defaultItemsFactory,this)});this._displayItems=this.getContent();this._finishLoading=true;this._contentChange=true;this._iItemCount=this.getMaxItemsCount();return this};
sap.suite.ui.commons.Timeline.prototype._buildPath=function(p,m){var c=p;if(m)c=m+">"+p;return c};
sap.suite.ui.commons.Timeline.prototype._getDefaultSorter=function(p,o){var d=true;if(o){d=false}else{d=true}return new sap.ui.model.Sorter(p,d,false)};
sap.suite.ui.commons.Timeline.prototype._defaultItemsFactory=function(i,c){var o={};o.dateTime=c.getProperty("dateTime");o.icon=c.getProperty("icon");o.userName=c.getProperty("userName");o.title=c.getProperty("title");o.text=c.getProperty("text");o.filterValue=c.getProperty("filterValue");var t=new sap.suite.ui.commons.TimelineItem(o);if(c.getProperty("content")){t.setEmbeddedControl(c.getProperty("content"))}return t};
sap.suite.ui.commons.Timeline.prototype.onBeforeRendering=function(){var i=this.getContent();if(this._filterChange){i=this._displayItems}this._filterChange=false;this._showMore=false;var b=this.getBindingInfo("content");if((this.getGrowing()&&(b)&&(b.model!==sap.suite.ui.commons.Timeline.INTERNAL_MODEL_NAME)&&(this.getMaxItemsCount()>this._iItemCount))){if((this._filterText===this.resBundle.getText("TIMELINE_ALL"))||(this.getEnableBackendFilter())){this._showMore=true}}else if(this.getMaxItemsCount()>0){this._iItemCount=this.getMaxItemsCount()}if(this._iItemCount==0){this._iItemCount=this.getMaxItemsCount();this._showMore=false}this.setOutput(i)};
sap.suite.ui.commons.Timeline.prototype.setContent=function(c){this.removeAllContent();for(var i=0;i<c.length;i++){var I=c[i];if(I._isOfTypeTimelineItem&&I._isOfTypeTimelineItem()==true){if((I.getEmbeddedControl()===null)&&(I.getText()!==null)){I.setEmbeddedControl(new sap.m.Text({text:I.getText(),maxLines:0}))}sap.suite.ui.commons.Timeline.prototype.addContent.apply(this,[I])}}this._displayItems=this.getContent();this._finishLoading=true;this._contentChange=true;this._resetFilter();this._iItemCount=this.getMaxItemsCount()};
sap.suite.ui.commons.Timeline.prototype.sortBy=function(p,c){if(c){return function(a,b){if(a.getProperty(p)>b.getProperty(p)){return 1}else if(a.getProperty(p)<b.getProperty(p)){return-1}return 0}}else{return function(a,b){if(a.getProperty(p)<b.getProperty(p)){return 1}else if(a.getProperty(p)>b.getProperty(p)){return-1}return 0}}};
sap.suite.ui.commons.Timeline.prototype.onAfterRendering=function(){var t=this;this.$().css("height",this._height);this.$().find("#"+this.getId()+"-scroll").css("height",this._scHeight);jQuery.sap.delayedCall(150,this,function(){t._performUiChanges()});this._startItemNavigation()};
sap.suite.ui.commons.Timeline.prototype._startItemNavigation=function(){var f=this.getDomRef(),r=f.getElementsByClassName("sapSuiteUiCommonsTimelineItemShellUser"),d=[];for(var i=0;i<r.length;i++){d.push(r[i].firstChild)}if(!this.oItemNavigation){this.oItemNavigation=new sap.ui.core.delegate.ItemNavigation();this.addDelegate(this.oItemNavigation)}this.oItemNavigation.setRootDomRef(f);this.oItemNavigation.setItemDomRefs(d);this.oItemNavigation.setCycling(false);var p=this.getGrowingThreshold();if(p==0){p=10}this.oItemNavigation.setPageSize(p)};
sap.suite.ui.commons.Timeline.prototype._switchFocus=function(e){if(this._prevTargetId!=e.currentTarget.id){this._oLastFocused=e.target;this._prevTargetId=e.currentTarget.id;jQuery(e.target).blur();this.$().focus()}else if(this._oLastFocused){jQuery(this._oLastFocused).focus();this._oLastFocused=e.target;this._prevTargetId=e.target.id}};
sap.suite.ui.commons.Timeline.prototype.onkeydown=function(e){var k=jQuery.sap.KeyCodes;if(e.isMarked()){return}if(e.which==k.F7){this._switchFocus(e);e.preventDefault();e.setMarked();return}};
sap.suite.ui.commons.Timeline.prototype._navToTabChain=function(a){var s=a?1:-1;var e=a?"after":"before";var E=this.$(e).attr("tabindex","0");for(var p=this;(p=p.getParent())&&p.$;){var t=p.$().find(":sapTabbable");var l=a?t.length-1:0;var i=t.index(E);if(t.length>1&&i!=l){break}}t=t||this.$().parent().find(":sapTabbable");i=t.index(E)+s;E.attr("tabindex","-1");return t[i]&&t.eq(i).focus()};
sap.suite.ui.commons.Timeline.prototype.onsapskipforward=function(e){if(e.isMarked()){return}if(this._navToTabChain(true)){e.preventDefault();e.setMarked()}};
sap.suite.ui.commons.Timeline.prototype.onsapspace=function(e){var t=e.target.id;var n=t.indexOf("getmore");if(n<0){e.preventDefault();e.setMarked();this.focus()}};
sap.suite.ui.commons.Timeline.prototype._performUiChanges=function(){var s=this.getShowIcons();var t=this.$();var l=t.find('li');for(var i=0;i<l.length;i++){var a=i+1;var c=t.find('li:nth-child('+a+')').find('.sapSuiteUiCommonsTimelineItemBox').css('height');if(c!==undefined){var b=parseInt(c.replace("px",""))+23;if(i===(l.length-1)){b+=28}t.find('li:nth-child('+a+')').css({'height':b+'px'});var d=t.find('li:nth-child('+a+')').find('.sapSuiteUiCommonsTimelineItemBar');if(!s){d.css({'height':(b-17)+'px'});d.css({'top':30+'px'})}else{d.css({'height':(b-34)+'px'})}}}this._performScrollChanges()};
sap.suite.ui.commons.Timeline.prototype._performScrollChanges=function(){var t=this.$();var _=t.parent().outerHeight();var a=t.parent().height();var b=0;var c=t.parent().children();for(var i=0;i<c.length;i++){var d=c[i];if(d.className!="sapSuiteUiCommonsTimeline"){b+=d.clientHeight}}_=_-b;var e=false;if(a<=50||(a-b)<=50){e=true}this._height=_-28;t.css({'height':this._height});var m=this.getId();if(m.indexOf("\.")!=-1){m=m.replace(/(:|\.|\[|\])/g,"\\$1")}var f=t.find("#"+m+"-filterToolBar").outerHeight()+28;var g=t.find("#"+m+"-filterInfoBar").outerHeight();if(e){t.find("#"+m+"-scroll").css({'height':'25rem'});t.parent().css({'height':'25rem'});t.parent().css({'height':(t.parent().outerHeight()+b+f+g)})}else{this._scHeight=_-(f+g);t.find("#"+m+"-scroll").css({'height':this._scHeight})}};
sap.suite.ui.commons.Timeline.prototype.setOutput=function(I){this._outputItem=[];var s=this.getShowIcons();if(I.length>1){I.sort(this.sortBy('dateTime',this.getSortOldestFirst()))}var d=this._iItemCount;if(I.length<this._iItemCount){d=I.length}else{d=this._iItemCount}for(var i=0;i<d;i++){var _=I[i];var a;if(!s){_._showIcons=true}if(i==(I.length-1)){if(this._showMore){a=sap.suite.ui.commons.TimelineItemPosition.Middle}else{a=sap.suite.ui.commons.TimelineItemPosition.Bottom}}else if(i==0){a=sap.suite.ui.commons.TimelineItemPosition.Top}else{a=sap.suite.ui.commons.TimelineItemPosition.Middle}_.setLayout(a,"Right");this._outputItem.push(_)}};
sap.suite.ui.commons.Timeline.prototype.refreshContent=function(r){this._finishLoading=false;if(this.getEnableBusyIndicator()){this.setBusy(true)}var b=this.getBindingInfo("content");var B=this.getBinding("content");if(this.getGrowing()&&(b)&&(b.model!==sap.suite.ui.commons.Timeline.INTERNAL_MODEL_NAME)&&(B)&&(B.getModel())&&(B.getModel().getDefaultCountMode()!==sap.ui.model.odata.CountMode.None)){this._growing=true;this._iItemCount=this.getGrowingThreshold();B.getContexts(0,this._iItemCount);b.length=this._iItemCount}else{this.updateAggregation("content")}this._filterText=this.resBundle.getText("TIMELINE_ALL")};
sap.suite.ui.commons.Timeline.prototype.updateContent=function(r){if(this.getEnableBusyIndicator()&&this.getBusy()){this.setBusy(false)}var b=this.getBinding("content");if(this._growing){b.getContexts(0,this._iItemCount)}this.updateAggregation("content");this._finishLoading=true;this._contentChange=true;if(!this.getEnableBackendFilter()){this._resetFilter()}};
sap.suite.ui.commons.Timeline.prototype.updateFilterList=function(){this.updateAggregation("filterList");this._setFilterList()};
sap.suite.ui.commons.Timeline.prototype.exit=function(){if(this._emptyList){this._emptyList.destroy();this._emptyList=undefined}if(this._filterIcon){this._filterIcon.destroy();this._filterIcon=undefined}if(this._filterDialog){this._filterDialog.destroy();this._filterDialog=undefined}if(this._filterList){this._filterList.destroy();this._filterList=undefined}if(this._headerBar){this._headerBar.destroy();this._headerBar=undefined}if(this._filterInfoText){this._filterInfoText.destroy();this._filterInfoText=undefined}if(this._headerInfoBar){this._headerInfoBar.destroy();this._headerInfoBar=undefined}if(this._getMoreButton){this._getMoreButton.destroy();this._getMoreButton=undefined}if(this._oScroller){this._oScroller.destroy();this._oScroller=null}if(this.oItemNavigation){this.removeDelegate(this.oItemNavigation);this.oItemNavigation.destroy()}};
sap.suite.ui.commons.Timeline.prototype.setNoDataText=function(n){this.setProperty("noDataText",n,true);this._emptyList.setNoDataText(n)};
sap.suite.ui.commons.Timeline.prototype.setShowHeaderBar=function(s){this.setProperty("showHeaderBar",s,true);this._headerBar.setVisible(s)};
sap.suite.ui.commons.Timeline.prototype.getMaxItemsCount=function(){var b=this.getBinding("content");if(b){return b.getLength()||0}return this.getContent().length};
sap.suite.ui.commons.Timeline.prototype.setGrowing=function(g){if(this.getGrowing()!=g){this.setProperty("growing",g,!g)}};
sap.suite.ui.commons.Timeline.prototype.setGrowingThreshold=function(g){this.setProperty("growingThreshold",g,true);this._iItemCount=g};
sap.suite.ui.commons.Timeline.prototype.getCurrentFilter=function(){var s=this._filterList.getSelectedItem();if(s){return this._filterList.getSelectedItem().getKey()}else{return null}};
sap.suite.ui.commons.Timeline.prototype.setCurrentFilter=function(s){this._currentFilterKey=s;var a=this._filterList.getItems();if(this.getEnableBackendFilter()&&(a.length===0)){this._setFilterList()}else{var b;for(var i=0;i<a.length;i++){if(s===a[i].getKey()){b=a[i]}};if(b){this._filterList.setSelectedItem(b);this._setFilterInfoText(b.getLabel())}}};
