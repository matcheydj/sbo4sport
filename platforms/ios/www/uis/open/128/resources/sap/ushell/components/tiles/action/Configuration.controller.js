// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";jQuery.sap.require("sap.ushell.components.tiles.utils");sap.ui.controller("sap.ushell.components.tiles.action.Configuration",{sEnterValuePlaceHolder:"",sDuplicateErrorMsg:"",sDuplicateErrorTitle:"",sInvalidParmMsg:"",aDefaultObjects:[{obj:"",name:""},{obj:"*",name:"*"}],onConfigurationInputChange:function(c){sap.ushell.components.tiles.utils.checkTMInput(this.getView(),c)},onInit:function(){var v=this.getView(),s=v.byId("semantic_objectInput"),r=sap.ushell.components.tiles.utils.getResourceBundleModel();v.setModel(r,"i18n");v.setViewName("sap.ushell.components.tiles.action.Configuration");sap.ushell.components.tiles.utils.createSemanticObjectModel(this,s,this.aDefaultObjects);s.attachChange(function(c){var V=c.getSource().getValue();v.getModel().setProperty("/config/semantic_object",V)});var b=r.getResourceBundle();this.sEnterValuePlaceHolder=b.getText("configuration.signature.table.valueFieldLbl");this.sDuplicateErrorMsg=b.getText("configuration.signature.uniqueParamMessage.text");this.sDuplicateErrorTitle=b.getText("configuration.signature.uniqueParamMessage.title");this.sInvalidParmMsg=b.getText("configuration.signature.invalidParamMessage.text")},handleMandatoryChange:function(m){var i=m.getParameter('id');var p=sap.ui.getCore().byId(i).getParent().getCells();var I=m.getParameter('checked');if(I){p[2].setEnabled(true);p[2].setPlaceholder(this.sEnterValuePlaceHolder);p[4].setEnabled(false);p[4].setValue("");p[4].setPlaceholder("");p[3].setEnabled(true)}else{p[2].setEnabled(false);p[2].setValue("");p[2].setPlaceholder("");p[4].setEnabled(true);p[4].setPlaceholder(this.sEnterValuePlaceHolder);p[3].setEnabled(false);p[3].setChecked(false)}},addRow:function(){var v=this.getView();var m=v.getModel();var r=m.getProperty('/config/rows');var n=sap.ushell.components.tiles.utils.getEmptyRowObj();r.push(n);m.setProperty('/config/rows',r)},deleteRow:function(){var v=this.getView();var m=v.getModel();var r=m.getProperty('/config/rows');var t=v.byId("mappingSignatureTable");var s=t.getSelectedIndices();var S=s.sort(function(a,b){return b-a}).slice();for(var i=0;i<S.length;i++){t.removeSelectionInterval(S[i],S[i]);r.splice(S[i],1)}m.setProperty('/config/rows',r)},checkDuplicateNames:function(c){var m=this.getView().getModel();var r=m.getProperty('/config/rows');var n=sap.ui.getCore().byId(c.getParameter('id'));var N=c.getParameter('newValue');if(N!=""&&!(/^[-/\w]+$/.test(N))){n.setValueState(sap.ui.core.ValueState.Error);sap.m.MessageBox.alert(this.sInvalidParmMsg,this.focusNameField.bind(n),this.sDuplicateErrorTitle)}if(sap.ushell.components.tiles.utils.tableHasDuplicateParameterNames(r)){n.setValueState(sap.ui.core.ValueState.Error);sap.m.MessageBox.alert(this.sDuplicateErrorMsg,this.focusNameField.bind(n),this.sDuplicateErrorTitle)}else{n.setValueState(sap.ui.core.ValueState.None)}},focusNameField:function(){this.focus()},onValueHelpRequest:function(e){sap.ushell.components.tiles.utils.objectSelectOnValueHelpRequest(this,e)},onFormFactorChange:function(){var m=this.getView().getModel();m.setProperty('/config/formFactorConfigDefault',false)},onApplicationTypeChange:function(e){sap.ushell.components.tiles.utils.displayApplicationTypeFields(this.getView())}})}());
