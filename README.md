PickAndChoose
=============

See LICENSE for this software's licensing terms.

PickAndChoose is a jQuery plugin which allows you make selections from a list of displayed items.  There are two boxes:  one box contains a list of available items and the other displays the items you've selected.  You select and deselect items by using buttons that sit between the two boxes.  When you select an item, it moves from the 'available' box to the 'selected' box.  When you deselect an item, the opposite happens.  You can also select or deselect all items at once.

Setup is incredibly simple:  invoke the plugin on an empty &lt;div&gt; and pass in the values for the selection boxes in key/value pairs.  The plugin takes care of the rest.


## Features

* Supports unlimited simultaneous instances
* Definable CSS classes make the widget highly styleable
* Supports a callback on change


## Using

Invoke the plugin on an empty &lt;div&gt; and pass properties as you prefer.  The only required properties are `unselectedItems` and `selectedItems`.  However, if you have more than one PickAndChoose widget in your page, then you must specify unique values for `unselectedId`, `unselectedName`, `selectedId` and `selectedName`.

| Property | Description | Default Value |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |---------------|
| `containerClass` | The class name of the &lt;div&gt; which contains everything | pacContainer |
| `unselectedContainerClass` | The class name of the &lt;div&gt; which contains the &lt;select&gt; of unselected items | pacUnselectedContainer |
| `buttonContainerClass` | The class name of the &lt;div&gt; containing the buttons | pacButtonContainer |
| `buttonSelectClass` | The class of the select &lt;button&gt; | pacButtonSelect |
| `buttonSelectAllClass` | The class of the select-all &lt;button&gt; | pacButtonSelectAll |
| `buttonDeselectClass` | The class of the deselect &lt;button&gt; | pacButtonDeselect |
| `buttonDeselectAllClass` | The class of the deselect-all &lt;button&gt; | pacButtonDeselectAll |
| `selectedContainerClass` | The class name of the &lt;div&gt; containing the user selections &lt;select&gt; | pacSelectedContainer |
| `buttonSelectText` | The text of the select button | &gt; |
| `buttonSelectAllText` | The text of the select-all button | &gt;&gt; |
| `buttonDeselectText` | The text of the deselect button |  &lt; |
| `buttonDeselectAllText` | The text of the deselect-all button | &lt;&lt; |
| `unselectedId` | The ID of the &lt;select&gt; containing the unselected items | pacUnselectedItems |
| `unselectedName` | The name of the <select> containing the unselected items | pacUnselectedItems |
| `selectedId` | The ID of the &lt;select&gt; containing the selected items | pacSelectedItems |
| `selectedName` | The name of the &lt;select&gt; containing the selected items | pacSelectedItems |
| `unselectedItems` | Key/value pairs of unselected items to populate the unselected items' &lt;select&gt; with | null |
| `selectedItems` | Key/value pairs of items to populate the selected items' &lt;select&gt; with | null |
| `onChangeCallback` | A callback function to execute when the user uses the buttons.  The callback only fires if the user's action resulted in a change. | null |
| `showErrors` | Determines whether to display initialization errors in the page.  If set to true, your users will see them, so you might choose to treat this as a debug option.  Regardless of the setting, the plugin will throw initialization errors as exceptions. | false |


The callback receives three parameters:

| Parameter | Data Type | Description |
| ----------- | ------------|-------------------------------------------------------------------------------------------------- |
| `operation` | string | Tells you whether the user selected or deselected items.  Possible values are `select` and `deselect`. |
| `recipient` | jQuery object | Tells you which &lt;select&gt; received the items that were selected/deselected |
| `items`     | object array | Contains the data that was written to the recipient &lt;select&gt;.  Access the data using [object].key and [object].value. |

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

Do you like this library?  Want to toss a few bucks my way to say thanks?  I accept donations at https://paypal.me/KurtisLoVerde/6.  Thank you for your support!
