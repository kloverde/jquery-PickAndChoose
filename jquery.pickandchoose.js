/*
 * PickAndChoose v1.0
 * https://www.github.com/kloverde/jquery-PickAndChoose
 *
 * This software is licensed under the 3-clause BSD license.
 *
 * Copyright (c) 2016 Kurtis LoVerde
 * All rights reserved
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

         // JSON of items to populate the unselected items' <select> with
         unselectedItems : null,

         // JSON of items to populate the selected items' <select> with
         selectedItems : null,

         // A callback function to execute when the user uses the buttons
         onChangeCallback : null,

         // Determines whether to display initialization errors in the page.
         // If set to true, your users will see them, so you might choose to
         // treat this as a debug option.  Regardless of the setting, the
         // plugin will throw initialization errors as exceptions.
         showErrors : false
      }, options );

      var GROUP_STATE_NONE = "none",
          GROUP_STATE_SOME = "some",
          GROUP_STATE_ALL  = "all";

      buildWidget( this );

      function buildWidget( container ) {
         // Scan for keys that appear in both the unselected and selected data sets

         $.each( settings.unselectedItems, function(prevKey, prevValue) {
            $.each( settings.selectedItems, function(key, value) {
               if( prevKey === key ) {
                  var errMsg = "MultipleSelect initialization error for "
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
               unselectedSelect.append( $("<option></option>")
                                          .text(key)
                                          .attr("value", value) );
            } );
         }

         unselectedSelect.appendTo( unselectedContainer );

         // create button container content
         
         var btnSelect = $( "<button/>", {
            class : settings.buttonSelectClass,
            text : settings.buttonSelectText
         } );

         var btnSelectAll = $( "<button/>", {
            class : settings.buttonSelectAllClass,
            text : settings.buttonSelectAllText
         } );

         var btnDeselect = $( "<button/>", {
            class : settings.buttonDeselectClass,
            text : settings.buttonDeselectText
         } );

         var btnDeselectAll = $( "<button/>", {
            class : settings.buttonDeselectAllClass,
            text : settings.buttonDeselectAllText
         } );

         if( typeof settings.onChangeCallback === "function" ) {
            btnSelect.on( "click", function() {
               settings.onChangeCallback();
            } );

            btnSelectAll.on( "click", function() {
               settings.onChangeCallback();
            } );

            btnDeselect.on( "click", function() {
               settings.onChangeCallback();
            } );

            btnDeselectAll.on( "click", function() {
               settings.onChangeCallback();
            } );
         };

         btnSelect.appendTo( buttonContainer );
         btnSelectAll.appendTo( buttonContainer );
         btnDeselect.appendTo( buttonContainer );
         btnDeselectAll.appendTo( buttonContainer );

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

         // add elements to the page
         
         container.addClass( settings.containerClass );

         container.append( unselectedContainer );
         container.append( buttonContainer );
         container.append( selectedContainer );
      }
   };
}( jQuery ));
