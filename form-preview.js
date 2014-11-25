/**
 * jQuery data form preview plugin.
 *
 * @author volter9
 * @copyright volter9 (c) 2014
 * @license MIT
 * @website https://github.com/Volter9/jQuery-Form-Preview
 * @version 0.1
 */
(function ($) {	
	/**
	 * Hmm, I'm not sure, but maybe somebody already using my functions names.
	 * Let's see how it will work out.
	 */
	if (typeof $.fn.preview === 'function' ||
		typeof $.fn.extract === 'function') {
		throw new Error('$.fn.preview or $.fn.extract is already defined!');
	}
	
	/**
	 * Removes any HTML from input
	 *
	 * @param {String} input
	 * @return {String}
	 */
	function textify (input) {
		return $('<span>').text(input).html();
	}
	
	/**
	 * Preview constructor.
	 * 
	 * @param {Object} options
	 */
	function Preview (options) {
		this.target   = options.target;
		this.form     = $(options.form).first();
		this.fields   = this.form.find(options.fields);
		this.event    = options.event;
		
		this.initiated  = false;
		this.data       = {};
		this.processors = {};
		
		options.init(this);
		
		this.setup();
	}
	
	/**
	 * @var {string} version - Version of jQuery Form Preview plugin
	 */
	Preview.prototype.version = 'v0.1';
	
	Preview.prototype.constructor = Preview;
	
	/**
	 * Setup method.
	 * Sets all events and assemble preview.
	 *
	 * Note: _this is for Preview object, $this is for jQuery routines
	 */
	Preview.prototype.setup = function () {
		if (this.initiated) {
			return;
		}
		
		var _this = this;
		
		this.fields.on(this.event, function () {
			var $this = $(this);
			
			var data = $this.extract();
			
			if (!data) {
				return;
			}
			
			data.value = _this.process(data.name, data.value);
			
			_this.update(data.name, data.value);
			_this.preview(data.name);
		});
		
		this.collect();
		this.preview();
	};
	
	/**
	 * Process the given name and value.
	 * 
	 * @param {String} name
	 * @param {String} value
	 */
	Preview.prototype.process = function (name, value) {
		var oldValue  = value;
		var processor = this.processors[name];
		
		value = textify(data.value);
		
		if (processor) {
			value = processor(name, value, this.data);
		}
		
		if (value === undefined) {
			value = oldValue;
		}
		
		return value;
	};
	
	/**
	 * Following method collects data from input.
	 */
	Preview.prototype.collect = function () {
		var _this = this;
		
		this.fields.each(function () {
			var $this = $(this);
			
			var data = $this.extract();
			
			data.value = _this.process(data.name, data.value);
			
			if (data) {
				_this.update(data.name, data.value);
			}
		});
	};
	
	/**
	 * Updating collected data
	 * 
	 * @param {String} name
	 * @param {String} value
	 */
	Preview.prototype.update = function (name, value) {
		if ( !name ) {
			return false;
		}
		
		this.data[name] = value;
	};
	
	/**
	 * Preview 
	 * 
	 * @param {String} field
	 */
	Preview.prototype.preview = function (field) {
		if ( !field ) {
			var _this = this;
			
			$.each(this.data, function (property) {
				_this.preview(property);
			});
			
			return;
		}
		
		var value = this.data[field];
		var element = this.target.find('[data-preview=' + field + ']');
						
		var attribute = element.attr('data-attr'),
			pattern   = element.attr('data-pattern');
		
		if (pattern) {
			value = pattern.replace(/%s/g, value);
		}
		
		if (!attribute) {
			element.html(value);
		}
		else {
			element.attr(attribute, value);
		}
	};
	
	/**
	 * Add processor for specific field.
	 * 
	 * @param {String} name
	 * @return {void|Boolean}
	 */
	Preview.prototype.addProcessor = function (name, callback, force) {
		if ( this.processors[name] && !force ) {
			return false;
		}
		
		this.processors[name] = callback;
	};
	
	/**
	 * Utility function for form elements.
	 * Use it to extract object with name and value properties form element.
	 * 
	 * @return {Object|Boolean}
	 */
	$.fn.extract = function () {
		var attribute = this.attr('name');
		
		if ( !attribute ) {
			return false;
		}
		
		return {
			name  : attribute,
			value : this.val()
		};
	};
	
	/**
	 * Preview form.
	 * Required fields: form
	 * 
	 * @param {Object} options - list of options
	 * @return {Preview}
	 */
	$.fn.preview = function (options) {
		if ( typeof options.form !== 'string' ) {
			throw new TypeError('Option "form" must be a string. Given: ' + typeof options.form);
		}
		
		var byDefault = {
			fields   : 'input, textarea, select',
			event    : 'input',
			init     : function () {}
		};
		
		options = $.extend(byDefault, options);
		options.target = this;
		
		var preview = new Preview(options);
		
		return preview;
	};
	
})(jQuery);