(function(){"use strict";jQuery.sap.require("sap.ushell.components.factsheet.tools.ODataUrlTemplating");sap.ui.jsview("sap.ushell.components.factsheet.views.ThingViewer",{getControllerName:function(){return"sap.ushell.components.factsheet.views.ThingViewer"},createContent:function(c){var e,a,E,t,v;v=this.getViewData();jQuery.sap.require("sap.ushell.components.factsheet.factory.ThingInspector");e=v.entity||v.service;if(!e){E=v.entityTemplateURI||v.template;if(E){if(typeof E!=="string"){E=E[0]}E=E.replace(/%25/g,"%");E=E.replace(/%28/g,"(");E=E.replace(/%29/g,")");E=E.replace(/%27/g,"'");E=E.replace(/%3D/g,"=");E=E.replace(/%7B/g,"{");E=E.replace(/%7D/g,"}");e=sap.ushell.components.factsheet.tools.ODataUrlTemplating.resolve(E,v)}}a=v.annotationURI||v.annotation;if(typeof e!=="string"){e=e[0]}if(typeof a!=="string"){a=a[0]}if(v["sap-system"]&&v["sap-system"][0]&&(v["sap-system"][0].substr(0,4)==="sid(")){e=e.substr(0,e.lastIndexOf("/"))+";o="+e.substr(e.lastIndexOf("/"));e=sap.ushell.Container.getService("URLParsing").addSystemToServiceUrl(e)}t=sap.ushell.components.factsheet.factory.ThingInspector(e,a);t.addStyleClass("ThingInspector");return t}})}());
