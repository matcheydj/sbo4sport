/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','jquery.sap.sjax'],function(q){"use strict";var P=function(){this.mProperties={};this.aKeys=[];};P.prototype.getProperty=function(k,d){var v=this.mProperties[k];if(typeof(v)=="string"){return v;}else if(d){return d;}return null;};P.prototype.getKeys=function(){return this.aKeys;};P.prototype.setProperty=function(k,v){if(typeof(v)!="string"){return;}if(typeof(this.mProperties[k])!="string"){this.aKeys.push(k);}this.mProperties[k]=v;};P.prototype.clone=function(){var c=new P();c.mProperties=q.extend({},this.mProperties);c.aKeys=q.merge([],this.aKeys);return c;};var r=/(?:^|\r\n|\r|\n)[ \t\f]*/;var a=/(\\u[0-9a-fA-F]{0,4})|(\\.)|(\\$)|([ \t\f]*[ \t\f:=][ \t\f]*)/g;var E={'\\f':'\f','\\n':'\n','\\r':'\r','\\t':'\t'};function p(t,o){var l=t.split(r),L,k,v,K,i,m,b;o.mProperties={};o.aKeys=[];for(i=0;i<l.length;i++){L=l[i];if(L===""||L.charAt(0)==="#"||L.charAt(0)==="!"){continue;}a.lastIndex=b=0;v="";K=true;while((m=a.exec(L))!==null){if(b<m.index){v+=L.slice(b,m.index);}b=a.lastIndex;if(m[1]){if(m[1].length!==6){throw new Error("Incomplete Unicode Escape '"+m[1]+"'");}v+=String.fromCharCode(parseInt(m[1].slice(2),16));}else if(m[2]){v+=E[m[2]]||m[2].slice(1);}else if(m[3]){L=l[++i];a.lastIndex=b=0;}else if(m[4]){if(K){K=false;k=v;v="";}else{v+=m[4];}}}if(b<L.length){v+=L.slice(b);}if(K){k=v;v="";}o.aKeys.push(k);o.mProperties[k]=v;}q.sap.unique(o.aKeys);}q.sap.properties=function properties(m){m=q.extend({url:undefined,headers:{}},m);var A=!!m.async,o=new P();function _(t){if(typeof(t)=="string"){p(t,o);}}function b(){var R;if(typeof(m.url)=="string"){R=q.sap.loadResource({url:m.url,dataType:'text',headers:m.headers,failOnError:false,async:A});}return R;}if(A){return new window.Promise(function(c,d){var R=b();if(!R){c(o);return;}R.then(function(v){try{_(v);c(o);}catch(e){d(e);}},function(v){d(v instanceof Error?v:new Error("Problem during loading of property file '"+m.url+"': "+v));});});}else{_(b());return o;}};return q;},false);
