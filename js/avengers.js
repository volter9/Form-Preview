$(function () {
	$.ajax({
		url: 'js/avengers.json',
		datatype: 'json',
		success: function (data) {
			fillAvenger(data.avengers);
		},
	})
	
	/**
	 * Fill avenger in form
	 * 
	 * @param {Object} avengers
	 */
	function fillAvenger (avengers) {
		var keys = Object.keys(avengers);
		var random = keys[(Math.random() * keys.length) >> 0];
	
		var avenger = avengers[random];
	
		$('#avenger-form').find('input, select, textarea').each(function () {
			var $this = $(this);
		
			var name = $this.attr('name');
		
			if (avenger[name]) {
				$this.val(avenger[name]);
			}
		});
		
		$('#avenger-preview').preview({
			form : '#avenger-form',
			init : function (preview) {
				/**
				 * Callback which turns textarea input into li's
				 * 
				 * @param {String} name
				 * @param {String} value
				 */
				var list = function (name, value) {
					var lis = value.split('\n');
			
					lis = lis.map(function (val) {
						if (val.trim() === '') {
							return '';
						}
				
						return '<li>' + val + '</li>'
					});
			
					return lis.join('\n');
				};
		
				preview.addProcessor('pros', list);
				preview.addProcessor('cons', list);
			}
		});
	}
});