jQuery.sap.declare("sap.zen.crosstab.paging.CellMerger");jQuery.sap.require("sap.zen.crosstab.paging.PagingConstants");
sap.zen.crosstab.paging.CellMerger=function(p){"use strict";var r=null;var c=null;this.mergeRowHeaderCells=function(P){r=p.getCrosstab().getRowHeaderArea();var C=0;var M=null;for(C=0;C<r.getColCnt();C++){M=d(P,C);if(M){b(M,P,C)}M=a(P,C);if(M){m(M,P,C)}}};function m(M,P,C){var l=P-1;var o=null;var u=null;var R=null;var n=0;var q=M.getRowSpan();var s=p.getHeaderTileInfo(r,l).iStatus;while(s===sap.zen.crosstab.paging.PagingConstants.PAGE_STATUS_LOADED&&l>=0&&!u){R=g(l);for(n=R.iMaxRowIndex;n>=R.iMinRowIndex&&!u;n--){o=r.getCellDirect(n,C);if(o){if(o.getMergeKey()){if(M.getMergeKey()===o.getMergeKey()){if(n===R.iMaxRowIndex||o.getRowSpan()>1){u=o}else{return}}else{return}}}}l--;s=p.getHeaderTileInfo(r,l).iStatus}if(u){k(M,u);u.setRowSpan(q+u.getRowSpan());r.insertCell(null,M.getRow(),M.getCol())}}function g(P){var R={};R.iMinRowIndex=P*p.getTileRowCnt();R.iMaxRowIndex=(P+1)*p.getTileRowCnt()-1;R.iMaxRowIndex=Math.min(R.iMaxRowIndex,r.getRowCnt()-1);return R}function a(P,C){var t=null;var I=g(P);var R=0;var o=null;var M="";for(R=I.iMinRowIndex;R<=I.iMaxRowIndex&&!t;R++){o=r.getCellDirect(R,C);if(o){M=o.getMergeKey();if(M){t=o}}}return t}function b(M,P,C){var o=null;var F=0;var s="";var I=null;var S=p.getHeaderTileInfo(r,P+1).iStatus;if(S===sap.zen.crosstab.paging.PagingConstants.PAGE_STATUS_LOADED){I=g(P+1);o=r.getCellDirect(I.iMinRowIndex,C);if(o){s=o.getMergeKey();if(s&&s===M.getMergeKey()){F=o.getRowSpan();r.insertCell(null,I.iMinRowIndex,C);k(o,M)}}}if(F){M.setRowSpan(M.getRowSpan()+F)}}function d(P,C){var B=null;var I=g(P);var R=0;var M="";var o=null;for(R=I.iMaxRowIndex;R>=I.iMinRowIndex&&!B;R--){o=r.getCellDirect(R,C);if(o){M=o.getMergeKey();if(M){B=o}}}return B}this.mergeColHeaderCells=function(P){c=p.getCrosstab().getColumnHeaderArea();var R=0;var M=null;for(R=0;R<c.getRowCnt();R++){M=h(P,R);if(M){f(M,P,R)}M=i(P,R);if(M){j(M,P,R)}}};function e(P){var C={};C.iMinColIndex=P*p.getTileColCnt();C.iMaxColIndex=(P+1)*p.getTileColCnt()-1;C.iMaxColIndex=Math.min(C.iMaxColIndex,c.getColCnt()-1);return C}function f(M,P,R){var C=null;var F=0;var s="";var I=null;var S=p.getHeaderTileInfo(c,P+1).iStatus;if(S===sap.zen.crosstab.paging.PagingConstants.PAGE_STATUS_LOADED){I=e(P+1);C=c.getCellDirect(R,I.iMinColIndex);if(C){s=C.getMergeKey();if(s&&s===M.getMergeKey()){F=C.getColSpan();c.insertCell(null,R,I.iMinColIndex);k(C,M)}}}if(F){M.setColSpan(M.getColSpan()+F)}}function h(P,R){var o=null;var I=e(P);var C=0;var M="";var l=null;for(C=I.iMaxColIndex;C>=I.iMinColIndex&&!o;C--){l=c.getCellDirect(R,C);if(l){M=l.getMergeKey();if(M){o=l}}}return o}function i(P,R){var l=null;var I=e(P);var C=0;var o=null;var M="";for(C=I.iMinColIndex;C<=I.iMaxColIndex&&!l;C++){o=c.getCellDirect(R,C);if(o){M=o.getMergeKey();if(M){l=o}}}return l}function j(M,P,R){var C=P-1;var o=null;var l=null;var n=null;var q=0;var s=M.getColSpan();var S=p.getHeaderTileInfo(c,C).iStatus;while(S===sap.zen.crosstab.paging.PagingConstants.PAGE_STATUS_LOADED&&C>=0&&!l){n=e(C);for(q=n.iMaxColIndex;q>=n.iMinColIndex&&!l;q--){o=c.getCellDirect(R,q);if(o){if(o.getMergeKey()){if(M.getMergeKey()===o.getMergeKey()){if(q===n.iMaxColIndex||o.getColSpan()>1){l=o}else{return}}else{return}}}}C--;S=p.getHeaderTileInfo(c,C).iStatus}if(l){k(M,l);l.setColSpan(s+l.getColSpan());c.insertCell(null,M.getRow(),M.getCol())}}function k(s,t){var S=s.getStyleIdList();t.setStyleIdList(S)}};
