define(['vendor/text!tmplts/zones.html', 'vendor/text!tmplts/nozones.html'], 
    function(ZonesTmplt, NoZonesTmplt) {

var ZonesView = Backbone.View.extend({
  
    tagName: 'ul',
    className: 'nav nav-pills',
    template: _.template(ZonesTmplt),
    
    initialize: function(args) {
      this.app = args.app;
      this.render();
    },

    render: function() {
      var parentDiv = $('#mcontent').empty();
      var zones = this.app.zones.models;
      if (zones.length == 0) {
        this.$el = _.template(NoZonesTmplt);
      } else {
        for (var i = 0; i < zones.length; i++) {
          var li = $(this.template(zones[i].toJSON()));
          this.$el.append($(li));
        }
        this.$el = $('<div class="subnav"/>')
          .append(this.$el).append('<div id="zac"/>');
      }
      parentDiv.append(this.$el);
    },

    remove : function() {
      $('#mcontent').empty();
    },
   
    selectNav: function(zone2Show) {
      this.$el.find('.active').removeClass('active');
      this.$el.find('li[data-id='+zone2Show+']').addClass('active');
    }
  });

  return ZonesView;
});
