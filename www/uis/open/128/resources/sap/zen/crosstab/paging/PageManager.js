jQuery.sap.declare("sap.zen.crosstab.paging.PageManager");jQuery.sap.require("sap.zen.crosstab.paging.Page");jQuery.sap.require("sap.zen.crosstab.paging.PagingConstants");jQuery.sap.require("sap.zen.crosstab.paging.RequestHandler");jQuery.sap.require("sap.zen.crosstab.paging.CellMerger");jQuery.sap.require("sap.zen.crosstab.datahandler.JsonDataHandler");
sap.zen.crosstab.paging.PageManager=function(c){"use strict";var j=new sap.zen.crosstab.datahandler.JsonDataHandler(c);var C=new sap.zen.crosstab.paging.CellMerger(this);var r=null;var p={};var h={};var P=0;var a=0;var R="";var b=0;var d=0;var H=false;var e=[];var f=false;var n=true;var o={};var A={};function g(){l();if(f||n){f=false;n=false;k()}}function k(){var D=c.getDataArea();var i=D.getRenderRowCnt();var v=D.getRenderColCnt();var w=Math.round(v/a)+1;var V=Math.round(i/P)+1;var M=Math.max(1,w*V*2);if(r){r.setMaxQueueRequests(M)}}this.enableTimeout=function(E){if(r){r.enableTimeout(E)}};this.getRequestStackSize=function(){var i=-1;if(r){i=r.getMaxQueueRequests()}return i};this.resizeEvent=function(){f=true;if(r){r.unlimitStack()}};this.checkResponseConsistency=function(i){if(i.pvcheck){return true}if(P>0&&a>0){return(i.tilerows===P&&i.tilecols===a)}return true};this.receiveData=function(i){var I=this.checkResponseConsistency(i);if(I){t(i);var v={};v.iRow=b;v.iCol=d;var w=null;var x=s();if(x){w=this.createPage(v);H=true}else{w=this.getPage(v)}if(w){w.receiveData(i,x)}if(c.getPropertyBag().isDebugMode()){var y=w.getPosition();var K=y.iRow+"_"+y.iCol;o[K]={};o[K].component=i}}};function l(){var i=0;var v=null;var w="";for(i=0;i<e.length;i++){v=e[i];if(v){v.removeData();w=v.getPageKey();delete p[w]}}e=[]}c.getRenderEngine().addAfterFinishRenderingHandler(g);this.removeRequest=function(i){e.push(i)};this.getRequestCommandTemplate=function(){return R};this.removeHeaderTileRequest=function(i,T,v){var w=h[i.getAreaType()];if(w){var x=w[T];if(x){var y=$.inArray(v,x.aRequestingPages);if(y!==-1){x.aRequestingPages.splice(y,1);if(x.aRequestingPages.length===0){x.iStatus=sap.zen.crosstab.paging.PagingConstants.PAGE_STATUS_UNKNOWN}}}}};this.getHeaderTileInfo=function(i,T){return q(i,T)};this.setHeaderTileInfo=function(i,T,v){var w=m(i);w[T]=v};function m(i){var T=h[i.getAreaType()];if(!T){T={};h[i.getAreaType()]=T}return T}function q(i,T){var v=m(i);var w=v[T];if(!w){w={};w.iStatus=sap.zen.crosstab.paging.PagingConstants.PAGE_STATUS_UNKNOWN;w.iRefCnt=0;v[T]=w}return w}this.ensureCellAvailable=function(i,v,w){var x=null;var T=sap.zen.crosstab.paging.PagingConstants.PAGE_STATUS_UNKNOWN;var I=false;var y=false;var z=i.getAreaType()+"/"+v+"/"+w;if(!A[z]){var B=u(v,w,i);if(B){if(i.isRowHeaderArea()){T=this.getHeaderTileInfo(i,B.iRow).iStatus;I=true}else if(i.isColHeaderArea()){T=this.getHeaderTileInfo(i,B.iCol).iStatus;I=true}x=this.getPage(B);if(I){if(T===sap.zen.crosstab.paging.PagingConstants.PAGE_STATUS_UNKNOWN){y=true}}else{y=!x}if(y){x=this.createPage(B);x.provideLoadingCells(i);if(!r){r=new sap.zen.crosstab.paging.RequestHandler(this)}r.sendPageRequest(x)}else{if((x&&x.getStatus()===sap.zen.crosstab.paging.PagingConstants.PAGE_STATUS_LOADED)||T&&T===sap.zen.crosstab.paging.PagingConstants.PAGE_STATUS_LOADED){A[z]=true}}}}};this.reset=function(){p={};h={};H=false;if(r){r.reset()}n=true;o={};A={};P=0;a=0};this.getDataHandler=function(){return j};this.getTileRowCnt=function(){return P};this.getTileColCnt=function(){return a};this.getPageKeyFromPos=function(i){return this.getPageKeyFromRowCol(i.iRow,i.iCol)};this.getPageKeyFromRowCol=function(i,v){return i+"/"+v};this.getPagePosFromKey=function(K){var i={};var v=K.split("/");i.iRow=parseInt(v[0],10);i.iCol=parseInt(v[1],10);return i};this.getCrosstab=function(){return c};this.createPage=function(i){var v=null;var w=this.getPageKeyFromPos(i);if(w){v=new sap.zen.crosstab.paging.Page(i,w,this);p[w]=v}return v};this.getPage=function(i){return this.getPageFromRowCol(i.iRow,i.iCol)};this.getPageFromRowCol=function(i,v){var w=null;var x=this.getPageKeyFromRowCol(i,v);if(x){w=p[x]}return w};this.getCellMerger=function(){return C};function s(){return(b===0&&d===0)||!H}function t(J){P=J.tilerows;a=J.tilecols;R=J.scrollaction;b=J.v_pos;if(b){b=Math.floor(b/P)}else{b=0}d=J.h_pos;if(d){d=Math.floor(d/a)}else{d=0}}function u(i,v,w){var x={iRow:0,iCol:0};if(w.isRowHeaderArea()){x.iRow=Math.floor(i/P);x.iCol=Math.floor(c.getColumnHeaderArea().getRenderStartCol()/a)}else if(w.isColHeaderArea()){x.iRow=Math.floor(c.getRowHeaderArea().getRenderStartRow()/P);x.iCol=Math.floor(v/a)}else if(w.isDataArea()){x.iRow=Math.floor(i/P);x.iCol=Math.floor(v/a)}return x}this.getReceivedPages=function(){return JSON.stringify(o)}};