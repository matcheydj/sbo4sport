// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";jQuery.sap.declare("sap.ushell.services.Bookmark");sap.ushell.services.Bookmark=function(){var t=this,l=sap.ushell.Container.getService("LaunchPage");sap.ushell.utils.testPublishAt(t);function i(c,r){var C=l.getCatalogData(c);return C.remoteId===r.remoteId&&C.baseUrl.replace(/\/$/,"")===r.baseUrl.replace(/\/$/,"")}this.addBookmark=function(p,g){return l.addBookmark(p,g)};sap.ushell.utils.testPublishAt(t);function d(D,c,C,g){var e,f=D.reject.bind(D);function a(G){l.getCatalogTiles(C).fail(f).done(function(b){var T=b.some(function(o){if(l.getCatalogTileId(o)===c){l.addTile(o,G).fail(f).done(function(){D.resolve()});return true}});if(!T){e="No tile '"+c+"' in catalog '"+l.getCatalogId(C)+"'";jQuery.sap.log.error(e,null,"sap.ushell.services.Bookmark");f(e)}})}if(g){l.getGroups().fail(f).done(function(G){var b=G.some(function(o){if(l.getGroupId(o)===g){a(o);return true}});if(!b){e="Group '"+g+"' is unknown";jQuery.sap.log.error(e,null,"sap.ushell.services.Bookmark");f(e)}})}else{l.getDefaultGroup().fail(f).done(a)}return D.promise()}this.addCatalogTileToGroup=function(c,g,C){var D=new jQuery.Deferred(),e,f=D.reject.bind(D),m,L="X-SAP-UI2-HANA:hana?remoteId=HANA_CATALOG";function a(o){return l.getCatalogId(o)===L}m=C?i:a;C=C||{id:L};l.onCatalogTileAdded(c);l.getCatalogs().fail(f).done(function(b){var s;b.forEach(function(o){if(m(o,C)){if(!s){s=o}else{jQuery.sap.log.warning("More than one matching catalog: "+JSON.stringify(C),null,"sap.ushell.services.Bookmark")}}});if(s){d(D,c,s,g)}else{e="No matching catalog found: "+JSON.stringify(C);jQuery.sap.log.error(e,null,"sap.ushell.services.Bookmark");D.reject(e)}});return D.promise()};this.countBookmarks=function(u){return l.countBookmarks(u)};this.deleteBookmarks=function(u){return l.deleteBookmarks(u)};this.updateBookmarks=function(u,p){return l.updateBookmarks(u,p)}};sap.ushell.services.Bookmark.hasNoAdapter=true}());