"use strict";jQuery.sap.require('sap.portal.ui5.core.Collection');jQuery.sap.declare('sap.portal.ui5.core.ComponentCollection');sap.portal.ui5.core.Collection.extend('sap.portal.ui5.core.ComponentCollection',{metadata:{properties:{castItems:{type:'boolean',defaultValue:true},itemType:{type:'string',defaultValue:'sap.portal.ui5.core.Component'},autoDestroyItems:{type:'boolean',defaultValue:true}}},applyMethod:function applyMethod(m,a){var c=this.aCollection,i,I,l=c.length,r=[];for(i=0;i<l;i++){I=c[i];r.push(I[m].apply(I,a?a:[]))}return r},getByComponentId:function getByComponentId(i,r){var c=this.aCollection,I,l=c.length;for(I=0;I<l;I++){if(c[I].getComponentId()===i){return c[I]}}if(r){var R;for(I=0;I<l;I++){R=c[I].getChildByComponentId(i,true);if(R){return R}}}}});
