// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";jQuery.sap.declare("sap.ushell.utils");sap.ushell.utils={};var v;sap.ushell.utils.Error=function(m,c){this.name="sap.ushell.utils.Error";this.message=m;jQuery.sap.log.error(m,null,c)};sap.ushell.utils.Error.prototype=new Error();sap.ushell.utils.localStorageSetItem=function(k,V,l){var E;try{localStorage.setItem(k,V);if(l){E=document.createEvent("StorageEvent");E.initStorageEvent("storage",false,false,k,"",V,"",localStorage);dispatchEvent(E)}}catch(e){jQuery.sap.log.warning("Error calling localStorage.setItem(): "+e,null,"sap.ushell.utils")}};sap.ushell.utils.Map=function(){this.entries={}};sap.ushell.utils.Map.prototype.put=function(k,V){var o=this.get(k);this.entries[k]=V;return o};sap.ushell.utils.Map.prototype.containsKey=function(k){if(typeof k!=="string"){throw new sap.ushell.utils.Error("Not a string key: "+k,"sap.ushell.utils.Map")}return Object.prototype.hasOwnProperty.call(this.entries,k)};sap.ushell.utils.Map.prototype.get=function(k){if(this.containsKey(k)){return this.entries[k]}};sap.ushell.utils.Map.prototype.keys=function(){return Object.keys(this.entries)};sap.ushell.utils.Map.prototype.remove=function(k){delete this.entries[k]};sap.ushell.utils.Map.prototype.toString=function(){var r=['sap.ushell.utils.Map('];r.push(JSON.stringify(this.entries));r.push(')');return r.join('')};sap.ushell.utils.testPublishAt=function(o,e){};sap.ushell.utils.handleTilesVisibility=function(){clearTimeout(v);v=setTimeout(function(){var s=new Date(),t=sap.ushell.utils.getVisibleTiles();if((typeof t!="undefined")&&t.length>0){var l=sap.ushell.Container.getService("LaunchPage");t.forEach(function(T){l.setTileVisible(sap.ushell.utils.getTileObject(T),T.isDisplayedInViewPort)});jQuery.sap.log.debug("Visible Tiles: "+t.filter(function(T){return T.isDisplayedInViewPort}).length);jQuery.sap.log.debug("NonVisible Tiles: "+t.filter(function(T){return!T.isDisplayedInViewPort}).length)}var d=new Date()-s;jQuery.sap.log.debug("Start time is: "+s+" and duration is: "+d)},1000)};sap.ushell.utils.setTilesNoVisibility=function(){var t=sap.ushell.utils.getVisibleTiles();if((typeof t!=="undefined")&&t.length>0){var l=sap.ushell.Container.getService("LaunchPage");t.forEach(function(T){l.setTileVisible(sap.ushell.utils.getTileObject(T),false)});jQuery.sap.log.debug("Visible Tiles: "+t.filter(function(T){return T.isDisplayedInViewPort}).length);jQuery.sap.log.debug("NonVisible Tiles: "+t.filter(function(T){return!T.isDisplayedInViewPort}).length)}};sap.ushell.utils.getBasicHash=function(h){if(!sap.ushell.utils.validHash(h)){jQuery.sap.log.debug("Utils ; getBasicHash ; Got invalid hash");return}var u=sap.ushell.Container.getService("URLParsing"),s=u.parseShellHash(h);return s?s.semanticObject+"-"+s.action:h};sap.ushell.utils.validHash=function(h){return(h&&h.constructor===String&&$.trim(h)!="")};sap.ushell.utils.handleTilesOpacity=function(){jQuery.sap.require("sap.ui.core.theming.Parameters");var t=this,T,c,a,b,C=sap.ui.core.theming.Parameters.get("sapUshellTileBackgroundColor"),r=this.hexToRgb(C),j,d,R,e,s,f,o,p,g,h,i=sap.ui.getCore(),m=i.byId("shell").getModel(),u=sap.ushell.Container.getService("UserRecents");if(r){R="rgba("+r.r+","+r.g+","+r.b+",{0})";a=u.getAppsUsage();a.done(function(b){T=b.usageMap;j=jQuery('.sapUshellTile');var k=m.getProperty("/groups");m.setProperty('/animationRendered',true);for(var l=0;l<j.length;l++){e=jQuery(j[l]);s=this.getBasicHash(e.find('.sapUshellTileBase').attr('data-targeturl'));if(s){d=this.convertToRealOpacity(T[s],b.maxUsage);f=R.replace("{0}",d);c=sap.ui.getCore().byId(e.attr('id'));o=c.getBindingContext();p=o.sPath.split('/');g=p[2];h=p[4];k[g].tiles[h].rgba=f}}m.setProperty("/groups",k)}.bind(this))}};sap.ushell.utils.convertToRealOpacity=function(a,m){var o=[1,0.95,0.9,0.85,0.8],O=Math.floor(m/o.length),i;if(!a){return o[0]}else if(!m){return o[o.length-1]}else{i=Math.floor((m-a)/O);return i<o.length?o[i]:o[o.length-1]}};sap.ushell.utils.hexToRgb=function(h){var i=!h||h[0]!='#'||(h.length!=4&&h.length!=7),r;h=!i&&h.length===4?'#'+h[1]+h[1]+h[2]+h[2]+h[3]+h[3]:h;r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null};sap.ushell.utils.getVisibleTiles=function(){var n=document.body.clientHeight,c=sap.ui.getCore().byId("dashboardGroups"),N=sap.ui.getCore().byId("navContainer"),g,t,a,b,T,d,e,f,h,s=jQuery('#shell-hdr').height(),i=[];if(c&&c.getGroups()&&N){var C=N.getModel().getProperty("/currentState/stateName"),I=C==="home",G=c.getGroups();for(g=0;g<G.length;g=g+1){a=G[g];b=a.getTiles();if(b){for(t=0;t<b.length;t=t+1){T=b[t];if(!I){T.isDisplayedInViewPort=false}else{d=jQuery(T.getDomRef());e=d.offset();if(!e){return}f=d.offset().top;h=f+d.height();T.isDisplayedInViewPort=(h>s)&&(f<n)}i.push(T)}}}}return i};sap.ushell.utils.getTileObject=function(u){var b=u.getBindingContext();return b.getObject().object};sap.ushell.utils.addBottomSpace=function(){var j=jQuery('#dashboardGroups').find('.sapUshellTileContainer'),o=jQuery('#dashboardPage').offset(),e=o&&o.top;var n=jQuery(window).height()-e-j.last().parent().height();n=(n<0)?0:n;jQuery('.sapUshellDashboardGroupsContainer').css("margin-bottom",n+"px")};sap.ushell.utils.groupHasVisibleTiles=function(g){var a=false,t,b;if(!g||(g&&g.length===0)){return false}for(t=0;t<g.length;t=t+1){b=g[t];if(b.isTileIntentSupported){a=true;break}}return a}}());
