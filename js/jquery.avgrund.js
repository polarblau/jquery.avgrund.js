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
      onBlurContainer     : ''
    };
    var options = $.extend(defaults, options);

    return this.each(function() {
      var $this   = $(this),
          $body   = $('body');
      
      // has this plugin be called before? if yes, re-use some stuff
      if ($body.hasClass('avgrund-ready')) {
        $dialog = $('body > .avgrund-popin');
        
      } else {
        $dialog = $('<div class="avgrund-popin ' + options.holderClass + '"></div>');
        $body
          .addClass('avgrund-ready')
          .append('<div class="avgrund-overlay ' + options.overlayClass + '"></div>')
          .append($dialog);
      }
      
      $('.avgrund-popin').css({
        'width'     : options.width + 'px',
        'height'    : options.height + 'px',
        'marginLeft': '-' + (options.width / 2 + 10) + 'px',
        'marginTop' : '-' + (options.height / 2 + 10) + 'px'
      });

      if (options.showClose === true) {
        $dialog.append('<a href="#" class="avgrund-close">' + options.showCloseText + '</a>');
      }

      if (options.enableStackAnimation === true) {
        $dialog.addClass('stack');
      }

      if (options.onBlurContainer != '') {
        $(options.onBlurContainer).addClass('avgrund-blur');
      }
      
      // close popup by clicking Esc button
      function onDocumentKeyup(e) {
        if (options.closeByEscape === true && e.keyCode === 27) {
          hide();
        }
      }
      
      // close popup by clicking outside it
      function onDocumentClick(e) {
        if (options.closeByDocument === true && $(e.target).is('.avgrund-overlay') ||
            $(e.target).is('.avgrund-close')) {
            hide();
        }      
      }

      // show popup
      function show(content) {
        $dialog.append(content);
        $body
          .on('keyup', onDocumentKeyup)
          .on('click', onDocumentClick)
          .addClass('avgrund-active');
      }

      // hide popup
      function hide() {
        $body
          .off('keyup', onDocumentKeyup)
          .off('click', onDocumentClick)
          .removeClass('avgrund-active');
      }
      
      show($this);
        
    });

  }
})(jQuery)