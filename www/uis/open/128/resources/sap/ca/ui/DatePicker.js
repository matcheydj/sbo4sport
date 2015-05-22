/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.DatePicker");jQuery.sap.require("sap.ca.ui.library");jQuery.sap.require("sap.m.InputBase");sap.m.InputBase.extend("sap.ca.ui.DatePicker",{metadata:{deprecated:true,publicMethods:["getDate"],library:"sap.ca.ui",properties:{"firstDayOffset":{type:"int",group:"Data",defaultValue:0},"dateValue":{type:"string",group:"Misc",defaultValue:null}}}});
/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.DatePicker");jQuery.sap.require("sap.me.Calendar");jQuery.sap.require("sap.ca.ui.utils.resourcebundle");jQuery.sap.require("sap.ca.ui.model.type.Date");
sap.ca.ui.DatePicker.prototype.init=function(){if(sap.m.InputBase.prototype.init){sap.m.InputBase.prototype.init.apply(this,arguments)}this.dateObj=null;this._oCalendar=new sap.me.Calendar({firstDayOffset:this.getFirstDayOffset(),tapOnDate:jQuery.proxy(function(e){if(!this._dateType){this._setUpDateType()}var d=e.getParameters().date;this.dateObj=new Date(d);var t=this._dateType.formatValue(d,"string");this.setDateValue(t);this.setProperty("value",t);this._lastValue=t;this.fireChange(false);this._closeCalendar()},this)});this._oCalendar.setEnableMultiselection(false);this._oCalendar.setDayHeight(45);this._datePickerCancelBtn=new sap.m.Button({text:sap.ca.ui.utils.resourcebundle.getText("dialog.cancel"),width:"100%",press:jQuery.proxy(function(){this._closeCalendar()},this)});if(jQuery.device.is.phone){this._oDatePickerDialogMobile=new sap.m.Dialog({title:sap.ca.ui.utils.resourcebundle.getText("datepicker.title"),leftButton:this._datePickerCancelBtn,stretchOnPhone:true,content:[this._oCalendar]})}else{this._oDatePickerPopoverDesktop=new sap.m.ResponsivePopover({title:sap.ca.ui.utils.resourcebundle.getText("datepicker.title"),placement:sap.m.PlacementType.Auto,enableScrolling:false,contentWidth:"20rem",contentHeight:"390px",content:[this._oCalendar]})}this.addStyleClass("sapCaUiDatePicker")};
sap.ca.ui.DatePicker.prototype._setUpDateType=function(){var n=true;var b=this.getBindingInfo("value");if(b){var B=b.type;if(B&&(B instanceof sap.ca.ui.model.type.Date)){this._dateType=B;n=false}}if(n){this._dateType=new sap.ca.ui.model.type.Date()}};
sap.ca.ui.DatePicker.prototype.setValue=function(n){if(n!=this.getValue()){this.dateObj=null}sap.m.InputBase.prototype.setValue.call(this,n)};
sap.ca.ui.DatePicker.prototype.setFirstDayOffset=function(f){this._oCalendar.setProperty("firstDayOffset",f,true);this.setProperty("firstDayOffset",f)};
sap.ca.ui.DatePicker.prototype.fireChange=function(u){if(!this._dateType){this._setUpDateType()}var c=this.getValue();var t=this._validateDate(c);if(u||u===undefined){this.dateObj=t}this.setDateValue(t);var d=null;if(t){d=this._toDateStringYYYYMMDD(t)}this.fireEvent("change",{newValue:c,newYyyymmdd:d,invalidValue:t?false:true});return this};
sap.ca.ui.DatePicker.prototype.exit=function(){if(sap.m.InputBase.prototype.exit){sap.m.InputBase.prototype.exit.apply(this)}if(this._oDatePickerPopoverDesktop){this._oDatePickerPopoverDesktop.destroy()}if(this._oDatePickerDialogMobile){this._oDatePickerDialogMobile.destroy()}if(this._datePickerCancelBtn){this._datePickerCancelBtn.destroy()}if(this._oCalendarIcon){this._oCalendarIcon.destroy()}};
sap.ca.ui.DatePicker.prototype._closeCalendar=function(){if(jQuery.device.is.phone){this._oDatePickerDialogMobile.close()}else{this._oDatePickerPopoverDesktop.close()}};
sap.ca.ui.DatePicker.prototype._getCalendarIcon=function(){if(!this._oCalendarIcon){var u=sap.ui.core.IconPool.getIconURI("appointment-2");this._oCalendarIcon=sap.ui.core.IconPool.createControlByURI({id:this.getId()+"__ci",src:u,press:jQuery.proxy(this._calendarIconPress,this)});this._oCalendarIcon.addStyleClass("sapMInputValHelpInner").addStyleClass("sapCaUiGreyIcon")}if(this.getEnabled()&&this.getEditable()){return this._oCalendarIcon}else return null};
sap.ca.ui.DatePicker.prototype._calendarIconPress=function(){if(this.getEditable()){if(!this._dateType){this._setUpDateType()}var c=this.getValue();var t=this._validateDate(c);this.setProperty("dateValue",t,true);if(t){this.dateObj=t}if(t){this._oCalendar.toggleDatesSelection(this._oCalendar.getSelectedDates(),false);this._oCalendar.setCurrentDate(this.dateObj);this._oCalendar.toggleDatesSelection([this.dateObj],true)}else{this._oCalendar.toggleDatesSelection(this._oCalendar.getSelectedDates(),false)}if(jQuery.device.is.phone){this._oDatePickerDialogMobile.open()}else{this._oDatePickerPopoverDesktop.openBy(this._oCalendarIcon)}}};
sap.ca.ui.DatePicker.prototype._validateDate=function(i){if(!i){return i}var t=null;try{t=this._dateType.parseValue(i,"string")}catch(e){}return t};
sap.ca.ui.DatePicker.prototype._toDateStringYYYYMMDD=function(d){var t=new Date(d);var y=""+t.getFullYear();var m=""+(t.getMonth()+1);var a=""+t.getDate();while(y.length<4){y="0"+y}while(m.length<2){m="0"+m}while(a.length<2){a="0"+a}return y+m+a};
sap.ca.ui.DatePicker.prototype.getDate=function(){return this.dateObj};
