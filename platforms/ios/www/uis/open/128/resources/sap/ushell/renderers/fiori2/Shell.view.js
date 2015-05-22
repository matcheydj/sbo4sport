//Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";jQuery.sap.require("sap.ushell.renderers.fiori2.Navigation");jQuery.sap.require("sap.ushell.renderers.fiori2.launchpad.DashboardManager");jQuery.sap.require("sap.ushell.renderers.fiori2.search.SearchModel");jQuery.sap.require("sap.ushell.renderers.fiori2.search.SearchBox");jQuery.sap.require("sap.ushell.touchSupport");jQuery.sap.require("sap.ushell.UserActivityLog");sap.ui.jsview("sap.ushell.renderers.fiori2.Shell",{createContent:function(c){var s=this;var v=this.getViewData()||{},C=v.config||{},S=(C.appState==="embedded")?true:false,b=(C.appState==="headerless")?true:false,p=function(e,k,H){return e?H:k},f=function(I,e){return sap.ui.getCore().byId(e.getObject())},l=new sap.ushell.ui.launchpad.LoadingDialog({id:"loadingDialog",title:null,text:"",showCancelButton:false}),o=new sap.ui.unified.ShellHeadItem({id:"configBtn",tooltip:"{i18n>showGrpsBtn_tooltip}",icon:sap.ui.core.IconPool.getIconURI("menu2"),selected:{path:"/currentState/showPane"},press:[c.togglePane,c]}),h=new sap.ui.unified.ShellHeadItem({id:"homeBtn",title:"{i18n>homeBtn_tooltip}",tooltip:"{i18n>homeBtn_tooltip}",icon:sap.ui.core.IconPool.getIconURI("home"),press:[c.navigateToHome,c]}),B=new sap.ui.unified.ShellHeadItem({id:"backBtn",title:"{i18n>backBtn_tooltip}",tooltip:"{i18n>backBtn_tooltip}",icon:{parts:["/rtl"],formatter:function(r){return r?sap.ui.core.IconPool.getIconURI("feeder-arrow"):sap.ui.core.IconPool.getIconURI("nav-back")}},press:[c.navigateToHome,c]});o.addEventDelegate({onsaptabprevious:function(E){try{if(!sap.ushell.renderers.fiori2.AccessKeysHandler.goToEdgeTile('last')){sap.ui.getCore().byId('actionsBtn').focus()}E.preventDefault()}catch(e){}}});h.addEventDelegate({onsaptabprevious:function(E){try{if(!sap.ushell.renderers.fiori2.AccessKeysHandler.goToEdgeTile('last')){jQuery(document).find(".sapUshellNoFilteredItems").focus()}E.preventDefault()}catch(e){}}});var a,A;if(S){A=new sap.ui.unified.ShellHeadItem({id:"standardActionsBtn",tooltip:"{i18n>headerActionsTooltip}",icon:sap.ui.core.IconPool.getIconURI("account"),press:[c.pressActionBtn,c]})}else if(!b){a=new sap.ui.unified.ShellHeadUserItem({id:"actionsBtn",username:sap.ushell.Container.getUser().getFullName(),tooltip:"{i18n>headerActionsTooltip}",image:sap.ui.core.IconPool.getIconURI("account"),press:[c.pressActionBtn,c]});a.addEventDelegate({onsaptabnext:function(E){try{var k=sap.ui.getCore().byId('shell'),D=k.getModel().getData();if(D.currentState.stateName==="home"){if(D.currentState.showPane){var m=sap.ui.getCore().byId('groupListPage');var n=m.getContent()[1];var q=n.getItems()[0];if(q){q.focus()}else{sap.ui.getCore().byId('addGroupActionItem').focus()}}else{if(!sap.ushell.renderers.fiori2.AccessKeysHandler.goToEdgeTile('first')){sap.ui.getCore().byId('configBtn').focus()}else{u.setFocusOnFirstGroupOnPage()}}E.preventDefault()}}catch(e){}}});var i=sap.ushell.Container.getUser().getImage();if(i){jQuery.ajax({url:i,headers:{'Cache-Control':'no-cache, no-store, must-revalidate','Pragma':'no-cache','Expires':'0'},success:function(){a.setImage(i)},error:function(){jQuery.sap.log.error("Could not load user image from: "+i,"","sap.ushell.renderers.fiori2.Shell.view")}})}}var u=new sap.ui.unified.Shell({id:"shell",fullHeightContent:true,showPane:{path:"/currentState/showPane"},headItems:{path:"/currentState/headItems",factory:f},headEndItems:{path:"/currentState/headEndItems",factory:f},user:a,paneContent:{path:"/currentState/paneContent",factory:f},headerHiding:{path:"/currentState/headerHiding"},headerVisible:{path:"/currentState/headerVisible"}});u._setStrongBackground(true);if(sap.ui.Device.os.android){o.addEventDelegate({onclick:function(e){e.preventDefault()}})}u.focusOnConfigBtn=function(){jQuery.sap.delayedCall(0,this,function(){if(!b){var C=sap.ui.getCore().byId('configBtn');if(C){C.focus()}}})};u.oldInvalidate=u.invalidate;u.invalidate=function(){this.oldInvalidate.apply(this,arguments)};u.setFocusOnFirstGroupOnPage=function(){var D=sap.ui.getCore().byId('dashboardGroups'),n=jQuery(D.getDomRef()).find(".sapUshellTileContainer:first");if(n[0]){n.focus()}else{sap.ui.getCore().byId('addGroupActionItem').focus()}};u.setFocusOnFirstGroupInList=function(){var e=sap.ui.getCore().byId('groupList'),n=jQuery(e.getDomRef()).find("li:first");if(n[0]){n.focus()}};this.oDashboardManager=new sap.ushell.renderers.fiori2.launchpad.DashboardManager("dashboardMgr",{model:c.getModel(),config:C});var d=this.pageFactory("dashboardPage",this.oDashboardManager.getDashboardView(),!sap.ui.Device.system.desktop),g=this.pageFactory("shellPage",u,true);this.initNavContainer(c);if(S){u.setIcon(sap.ui.resource('sap.ui.core','themes/base/img/1x1.gif'))}else{this.initShellBarLogo(u)}this.setDisplayBlock(true);this.aDanglingControls=[sap.ui.getCore().byId('navContainer'),g,d,B,l,h,o];u.updateAggregation=this.updateShellAggregation;var j=(C.enableSearch!==false);c.getModel().setProperty("/searchAvailable",j);if(j){s.oSearchField=new sap.ui.unified.ShellHeadItem({id:"sf",tooltip:"{i18n>searchbox_tooltip}",icon:sap.ui.core.IconPool.getIconURI("search"),visible:{path:"/searchAvailable"},press:function(e){if(!s.oHeadSearchBox){s.initHeadSearchBox();s.openHeadSearchBox(e,true)}else{if(!s.oHeadSearchBox.getVisible()){s.openHeadSearchBox(e,false)}else{if(s.oHeadSearchInput.getValue()===""){s.closeHeadSearchBox(e)}else{s.handleHash(s.getModel("searchModelInHead"));s.oHeadSearchInput.destroySuggestionRows();s.closeHeadSearchBox(e)}}}}});s.aDanglingControls.push(s.oSearchField)}this.logonIFrameReference=null;return new sap.m.App({pages:g})},_getIconURI:function(i){var r=null;if(i){var m=/url[\s]*\('?"?([^\'")]*)'?"?\)/.exec(i);if(m){r=m[1]}}return r},initShellBarLogo:function(u){jQuery.sap.require("sap.ui.core.theming.Parameters");var i=sap.ui.core.theming.Parameters.get("sapUiGlobalLogo");if(i){i=this._getIconURI(i);if(!i){u.setIcon(sap.ui.resource("sap.ui.core","mimes/logo/sap_50x26.png"))}}var t=this;sap.ui.getCore().attachThemeChanged(function(){var n=sap.ui.core.theming.Parameters.get("sapUiGlobalLogo");if(n){n=t._getIconURI(n);if(n){u.setIcon(n)}}})},initHeadSearchBox:function(){var s=this;var S;s.oHeadSearchBox=sap.ui.getCore().byId("headSearchBox");if(!s.oHeadSearchBox){s.oHeadSearchBox=new sap.m.Toolbar({id:"headSearchBox"}).addStyleClass('sapUshellHeadSearchBox')}S=sap.ui.getCore().byId('shell');S.setSearch(s.oHeadSearchBox);s.oHeadSearchSelect=sap.ui.getCore().byId("headSearchSelect");if(!s.oHeadSearchSelect){s.oHeadSearchSelect=new sap.m.Select({id:"headSearchSelect",name:"headSearchSelect",autoAdjustWidth:true,items:{path:"searchModelInHead>/connectors",template:new sap.ui.core.Item({key:"{searchModelInHead>labelRaw}",text:"{searchModelInHead>label}"})}}).addStyleClass('sapUshellContainerSearchSelect')}s.oHeadSearchInput=sap.ui.getCore().byId("headSearchInput");if(!s.oHeadSearchInput){s.oHeadSearchInput=new sap.m.Input({id:"headSearchInput",type:"Text",showValueStateMessage:false,showTableSuggestionValueHelp:false,showSuggestion:true,filterSuggests:false,suggestionColumns:[new sap.m.Column({})],liveChange:function(e){s.inputLiveChange(e)},suggest:function(e){s.handleSuggest(e)},suggestionItemSelected:function(e){if(s.changeTimer){window.clearTimeout(s.changeTimer);s.changeTimer=null}s.selectSuggest(e)},change:function(e){s.changeTimer=window.setTimeout(function(){var a=s.getModel("searchModelInHead");s.handleHash(a);s.oHeadSearchInput.destroySuggestionRows();s.closeHeadSearchBox(event);s.changeTimer=null},100)}})}s.oHeadSearchBox.addContent(s.oHeadSearchSelect);s.oHeadSearchBox.addContent(s.oHeadSearchInput);s.oHeadSearchBox.addEventDelegate({onAfterRendering:function(e){jQuery('#headSearchBox').parent().parent().parent().addClass('headSearchDivContainer');jQuery('#headSearchBox').parent().parent().addClass('headSearchDiv')}},s.oHeadSearchBox)},openHeadSearchBox:function(e,f){var s=this;var S=sap.ui.getCore().byId('shell');var a=S.getSearch();if(!a){S.setSearch(s.oHeadSearchBox);f=true}var b=sap.ui.getCore().getModel("searchModel");if(!b){b=new sap.ushell.renderers.fiori2.search.SearchModel();b.setSizeLimit(200);sap.ui.getCore().setModel(b,"searchModel");b.searchInit()}else{}b.setSkip(0,false);s.setModel(sap.ushell.resources.i18nModel,"i18n");var c=s.getModel("searchModelInHead");if(!c){c=new sap.ushell.renderers.fiori2.search.SearchModel();c.setSizeLimit(200);s.setModel(c,"searchModelInHead");c.searchInit();s.createHeadSearchBoxViews(c)}else{}var j;if(c.getProperty('/isNormalSearchEnable')){j=c.createAllDataSource()}else{j=c.createAppDataSource()}c.setProperty("/dataSource",j);if(c.getProperty('/isNormalSearchEnable')){s.oHeadSearchSelect.setSelectedKey("$$ALL$$")}else{s.oHeadSearchSelect.setSelectedKey("$$APP$$")}c.setProperty("/searchBoxTerm","");s.oHeadSearchInput.setValue("");s.oHeadSearchInput.setPlaceholder(sap.ushell.resources.i18n.getText("search"));s.oHeadSearchBox.setVisible(true);s.oHeadSearchBox.addEventDelegate({onAfterRendering:function(E){if(f){jQuery('.headSearchDiv').css("maxWidth","38rem")}else{jQuery('.headSearchDiv').css("maxWidth","0rem");jQuery('.headSearchDiv').animate({'maxWidth':'38rem'},100)}}},s.oHeadSearchBox)},closeHeadSearchBox:function(){var s=this;jQuery('.headSearchDiv').animate({'maxWidth':'38rem'},{duration:100,complete:function(){s.oHeadSearchBox.setVisible(false)}})},createHeadSearchBoxViews:function(s){var a=this;a.oHeadSearchSelect.attachChange(function(e){var b=a.oHeadSearchSelect.getSelectedItem();var j={};if(b.getKey()==="$$ALL$$"){j=s.createAllDataSource()}else if(b.getKey()==="$$APP$$"){j=s.createAppDataSource()}else{j=s.sina.createDataSource({objectName:{label:b.getText(),value:b.getKey()},packageName:{label:"",value:""},schemaName:{label:"",value:""},label:""})}s.setProperty("/dataSource",j);if(b.getKey()!=="$$ALL$$"){a.oHeadSearchInput.setPlaceholder(sap.ushell.resources.i18n.getText("searchIn")+": "+b.getText())}else{a.oHeadSearchInput.setPlaceholder(sap.ushell.resources.i18n.getText("search"))}},this);a.oHeadSearchInput.addEventDelegate({onAfterRendering:function(e){e.srcControl.focus()},},a.oHeadSearchInput);a.oHeadSearchInput.bindAggregation("suggestionRows","searchModelInHead>/mixedSection",function(p,d){var l=new sap.m.Label({text:"{searchModelInHead>mixedLabel}"}).addStyleClass('sapUshellSuggestText').addStyleClass('sapUshellSearchSuggestionNavItem');l.addEventDelegate({onAfterRendering:function(){a.bTagUnescaper(this.getDomRef())}},l);l.data("labelRaw","{searchModelInHead>labelRaw}");l.data("targetURL","{searchModelInHead>targetURL}");l.data("dataSource","{searchModelInHead>dataSource}");l.data("suggestType","{searchModelInHead>suggestType}");var i=new sap.ui.core.Icon({src:"{searchModelInHead>icon}"}).addStyleClass('sapUshellSuggestIcon');var b=new sap.m.Label({text:{path:"searchModelInHead>icon",formatter:function(v){if(v){return"<i>"+sap.ushell.resources.i18n.getText("label_app")+"</i>"}return""}}}).addStyleClass('sapUshellSuggestText').addStyleClass('sapUshellSearchSuggestionNavItem');b.addEventDelegate({onAfterRendering:function(){a.bTagUnescaper(this.getDomRef())}},b);var c=new sap.m.CustomListItem({type:sap.m.ListType.Active,content:[b,i,l]});c.getText=function(){return l.data("labelRaw")};if(!a.oHeadSearchInput.getValue())return null;return new sap.m.ColumnListItem({cells:[c],type:"Active"})})},bTagUnescaper:function(d){var i=d.innerHTML;while(i.indexOf('&lt;b&gt;')+i.indexOf('&lt;/b&gt;')>=-1){i=i.replace('&lt;b&gt;','<b>');i=i.replace('&lt;/b&gt;','</b>')}while(i.indexOf('&lt;i&gt;')+i.indexOf('&lt;/i&gt;')>=-1){i=i.replace('&lt;i&gt;','<i>');i=i.replace('&lt;/i&gt;','</i>')}d.innerHTML=i},handleHash:function(s){var a=this;if(a.oHeadSearchInput.getValue()==="")return;var h="#Action-search&/searchTerm="+encodeURIComponent(a.oHeadSearchInput.getValue())+"&dataSource="+encodeURIComponent(JSON.stringify(s.getDataSourceJson()));if(window.location.hash===h){return}else{window.location.href=h;s.setProperty("/searchBoxTerm",a.oHeadSearchInput.getValue())}},inputLiveChange:function(e){var s=this.getModel("searchModelInHead");if(!this.oHeadSearchInput.getValue()){s.setProperty("/appSection",[]);s.setProperty("/suggestSection",[]);s.setProperty("/mixedSection",[])}},handleSuggest:function(e){this.oHeadSearchInput.destroySuggestionItems();var s=this.oHeadSearchInput.getValue();var a=this.getModel("searchModelInHead");a.setProperty("/searchBoxTerm",s);a.doSuggestion()},selectSuggest:function(e){var s=this.getModel("searchModelInHead");var a=e.getParameter("selectedRow").getCells()[0].getContent()[2].data("suggestType");var b=e.getParameter("selectedRow").getCells()[0].getContent()[2].data("labelRaw");var d=e.getParameter("selectedRow").getCells()[0].getContent()[2].data("dataSource");var t=e.getParameter("selectedRow").getCells()[0].getContent()[2].data("targetURL");if(a==="dataSourceSuggest"){s.setProperty("/searchBoxTerm","");this.oHeadSearchInput.setValue("");this.oHeadSearchSelect.setSelectedKey(b);var c=this.oHeadSearchSelect.getSelectedItem();var j={};if(c.getKey()==="$$ALL$$"){j=s.createAllDataSource()}else if(c.getKey()==="$$APP$$"){j=s.createAppDataSource()}else{j=s.sina.createDataSource({objectName:{label:c.getText(),value:c.getKey()},packageName:{label:"",value:""},schemaName:{label:"",value:""},label:""})}s.setProperty("/dataSource",j);if(c.getKey()!=="$$ALL$$"){this.oHeadSearchInput.setPlaceholder(sap.ushell.resources.i18n.getText("searchIn")+": "+c.getText())}else{this.oHeadSearchInput.setPlaceholder(sap.ushell.resources.i18n.getText("search"))}return}var h;if(t){h=t}else{s.setSearchTerm(b,false);s.setDataSource(d,false);h="#Action-search&/searchTerm="+encodeURIComponent(s.getProperty("/searchBoxTerm"))+"&dataSource="+encodeURIComponent(JSON.stringify(s.getDataSourceJson()))}if(window.location.hash!==h){if(h.charAt(0)==='#')window.location.href=h;else window.open(h);this.closeHeadSearchBox(event)}},initNavContainer:function(c){var d=sap.ui.getCore().byId("dashboardPage"),n=new sap.m.NavContainer({id:"navContainer",pages:[d],initialPage:d,afterNavigate:jQuery.proxy(c.onAfterNavigate,c)});n.addCustomTransition("slideBack",sap.m.NavContainer.transitions.slide.back,sap.m.NavContainer.transitions.slide.back);return n},updateShellAggregation:function(n){var b=this.mBindingInfos[n],a=this.getMetadata().getJSONKeys()[n],c;jQuery.each(this[a._sGetter](),jQuery.proxy(function(i,v){this[a._sRemoveMutator](v)},this));jQuery.each(b.binding.getContexts(),jQuery.proxy(function(i,v){c=b.factory(this.getId()+"-"+i,v)?b.factory(this.getId()+"-"+i,v).setBindingContext(v,b.model):"";this[a._sMutator](c)},this))},disableBouncing:function(p){p.onBeforeRendering=function(){sap.m.Page.prototype.onBeforeRendering.apply(p);var s=this._oScroller,o=s.onAfterRendering;s.onAfterRendering=function(){o.apply(s);if(s._scroller){s._scroller.options.bounce=false}}};return p},getControllerName:function(){return"sap.ushell.renderers.fiori2.Shell"},pageFactory:function(i,c,d){var p=new sap.m.Page({id:i,showHeader:false,showFooter:false,content:c,enableScrolling:!!sap.ui.Device.system.desktop}),e=["onAfterHide","onAfterShow","onBeforeFirstShow","onBeforeHide","onBeforeShow"],D={};jQuery.each(e,function(I,E){D[E]=jQuery.proxy(function(a){jQuery.each(this.getContent(),function(I,c){c._handleEvent(a)})},p)});p.addEventDelegate(D);if(d&&sap.ui.Device.system.desktop){this.disableBouncing(p)}return p},onAfterRendering:function(){if(window.f2p){jQuery.sap.require("sap.ushell.components.perf.monitor");window.f2pMonitor.init(sap.ui.getCore().byId("navContainer"))}},createIFrameDialog:function(){jQuery.sap.require("sap.ushell.ui.footerbar.ContactSupportButton");var d=null;var l=this.logonIFrameReference;var _=function(){if(l){l.remove()}return $('<iframe id="SAMLDialogFrame" src="" frameborder="0"></iframe>')};var a=function(){d.addStyleClass('samlDialogHidden');$('#sap-ui-blocklayer-popup').addClass('samlDialogHidden')};this.destroyIFrameDialog();var c=new sap.m.Button({text:sap.ushell.resources.i18n.getText("samlCloseBtn"),press:function(){sap.ushell.Container.cancelLogon()}});var b=new sap.ushell.ui.footerbar.ContactSupportButton();b.setWidth('150px');b.setIcon('');var h=new sap.ui.core.HTML("SAMLDialogFrame");this.logonIFrameReference=_();h.setContent(this.logonIFrameReference.prop('outerHTML'));d=new sap.m.Dialog({id:"SAMLDialog",title:sap.ushell.resources.i18n.getText("samlDialogTitle"),contentWidth:"50%",contentHeight:"50%",leftButton:b,rightButton:c});d.addContent(h);d.open();a();this.logonIFrameReference=$('#SAMLDialogFrame');return this.logonIFrameReference[0]},destroyIFrameDialog:function(){var d=sap.ui.getCore().byId('SAMLDialog');if(d){d.destroy()}this.logonIFrameReference=null},showIFrameDialog:function(){var d=sap.ui.getCore().byId('SAMLDialog');if(d){d.removeStyleClass('samlDialogHidden');$('#sap-ui-blocklayer-popup').removeClass('samlDialogHidden')}}})}());
