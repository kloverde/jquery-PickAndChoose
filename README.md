PickAndChoose
=============

See LICENSE for this software's licensing terms.

PickAndChoose is a jQuery plugin which allows you make selections from a list of displayed items.  There are two boxes:  one box contains a list of available items and the other displays the items you've selected.  You select and deselect items by using buttons which sit between the two boxes.  When you select an item, it moves from the 'available' box to the 'selected' box.  When you deselect an item, the opposite happens.  You can also select or deselect all items at once, for either box.


## Features

* Supports unlimited simultaneous instances
* Definable CSS classes make the widget highly styleable
* Supports a callback on change


## Initialization

There are two ways to initialize PickAndChoose; they differ based on the source of the data for your &lt;select&gt; boxes.  The approach you choose affects which configuration options are used and required at initialization time.  These details are in the Configuration Options section below.

1.  You can pass the data to the plugin as key/value pairs.  With this approach, PickAndChoose constructs all of the HTML for you.
      ```html

      <div id="myPicker"></div>

      ```

      ```javascript

      $( "#myPicker" ).pickAndChoose( {
         unselectedItems : { "Choice 1" : "choice1",
                             "Choice 3" : "choice3" },

         selectedItems   : { "Choice 2" : "choice2" }
      } );

      ```

2.  Alternatively, PickAndChoose can use pre-existing, pre-populated &lt;select&gt;s.
      ```html

      <div id="myPicker">
         <select id="availableItemsId" name="availableItems">
            <option value="choice1">Choice 1</option>
            <option value="choice2">Choice 2</option>
         </select>

         <select id="chosenItemsId" name="chosenItems">
         </select>
      </div>
      ```
      ```javascript
      $( "#myPicker" ).pickAndChoose( {
         createSelectElements : false,
         unselectedId         : "availableItemsId",
         selectedId           : "chosenItemsId"
      } );
      ```

Notes
* If you have more than one PickAndChoose widget in your page, then you must specify unique values for `unselectedId`, `unselectedName`, `selectedId` and `selectedName`.
* You cannot mix-and-match the way you initialize your &lt;select&gt;s.  You must use either the first approach for both, or the second approach for both.

See the included HTML file for more in-depth examples.


## Configuration Options

| Property | Description | Default Value |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |---------------|
| `addCssClasses` | If `true`, PickAndChoose will apply CSS classes.  If false, no CSS classes will be applied, even if you override their default values. | true |
| `containerClass` | The CSS class of the &lt;div&gt; which contains everything | pacContainer |
| `unselectedContainerClass` | The CSS class of the &lt;div&gt; containing the &lt;select&gt; of unselected items | pacUnselectedContainer |
| `selectedContainerClass` | The CSS class of the &lt;div&gt; containing the &lt;select&gt; of selected items | pacSelectedContainer |
| `buttonContainerClass` | The CSS class of the &lt;div&gt; containing the buttons | pacButtonContainer |
| `buttonSelectClass` | The CSS class of the select &lt;button&gt; | pacButtonSelect |
| `buttonSelectAllClass` | The CSS class of the select-all &lt;button&gt; | pacButtonSelectAll |
| `buttonDeselectClass` | The CSS class of the deselect &lt;button&gt; | pacButtonDeselect |
| `buttonDeselectAllClass` | The CSS class of the deselect-all &lt;button&gt; | pacButtonDeselectAll |
| `buttonSelectText` | The text of the select button | &gt; |
| `buttonSelectAllText` | The text of the select-all button | &gt;&gt; |
| `buttonDeselectText` | The text of the deselect button |  &lt; |
| `buttonDeselectAllText` | The text of the deselect-all button | &lt;&lt; |
| `createSelectElements` | If `true`, &lt;select&gt; elements will be created based on the data you provide in the `unselectedItems` and `selectedItems` properties, and they will be named according to the `unselectedId`, `unselectedName`, `selectedId` and `selectedName` properties.  If `false`, the `unselectedId` and `selectedId` properties will be used to locate preexisting &lt;select&gt;s in the page. | true |
| `unselectedId` | The ID of the &lt;select&gt; containing the unselected items, whether the &lt;select&gt; is created for you or you provide your own | pacUnselectedItems |
| `unselectedName` | The name of the &lt;select&gt; containing the unselected items.  If you provide your own &lt;select&gt; elements instead of having them constructed for you, this setting is ignored. | pacUnselectedItems |
| `selectedId` | The ID of the &lt;select&gt; containing the selected items, whether the &lt;select&gt; is created for you or you provide your own | pacSelectedItems |
| `selectedName` | The name of the &lt;select&gt; containing the selected items.  If you provide your own &lt;select&gt; elements instead of having them constructed for you, this setting is ignored. | pacSelectedItems |
| `unselectedItems` | Key/value pairs of items to populate the unselected items' &lt;select&gt; with.  If you provide your own &lt;select&gt; elements instead of having them constructed for you, this setting is ignored. | null |
| `selectedItems` | Key/value pairs of items to populate the selected items' &lt;select&gt; with.  If you provide your own &lt;select&gt; elements instead of having them constructed for you, this setting is ignored. | null |
| `onChangeCallback` | A callback function to execute when the user uses the buttons.  The callback only fires if the user's action resulted in a change. | null |
| `showErrors` | Determines whether to display initialization errors in the page.  If set to `true`, your users will see them, so you might choose to treat this as a debug option.  Regardless of the setting, the plugin will throw initialization errors as exceptions. | false |


## Using a Callback

If you implement a callback function, it must accept three parameters:

| Parameter | Data Type | Description |
| ----------- | ------------|-------------------------------------------------------------------------------------------------- |
| `operation` | string | Tells you whether the user selected or deselected items.  Possible values are `select` and `deselect`. |
| `recipient` | jQuery object | The &lt;select&gt; which received the items that were selected/deselected |
| `items`     | object array | Contains the data that was written to the recipient &lt;select&gt;.  Access the data using [object].key and [object].value. |



## Thanks

Do you like this library?  Want to toss a few bucks my way to say thanks?  I accept donations at https://paypal.me/KurtisLoVerde/6.  Thank you for your support!
