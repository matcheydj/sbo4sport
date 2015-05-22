/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.utils.busydialog");jQuery.sap.require("sap.ca.ui.images.images");sap.ca.ui.utils.BUSYDIALOG_TIMEOUT=1500;sap.ca.ui.utils.busydialog=(function(){var B="CA_BusyDialog";var _=null;var a=false;var b=0;var c=null;var d=function(s){if(!_){_=new sap.m.BusyDialog(B)}if(s&&s.text&&typeof s.text==="string"){_.setText(s.text)}if(!a){_.open();a=true}};var e=function(){if(c){jQuery.sap.clearDelayedCall(c);c=null}};var f=function(s){if(b>0){e();c=jQuery.sap.delayedCall(sap.ca.ui.utils.BUSYDIALOG_TIMEOUT,undefined,d,[s])}else{e();if(_){_.close();a=false;_.setText("")}}};return{requireBusyDialog:function(s){b++;f(s)},releaseBusyDialog:function(){b--;if(b<0){jQuery.sap.log.error("busy dialog released more often than required");b=0}f()},destroyBusyDialog:function(){if(_){_.destroy();_=null}}}}());
