# Rocket Message
A message module.

* [Getting Started](#getting-started)
* [Basic Example](#basic-example)
* [Initialization](#initialization)
	* [Options](#options)
   * [Methods](#methods)
	* [Defaults](#defaults)
* [Messageplate Deprecated](#messageplate-deprecated)

## Getting Started
Install via NPM.

```
npm install rocket-message
```

**NOTE** that this module has a dependency [Rocket Tools (21kb)](https://github.com/chrishumboldt/Rocket-Tools) which will automatically be installed as well.

Start by including the necessary files.

```html
<head>
   <link href="node_modules/rocket-message/css/message.min.css" rel="stylesheet" type="text/css">
</head>
<body>
   /* Your content goes here */
   <script src="node_modules/rocket-tools/js/tools.min.js"></script>
   <script src="node_modules/rocket-message/js/message.min.js"></script>
</body>
```

## Basic Example
See the setup of the HTML and Javascript call below.

```html
<a href id="example">Show Message</a>

<script>
document.getElementById('example').onclick = function(event) {
   Rocket.message({
      body: 'This is an example message.',
      parseEvent: event
   });
};
</script>
```

## Initialization
See the different options you have available on module call as well as the methods.

#### Options
Name | Default | Options | Description
---- | ---- | ---- | ----
`type` | `false` | `error` `false` `success` `warning` | **NOTE** that the false value is equivalent to no type.
`heading` | | | You can make the heading whatever you would like. An empty value will not display the heading.
`body` | | | You can make the body whatever you would like. An empty value will not display the body.
`buttons` | `none` | `true` `false` `both` `none` | Display the various buttons on the message.
`buttonFalse` | `Cancel` | | Set the button false text. A false value will not display this button.
`buttonTrue` | `Ok` | | Set the button true text. A false value will not display this button.
`close` | `close` | | Set the text or inner HTML of the close link.
`onTrue` | `false` | | Assign a callback when the buttonTrue is selected.
`overlay` | `true` | `true` `false` | Set whether or not you want the overlay to display on message open.
`parseEvent` | | | Parse the event of a click to prevent the default link behavior.

#### Methods
For now the only post initialization method available is the close method used to manually close a message.

```javascript
// Initialise a message
var message = Rocket.message({
   body: 'This is a test.'
});

// Close the message right away
message.close();
```

#### Defaults
You can also overwrite the module options globally by altering the defaults. To do so reference the defaults object property. For example:

```javascript
Rocket.defaults.message.buttonFalse = 'Close It';
Rocket.defaults.message.buttonTrue = 'Go Ahead';
```

You can set the defaults for `buttons`, `buttonFalse`, `buttonTrue`, `close` and `overlay`.

## Advanced Example
See an advanced example below with options as per the above.

```html
<a href id="example">Show Message</a>

<script>
document.getElementById('example').onclick = function(event) {
   var message = Rocket.message({
      type: 'warning',
      heading: 'Test Message'
      body: 'Are you testing this module?',
      buttons: 'both',
      buttonTrue: 'Yes',
      buttonFalse: 'No',
      onTrue: function() {
         alert('This is awesome.');
         message.close();
      },
      parseEvent: event
   });
};
</script>
```

## Messageplate Deprecated
The original library, Messageplate, has been deprecated. The entire Webplate project is being refactored and rebranded with a new development philosophy. Messageplate will be maintained only with bug fixes under the **messageplate** branch.

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Copyright and License
Copyright 2017 Rocket Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
