define(['vendor/text!tmplts/modalmsg.html'], 
    function(ModalMsgTmplt) {

  var Utils = function() {
    this.template = _.template(ModalMsgTmplt);
    this.showMessage = function(options) {
      var $el = $(this.template(options));
      $('#modalMsg').remove();
      $('body').append($el);
      $el.modal('show');
    };

    this.showFeedback = function(options) {
      $('#galert').feedback('show',options);
    }
  };

  return new Utils()
});