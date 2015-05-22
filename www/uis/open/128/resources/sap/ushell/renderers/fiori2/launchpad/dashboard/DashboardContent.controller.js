// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";jQuery.sap.require("sap.ushell.ui.launchpad.TileContainer");sap.ui.controller("sap.ushell.renderers.fiori2.launchpad.dashboard.DashboardContent",{onInit:function(){this.sViewId="#"+this.oView.getId();if(sap.ui.Device.browser.mobile){sap.ui.getCore().getEventBus().subscribe("launchpad","contentRefresh",this._webkitMobileRenderFix,this)}this.isDesktop=(sap.ui.Device.system.desktop&&(navigator.userAgent.toLowerCase().indexOf('tablet')<0))},onExit:function(){sap.ui.getCore().getEventBus().unsubscribe("launchpad","contentRefresh",this._webkitMobileRenderFix,this)},onAfterRendering:function(){var e=sap.ui.getCore().getEventBus();e.unsubscribe("launchpad","scrollToGroup",this._scrollToGroup,this);e.subscribe("launchpad","scrollToGroup",this._scrollToGroup,this);e.unsubscribe("grouplist","GroupListOver",this._handleGroupListOver,this);e.unsubscribe("grouplist","GroupListOut",this._handleGroupListOut,this);e.unsubscribe("grouplist","GroupListItemOver",this._handleGroupListItemOver,this);e.unsubscribe("grouplist","GroupListItemOut",this._handleGroupListItemOut,this);e.unsubscribe("grouplist","GroupListItemDrop",this._handleGroupListItemDrop,this);e.subscribe("grouplist","GroupListOver",this._handleGroupListOver,this);e.subscribe("grouplist","GroupListOut",this._handleGroupListOut,this);e.subscribe("grouplist","GroupListItemOver",this._handleGroupListItemOver,this);e.subscribe("grouplist","GroupListItemOut",this._handleGroupListItemOut,this);e.subscribe("grouplist","GroupListItemDrop",this._handleGroupListItemDrop,this);if(sap.ui.Device.os.android){e.unsubscribe("launchpad","changeGroupTitle",this._changeGroupTitleHandler,this);e.subscribe("launchpad","changeGroupTitle",this._changeGroupTitleHandler,this)}jQuery("#__area0").appendTo("#shellPage");var t;jQuery(window).bind("resize",function(){clearTimeout(t);t=setTimeout(this._resizeHandler.bind(this),300)}.bind(this));if(sap.ui.Device.system.desktop){jQuery("#dashboardPage-cont").scroll(sap.ushell.utils.handleTilesVisibility)}else{setTimeout(function(){this.oDashboardPage=sap.ui.getCore().byId("dashboardPage");this.oScroller=this.oDashboardPage.getScrollDelegate();if(this.oScroller&&this.oScroller._scroller){if(!this.oOriginalScrollMove){this.oOriginalScrollMove=this.oScroller._scroller.options.onScrollMove}var a=this;this.oScroller._scroller.options.onScrollMove=function(E){a.oOriginalScrollMove.apply(a.oScroller);sap.ushell.utils.handleTilesVisibility()}}else{jQuery("#dashboardPage-cont").scroll(sap.ushell.utils.handleTilesVisibility);jQuery("#dashboard").scroll(sap.ushell.utils.handleTilesVisibility)}}.bind(this),1500)}},_changeGroupTitleHandler:function(){this._forceBrowserRerenderElement(document.getElementById('groupList'))},_forceBrowserRerenderElement:function(e){var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame;if(a){a(function(){var d=e.style.display;e.style.display='none';e.offsetHeight;e.style.display=d})}else{console.log('unsupported browser for animation frame')}},_webkitMobileRenderFix:function(){if(sap.ui.Device.browser.chrome||sap.ui.Device.os.ios||sap.ui.Device.os.android){this._forceBrowserRerenderElement(document.body)}},_resizeHandler:function(){this._addBottomSpace();sap.ushell.utils.handleTilesVisibility()},_addBottomSpace:function(){sap.ushell.utils.addBottomSpace()},_scrollToGroup:function(c,e,d){var g,t=this;if(d.group){g=d.group.getGroupId()}else{g=d.groupId}jQuery.each(this.oView.oDashboardGroupsBox.getGroups(),function(n,G){if(G.getGroupId()===g){var y;if(sap.ui.Device.system.desktop){if(n===0){sap.ui.getCore().byId("dashboardPage").scrollTo(0,500)}else{var j=jQuery("#dashboardPage-cont");var T=jQuery('#shell-hdr').height()+parseInt(jQuery('.sapUshellContainerTitle').css('margin-top'),10);y=jQuery.sap.byId(G.sId).offset().top+j.scrollTop()-T;sap.ui.getCore().byId("dashboardPage").scrollTo(y,500)}}else{y=-1*(document.getElementById('dashboardGroups').getBoundingClientRect().top)+document.getElementById(G.sId).getBoundingClientRect().top;jQuery('#dashboard').animate({scrollTop:y},500,t.fHandleScrollEnd)}if(d.group&&d.focus&&!d.group.getEditMode()){jQuery.sap.byId(G.sId).focus()}if(d.groupId||d.groupChanged){t._addBottomSpace()}jQuery('#groupList .sapUshellDefaultGroupItem, #groupList .sapUshellGroupListItem').removeClass('sapUshellOver').eq(n).addClass('sapUshellOver');sap.ushell.utils.handleTilesVisibility();return false}})},fHandleScrollEnd:function(){var e=sap.ui.getCore().getEventBus();e.publish("grouplist","ScrollAnimationEnd")},makeGroupSortable:function(j){var a=j.find('.sapUshellInner');if(a.hasClass("ui-sortable")){return}this._sortable(a)},_getTileTopOffset:function(t,a,d){var T=0+d;T+=t.closest(".sapUshellDashboardGroupsContainerItem").position().top;T+=a.top;return T},_sortable:function(j){var t=this,a=jQuery.sap.byId(this.oView.oDashboardGroupsBox.getId()),b=a.find(".sapUshellCloneArea");t.bActive=false;if(b.length<=0){b=jQuery("<div id='cloneArea' class='sapUshellCloneArea sapUshellDashboardGroupsContainerItem'></div>");a.append(b)}j.sortable({containment:"document",items:'>:not(.sapUshellPlusTile)',connectWith:".sapUshellInner.sapUshellTilesContainer-sortable",placeholder:"sapUshellTile-placeholder",tolerance:"pointer",helper:function(e,c){var d=c.clone();var f=d.find('a');if(f.length){var g=f.html();f.replaceWith(jQuery('<div>'+g+'</div>'))}d.find('[title]').removeAttr('title');d.attr("id",d.attr("id")+'-helperclone');d.addClass("sapUshellSortableHelperClone");d.css("font-size",c.css("font-size"));d.hide();setTimeout(function(){d.appendTo('body');d.show()},1);return d},revert:250,start:this._handleSortableStart.bind(this),change:this._handleSortableChange.bind(this),stop:this._handleSortableStop.bind(this)}).disableSelection();if(sap.ui.Device.system.phone){j.sortable('disable')}},_bindTileEvents:function(E){if(!sap.ui.Device.system.tablet){return}var t=this,T=E.getSource();var j=jQuery.sap.byId(T.sId);j.bind("mousedown",function(a){if(t.bActive===false){try{jQuery(".sapUshellInner.sapUshellTilesContainer-sortable").sortable('disable')}catch(e){jQuery.sap.log.warning('tile container sortable was not initialized. intializing again now.');jQuery(".sapUshellInner.sapUshellTilesContainer-sortable").each(function(){t._sortable(jQuery(this))})}var _=jQuery(this),b=a;clearTimeout(t.fdownTimer);t.fdownTimer=setTimeout(function(){t.bActive=true;jQuery(_).effect("shake",{times:1,distance:5,complete:function(){if(!t.bActive){return}var d=sap.ui.getCore().byId("dashboardPage"),s=d.getScrollDelegate();if(s&&s._scroller){s._scroller.disable()}jQuery(".sapUshellInner.sapUshellTilesContainer-sortable").sortable('enable');jQuery(this).trigger(b)}},50)},150)}});j.bind('mouseup',$.proxy(t,'_resetDraggingTimeout')).bind('mousemove',$.proxy(t,'_resetDraggingTimeout')).bind('scrollstart',$.proxy(t,'_resetDraggingTimeout')).bind('touchmove',$.proxy(t,'_resetDraggingTimeout')).bind('touchcancel',$.proxy(t,'_resetDraggingTimeout'))},_resetDraggingTimeout:function(){clearTimeout(this.fdownTimer);this.bActive=false;if(!sap.ui.Device.system.desktop){var d=sap.ui.getCore().byId("dashboardPage"),s=d.getScrollDelegate();if(s&&s._scroller){s._scroller.enable()}}},_handleSortableStart:function(e,u){this.sortableInfo={};this.sortableInfo.dashboardGroups=document.getElementById(this.oView.oDashboardGroupsBox.getId());this.sortableInfo.jqDashboardGroups=jQuery(this.sortableInfo.dashboardGroups);var j=this.sortableInfo.jqDashboardGroups.find(".sapUshellTile");if(sap.ui.Device.os.ios&&sap.ui.Device.system.tablet){j.find('a').removeAttr('href')}this.sortableInfo.originalTiles=j.not(".sapUshellSortableHelperClone").not(u.item);this.sortableInfo.cloneArea=this.sortableInfo.jqDashboardGroups.find("#cloneArea");this.sortableInfo.tilesFirstContainer=this.sortableInfo.jqDashboardGroups.find('.sapUshellTileContainer:visible:first');this.sortableInfo.containerLeftMargin=parseInt(this.sortableInfo.tilesFirstContainer.css("margin-left"));this.sortableInfo.jqDashboardPageCont=jQuery("#dashboardPage-cont");var a=sap.ui.getCore();a.getEventBus().publish("launchpad","sortableStart");var t=a.byId(u.item[0].id);if(t.getLong()){u.placeholder.addClass("sapUshellLong")}if(t.getTall()){u.placeholder.addClass("sapUshellTall")}u.item.click(function(E){E.preventDefault();E.stopPropagation()});this.oView.oDashboardDeleteArea.show();if(!this.isDesktop){return}var b=this,c=parseFloat(jQuery("#dashboardPage-scroll").offset().left),d=this.sortableInfo.jqDashboardGroups.offset().left;this.sortableInfo.cloneArea.css("left",d-c);var f=this.sortableInfo.jqDashboardPageCont.scrollTop();for(var i=0;i<this.sortableInfo.originalTiles.length;i++){var g=this.sortableInfo.originalTiles.eq(i),C=g.clone();var h=g[0];h.tilePosition=g.position();h.tileOffset=g.offset();C.attr("id",C.attr("id")+'-clone');C.css("font-size",g.css("font-size"));C.addClass("sapUshellClonedTile");g.data("clone",C);var T=parseInt(h.tilePosition.left)+this.sortableInfo.containerLeftMargin+"px",k=b._getTileTopOffset(g,h.tilePosition,f);C.css("left",T);C.css("top",k+"px");b.sortableInfo.cloneArea.append(C);g.css("visibility","hidden")}},_handleSortableStop:function(e,u){jQuery(".sapUshellSortableHelperClone").remove();this.oView.oDashboardDeleteArea.hide();var a=sap.ui.getCore(),t=a.byId(u.item[0].id),E=a.getEventBus();if(t){var o=t.getParent();if(!t.bDeletionFlag){if(t.getLong()){jQuery(".sapUshellTile-placeholder").removeClass("sapUshellLong")}var n=sap.ui.getCore().byId(u.item.parents(".sapUshellTileContainer").attr("id")),N=n.getGroupId(),b=u.item.index();o.removeTile(t,true);n.insertTile(t,b,true);E.publish("launchpad","moveTile",{sTileId:t.getUuid(),toGroupId:N,toIndex:b});u.item.parent().sortable('disable')}else if(t.bDeletionFlag){o.removeTile(t,true);t.bDeletionFlag=false;E.publish("launchpad","deleteTile",{tileId:t.getUuid()});t.destroy()}}if(sap.ui.Device.system.phone){that.bActive=false;jQuery(".sapUshellInner.sapUshellTilesContainer-sortable").sortable('disable')}if(this.isDesktop){var j=jQuery(".sapUshellTile").not(".sapUshellClonedTile");j.removeData("clone");j.removeClass("sapUshellExcludeMe");j.css("visibility","visible");var c=jQuery.sap.byId(this.oView.oDashboardGroupsBox.getId()),d=c.find("#cloneArea");d.empty()}delete this.sortableInfo;E.publish("launchpad","sortableStop")},_handleDrop:function(e,u){var j=jQuery(u);this.oView.oDashboardDeleteArea.hide();var n=sap.ui.getCore().byId(j.parents(".sapUshellTileContainer").attr("id")),N=n.getGroupId(),a=j.index(),b=sap.ui.getCore(),t=b.byId(j.attr('id')),o=t.getParent(),E=b.getEventBus(),d=jQuery(".sapUshellDeleteArea_dashboard_functional");if(d.data("tileOver")===true){o.removeTile(t,true);E.publish("launchpad","deleteTile",{tileId:t.getUuid()});t.destroy();d.data("tileOver",false)}else{o.removeTile(t,true);n.insertTile(t,a,true);E.publish("launchpad","moveTile",{sTileId:t.getUuid(),toGroupId:N,toIndex:a})}},_handleSortableChange:function(e,u,a){if(typeof a=="undefined"){a=true}if(u&&(u.placeholder.length>0)){var j=u.placeholder.parent();var b=j.children('.sapUshellPlusTile');if(b.length>0){b.detach();j.append(b)}}if(!this.isDesktop)return;var t=this;var o=this.sortableInfo.originalTiles;var d=this.sortableInfo.jqDashboardPageCont.scrollTop();for(var i=0;i<o.length;i++){var c=o.eq(i);var f=c[0];var g=c.position();var h=c.offset();if((h.left==f.tileOffset.left)&&(h.top==f.tileOffset.top)){continue}f.tilePosition=g;f.tileOffset=h;var C=c.data("clone");if(!C)continue;var k=f.tilePosition.left+this.sortableInfo.containerLeftMargin;var T=t._getTileTopOffset(c,f.tilePosition,d);if(a){C.stop(true,false).animate({left:k,top:T},{duration:250},{easing:"swing"})}else{C.css({left:k,top:T})}}},_handleGroupListOver:function(c,e,E){jQuery(".sapUshellSortableHelperClone").toggleClass("sapUshellOverGroupList");jQuery(".sapUshellTile-placeholder").hide()},_handleGroupListOut:function(c,e,E){jQuery(".sapUshellSortableHelperClone").toggleClass("sapUshellOverGroupList");jQuery(".sapUshellTile-placeholder").show();jQuery(".sapUshellGroupList").data("dropGroup",null);this._handleSortableChange(undefined,undefined,false)},_handleGroupListItemOver:function(c,e,E){jQuery(".sapUshellGroupList").data("dropGroup",E.getSource());var j=jQuery(".sapUshellTile-placeholder").not(".sapUshellPlaceholderClone").clone();j.addClass("sapUshellPlaceholderClone");j.attr("id","placeholder-clone_"+E.getSource().sId);var a;jQuery.each(this.oView.oDashboardGroupsBox.getGroups(),function(n,g){if(g.getGroupId()===E.getSource().getGroupId()){a=jQuery("#"+g.sId).find(".sapUshellTilesContainer-sortable");return false}});if(a.find(".sapUshellPlusTile").length>0){a.find(".sapUshellPlusTile").before(j);j.show()}else{a.append(j);j.show()}jQuery(".sapUshellTile-placeholder").not(".sapUshellPlaceholderClone").hide();this._handleSortableChange(undefined,undefined,false)},_handleGroupListItemOut:function(c,e,E){jQuery("#placeholder-clone_"+E.getSource().sId).remove();this._handleSortableChange(undefined,undefined,false)},_handleGroupListItemDrop:function(c,e,E){var t=E.getParameter("control"),o=t.getParent();o.removeTile(t,true);this._publishAsync("launchpad","moveTile",{sTileId:t.getUuid(),toGroupId:E.getSource().getGroupId(),toIndex:null});this._handleGroupListOut(c,e,E);this._handleGroupListItemOut(c,e,E);t.destroy()},_publishAsync:function(c,e,d){var b=sap.ui.getCore().getEventBus();window.setTimeout($.proxy(b.publish,b,c,e,d),1)}})}());