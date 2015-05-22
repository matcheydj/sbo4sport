// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";jQuery.sap.declare("sap.ushell.renderers.fiori2.AccessKeysHandler");var a=function(){this.init()};a.prototype={keyCodes:jQuery.sap.KeyCodes,activateFlag:true,activateAccessibilityKeys:function(f){if(this.activateFlag===!!f){return}this.activateFlag=!!f;if(this.activateFlag){this.init()}else{jQuery("body").off('keyup.accessKeysHandler')}},handleCatalogKey:function(){sap.ushell.renderers.fiori2.Navigation.openCatalogByHash({groupContext:null});jQuery("#configBtn").focus()},handleHomepageKey:function(){var m=sap.ui.getCore().byId("mainShell"),s=m.getController();s.navigateToHome();jQuery("#homeBtn").focus()},handleSearchKey:function(){var s=sap.ui.getCore().byId('sf');var j=jQuery(s.getDomRef());j.click()},handleUserMenuKey:function(){var l=sap.ui.getCore().byId('loginDetails');if(!l){jQuery.sap.require('sap.ushell.ui.footerbar.LoginDetailsButton');l=new sap.ushell.ui.footerbar.LoginDetailsButton()}l.showLoginDetailsDialog()},handleAccessOverviewKey:function(){var t=sap.ushell.resources.i18n,s=new sap.ui.layout.form.SimpleForm({editable:false,content:[new sap.m.Label({text:"Alt+C"}),new sap.m.Text({text:t.getText("actionCatalog")}),new sap.m.Label({text:"Alt+H"}),new sap.m.Text({text:t.getText("actionHomePage")}),new sap.m.Label({text:"Alt+S"}),new sap.m.Text({text:t.getText("actionSearch")}),new sap.m.Label({text:"Alt+U"}),new sap.m.Text({text:t.getText("actionLoginDetails")})]}),d,o=new sap.m.Button({text:t.getText("okBtn"),press:function(){d.close()}});d=new sap.m.Dialog({id:"hotKeysGlossary",title:t.getText("hotKeysGlossary"),contentWidth:"300px",leftButton:o,afterClose:function(){d.destroy()}});d.addContent(s);d.open()},getNumberOfTileInRow:function(f){var j=jQuery(".sapUshellTile:first");if(!j.length)return false;var c=sap.ui.getCore();var t=c.byId(j.attr('id'));var b=(t.getLong()==true)?2:1;var d;if(!f){d=jQuery("#dashboardGroups").width()}else{d=jQuery("#catalogTiles").width()}var e=j.outerWidth(true)/b;var n=Math.floor(d/e);return n},goToEdgeTile:function(s){var t=jQuery(".sapUshellTile:visible")[s]();if(!t.length){return false}this.setTileFocus(t);return true},goToFirstTileOfSiblingGroup:function(s,e){e.preventDefault();var c=jQuery(":focus").closest(".sapUshellDashboardGroupsContainerItem");if(!c.length)return;var n=c[s](".sapUshellDashboardGroupsContainerItem:not(.sapUshellCloneArea)");var t='first';if(!n.length){if(!(s=="next"))return;n=c;t='last'}var j=n.find(".sapUshellTile")[t]();this.setTileFocus(j);this.moveScrollDashboard(j);return false},goToFirstTileOfSiblingGroupInCatalog:function(s,e){e.preventDefault();var j=this.getFocusOnTile(jQuery(":focus"));if(!j)return;var b;if(s=="next"){var i=j.nextAll("h3").length?false:true;if(!i){b=j.nextAll("h3").first().next()}else{b=j.nextAll(".sapUshellTile").last()}}else{var c=j.prevAll("h3").length==1?true:false;if(!c){b=jQuery(j.prevAll("h3")[1]).next()}else{b=j.prevAll("h3").last().next()}}this.setTileFocus(b);this.moveScrollCatalog(b);return false},swapTwoTilesInGroup:function(g,f,s){var b=g.getBindingContext().getObject();var c=b.tiles.indexOf(f.getBindingContext().getObject());var d=b.tiles.indexOf(s.getBindingContext().getObject());var e=b.tiles.splice(c,1,null);var h=b.tiles.splice(d,1,e[0]);b.tiles.splice(c,1,h[0]);var i=g.getBindingContext().getPath();g.getModel().setProperty(i,b)},moveTileInGroup:function(g,f,s){if(sap.ui.getCore().byId("shell").getModel().getProperty("/personalization")){var b=g.getBindingContext().getObject();var c=b.tiles.indexOf(f.getBindingContext().getObject());var d=b.tiles.indexOf(s.getBindingContext().getObject());var e=b.tiles.splice(c,1);b.tiles.splice(d,0,e[0]);var h=g.getBindingContext().getPath();g.getModel().setProperty(h,b)}},moveTile:function(d,s){if(sap.ui.getCore().byId("shell").getModel().getProperty("/personalization")){if(typeof s=="undefined"){s=false}var i=this.getGroupAndTilesInfo();if(!i)return;var n=this.getNextTile(d,i);if(!n)return;if(s){this.swapTwoTilesInGroup(i.group,i.curTile,n)}else{this.moveTileInGroup(i.group,i.curTile,n)}setTimeout(function(){this.setTileFocus($(n.getDomRef()))}.bind(this),100)}},getNextTile:function(d,b){var n,c=sap.ui.getCore().getConfiguration().getRTL();if(d=="left"){n=b.tiles[b.curTileIndex+(c?1:-1)]}if(d=="right"){n=b.tiles[b.curTileIndex+(c?-1:1)]}if(d=="down"||d=="up"){var e;var o=parseFloat(b.curTile.getDomRef().offsetLeft);if(d=="down"){e=b.tiles.slice(b.curTileIndex+1,b.curTileIndex+(b.sizeOfLine*2))}else{var s=b.curTileIndex-(b.sizeOfLine*2);s=(s>0)?s:0;e=b.tiles.slice(s,b.curTileIndex-1).reverse()}for(var i=0,l=e.length;i<l;i++){var t=e[i].getDomRef();var f=parseFloat(t.offsetLeft);var w=parseFloat(t.offsetWidth);var g=f+w;if(f<=o&&g>=o){n=e[i];break}}}return n},getGroupAndTilesInfo:function(j,f){if(!j){j=this.getFocusOnTile(jQuery(":focus"))}if(!j.length)return;var c=sap.ui.getCore().byId(j.attr('id'));var g=c.getParent();var t;if(!f){t=g.getTiles()}else{t=new Array();var b=j.prevAll("h3").first().nextUntil("h3");for(var i=0;i<b.length;i++){t.push(sap.ui.getCore().byId(b[i].id))}}var s=this.getNumberOfTileInRow(f);return{curTile:c,curTileIndex:t.indexOf(c),tiles:t,sizeOfLine:s,group:g}},goToNearbyTile:function(d,j,f){var i=this.getGroupAndTilesInfo(j,f);if(!i)return;var n=this.getNextTile(d,i);if(!n)return;this.setTileFocus($(n.getDomRef()))},deleteTile:function(j){var t=j.attr("id");if(t){var T=sap.ui.getCore().byId(t);var e=sap.ui.getCore().getEventBus();e.publish("launchpad","deleteTile",{tileId:T.getUuid()})}},setTileFocus:function(j){if(!j.hasClass('sapUshellPlusTile')){var b=j.find('[tabindex], a').andSelf().filter('[tabindex], a');b.filter('[tabindex!="-1"]');j=b.eq(0)}j.focus()},moveScrollDashboard:function(j){var b=jQuery("#dashboardPage-cont");var t=jQuery('#shell-hdr').height()+parseInt(jQuery('.sapUshellContainerTitle').css('margin-top'),10);var y=j.offset().top+b.scrollTop()-t;sap.ui.getCore().byId("dashboardPage").scrollTo(y,500)},moveScrollCatalog:function(j){var b=jQuery("#catalogTilesPage-cont");var t=jQuery('#shell-hdr').height()+jQuery('.sapMPageHeader').height()+(parseInt(jQuery('.sapMPanelHdr').css('margin-top'),10)*2);var y=j.offset().top+b.scrollTop()-t;sap.ui.getCore().byId("catalogTilesPage").scrollTo(y,500)},goToNearbySidePanelGroup:function(d,j){var s=(d=="up")?"prev":"next";var n=j[s]();if(!n)return;n.focus()},deleteSidePanelGroup:function(j){var c=sap.ui.getCore();var g=c.byId(j.attr('id'));var r=g.getRemovable();var e=c.getEventBus();e.publish("launchpad",r?"deleteGroup":"resetGroup",{groupId:g.getGroupId()})},moveSidePanelGroup:function(d,j){var c=sap.ui.getCore();var g=c.byId(j.attr('id'));var i=g.getIndex();var t=d=="up"?i-1:i+1;if(!i||!t)return;var b=g.getParent().getItems();if(t>=(b.length))return;var D={fromIndex:i,toIndex:t};var B=c.getEventBus();B.publish("launchpad","moveGroup",D);this.upDownButtonsHandler(d)},goToEdgeSidePanelGroup:function(s){var j=jQuery(".sapUshellGroupLI");j[s]().focus()},getFocusGroupFromSidePanel:function(j){var b=j.closest(".sapUshellGroupLI");return b.length?b:false},getFocusOnTile:function(j){var b=j.closest(".sapUshellTile");return b.length?b:false},getFocusOnCatalogPopover:function(j){var b=j.closest(".sapMPopover");return b.length?b:false},addGroup:function(j){var c=sap.ui.getCore();var b=c.byId(j.attr('id'));b.firePress()},renameGroup:function(){var j=jQuery(":focus");var b=this.getFocusGroupFromSidePanel(j);if(b){b.dblclick()}},upDownButtonsHandler:function(d,f){var j,b=jQuery(":focus");if(j=this.getFocusGroupFromSidePanel(b)){this.goToNearbySidePanelGroup(d,j);return}if(j=this.getFocusOnTile(b)){this.goToNearbyTile(d,j,f);return}if(j=this.getFocusOnCatalogPopover(b)){this.goToNearbyTile(d,j,f);return}},homeEndButtonsHandler:function(s){var j,b=jQuery(":focus");if(b.closest("#dashboardGroups").length||b.closest("#catalogTiles").length){this.goToEdgeTile(s);return}if(j=this.getFocusGroupFromSidePanel(b)){this.goToEdgeSidePanelGroup(s);return}},deleteButtonHandler:function(){if(sap.ui.getCore().byId("shell").getModel().getProperty("/personalization")){var j,b=jQuery(":focus");if(j=this.getFocusOnTile(b)){this.deleteTile(j);return}if(j=this.getFocusGroupFromSidePanel(b)){if(!j.hasClass('sapUshellEditing')&&!j.hasClass("sapUshellDefaultGroupItem")){this.deleteSidePanelGroup(j);return}}}},ctrlUpDownButtonsHandler:function(s){var j,b=jQuery(":focus");if(j=this.getFocusOnTile(b)){this.moveTile(s,false,j);return}if(j=this.getFocusGroupFromSidePanel(b)){this.moveSidePanelGroup(s,j);return}this.moveTile("down")},spaceButtonHandler:function(e){var j,b=jQuery(":focus");if(j=this.getFocusGroupFromSidePanel(b)){j.click();return false}var j=b.closest('#addGroupActionItem');if(j.length){this.addGroup(j);return false}},f6DashboardButtonHandler:function(e){var j=jQuery(":focus"),b,f;var s={configButton:'#configBtn',sidePanelFirstGroup:'.sapUshellGroupLI:first:visible',firstTile:'.sapUshellTile:first'};if(j.closest('#dashboardGroups').length){if(!e.shiftKey){f="configButton"}else{b=jQuery(s.sidePanelFirstGroup);if(!b.length){f="configButton"}else{f="jqElement"}}}if(j.closest(s.sidePanelFirstGroup).length){if(!e.shiftKey){f='firstTile'}else{f='configButton'}}if(j.closest('#shell-hdr').length){if(e.shiftKey){f='firstTile'}else{b=jQuery(s.sidePanelFirstGroup);if(!b.length){f='firstTile'}else{f="jqElement"}}}e.preventDefault();switch(f){case'firstTile':b=jQuery(s.firstTile);this.setTileFocus(b);break;case'jqElement':b.focus();break;default:b=jQuery(s.configButton);b.focus();break}return false},f6CatalogButtonHandler:function(e){var j=jQuery(":focus"),b,f;var s={homeButton:'#homeBtn',backButton:'.sapMBarChild.sapMBtn:first',dropDownList:'#catalogSelect',searchField:'#catalogSearch input',firstTile:'#catalogTiles .sapUshellTile:visible:first'};if(j.closest('#shell-hdr').length){if(!e.shiftKey){f='backButton';b=jQuery(s.backButton)}else{f='firstTile';b=jQuery(s.firstTile)}}if(j.closest(s.backButton).length){if(!e.shiftKey){b=jQuery(s.dropDownList);f='dropDownList'}else{b=jQuery(s.homeButton);f='homeButton'}}if(j.closest('#catalogSelect').length){if(!e.shiftKey){b=jQuery(s.searchField);f='searchField'}else{b=jQuery(s.backButton);f='backButton'}}if(j.closest('#catalogSearch').length){if(!e.shiftKey){b=jQuery(s.firstTile);f='firstTile'}else{b=jQuery(s.dropDownList);f='dropDownList'}}if(j.closest('#catalogTiles').length){if(!e.shiftKey){b=jQuery(s.homeButton);f="homeButton"}else{b=jQuery(s.searchField);f="searchField"}}e.preventDefault();switch(f){case'firstTile':b=jQuery(s.firstTile);this.setTileFocus(b);break;case'homeButton':case'backButton':case'dropDownList':case'searchField':b.focus();break;default:b=jQuery(s.homeButton);b.focus();break}return false},mainKeydownHandler:function(e){e=e||window.event;switch(e.keyCode){case this.keyCodes.SPACE:this.spaceButtonHandler(e);break;case this.keyCodes.HOME:this.homeEndButtonsHandler("first");break;case this.keyCodes.END:this.homeEndButtonsHandler("last");break;default:return true}},catalogKeydownHandler:function(k){var h=sap.ushell.renderers.fiori2.AccessKeysHandler;var f=true;switch(k.keyCode){case h.keyCodes.F6:return h.f6CatalogButtonHandler(k);break;case h.keyCodes.ARROW_UP:h.upDownButtonsHandler("up",f);break;case h.keyCodes.ARROW_DOWN:h.upDownButtonsHandler("down",f);break;case h.keyCodes.ARROW_RIGHT:h.goToNearbyTile("right");break;case h.keyCodes.ARROW_LEFT:h.goToNearbyTile("left");break;case h.keyCodes.PAGE_UP:h.goToFirstTileOfSiblingGroupInCatalog('prev',k);break;case h.keyCodes.PAGE_DOWN:h.goToFirstTileOfSiblingGroupInCatalog('next',k);break}},dashboardKeydownHandler:function(k){var h=sap.ushell.renderers.fiori2.AccessKeysHandler;switch(k.keyCode){case h.keyCodes.F2:this.renameGroup();break;case h.keyCodes.F6:return h.f6DashboardButtonHandler(k);break;case h.keyCodes.DELETE:h.deleteButtonHandler();break;case h.keyCodes.ARROW_UP:if(k.ctrlKey===true){h.ctrlUpDownButtonsHandler("up")}else{h.upDownButtonsHandler("up")}break;case h.keyCodes.ARROW_DOWN:if(k.ctrlKey===true){h.ctrlUpDownButtonsHandler("down")}else{h.upDownButtonsHandler("down")}break;case h.keyCodes.ARROW_RIGHT:if(k.ctrlKey===true){h.moveTile("right")}else{h.goToNearbyTile("right")}break;case h.keyCodes.ARROW_LEFT:if(k.ctrlKey===true){h.moveTile("left")}else{h.goToNearbyTile("left")}break;case h.keyCodes.PAGE_UP:h.goToFirstTileOfSiblingGroup('prev',k);break;case h.keyCodes.PAGE_DOWN:h.goToFirstTileOfSiblingGroup('next',k);break}},init:function(){jQuery(document).on('keyup.accessKeysHandler',function(k){if(!this.activateFlag){return}if(k.altKey){switch(String.fromCharCode(k.keyCode).toUpperCase()){case'C':if(sap.ui.getCore().byId("shell").getModel().getProperty("/personalization")){this.handleCatalogKey()}break;case'H':this.handleHomepageKey();break;case'S':this.handleSearchKey();break;case'U':this.handleUserMenuKey();break;case'0':this.handleAccessOverviewKey();break}}}.bind(this));jQuery(document).on('keydown.main',this.mainKeydownHandler.bind(this))}};sap.ushell.renderers.fiori2.AccessKeysHandler=new a()}());
