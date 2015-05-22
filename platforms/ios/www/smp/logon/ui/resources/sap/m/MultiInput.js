/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.m.MultiInput");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.m.Input");sap.m.Input.extend("sap.m.MultiInput",{metadata:{library:"sap.m",aggregations:{"tokens":{type:"sap.m.Token",multiple:true,singularName:"token"},"tokenizer":{type:"sap.m.Tokenizer",multiple:false,visibility:"hidden"}},events:{"tokenChange":{}}}});sap.m.MultiInput.M_EVENTS={'tokenChange':'tokenChange'};jQuery.sap.require("sap.ui.core.Item");jQuery.sap.require("sap.m.Token");
sap.m.MultiInput.prototype.init=function(){var t=this;sap.m.Input.prototype.init.call(this);this._bIsValidating=false;this._tokenizer=new sap.m.Tokenizer();this.setAggregation("tokenizer",this._tokenizer);this._tokenizer.attachTokenChange(function(a){t.fireTokenChange(a.getParameters());t.invalidate();t._setContainerSizes();if(a.getParameter("type")==="tokensChanged"&&a.getParameter("removedTokens").length>0){t.focus()}});this.setShowValueHelp(true);this.setShowSuggestion(true);this.addStyleClass("sapMMultiInput");this.attachSuggestionItemSelected(function(e){var i=null;var a=null;if(this._hasTabularSuggestions()){i=e.getParameter("selectedRow")}else{i=e.getParameter("selectedItem");if(i){a=new sap.m.Token({text:i.getText(),key:i.getKey()})}}if(i){var b=this.getValue();t._tokenizer.addValidateToken({text:b,token:a,suggestionObject:i,validationCallback:function(v){if(v){t.setValue("")}}})}});this.attachLiveChange(function(e){t._tokenizer.removeSelectedTokens();t._setContainerSizes()});sap.ui.Device.orientation.attachHandler(this._onOrientationChange,this);if(this._tokenizer._bDoTouchScroll&&this._oSuggestionPopup){this._oSuggestionPopup.attachAfterClose(function(){setTimeout(function(){t.setValue("");t._tokenizer.scrollToEnd()},0)})}};
sap.m.MultiInput.prototype._onOrientationChange=function(){this._setContainerSizes()};
sap.m.MultiInput.prototype.getScrollDelegate=function(){return this._tokenizer._oScroller};
sap.m.MultiInput.prototype.exit=function(){if(this._sResizeHandlerId){sap.ui.core.ResizeHandler.deregister(this._sResizeHandlerId);delete this._sResizeHandlerId}};
sap.m.MultiInput.prototype._setContainerSizes=function(){var t=this.getDomRef();if(!t){return}var $=this.$();jQuery($.find(".sapMInputBaseInner")[0]).removeAttr("style");var a=$.find(".sapMMultiInputBorder").width();var s=$.children(".sapMMultiInputShadowDiv")[0];jQuery(s).text(this.getValue());var i=jQuery(s).width();var b=this._tokenizer.getScrollWidth();var c=$.find(".sapMInputValHelp").outerWidth(true);var d=b+i+c;var e;var f=1;if(d<a){e=i+a-d}else{e=i+f;b=a-e-c}jQuery($.find(".sapMInputBaseInner")[0]).css("width",e+"px");this._tokenizer.setPixelWidth(b);if(this.getPlaceholder()){this._sPlaceholder=this.getPlaceholder()}if(this.getTokens().length>0){this.setPlaceholder("")}else{this.setPlaceholder(this._sPlaceholder)}};
sap.m.MultiInput.prototype.onAfterRendering=function(){var t=this;sap.m.Input.prototype.onAfterRendering.apply(this,arguments);this._setContainerSizes();this._sResizeHandlerId=sap.ui.core.ResizeHandler.register(this.getDomRef(),function(){t._setContainerSizes()})};
sap.m.MultiInput.prototype.addValidator=function(v){this._tokenizer.addValidator(v)};
sap.m.MultiInput.prototype.removeValidator=function(v){this._tokenizer.removeValidator(v)};
sap.m.MultiInput.prototype.removeAllValidators=function(){this._tokenizer.removeAllValidators()};
sap.m.MultiInput.prototype.onsapnext=function(e){if(e.isMarked()){return}var f=jQuery(document.activeElement).control()[0];if(!f){return}if(this._tokenizer===f||this._tokenizer.$().find(f.$()).length>0){this._scrollAndFocus()}};
sap.m.MultiInput.prototype.onsapbackspace=function(e){if(this.getCursorPosition()>0||!this.getEditable()||this.getValue().length>0){return}sap.m.Tokenizer.prototype.onsapbackspace.apply(this._tokenizer,arguments);e.preventDefault();e.stopPropagation()};
sap.m.MultiInput.prototype.onsapdelete=function(e){if(!this.getEditable()){return}if(this.getValue()&&!this._completeTextIsSelected()){return}sap.m.Tokenizer.prototype.onsapdelete.apply(this._tokenizer,arguments)};
sap.m.MultiInput.prototype.onkeydown=function(e){if(this.getValue().length===0){if((e.ctrlKey||e.metaKey)&&e.which===jQuery.sap.KeyCodes.A){this._tokenizer.focus();this._tokenizer.selectAllTokens(true);e.preventDefault()}}};
sap.m.MultiInput.prototype.onsapprevious=function(e){if(this._getIsSuggestionPopupOpen()){return}if(this.getCursorPosition()===0){if(e.srcControl===this){sap.m.Tokenizer.prototype.onsapprevious.apply(this._tokenizer,arguments);e.preventDefault()}}};
sap.m.MultiInput.prototype._scrollAndFocus=function(){this._tokenizer.scrollToEnd();this.$().find("input").focus()};
sap.m.MultiInput.prototype.onsaphome=function(e){sap.m.Tokenizer.prototype.onsaphome.apply(this._tokenizer,arguments)};
sap.m.MultiInput.prototype.onsapend=function(e){sap.m.Tokenizer.prototype.onsapend.apply(this._tokenizer,arguments);e.preventDefault()};
sap.m.MultiInput.prototype.onsapenter=function(e){if(sap.m.Input.prototype.onsapenter){sap.m.Input.prototype.onsapenter.apply(this,arguments)}this._validateCurrentText()};
sap.m.MultiInput.prototype.onsapfocusleave=function(e){var p=this._oSuggestionPopup;var n=false;var N=false;if(p instanceof sap.m.Popover){if(e.relatedControlId){n=jQuery.sap.containsOrEquals(p.getFocusDomRef(),sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef());N=jQuery.sap.containsOrEquals(this._tokenizer.getFocusDomRef(),sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef())}}if(!N&&!n){this._setContainerSizes();this._tokenizer.scrollToEnd()}if(this._bIsValidating){if(sap.m.Input.prototype.onsapfocusleave){sap.m.Input.prototype.onsapfocusleave.apply(this,arguments)}return}if(sap.m.Input.prototype.onsapfocusleave){sap.m.Input.prototype.onsapfocusleave.apply(this,arguments)}if(!n&&e.relatedControlId!==this.getId()&&e.relatedControlId!==this._tokenizer.getId()&&!N){if(this._completeTextIsSelected()){this._validateCurrentText()}}};
sap.m.MultiInput.prototype._validateCurrentText=function(){var t=this.getValue();if(!t||!this.getEditable()){return}t=t.trim();if(!t){return}var i=null;if(this._getIsSuggestionPopupOpen()){i=this._getSuggestionItem(t)}var a=null;if(i&&i.getText&&i.getKey){a=new sap.m.Token({text:i.getText(),key:i.getKey()})}var b=this;this._bIsValidating=true;this._tokenizer.addValidateToken({text:t,token:a,suggestionObject:i,validationCallback:function(v){b._bIsValidating=false;if(v){b.setValue("")}}})};
sap.m.MultiInput.prototype.getCursorPosition=function(){return this._$input.cursorPos()};
sap.m.MultiInput.prototype._completeTextIsSelected=function(){var i=this._$input[0];if(i.selectionStart!==0){return false}if(i.selectionEnd!==this.getValue().length){return false}return true};
sap.m.MultiInput.prototype._selectAllInputText=function(){var i=this._$input[0];i.selectionStart=0;i.selectionEnd=this.getValue().length;return this};
sap.m.MultiInput.prototype._getIsSuggestionPopupOpen=function(){return this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()};
sap.m.MultiInput.prototype.setEditable=function(e){if(e===this.getEditable()){return this}if(sap.m.Input.prototype.setEditable){sap.m.Input.prototype.setEditable.apply(this,arguments)}this._tokenizer.setEditable(e);if(e){this.removeStyleClass("sapMMultiInputNotEditable")}else{this.addStyleClass("sapMMultiInputNotEditable")}return this};
sap.m.MultiInput.prototype._findItem=function(t,I,g){if(!t){return}if(!(I&&I.length)){return}t=t.toLowerCase();var l=I.length;for(var i=0;i<l;i++){var a=I[i];var c=g(a);if(!c){continue}c=c.toLowerCase();if(c.indexOf(t)===0){return a}}};
sap.m.MultiInput.prototype._getSuggestionItem=function(t){var a=null;var b=null;if(this._hasTabularSuggestions()){a=this.getSuggestionRows();b=this._findItem(t,a,function(r){var c=r.getCells();var f=null;if(c){var i;for(i=0;i<c.length;i++)if(c[i].getText){f=c[i].getText();break}}return f})}else{a=this.getSuggestionItems();b=this._findItem(t,a,function(b){return b.getText()})}return b};
sap.m.MultiInput.prototype.addToken=function(t){return this._tokenizer.addToken(t)};
sap.m.MultiInput.prototype.removeToken=function(t){return this._tokenizer.removeToken(t)};
sap.m.MultiInput.prototype.removeAllTokens=function(){return this._tokenizer.removeAllTokens()};
sap.m.MultiInput.prototype.getTokens=function(){return this._tokenizer.getTokens()};
sap.m.MultiInput.prototype.setTokens=function(t){this._tokenizer.setTokens(t)};
sap.m.MultiInput.TokenChangeType={Added:"added",Removed:"removed",RemovedAll:"removedAll"};sap.m.MultiInput.WaitForAsyncValidation="sap.m.Tokenizer.WaitForAsyncValidation";
