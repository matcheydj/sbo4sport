// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";jQuery.sap.require("sap.ushell.components.tiles.utils");sap.ui.controller("sap.ushell.components.tiles.applauncherdynamic.Configuration",{onConfigurationInputChange:function(c){sap.ushell.components.tiles.utils.checkInput(this.getView(),c)},aDefaultObjects:[{obj:"",name:""}],onInit:function(){var v=this.getView(),s=v.byId("navigation_semantic_objectInput"),r=sap.ushell.components.tiles.utils.getResourceBundleModel();v.setModel(r,"i18n");v.setViewName("sap.ushell.components.tiles.applauncherdynamic.Configuration");sap.ushell.components.tiles.utils.createSemanticObjectModel(this,s,this.aDefaultObjects);s.attachChange(function(c){var V=c.getSource().getValue();v.getModel().setProperty("/config/navigation_semantic_object",V)});v.byId("targetUrl").bindProperty("enabled",{formatter:function(u){return!u},path:"/config/navigation_use_semantic_object"})},onAfterRendering:function(){sap.ushell.components.tiles.utils.updateTooltipForDisabledProperties(this.getView())},onValueHelpRequest:function(e){sap.ushell.components.tiles.utils.objectSelectOnValueHelpRequest(this,e)},onCheckBoxChange:function(e){var v=this.getView(),s=v.byId("navigation_semantic_objectInput"),m=s.getModel(),a=e.getSource().getSelected();m.setProperty("/enabled",a)},onIconValueHelpRequest:function(e){sap.ushell.components.tiles.utils.iconSelectOnValueHelpRequest(this,e)},onSelectIconClose:function(){sap.ushell.components.tiles.utils.onSelectIconClose(this.getView())},onSelectIconOk:function(){sap.ushell.components.tiles.utils.onSelectIconOk(this.getView())}})}());