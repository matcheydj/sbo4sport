"use strict";jQuery.sap.require('sap.portal.ui5.core.Object');jQuery.sap.require('sap.portal.ui5.core.PropertyObserver');jQuery.sap.require('sap.portal.ui5.core.ComponentManager');jQuery.sap.require('sap.portal.ui5.core.View');jQuery.sap.require('sap.portal.ui5.core.LayoutData');jQuery.sap.declare('sap.portal.ui5.core.Component');sap.portal.ui5.core.Object.extend('sap.portal.ui5.core.Component',{metadata:{properties:{componentId:{type:'any',defaultValue:null},placeAt:{type:'any',defaultValue:null},layout:{type:'any',defaultValue:null},layoutData:{type:'any',defaultValue:null},view:{type:'any',defaultValue:null},componentModel:{type:'any',defaultValue:null},childComponents:{type:'any',defaultValue:{}},componentModelClass:{type:'string',defaultValue:'Object'},childComponentsClass:{type:'string',defaultValue:'sap.portal.ui5.core.ComponentCollection'},layoutClass:{type:'string',defaultValue:'sap.portal.ui5.core.LayoutInterface'},layoutDataClass:{type:'string',defaultValue:'sap.portal.ui5.core.LayoutData'},viewClass:{type:'string',defaultValue:'sap.portal.ui5.core.View'}},events:{beforeUnrender:{},unrender:{},beforeRender:{},render:{},beforeLayout:{},layout:{},beforeReflow:{},reflow:{}}},renderViewPromise:null,layoutChildComponentsPromise:null,layoutChildComponentsSuspended:0,_oOldPlaceAt:null,unrenderViewPromise:null,setPlaceAt:function setPlaceAt(v){this.setProperty('placeAt',v);if(v===null){return this.unrenderViewPromise?this.unrenderViewPromise.oPromise:null}else{return this.renderViewPromise?this.renderViewPromise.oPromise:null}},setView:function setView(v){var r=this.renderViewPromise,l=this.layoutChildComponentsPromise;if(r&&r.bInUse&&r.state()==='pending'){r.reject()}if(l&&l.bInUse&&l.state()==='pending'){l.reject()}this.setProperty('view',v);return this.renderViewPromise?this.renderViewPromise.oPromise:null},_registerInComponentManager:sap.portal.ui5.core.PropertyObserver(['componentId'],function registerInComponentManager(k,c,o,O){if(o===null){if(c===null||c===''){c=this.getId()}O.updatePropertyValue(c)}else{this.unregisterInComponentManager(o)}sap.portal.ui5.core.ComponentManager.registerComponent(c,this)}).callOnInit(),_processViewClass:sap.portal.ui5.core.PropertyObserver(['viewClass','view'],function processViewClass(k,v,o,O){var p='view';var a=this.getProperty(p),i=this.getProperty(p+'Class');if(a===null){return}if(jQuery.isPlainObject(a)){a=sap.portal.ui5.core.Object.factoryUCTypeObject(a,i);O.updatePropertyValue(a,p)}else if(i&&!sap.portal.ui5.core.Object.isInstanceOf(a,i)){throw new Error('Interface mismatch')}}).callOnInit(),_processChildComponentsClass:sap.portal.ui5.core.PropertyObserver(['childComponentsClass','childComponents'],function processChildComponentsClass(k,v,o,O){var p='childComponents';var a=this.getProperty(p),i=this.getProperty(p+'Class');if(jQuery.isArray(a)){a={items:a}}if(jQuery.isPlainObject(a)){a=sap.portal.ui5.core.Object.factoryUCTypeObject(a,i);O.updatePropertyValue(a,p)}else if(i&&!sap.portal.ui5.core.Object.isInstanceOf(a,i)){throw new Error('Interface mismatch')}}).callOnInit(),_processComponentModelClass:sap.portal.ui5.core.PropertyObserver(['componentModelClass','componentModel'],function processComponentModelClass(k,v,o,O){var p='componentModel';var a=this.getProperty(p),i=this.getProperty(p+'Class');if(a===null){return}if(jQuery.isPlainObject(a)){a=sap.portal.ui5.core.Object.factoryUCTypeObject(a,i);O.updatePropertyValue(a,p)}else if(i&&!sap.portal.ui5.core.Object.isInstanceOf(a,i)){throw new Error('Interface mismatch')}}).callOnInit(),_processChildComponentsBinding:sap.portal.ui5.core.PropertyObserver(['childComponents'],function processChildComponentsBinding(k,c,o,O){if(o){this.unbindChildComponents(o)}if(c){this.bindChildComponents(c)}}).callOnInit(),bindChildComponents:function bindChildComponents(c){this.bindChildComponentsObservation(c);this.bindChildComponentsRelayoutObservation(c)},bindChildComponent:function bindChildComponent(c){this.bindChildComponentRelayoutObservation(c)},bindChildComponentsObservation:function bindChildComponentsObservation(c){var b=function bindItem(e){var C=e.getParameter('item');this.bindChildComponent(C)}.bind(this);var B=function bindAllItems(){this.getChildComponents().forEach(function bindItem(C){this.bindChildComponent(C)}.bind(this))}.bind(this);c.attachEvent('itemAdded',{},b);c.attachEvent('itemReplaced',{},b);c.attachEvent('collectionReplaced',{},B);B()},bindChildComponentRelayoutObservation:function bindChildComponentRelayoutObservation(c){var p=false;c.attachEvent('reflow',{},function onChildReflow(e){if(p){return}var r=this.renderViewPromise,l=this.layoutChildComponentsPromise;if(r&&r.bInUse&&r.state()==='pending'){p=true;r.always(function(){p=false;this.layoutChildComponents()}.bind(this));return}if(l&&l.bInUse&&l.state()==='pending'){p=true;l.always(function(){p=false;this.layoutChildComponents()}.bind(this));return}this.layoutChildComponents()}.bind(this))},bindChildComponentsRelayoutObservation:function bindChildComponentsRelayoutObservation(c){c.attachEvent('itemModified',{},function onItemModification(E){switch(E.getParameter('property')){case'view':case'componentId':this.layoutChildComponents();break}}.bind(this));var a={itemAdded:true,itemRemoved:true,itemReplaced:true};c.attachEvent('beforeCollectionReplaced',{},function onBeforeCollectionReplaced(){a.itemAdded=false;a.itemRemoved=false}.bind(this));c.attachEvent('collectionReplaced',{},function onCollectionReplaced(){a.itemAdded=false;a.itemRemoved=false;this.layoutChildComponents();a.itemAdded=true;a.itemRemoved=true}.bind(this));for(var e in a){c.attachEvent(e,{},function onCollectionEvent(E){if(!a[E.sId]){return}this.layoutChildComponents()}.bind(this))}},unbindChildComponents:function unbindChildComponents(c){},bindLayoutData:function bindLayoutData(l){l.attachEvent('itemModified',{},function onItemModification(E){this.layoutChildComponents()}.bind(this));var a={itemAdded:true,itemRemoved:true,itemReplaced:true};l.attachEvent('beforeCollectionReplaced',{},function onBeforeCollectionReplaced(){a.itemAdded=false;a.itemRemoved=false}.bind(this));l.attachEvent('collectionReplaced',{},function onCollectionReplaced(){this.layoutChildComponents();a.itemAdded=true;a.itemRemoved=true}.bind(this));for(var e in a){l.attachEvent(e,{},function onCollectionEvent(E){if(!a[E.sId]){return}this.layoutChildComponents()}.bind(this))}},unbindLayoutData:function unbindLayoutData(l){},_processLayoutClass:sap.portal.ui5.core.PropertyObserver(['layoutClass','layout'],function processLayoutClass(k,v,o,O){var p='layout';var a=this.getProperty(p),i=this.getProperty(p+'Class');if(a===null){return}if(jQuery.isPlainObject(a)){a=sap.portal.ui5.core.Object.factoryUCTypeObject(a,i);O.updatePropertyValue(a,p)}else if(i&&!sap.portal.ui5.core.Object.isInstanceOf(a,i)){throw new Error('Interface mismatch')}}).callOnInit(),_processLayoutDataClass:sap.portal.ui5.core.PropertyObserver(['layoutDataClass','layoutData'],function processLayoutDataClass(k,v,o,O){var p='layoutData';var a=this.getProperty(p),i=this.getProperty(p+'Class');if(a===null){return}if(jQuery.isArray(a)){a={items:a}}if(jQuery.isPlainObject(a)){a=sap.portal.ui5.core.Object.factoryUCTypeObject(a,i);O.updatePropertyValue(a,p)}else if(i&&!sap.portal.ui5.core.Object.isInstanceOf(a,i)){throw new Error('Interface mismatch')}}).callOnInit(),_processLayoutDataBinding:sap.portal.ui5.core.PropertyObserver(['layoutData'],function processLayoutDataBinding(k,l,o,O){if(o){this.unbindLayoutData(o)}if(l){this.bindLayoutData(l)}}).callOnInit(),bindView:sap.portal.ui5.core.PropertyObserver(['view'],function bindView(k,v,o){if(o){this.unbindView(o)}if(!v||jQuery.isPlainObject(v)){return}v.attachController(this);var f=['reflow','unrender','beforeReflow','beforeUnrender'];jQuery.each(f,function(i,e){v.attachEvent(e,{},function(E){this.fireEvent(e,E.getParameters())}.bind(this))}.bind(this))}).callOnInit(),_bindComponentModelToView:sap.portal.ui5.core.PropertyObserver(['view','componentModel'],function bindComponentModelToView(){var v=this.getView(),m=this.getComponentModel();if(!v||!m||jQuery.isPlainObject(v)||jQuery.isPlainObject(m)){return}v.setComponentModel(m)}).callOnInit(),_processPlaceAt:sap.portal.ui5.core.PropertyObserver(['placeAt','view'],function processPlaceAt(k,v,o){if(k==='placeAt'){this._oOldPlaceAt=o}if(v===null){return this.unrender()}else{return this.render()}}),unrender:function unrender(){var d=this.unrenderViewPromise,v=this.getView(),i=this.getId(),r=this.renderViewPromise,l=this.layoutChildComponentsPromise;if(r&&r.bInUse&&r.state()==='pending'){r.reject()}if(l&&l.bInUse&&l.state()==='pending'){l.reject()}this.renderViewPromise=null;this.layoutChildComponentsPromise=null;if(d&&d.bInUse){switch(d.state()){case'pending':d.reject();d=jQuery.Deferred();break;default:d=jQuery.Deferred();break}}else if(!d){d=jQuery.Deferred()}d.oPromise=d.promise();d.oPromise.oDeferred=d;d.sUid='unrender-component-'+jQuery.sap.uid();this.unrenderViewPromise=d;if(!v||jQuery.isPlainObject(v)){return d.oPromise}d.oDependencies={beforeUnrenderEventSubscribers:[],unrenderEventSubscribers:[],unrender:null};d.bInUse=true;this.fireEvent('beforeUnrender',{view:v,promises:d.oDependencies.beforeUnrenderEventSubscribers});jQuery.when.apply(jQuery,d.oDependencies.beforeUnrenderEventSubscribers).pipe(function(){v.setPlaceAt(null);var p=v.unrender();if(p){p.fail(function(){d.reject()})}return d.oDependencies.unrender=p}).pipe(function(){this.fireEvent('unrender',{view:v,promises:d.oDependencies.unrenderEventSubscribers});return jQuery.when.apply(jQuery,d.oDependencies.unrenderEventSubscribers)}.bind(this)).then(function(){d.resolve()});return d.oPromise},unbindView:function unbindView(v){v=v||this.getView();if(!v||jQuery.isPlainObject(v)){return}return v.detachController(this)},calculateChildComponentsLayout:function calculateChildComponentsLayout(l){var L=this.getLayout(),v=this.getView(),c=this.getChildComponents();switch(true){case jQuery.isPlainObject(L):return{};case!L:if(c&&c.getLength()){}return{}}l=l||this.getLayoutData();var C=L.processLayout(c,l,v,this);if(!C){return{}}return C},render:function render(){var d=this.renderViewPromise,v=this.getView(),p=this.getPlaceAt(),i=this.getId();var c={placeAt:p,view:v};if(this.unrenderViewPromise&&this.unrenderViewPromise.state()==="pending"){this.unrenderViewPromise.reject()}this.unrenderViewPromise=null;if(d&&d.bInUse){if(jQuery.sap.equal(c,d.oConfig)&&d.state()!=='rejected'){return d.oPromise}switch(d.state()){case'pending':if(jQuery.sap.equal(c,d.oConfig)){return d.oPromise}else{d.reject();d=jQuery.Deferred()}break;default:d=jQuery.Deferred();break}}else if(!d){d=jQuery.Deferred()}d.oPromise=d.promise();d.oPromise.oDeferred=d;d.sUid='render-component-'+jQuery.sap.uid();this.renderViewPromise=d;if(!p||!v||jQuery.isPlainObject(v)){return d.oPromise}d.oConfig=c;d.oDependencies={beforeRenderEventSubscribers:[],renderEventSubscribers:[],render:null,layoutChildComponents:null};d.bInUse=true;this.fireEvent('beforeRender',{oldPlaceAt:this._oOldPlaceAt,placeAt:p,view:v,promises:d.oDependencies.beforeRenderEventSubscribers});jQuery.when.apply(jQuery,d.oDependencies.beforeRenderEventSubscribers).pipe(function(){v.setPlaceAt(p);var P=v.render();if(P){P.fail(function(){d.reject()})}return d.oDependencies.render=P}).pipe(function(){if(!this.layoutChildComponentsSuspended){var P=this.layoutChildComponents();if(P){P.fail(function(){d.reject()})}return d.oDependencies.layoutChildComponents=P}else{}}.bind(this)).pipe(function(){this.fireEvent('render',{oldPlaceAt:this._oOldPlaceAt,view:v,placeAt:p,promises:d.oDependencies.renderEventSubscribers});return jQuery.when.apply(jQuery,d.oDependencies.renderEventSubscribers)}.bind(this)).then(function(){d.resolve()});return d.oPromise},layoutChildComponents:function layoutChildComponents(c,p){var d=this.layoutChildComponentsPromise,v=this.getView(),C=this.getChildComponents(),l=this.getLayout(),i=this.getId(),p=p||{};if(p&&d&&p.force&&d.bInUse&&d.state()==='pending'){d.reject()}if(this.layoutChildComponentsSuspended>0){return d?d.oPromise:null}if(jQuery.isPlainObject(C)||jQuery.isPlainObject(v)){return d?d.oPromise:null}if(!v||!v.isRendered()){return d?d.oPromise:null}switch(true){case(!c):c=this.calculateChildComponentsLayout();break;case(c&&c instanceof sap.portal.ui5.core.LayoutData):c=this.calculateChildComponentsLayout(c);break}var L=jQuery.Deferred();L.sUid='layout-child-components-'+jQuery.sap.uid();L.oPromise=L.promise();L.oPromise.oDeferred=L;jQuery.when(c).pipe(function doLayout(c){var o={layout:l,params:p,calculatedLayout:c};if(d&&d.bInUse){if(l&&jQuery.sap.equal(o,d.oConfig)&&d.state()!=='rejected'){this.layoutChildComponentsPromise=d;if(d.state()==='rejected'){L.reject()}else{L.resolve()}return d.oPromise}switch(d.state()){case'pending':if(jQuery.sap.equal(o,d.oConfig)){this.layoutChildComponentsPromise=d;return d.oPromise}else{d.reject();d=L}break;default:d=L;break}}else if(!d){d=L}d.bInUse=true;d.oConfig=o;d.oDependencies={beforeLayoutEventSubscribers:[],layoutEventSubscribers:[],renderChildComponents:null};this.layoutChildComponentsPromise=d;this.fireEvent('beforeLayout',{layout:c,promises:d.oDependencies.beforeLayoutEventSubscribers});jQuery.when.apply(jQuery,d.oDependencies.beforeLayoutEventSubscribers).pipe(function renderChildComponents(){var s=(typeof(c.component)==='object')?Boolean(c.component.suspendRelayout):false;var r=s?false:true;var R=function(){if(!r){this.resumeLayoutChildComponents();r=true}}.bind(this);if(s){this.suspendLayoutChildComponents()}d.oDependencies.renderChildComponents=v.renderChildComponents(C,c.childComponents,c.component);if(s){d.oDependencies.renderChildComponents.always(R);d.always(R)}return d.oDependencies.renderChildComponents}.bind(this)).pipe(function notify(){this.fireEvent('layout',{layout:c,promises:d.oDependencies.layoutEventSubscribers});return jQuery.when.apply(jQuery,d.oDependencies.layoutEventSubscribers)}.bind(this)).fail(function fail(){d.reject();L.reject()}).done(function resolve(){d.resolve();L.resolve()});return d.oPromise}.bind(this));return L.oPromise},renderChildComponents:sap.portal.ui5.core.PropertyObserver(['layout','layoutData','childComponents'],function renderChildComponents(){return this.layoutChildComponents()}),unregisterInComponentManager:function unregisterInComponentManager(c){c=c||this.getComponentId();sap.portal.ui5.core.ComponentManager.unregisterComponent(c)},destroyChildComponents:function destroyChildComponents(){var c=this.getChildComponents();if(!c){return}return c.destroy()},destroyView:function destroyView(){var v=this.getView(),r=this.renderViewPromise,l=this.layoutChildComponentsPromise;if(!v){return}if(r&&r.bInUse&&r.state()==='pending'){r.reject()}if(l&&l.bInUse&&l.state()==='pending'){l.reject()}return v.destroy()},destroy:function destroy(){var p=[],s=this._super.bind(this,arguments),i=this.getId(),d=jQuery.Deferred();p.push(this.destroyChildComponents());p.push(this.destroyView());p.push(this.unregisterInComponentManager());jQuery.when.apply(jQuery,p).always(function(){jQuery.when(s()).always(function(){d.resolve()})});return d.promise()},getChildByComponentId:function getChildByComponentId(i,r){return this.getChildComponents().getByComponentId(i,r)},addChildComponents:function addChildComponents(c,l){if(!jQuery.isArray(c)){throw new TypeError('Components are not array')}var L=this.layoutChildComponentsPromise;if(L&&L.bInUse&&L.state()==='pending'){L.reject()}this.suspendLayoutChildComponents();var d=jQuery.Deferred(),C=this.getChildComponents(),o=this.getLayoutData(),i=this.getId(),p=[];if(l){if(!o){p.push(this.setLayoutData({items:l}))}else{p.push(o.addItems(l))}}if(C&&c){p.push(C.addItems(c))}this.resumeLayoutChildComponents();jQuery.when.apply(jQuery,p).pipe(function(){return this.layoutChildComponents()}.bind(this)).always(function(){d.resolve()});return d.promise()},addChildComponent:function addChildComponent(c,l){if(!l){}if(typeof(l)==='object'){var C=c instanceof sap.portal.ui5.core.Component?c.getComponentId():c.componentId;if(typeof(l.componentId)==='undefined'){l.componentId=C}if(l.componentId!==C){throw new Error('Component id in layout data mismatch')}}return this.addChildComponents([c],[l])},removeChildComponents:function removeChildComponents(r,R,d){if(!jQuery.isArray(r)){throw new TypeError}var l=this.layoutChildComponentsPromise;if(l&&l.bInUse&&l.state()==='pending'){l.reject()}this.suspendLayoutChildComponents();var D=jQuery.Deferred(),c=this.getChildComponents(),L=this.getLayoutData(),p=[],i=this.getId();var C,a=r.length;if(L&&R){if(R===true){var s,f;R=[];for(C=0;C<a;C++){s=r[C].getComponentId();f=L.getByComponentId(s);if(f){R.push(f)}}}if(!jQuery.isArray(R)){throw new TypeError}p.push(L.removeItems(R))}if(c){p.push(c.removeItems(r))}if(d){for(C=0;C<a;C++){p.push(r[C].destroy())}}this.resumeLayoutChildComponents();jQuery.when.apply(jQuery,p).pipe(function(){return this.layoutChildComponents()}.bind(this)).always(function(){D.resolve()});return D.promise()},removeChildComponent:function removeChildComponent(c,r){return this.removeChildComponents([c],r)},getLength:function getLength(){return this.getChildComponents().getLength()},setChildComponentItems:function setChildComponentItems(i,l){var L=this.layoutChildComponentsPromise;if(L&&L.bInUse&&L.state()==='pending'){L.reject()}this.suspendLayoutChildComponents();var p=[],c=this.getChildComponents(),d=jQuery.Deferred(),I=this.getId();p.push(c.setItems(i));if(l){p.push(this.setLayoutDataItems(l))}this.resumeLayoutChildComponents();jQuery.when.apply(jQuery,p).pipe(function(){return this.layoutChildComponents()}.bind(this)).always(function(){d.resolve()});return d.promise()},setLayoutDataItems:function setLayoutDataItems(i){var l=this.layoutChildComponentsPromise;if(l&&l.bInUse&&l.state()==='pending'){l.reject()}this.suspendLayoutChildComponents();var L=this.getLayoutData(),p=[],d=jQuery.Deferred(),I=this.getId();if(!L){p.push(this.setLayoutData({items:i}))}else{p.push(L.setItems(i))}this.resumeLayoutChildComponents();jQuery.when.apply(jQuery,p).pipe(function(){return this.layoutChildComponents()}.bind(this)).always(function(){d.resolve()});return d.promise()},suspendLayoutChildComponents:function suspendLayoutChildComponents(){return(++this.layoutChildComponentsSuspended)},resumeLayoutChildComponents:function resumeLayoutChildComponents(){return(this.layoutChildComponentsSuspended>0)?(--this.layoutChildComponentsSuspended):this.layoutChildComponentsSuspended},isRendered:function isRendered(){var v=this.getView();if(!(v instanceof sap.portal.ui5.core.View)){return false}return v.isRendered()}});
