/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");jQuery.sap.require("sap.ca.ui.images.images");sap.ca.scfld.md.controller.BaseDetailController.extend("sap.ca.scfld.md.view.empty",{onInit:function(){var i=this.byId("flower");if(i){i.setSrc(sap.ca.ui.images.images.Flower)}var l=document.createElement('link');l.setAttribute('rel','stylesheet');l.setAttribute('type','text/css');l.setAttribute('href','resources/sap/ca/scfld/md/css/flower.css');l.setAttribute('id','emptyView_stylesheet');document.getElementsByTagName('head')[0].appendChild(l);this.getView().addEventDelegate(this,this);this.getView().addEventDelegate({onBeforeShow:jQuery.proxy(function(e){if(e.data&&(e.data.viewTitle||e.data.languageKey||e.data.infoText)){this.setTitleAndMessage(e.data.viewTitle,e.data.languageKey,e.data.infoText)}},this)});this.oRouter.attachRouteMatched(function(e){if(e.getParameter("name")==="noData"){var a=e.getParameter("arguments");this.setTitleAndMessage(a.viewTitle,a.languageKey)}},this)},setTitleAndMessage:function(v,l,i){var p=this.byId("sap.ca.scfld.md.view.empty");var t=this.oApplicationFacade.oApplicationImplementation.getResourceBundle().getText(v);if(!t||t===v){if(!i){t=this.oApplicationFacade.oApplicationImplementation.getUiLibResourceBundle().getText(this.oApplicationFacade.oApplicationImplementation.oConfiguration.getDefaultEmptyMessageKey())}else{t=i}};p.setTitle(t);var L=this.byId("emptyLabel");if(!i){var m=this.oApplicationFacade.oApplicationImplementation.getResourceBundle().getText(l);if(!m||m===l){m=this.oApplicationFacade.oApplicationImplementation.getUiLibResourceBundle().getText(this.oApplicationFacade.oApplicationImplementation.oConfiguration.getDefaultEmptyMessageKey())};L.setText(m)}else{L.setText(i)}}});
