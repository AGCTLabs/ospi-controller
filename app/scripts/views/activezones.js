define(['vendor/text!tmplts/activezones.html',
 ], function(template) {

  var ActiveZonesView = Backbone.View.extend({
    template: _.template(template),

    events: {
       'click #zshutall':  'shutAll'
    },

    initialize: function(options) {

      var self = this;
      this.app = options.app;
      this.render();
    },

    render: function() {
      var models = this.app.activeZones.models;

      if (models && models.length) {
        this.$el = $(this.template({data: models}));
        $('#tb1').append(this.$el);
      }
    },

    shutAll: function() {
      this.app.shutAllValves();
    }
    
  });

  return ActiveZonesView;
});
