define(
 function() {
  (function( $ ) {
    var methods = {
      init : function( options ) { 
        options || (options = {});
        this.type = options.type;
        this.type = this.type || 'info';
        console.log(this.type);

        return this; 
      },
      show : function( options ) {
        options || (options = {});
        var type = options.type || 'info';
        var msg = options.msg || 'Message';
        var fadeOut = options.fadeOut || true;

        var that = this;
        if (this.length == 0) {
          that = $('<div id="galert"/>');
          $('body').append(that);
        }
        that.removeClass();
        switch (type) {
         case 'info':
         that.addClass('alert-info');
         break;
         case 'warning':
         that.addClass('alert-block');
         break;
         case 'error':
         that.addClass('alert-error');
         break;
         case 'success':
         that.addClass('alert-success');
         break;
       }
       that.addClass('alert feedback');
       that.text(msg);
       that.append('<button type="button" class="close" data-dismiss="alert">&times;</button>');
       that.show();
       if (fadeOut == true) {
        window.setTimeout(function() {
          that.fadeOut(3000);
        }, 6000);
       }

      return that;
    },
    hide : function( ) { 
          // GOOD
          this.hide();

          return this;
        },
        update : function( content ) { 
          // !!! 
          return this;
        }
      };

      $.fn.feedback = function( method ) {

      // Method calling logic
      if ( methods[method] ) {
        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.feedback' );
      }    
    };
  })( jQuery );
});