<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Form Preview](#form-preview)
  - [Features](#features)
  - [Documentation](#documentation)
    - [jQuery Preview function](#jquery-preview-function)
    - [Preview.addProcessor(name, callback)](#previewaddprocessorname-callback)
    - [Markup](#markup)
    - [Example](#example)
  - [ToDo](#todo)
  - [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Form Preview

Form preview is a jQuery plugin for previewing form input in separate HTML element.

Few demos:

* [Hello, World!](http://jsfiddle.net/volter9/5gykse6u/)
* [Preview article card](http://jsfiddle.net/volter9/L1x151zf/)
* [Avenger report card](http://volter9.github.io/Form-Preview/)

## Features

* Preview form input
* Process input before output in preview element
* Fill input in elements or element' attributes

## Documentation

### jQuery Preview function

`$(element).preview(options)` - is the core for Form Preview jQuery plugin. Here's the syntax of this function:

```js
$('#element').preview({
	form   : 'article > form',
	fields : 'input, select',
	event  : 'change',
	init   : function (preview) {
		// Code related to preview before setup should be executed here
	}
})
```

Detailed description of options mentioned above and more:

`#element` - Desired element which is your target, basically, any element that contains previewed markup. See **Markup** section

`form: 'article > form'` - Form which is going to be used, only one form allowed per preview, **required option**.

`fields: 'input, select',` - Which form elements you want in form to be *parsed*. Default: `'input, textarea, select'`.

`event: 'change'` - Which event would trigger preview. Default: `'input'`.

`init: function (preview) {}` - Initialization callback, add processors if you need to on different fields.

### Preview.addProcessor(name, callback)

Preview.addProcessor adds a processor to specific field which will process the value before putting form input into target element (`#element`);

First argument is the `name` of the field, second argument is `callback` which will process the input. Example of `callback` that will capitalize `title` field before outputting:

```js
$('#element').preview({
	/* ... */
	init : function (preview) {
		// Add processor to field title
		preview.addProcessor('title', function (name, value, input) {
			return value.toUpperCase();
		});
	},
});
```

`callback` takes three parameters:

`name` - The name of field. That's in case if you need the name, but you want to avoid repetition and follow DRY principle or if you're using same callback to several fields.

`value` - Value of `name` field before passed to you before previewing.

`input` - Plain object of other values in the form, in case if your value should depend on other field's value.

### Markup

In this version, you need to specify markup for preview to be filled in HTML.
jQuery Form Preview plugin supports three data-* attributes to help you build previews.

In the `#element` element you should put desired HTML with following additional attributes:


`data-preview="field"` - Field which will be used to fill information inside of the element (`.html()` is used for non attribute fields). **Required attribute** in order to make work other data-* attributes.

`data-attr="attribute"` - Specify attribute to fill values in attribute instead of content. **Only one attribute** is supported yet.

`data-pattern="Peter %s pattern %s"` - If you need not just output, but also a label in front of it, or you want to use the value twice or three times. Use `%s` to insert your value. data-pattern also **works with** data-preview as well as with data-attribute.

### Example 

```html
<div id="preview">
	<p data-preview="name" data-pattern="Hello, %s!">Hello, user!</p>
</div>

<form id="form">
	Enter your name:
	<input name="name" type="text" value="World"/>
</form>

<script>
	$('#preview').preview({
		form : '#form'
	});
</script>
```

Following code is hello world for Form Preview. When you'll enter something in "name" input, the paragraph in `#preview` will change to the value of "name" input.

## ToDo

- [ ] Add VanillaJS version
- [ ] Add post-processors and pre-processors of input
- [ ] Add definition of fields without markup using JS plain objects or JSON
- [ ] Add form default filling

## License

Following code is released under MIT license:

Copyright (c) 2014 volter9

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.