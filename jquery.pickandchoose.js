/*
 * PickAndChoose v1.0
 * https://www.github.com/kloverde/jquery-PickAndChoose
 *
 * This software is licensed under the 3-clause BSD license.
 *
 * Copyright (c) 2016 Kurtis LoVerde
 * All rights reserved
 *
 * Donations:  https://paypal.me/KurtisLoVerde/6
 */

(function( $ ) {
   "use strict";

   $.fn.pickAndChoose = function( options ) {

      var settings = $.extend( {
         // If true, PickAndChoose will apply CSS classes defined here to HTML elements.  If
         // false, no CSS classes will be added, even if you override their default values.
         addCssClasses : true,

         // The class name of the <div> which contains everything
         containerClass : "pacContainer",

         // The class name of the <div> which contains the <select> of unselected items
         unselectedContainerClass : "pacUnselectedContainer",

         // The class name of the <div> containing the buttons
         buttonContainerClass : "pacButtonContainer",

         // The class of the select <button>
         buttonSelectClass : "pacButtonSelect",

         // The class of the select-all <button>
         buttonSelectAllClass : "pacButtonSelectAll",

         // The class of the deselect <button>
         buttonDeselectClass : "pacButtonDeselect",

         // The class of the deselect-all <button>
         buttonDeselectAllClass : "pacButtonDeselectAll",

         // The class name of the <div> containing the user selections <select>
         selectedContainerClass : "pacSelectedContainer",

         // The text of the select button
         buttonSelectText : ">",

         // The text of the select-all button
         buttonSelectAllText : ">>",

         // The text of the deselect button
         buttonDeselectText : "<",

         // The text of the deselect-all button
         buttonDeselectAllText : "<<",

         // If true, <select> elements will be created based on the data you provide
         // in the unselectedItems and selectedItems properties, and they wil be
         // named according to the unselectedId, unselectedName, selectedId, and
         // selectedName properties.
         //
         // If false, PickAndChoose will use the unselectedId and selectedId
         // properties to locate the <select>s in the page.  The unselectedName
         // and selectedName properties play no role here.
         createSelectElements : true,

         // The ID of the <select> containing the unselected items.  If you provide
         // PickAndChoose with your own <select> elements instead of having it
         // construct them for you, this setting is ignored.
         unselectedId : "pacUnselectedItems",

         // The name of the <select> containing the unselected items.  If you provide
         // PickAndChoose with your own <select> elements instead of having it
         // construct them for you, this setting is ignored.
         unselectedName : "pacUnselectedItems",

         // The ID of the <select> containing the selected items.  If you provide
         // PickAndChoose with your own <select> elements instead of having it
         // construct them for you, this setting is ignored.
         selectedId : "pacSelectedItems",

         // The name of the <select> containing the selected items.  If you provide
         // PickAndChoose with your own <select> elements instead of having it
         // construct them for you, this setting is ignored.
         selectedName : "pacSelectedItems",

         // Key/value pairs of items to populate the unselected items' <select> with.
         // If you provide PickAndChoose with your own <select> elements instead of
         // having it construct them for you, this setting is ignored.
         unselectedItems : null,

         // Key/value pairs of items to populate the selected items' <select> with.
         // If you provide PickAndChoose with your own <select> elements instead of
         // having it construct them for you, this setting is ignored.
         selectedItems : null,

         // A callback function to execute when the user uses the buttons.  The
         // callback only fires if the user's action resulted in a change.
         onChangeCallback : null,

         // Determines whether to display initialization errors in the page.
         // If set to true, your users will see them, so you might choose to
         // treat this as a debug option.  Regardless of the setting, the
         // plugin will throw initialization errors as exceptions.
         showErrors : false
      }, options );

      var SWAP_TYPE_SELECT   = "select",
          SWAP_TYPE_DESELECT = "deselect";

      var container = this;

      buildWidget();


      function throwException( msg ) {
         var exMsg = "PickAndChoose error for " + $( container ).prop( "id" ) + ":  " + msg;

         if( settings.showErrors ) {
            container.append( exMsg );
         }

         throw exMsg;
      }

      function validate( unselectedSelect, selectedSelect ) {
         var unselectedItems = null,
             selectedItems   = null;

         if( !settings.createSelectElements ) {
            // If PickAndChoose was configured to use existing <select> elements, check to make sure they exist.

            if( unselectedSelect == null || unselectedSelect.length === 0 ) {
               throwException( "Could not find '" + settings.unselectedId + "'" );
            }

            if( selectedSelect == null || selectedSelect.length === 0 ) {
               throwException( "Could not find '" + settings.selectedId + "'" );
            }

            // Grab the data in the <select>s
            unselectedItems = unselectedSelect.find( "option" );
            selectedItems   = selectedSelect.find( "option" );
         } else {
            // PickAndChoose was configured to create <select>s from supplied data
            unselectedItems = settings.unselectedItems;
            selectedItems   = settings.selectedItems;
         }

         // Scan for keys that appear in both the unselected and selected data sets

         if( unselectedItems != null && selectedItems != null ) {
            $.each( unselectedItems, function(prevKey, prevValue) {
               $.each( selectedItems, function(key, value) {
                  if( prevKey === key ) {
                     throwException( "key '" + prevKey + "' appears in both unselected and selected items" );
                  }
               } );
            } );
         }
      }

      function buildWidget() {
         var unselectedSelect = null,
             selectedSelect   = null;

         if( !settings.createSelectElements ) {
            unselectedSelect = $( "#" + settings.unselectedId );
            selectedSelect   = $( "#" + settings.selectedId );
         }

         validate( unselectedSelect, selectedSelect );

         // create containers

         var unselectedContainer = $( "<div/>" );
         var buttonContainer     = $( "<div/>" );
         var selectedContainer   = $( "<div/>" );

         if( settings.createSelectElements ) {
            // create unselected <select>

            unselectedSelect = $( "<select/>", {
               id : settings.unselectedId,
               name : settings.unselectedName
            } );

            if( settings.unselectedItems != null ) {
               $.each( settings.unselectedItems, function(key, value) {   
                  unselectedSelect.append( $("<option/>")
                                             .text(key)
                                             .attr("value", value) );
               } );
            }

            // create selected <select>

            selectedSelect = $( "<select/>", {
               id : settings.selectedId,
               name : settings.selectedName
            } );

            if( settings.selectedItems != null ) {
               $.each( settings.selectedItems, function(key, value) {   
                  selectedSelect.append( $("<option></option>")
                                             .text(key)
                                             .attr("value", value) );
               } );
            }
         }

         unselectedSelect.prop( "multiple", true );
         selectedSelect.prop( "multiple", true );

         unselectedSelect.appendTo( unselectedContainer );
         selectedSelect.appendTo( selectedContainer );

         // create buttons

         var btnSelect = $( "<button/>", {
            text  : settings.buttonSelectText,
            type  : "button"   // HTML spec:  the default type for <button> is "submit".  How could anyone have thought that was a good idea?
         } );

         var btnSelectAll = $( "<button/>", {
            text  : settings.buttonSelectAllText,
            type  : "button"   // HTML spec:  the default type for <button> is "submit".  How could anyone have thought that was a good idea?
         } );

         var btnDeselect = $( "<button/>", {
            text  : settings.buttonDeselectText,
            type  : "button"   // HTML spec:  the default type for <button> is "submit".  How could anyone have thought that was a good idea?
         } );

         var btnDeselectAll = $( "<button/>", {
            text  : settings.buttonDeselectAllText,
            type  : "button"   // HTML spec:  the default type for <button> is "submit".  How could anyone have thought that was a good idea?
         } );

         btnSelect.on( "click", function() {
            swap( SWAP_TYPE_SELECT, unselectedSelect, selectedSelect );
         } );

         btnSelectAll.on( "click", function() {
            swapAll( SWAP_TYPE_SELECT, unselectedSelect, selectedSelect );
         } );

         btnDeselect.on( "click", function() {
            swap( SWAP_TYPE_DESELECT, selectedSelect, unselectedSelect );
         } );

         btnDeselectAll.on( "click", function() {
            swapAll( SWAP_TYPE_DESELECT, selectedSelect, unselectedSelect );
         } );

         btnSelect.appendTo( buttonContainer );
         btnSelectAll.appendTo( buttonContainer );
         btnDeselect.appendTo( buttonContainer );
         btnDeselectAll.appendTo( buttonContainer );

         if( settings.addCssClasses ) {
            container.addClass( settings.containerClass );
            unselectedContainer.addClass( settings.unselectedContainerClass );
            buttonContainer.addClass( settings.buttonContainerClass );
            selectedContainer.addClass( settings.selectedContainerClass );
            btnSelect.addClass( settings.buttonSelectClass );
            btnSelectAll.addClass( settings.buttonSelectAllClass );
            btnDeselect.addClass( settings.buttonDeselectClass );
            btnDeselectAll.addClass( settings.buttonDeselectAllClass );
         }

         // add elements to the page

         container.append( unselectedContainer );
         container.append( buttonContainer );
         container.append( selectedContainer );
      }

      function swap( operationType, from, to ) {
         var selectedItems = from.find( "option:selected" );
         var movedItems = new Array( selectedItems.length );  // Among the many ways of populating an array in JavaScript, a fixed-length
                                                              // array with direct assignments in a loop incrementing the index had the
                                                              // best fit for performance across multiple browsers and OSes, even though
                                                              // it was only the fastest in Chrome.  Tested on jsperf.com.
         var i = 0;

         selectedItems.each( function() {
            var elem = $( this );
            var obj = new Object();

            obj.key = elem.text();
            obj.value = elem.val();

            movedItems[ i++ ] = obj;
            elem.appendTo( to );
         } );

         if( typeof settings.onChangeCallback === "function" && movedItems.length > 0 ) {
            settings.onChangeCallback( operationType, to, movedItems );
         }
      }

      function swapAll( operationType, from, to ) {
         from.find( "option" ).each( function() {
            $( this ).prop( "selected", true );
         } );

         swap( operationType, from, to );
      }
   };
}( jQuery ));
