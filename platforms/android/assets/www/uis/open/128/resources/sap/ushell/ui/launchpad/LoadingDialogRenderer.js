// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";jQuery.sap.declare("sap.ushell.ui.launchpad.LoadingDialogRenderer");sap.ushell.ui.launchpad.LoadingDialogRenderer={};sap.ushell.ui.launchpad.LoadingDialogRenderer.render=function(r,c){var t=c.getTooltip_AsString();c._oLabel.addStyleClass("sapUshellLoadingDialogLabel");r.write("<div");r.writeControlData(c);r.addClass("sapUshellLoadingDialogControl sapMBusyDialog sapMCommonDialog");if(sap.ui.Device.system.iphone){r.addClass("sapMDialogHidden")}if(!c._isPlatformDependent){if(!c.getText()&&!c.getTitle()&&!c.getShowCancelButton()){r.addClass("sapMBusyDialogSimple")}}r.writeClasses();if(t){r.writeAttributeEscaped("title",t)}r.write(">");if(c.getTitle()){r.write("<header class=\"sapMDialogTitle\">");r.writeEscaped(c.getTitle());r.write("</header>")}if(jQuery.os.ios||!c._isPlatformDependent){this.renderAppInfo(r,c);this.renderFioriFlower(r,c)}else{this.renderFioriFlower(r,c);this.renderAppInfo(r,c)}if(c.getShowCancelButton()){r.write("<footer class='sapMBusyDialogFooter sapMFooter-CTX'>");r.renderControl(c._oButton);r.write("</footer>")}r.write("</div>")};sap.ushell.ui.launchpad.LoadingDialogRenderer.renderAppInfo=function(r,c){r.write("<div").addClass("sapUshellLoadingDialogAppData").writeClasses().write(">");if(c.getIconUri()){r.renderControl(c.oIcon)}r.renderControl(c._oLabel);r.write("</div>")};sap.ushell.ui.launchpad.LoadingDialogRenderer.renderFioriFlower=function(r,c){var i,R=false,u=[/Android\s4\.2.+GT-I9505.+Chrome\/18/];if(navigator.userAgent){for(i=0;i<u.length;i=i+1){if(u[i].test(navigator.userAgent)){R=true;break}}}if(jQuery.support.cssAnimations&&!R){var b=sap.ui.getCore().getConfiguration().getRTL();r.write("<div id='fiori2-loader'>");r.write("<div class='fiori2-blossom'>");if(!b){for(i=1;i<6;i=i+1){r.write("<div class='fiori2-leafContainer fiori2-leafContainer"+i+"'>");r.write("<div class='fiori2-leaf fiori2-leaf"+i+"'></div>");r.write("</div>")}}else{for(i=1;i<6;i=i+1){r.write("<div class='fiori2-leafContainer fiori2-leafContainer"+i+"'>");r.write("<div class='fiori2-leaf rtlFiori2-leaf"+i+"'></div>");r.write("</div>")}}r.write("</div>");r.write("</div>")}else{r.renderControl(c._busyIndicator)}}}());