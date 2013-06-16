define(['vendor/text!tmplts/subnav.html', 'backbone'], 
    function(template, Backbone) {

var SubNav = Backbone.View.extend({
    tagName: 'ul',
    className: 'nav nav-pills',
    template: _.template(template),

    initialize: function(args) {
      this.app = args.app;
      this.render();
      this.app.viewState.on("change:zone2Show", this.selectNav, this);
    },

    render: function() {
      $('#menu2').empty();
      for (var i = 0; i < this.app.data.length; i++) {
        var li = $(this.template(this.app.data[i]));
        if (i == this.app.viewState.get('zone2Show')) {
          li.addClass('active');
        }
        this.$el.append($(li));
      };
      $('#menu2').append(this.$el);
    },
   
    selectNav: function() {
      this.$el.find('.active').removeClass('active');
      var zone2Show = this.app.viewState.get('zone2Show');
      this.$el.find('li:eq('+zone2Show+')').addClass('active');
    }
  });

  return SubNav;
});
