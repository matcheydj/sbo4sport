// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";jQuery.sap.declare("sap.ushell.System");sap.ushell.System=function(d){this.getAlias=function(){return d.alias};this.getBaseUrl=function(){return d.baseUrl};this.getClient=function(){return d.client};this.getName=function(){return d.system};this.getPlatform=function(){return d.platform};this.adjustUrl=function(u){if(u.indexOf('/')!==0||u==='/'){throw new Error("Invalid URL: "+u)}if(d.baseUrl===";o="){if(d.alias){u=u+";o="+d.alias}}else if(d.baseUrl){u=d.baseUrl.replace(/\/$/,"")+u}if(d.client){u+=(u.indexOf("?")>=0?"&":"?")+"sap-client="+d.client}return u};this.toString=function(){return JSON.stringify(d)}}}());
