// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";jQuery.sap.declare("sap.ushell.services.PageBuilding");jQuery.sap.require("sap.ui2.srvc.factory");jQuery.sap.require("sap.ui2.srvc.page");sap.ushell.services.PageBuilding=function(a,c){this.getFactory=function(){return a.getFactory()};this.getPage=function(p){return a.getFactory().createPage(p)};this.getPageSet=function(i){var d=new jQuery.Deferred();a.getFactory().createPageSet(i,d.resolve.bind(d),d.reject.bind(d));return d.promise()}}}());
