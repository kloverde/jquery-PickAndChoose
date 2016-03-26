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
   $.fn.pickAndChoose = function( options ) {

      var settings = $.extend( {
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

         // The ID of the <select> containing the unselected items
         unselectedId : "pacUnselectedItems",

         // The name of the <select> containing the unselected items
         unselectedName : "pacUnselectedItems",

         // The ID of the <select> containing the selected items
         selectedId : "pacSelectedItems",

         // The name of the <select> containing the selected items
         selectedName : "pacSelectedItems",

         // Key/value pairs of items to populate the unselected items' <select> with
         unselectedItems : null,

         // Key/value pairs of items to populate the selected items' <select> with
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

      buildWidget( this );

      function buildWidget( container ) {
         // Scan for keys that appear in both the unselected and selected data sets

         $.each( settings.unselectedItems, function(prevKey, prevValue) {
            $.each( settings.selectedItems, function(key, value) {
               if( prevKey === key ) {
                  var errMsg = "PickAndChoose initialization error for "
                             + $( container ).attr( "id" )
                             + ":  key '" + prevKey
                             + "' appears in both unselected and selected items"

                  if( settings.showErrors ) {
                     container.append( errMsg );
                  }

                  throw errMsg;
               }
            } );
         } );

         // create containers

         var unselectedContainer = $( "<div/>", {
            class : settings.unselectedContainerClass
         } );

         var buttonContainer = $( "<div/>", {
            class : settings.buttonContainerClass
         } );

         var selectedContainer = $( "<div/>", {
            class : settings.selectedContainerClass,
         } );

         // create unselected container content

         var unselectedSelect = $( "<select/>", {
            id : settings.unselectedId,
            name : settings.unselectedName,
            multiple : ""
         } );

         if( settings.unselectedItems != null ) {
            $.each( settings.unselectedItems, function(key, value) {   
               unselectedSelect.append( $("<option/>")
                                          .text(key)
                                          .attr("value", value) );
            } );
         }

         unselectedSelect.appendTo( unselectedContainer );

         // create selected container content

         var selectedSelect = $( "<select/>", {
            id : settings.selectedId,
            name : settings.selectedName,
            multiple : ""
         } );

         if( settings.selectedItems != null ) {
            $.each( settings.selectedItems, function(key, value) {   
               selectedSelect.append( $("<option></option>")
                                          .text(key)
                                          .attr("value", value) );
            } );
         }

         selectedSelect.appendTo( selectedContainer );

         // create button container content
         
         var btnSelect = $( "<button/>", {
            class : settings.buttonSelectClass,
            text  : settings.buttonSelectText,
            type  : "button"   // HTML spec:  the default type for <button> is "submit".  How could someone think that's a good idea?
         } );

         var btnSelectAll = $( "<button/>", {
            class : settings.buttonSelectAllClass,
            text  : settings.buttonSelectAllText,
            type  : "button"   // HTML spec:  the default type for <button> is "submit".  How could someone think that's a good idea?
         } );

         var btnDeselect = $( "<button/>", {
            class : settings.buttonDeselectClass,
            text  : settings.buttonDeselectText,
            type  : "button"   // HTML spec:  the default type for <button> is "submit".  How could someone think that's a good idea?
         } );

         var btnDeselectAll = $( "<button/>", {
            class : settings.buttonDeselectAllClass,
            text  : settings.buttonDeselectAllText,
            type  : "button"   // HTML spec:  the default type for <button> is "submit".  How could someone think that's a good idea?
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

         // add elements to the page
         
         container.addClass( settings.containerClass );

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
