/**
 *  jQuery Avgrund Popin Plugin
 *  Inspired by concept in vanilla js - https://github.com/hakimel/Avgrund/
 * 
 *  MIT licensed, (c) 2012 http://pixelhunter.me/
 */

(function($) {
	$.fn.avgrund = function(options) {
		var defaults = {
			width               : 380,
			height              : 280,
			showClose           : false,
			showCloseText       : '',
			closeByEscape       : true,
			closeByDocument     : true,
			holderClass         : '',
			overlayClass        : '',
			enableStackAnimation: false,
			onBlurContainer     : '',
			template            : '<p>This is test popin content!</p>'
		};
		var options = $.extend(defaults, options);

		return this.each(function() {
			var $body = $('body');

			$body
			  .addClass('avgrund-ready')
			  .append('<div class="avgrund-overlay ' + options.overlayClass + '"></div>')
			  .append('<div class="avgrund-popin ' + options.holderClass + '">' + options.template + '</div>');

			$('.avgrund-popin').css({
				'width'      : options.width + 'px',
				'height'     : options.height + 'px',
				'margin-left': '-' + (options.width / 2 + 10) + 'px',
				'margin-top' : '-' + (options.height / 2 + 10) + 'px'
			});

			if (options.showClose == true) {
				$('.avgrund-popin').append('<a href="#" class="avgrund-close">' + options.showCloseText + '</a>');
			}

			if (options.enableStackAnimation == true) {
				$('.avgrund-popin').addClass('stack');
			}

			if (options.onBlurContainer != '') {
				$(options.onBlurContainer).addClass('avgrund-blur');
			}
			
			// close popup by clicking Esc button
			function onDocumentKeyup(e) {
				if (options.closeByEscape == true) {
					if (e.keyCode === 27) {
						deactivate();
					}
				}
			}
			
			// close popup by clicking outside it
			function onDocumentClick(e) {
				if (options.closeByDocument == true) {
					if ($(e.target).is('.avgrund-overlay, .avgrund-close')) {
						deactivate();
					}
				} else {
					if ($(e.target).is('.avgrund-close')) {
						deactivate();
					}	
				}
			}

			// show popup
			function activate() {
				$body
				  .bind('keyup', onDocumentKeyup)
				  .bind('click', onDocumentClick)
          .addClass('avgrund-active');
			}

			// hide popup
			function deactivate() {
				$body
				  .unbind('keyup', onDocumentKeyup)
				  .unbind('click', onDocumentClick)
          .removeClass('avgrund-active');
			}

			// init on click
			$(this).click(function(e) {
				e.stopPropagation();
				activate();
			});
		});

	}
})(jQuery)