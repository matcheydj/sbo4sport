/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP SE. All rights reserved
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.viz.ui5.types.Area_animation.
jQuery.sap.declare("sap.viz.ui5.types.Area_animation");
jQuery.sap.require("sap.viz.library");
jQuery.sap.require("sap.viz.ui5.core.BaseStructuredType");


/**
 * Constructor for a new ui5/types/Area_animation.
 * 
 * Accepts an object literal <code>mSettings</code> that defines initial 
 * property values, aggregated and associated objects as well as event handlers. 
 * 
 * If the name of a setting is ambiguous (e.g. a property has the same name as an event), 
 * then the framework assumes property, aggregation, association, event in that order. 
 * To override this automatic resolution, one of the prefixes "aggregation:", "association:" 
 * or "event:" can be added to the name of the setting (such a prefixed name must be
 * enclosed in single or double quotes).
 *
 * The supported settings are:
 * <ul>
 * <li>Properties
 * <ul>
 * <li>{@link #getDataLoading dataLoading} : boolean (default: true)</li>
 * <li>{@link #getDataUpdating dataUpdating} : boolean (default: true)</li>
 * <li>{@link #getResizing resizing} : boolean (default: true)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul></ul>
 * </li>
 * </ul> 
 *
 * 
 * In addition, all settings applicable to the base type {@link sap.viz.ui5.core.BaseStructuredType#constructor sap.viz.ui5.core.BaseStructuredType}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Settings for animations in the plot area
 * @extends sap.viz.ui5.core.BaseStructuredType
 * @version 1.24.4
 *
 * @constructor
 * @public
 * @since 1.7.2
 * @experimental Since version 1.7.2. 
 * Charting API is not finished yet and might change completely
 * @name sap.viz.ui5.types.Area_animation
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.viz.ui5.core.BaseStructuredType.extend("sap.viz.ui5.types.Area_animation", { metadata : {

	library : "sap.viz",
	properties : {
		"dataLoading" : {type : "boolean", group : "", defaultValue : true},
		"dataUpdating" : {type : "boolean", group : "", defaultValue : true},
		"resizing" : {type : "boolean", group : "", defaultValue : true}
	}
}});


/**
 * Creates a new subclass of class sap.viz.ui5.types.Area_animation with name <code>sClassName</code> 
 * and enriches it with the information contained in <code>oClassInfo</code>.
 * 
 * <code>oClassInfo</code> might contain the same kind of informations as described in {@link sap.ui.core.Element.extend Element.extend}.
 *   
 * @param {string} sClassName name of the class to be created
 * @param {object} [oClassInfo] object literal with informations about the class  
 * @param {function} [FNMetaImpl] constructor function for the metadata object. If not given, it defaults to sap.ui.core.ElementMetadata.
 * @return {function} the created class / constructor function
 * @public
 * @static
 * @name sap.viz.ui5.types.Area_animation.extend
 * @function
 */


/**
 * Getter for property <code>dataLoading</code>.
 * Set whether the data loading animation is enabled
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>dataLoading</code>
 * @public
 * @name sap.viz.ui5.types.Area_animation#getDataLoading
 * @function
 */

/**
 * Setter for property <code>dataLoading</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bDataLoading  new value for property <code>dataLoading</code>
 * @return {sap.viz.ui5.types.Area_animation} <code>this</code> to allow method chaining
 * @public
 * @name sap.viz.ui5.types.Area_animation#setDataLoading
 * @function
 */


/**
 * Getter for property <code>dataUpdating</code>.
 * Set whether the data updating animation is enabled
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>dataUpdating</code>
 * @public
 * @name sap.viz.ui5.types.Area_animation#getDataUpdating
 * @function
 */

/**
 * Setter for property <code>dataUpdating</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bDataUpdating  new value for property <code>dataUpdating</code>
 * @return {sap.viz.ui5.types.Area_animation} <code>this</code> to allow method chaining
 * @public
 * @name sap.viz.ui5.types.Area_animation#setDataUpdating
 * @function
 */


/**
 * Getter for property <code>resizing</code>.
 * Set whether the resizing animation is enabled
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>resizing</code>
 * @public
 * @name sap.viz.ui5.types.Area_animation#getResizing
 * @function
 */

/**
 * Setter for property <code>resizing</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bResizing  new value for property <code>resizing</code>
 * @return {sap.viz.ui5.types.Area_animation} <code>this</code> to allow method chaining
 * @public
 * @name sap.viz.ui5.types.Area_animation#setResizing
 * @function
 */


// Start of sap/viz/ui5/types/Area_animation.js
