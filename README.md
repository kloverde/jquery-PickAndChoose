# This project is an unfinished work in progress.  Check back soon.


PickAndChoose
=============

See LICENSE for this software's licensing terms.

PickAndChoose is a jQuery plugin which allows you make selections from a list of displayed items.  There are two boxes:  one box contains a list of available options and the other displays the items you've selected.  You select and deselect options by using buttons that sit between the two boxes.  When you select an option, it moves from the 'available' box to the the 'selected' box.  When you deselect an option, the opposite happens.  You can also select and deselect all options at once.

Setup is incredibly simple:  invoke the plugin on an empty <div> and pass in the values for the selection boxes in JSON format.  The plugin takes care of the rest.


## Features

* Supports unlimited simultaneous instances
* Definable CSS classes make the widget highly styleable
* Supports a callback on change


## Using

Invoke the plugin on an empty <div> and pass properties as you prefer.  The only required properties are `unselectedItems` and `selectedItems`.  If you have more than one PickAndChoose widget in your page, you must then specify `unselectedId` and `selectedItems`.

| Property | Description | Default Value |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |---------------|
| `containerClass` | The class name of the <div> which contains everything | pacContainer |
| `unselectedContainerClass` | The class name of the <div> which contains the <select> of unselected items | pacUnselectedContainer |
| `buttonContainerClass` | The class name of the <div> containing the buttons | pacButtonContainer |
| `buttonSelectClass` | The class of the select <button> | pacButtonSelect |
| `buttonSelectAllClass` | The class of the select-all <button> | pacButtonSelectAll |
| `buttonDeselectClass` | The class of the deselect <button> | pacButtonDeselect |
| `buttonDeselectAllClass` | The class of the deselect-all <button> | pacButtonDeselectAll |
| `selectedContainerClass` | The class name of the <div> containing the user selections <select> | pacSelectedContainer |
| `buttonSelectText` | The text of the select button | > |
| `buttonSelectAllText` | The text of the select-all button | >> |
| `buttonDeselectText` | The text of the deselect button |  < |
| `buttonDeselectAllText` | The text of the deselect-all button | << |
| `unselectedId` | The ID of the <select> containing the unselected options | unselected |
| `selectedId` | The ID of the <select> containing the selected options | selected |
| `unselectedItems` | JSON of unselected items to populate the unselected items' <select> with | null |
| `selectedItems` | JSON of items to populate the selected items' <select> with | null |
| `onChangeCallback | A callback function to execute when the user uses the buttons | null |
| `showErrors` | Determines whether to display initialization errors in the page.  If set to true, your users will see them, so you might choose to treat this as a debug option.  Regardless of the setting, the plugin will throw initialization errors as exceptions. | false |


#### Example

```html

<div id="myPicker"></div>

```

```javascript

$( "#myPicker" ).pickAndChoose( {
   unselectedItems : {
                       "Choice 1" : "choice1",
                       "Choice 3" : "choice3"
                     },

   selectedItems   : {
                        "Choice 2" : "choice2"
                     }
} );

```

See the included HTML file for a more in-depth demo.


## Thanks

Do you like this library?  Want to toss a few bucks my way to say thanks?  I accept donations at https://paypal.me/KurtisLoVerde/5.  Thank you for your support!
