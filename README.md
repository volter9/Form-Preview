# jQuery Form Preview

Need to visualize some values from form elements? No problem, Form Preview to the rescue!
This plugin for jQuery is suitable for visualizing form input into HTML elements. Want to see some examples? Sure, go for it:

* [Hello, World!](http://jsfiddle.net/volter9/5gykse6u/)
* [Show me your article card](http://jsfiddle.net/volter9/L1x151zf/)
* Few more to come...

## Features

What can do jQuery Form Preview? Hmm, it can do a lot of things, but everything is depends on your imagination.

## Usage

This plugin is really easy to use.

### $(element).preview(options)

What we've got here? This is the core of jQuery plugin. Here's the syntax of this function:

```js
$('#id').preview({
	form   : 'article > form',
	fields : 'input, select',
	event  : 'change',
	init   : function (preview) {
		// Code related to preview before setup should be executed here
	},
})
```

So what's those arguments about?

* `#id` - Desired element which is your target, basically, the ~~div~~ any element that contains previewed markup. See **Markup** section
* `form: 'article > form'` - Form which is going to be used, only one form allowed per preview, **required option**.
* `fields: 'input, select',` - Which form elements you want in form to be *parsed*. Default: `'input, textarea, select'`.
* `event: 'change'` - Which event would trigger preview. Default: `'input'`.
* `init: function (preview) {}` - Initialization callback, add processors if you need to on different fields.

### Preview.addProcessor(name, callback)

Need to process some values before previewing the data? Welcome to the processing 101 in Form Preview!

First argument is the `name` of the field, second argument is `callback` which will process the input. Example of `callback` that will capitalize `title` field before outputting:

```js
preview.addProcessor('title', function (name, value, input) {
	return value.toUpperCase();
});
```

`callback` takes three parameters:

* `name` - The same as first argument in `addProcessor` method. That's in case if you need the name of the field, but you want to avoid repetition and follow DRY principle.
* `value` - Value of `name` field before passed to you before previewing.
* `input` - Plain object of other values, in case if your value should depend on other field value.

### Markup

In this version, you need to specify markup for preview to be filled in HTML.
jQuery Form Preview plugin supports three data-* attributes to help you build previews.

In the `#id` element you should put desired HTML with following attributes:

* `data-preview="field"` - Field which will be used to fill information inside of the element (`.html()` is used for non attribute fields). **Required attribute** in order to make work other data-* attributes.
* `data-attr="attribute"` - Specify attribute to fill values in attribute instead of content. **Only one attribute** is supported yet.
* `data-pattern="Peter %s pattern %s"` - If you need not just output, but also a label in front of it, or you want to use the value twice or three times, then this it is a job for *super-pattern-man*. Use `%s` to insert your value. data-pattern **works with** data-preview as well as with data-attribute.

That's it! Thank you for attention, fellows!

## License

Hmm, usually in this section there's a license. Here's MIT license for you:

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