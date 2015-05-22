/*
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.suite.ui.commons.ProcessFlowRenderer");jQuery.sap.require("sap.suite.ui.commons.ProcessFlowLaneHeader");sap.suite.ui.commons.ProcessFlowRenderer={};
sap.suite.ui.commons.ProcessFlowRenderer.render=function(r,c){var s=this.getZoomStyleClass(c),i,j,n,m,N,o,a,b,d,e,l,D;r.write("<div");r.writeControlData(c);r.addClass("sapSuiteUiScrollContainerPF");r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-scroll-content");r.write(">");if(!c.getLanes()||c.getLanes().length==0){r.write("</div>");r.write("</div>");return}try{b=c._getOrCreateProcessFlow();d=c._getOrCreateLaneMap()}catch(f){c._handleException(f);return}r.write("<span tabindex=0 ");r.writeAttribute("id",c.getId()+"-KbInteractionFakeElement");r.addClass("sapSuiteUiKbInteractionFakeElementPF");r.write("></span>");r.write("<table");r.writeAttribute("id",c.getId()+"-table");r.addClass("sapSuiteUiCommonsPF");r.addClass(s);r.writeClasses();r.write(">");e=Object.keys(d).length;r.write("<thead");r.writeAttribute("id",c.getId()+"-thead");r.write(">");r.write("<tr");r.addClass("sapSuiteUiCommonsPFHeader");r.addClass("sapSuiteUiCommonsPFHeaderHidden");r.writeClasses();r.write(">");r.write("<th></th>");i=0;while(i<e-1){r.write("<th></th><th></th><th></th><th></th><th></th>");i++}r.write("<th></th><th></th><th></th>");r.write("<th></th>");r.write("</tr>");r.write("<tr");r.addClass("sapSuiteUiCommonsPFHeaderRow");r.writeClasses();r.write(">");r.write("<th>");l=sap.suite.ui.commons.ProcessFlowLaneHeader.createNewStartSymbol(c._isHeaderMode());r.renderControl(l);r.write("</th>");i=0;var g=0;var h=[];D=false;while(i<(e-1)){var p=1;N=d[i];o=d[i+1];if(N.getLaneId()+p==o.getLaneId()){g=g+1;h.push(N.getState())}else{if(g==0){this._renderNormalNode(r,c,N,i,e)}else{h.push(N.getState());D=true;this._renderMergedNode(r,c,N,g,h,D);h=[];g=0}}i++}if(g==0){this._renderNormalNode(r,c,o,i,e)}else{h.push(o.getState());D=false;this._renderMergedNode(r,c,N,g,h,D);g=0}r.write("<th>");l=sap.suite.ui.commons.ProcessFlowLaneHeader.createNewEndSymbol(c._isHeaderMode());r.renderControl(l);r.write("</th>");r.write("</tr>");r.write("</thead>");r.write("<tbody>");m=b.length;if(m>0){r.write("<tr>");r.write("<td colspan=\""+(e*5).toString()+"\"></td>");r.write("</tr>")}i=0;while(i<m){r.write("<tr>");r.write("<td></td>");n=b[i].length;j=0;while(j<n-1){N=b[i][j];if((j==0)||(j%2)){r.write("<td>")}else{r.write("<td colspan=\"4\">")}if(N){if(N instanceof sap.suite.ui.commons.ProcessFlowNode){N._setParentFlow(c);N._setZoomLevel(c.getZoomLevel());N._setFoldedCorner(c.getFoldedCorners());r.renderControl(N)}else{N.setZoomLevel(c.getZoomLevel());c.addAggregation("connections",N);r.renderControl(N)}}r.write("</td>");j++}r.write("<td></td>");r.write("<td></td>");r.write("</tr>");i++}r.write("</tbody>");r.write("</table>");r.write("</div>");r.write("</div>")};
sap.suite.ui.commons.ProcessFlowRenderer.getZoomStyleClass=function(c){var s="";switch(c.getZoomLevel()){case sap.suite.ui.commons.ProcessFlowZoomLevel.One:s="sapSuiteUiCommonsPFZoomLevel1";break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Two:s="sapSuiteUiCommonsPFZoomLevel2";break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Three:s="sapSuiteUiCommonsPFZoomLevel3";break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Four:s="sapSuiteUiCommonsPFZoomLevel4";break}return s};
sap.suite.ui.commons.ProcessFlowRenderer._renderNormalNode=function(r,c,n,i,a){r.write("<th colspan=\"3\">");r.renderControl(n);r.write("</th>");if(i<a-1){r.write("<th colspan=\"2\">");var l=sap.suite.ui.commons.ProcessFlowLaneHeader.createNewProcessSymbol(c._isHeaderMode());l.attachPress(jQuery.proxy(c.ontouchend,c));r.renderControl(l);r.write("</th>")}};
sap.suite.ui.commons.ProcessFlowRenderer._renderMergedNode=function(r,c,n,a,l,d){var N=c._mergeLaneIdNodeStates(l);n.setState(N);a++;var b=a*3+(a-1)*2;r.write("<th colspan=\""+b+"\">");r.renderControl(n);r.write("</th>");if(d){r.write("<th colspan=\"2\">");var L=sap.suite.ui.commons.ProcessFlowLaneHeader.createNewProcessSymbol(c._isHeaderMode());L.attachPress(jQuery.proxy(c.ontouchend,c));r.renderControl(L);r.write("</th>")}};
