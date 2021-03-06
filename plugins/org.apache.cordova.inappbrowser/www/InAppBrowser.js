/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/
/**
 * NOTE: This file is patched to fix:
 * 1. Add back button event support
 */
var exec = require('cordova/exec');
var channel = require('cordova/channel');
var modulemapper = require('cordova/modulemapper');
var urlutil = require('cordova/urlutil');

function InAppBrowser() {
   this.channels = {
        'loadstart': channel.create('loadstart'),
        'loadstop' : channel.create('loadstop'),
        'loaderror' : channel.create('loaderror'),
        'exit' : channel.create('exit'),
        'backbutton' : channel.create('backbutton') // Patch - Add back button event support
   };
   this._alive = true;
}

InAppBrowser.prototype = {
    _eventHandler: function (event) {
        if (event && event.type in this.channels) {
            this.channels[event.type].fire(event);
        }
    },
    close: function (eventname) {
        if (this._alive) {
            this._alive = false;
            exec(null, null, "InAppBrowser", "close", []);
        }
    },
    show: function (eventname) {
        if (this._alive) {
            exec(null, null, "InAppBrowser", "show", []);
        }
    },
    addEventListener: function (eventname,f) {
        if (eventname in this.channels) {
            this.channels[eventname].subscribe(f);
        }
    },
    removeEventListener: function(eventname, f) {
        if (eventname in this.channels) {
            this.channels[eventname].unsubscribe(f);
        }
    },

    executeScript: function(injectDetails, cb) {
        if (injectDetails.code) {
            exec(cb, null, "InAppBrowser", "injectScriptCode", [injectDetails.code, !!cb]);
        } else if (injectDetails.file) {
            exec(cb, null, "InAppBrowser", "injectScriptFile", [injectDetails.file, !!cb]);
        } else {
            throw new Error('executeScript requires exactly one of code or file to be specified');
        }
    },

    insertCSS: function(injectDetails, cb) {
        if (injectDetails.code) {
            exec(cb, null, "InAppBrowser", "injectStyleCode", [injectDetails.code, !!cb]);
        } else if (injectDetails.file) {
            exec(cb, null, "InAppBrowser", "injectStyleFile", [injectDetails.file, !!cb]);
        } else {
            throw new Error('insertCSS requires exactly one of code or file to be specified');
        }
    }
};

module.exports = function(strUrl, strWindowName, strWindowFeatures) {
    // Don't catch calls that write to existing frames (e.g. named iframes).
    if (window.frames && window.frames[strWindowName]) {
        var origOpenFunc = modulemapper.getOriginalSymbol(window, 'open');
        return origOpenFunc.apply(window, arguments);
    }

    strUrl = urlutil.makeAbsolute(strUrl);
    var iab = new InAppBrowser();
     /** This code is introduce to fix the screen transition issue
       *** 1482026991: Fiori Client: Start Sequence
       *** Discussed about this fix with Raman and other team members
       *** Currently the timeout millisecond is hardcoded and a experimental guess
       ***/
    var isFromLogon = false;
    if (strWindowFeatures.indexOf(",isFromLogon=true") != -1) {
       isFromLogon = true;
       strWindowFeatures = strWindowFeatures.replace(",isFromLogon=true","");
    }
    
    var cb = function(eventname) {
       iab._eventHandler(eventname);
       /** This code is introduce to fix the screen transition issue
       *** 1482026991: Fiori Client: Start Sequence
       *** Discussed about this fix with Raman and other team members
       *** Currently the timeout millisecond is hardcoded and a experimental guess.
       ***/
         var timeoutVal = 0;
         if (isFromLogon == true) {
         		if (device.platform.toLowerCase() == 'Android'.toLowerCase()) {
             		 timeoutVal = 3000;
         		} else if (device.platform.toLowerCase() == 'ios'.toLowerCase()){
              		timeoutVal = 1500;
         		}
       			setTimeout(function(){
                          iab.show();
                          },timeoutVal);
          }
    };
    if (isFromLogon == true) {
    	strWindowFeatures += ",hidden=yes";
    }
    exec(cb, cb, "InAppBrowser", "open", [strUrl, strWindowName, strWindowFeatures]);
    return iab;
};

