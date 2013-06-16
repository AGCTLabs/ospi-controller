define(['vendor/text!tmplts/activezones.html', 'backbone'], 
                    function(template, Backbone) {

  var ActiveZones = Backbone.View.extend({
    template: _.template(template),

    el: '#tb1',
    events: {
       'click #zshutall':  'shutAll'
    },

    initialize: function(args) {
      var that = this;
      this.app = args.app;
      this.app.viewState.on("change:openValves", this.render, this);
    },

    render: function() {
      this.$el.find('#activezones').remove();

      var openValves = this.app.viewState.get('openValves');
      var zones =  openValves ? openValves.split(",") : [];
      var data = [];

      for (var i = 0; i < this.app.data.length; i++) {
        var id = '' + this.app.data[i].id;
        if (_.indexOf(zones, id) != -1) {
          data.push(this.app.data[i]);
        }
      };

      if (data && data.length) {
        var li = this.template({data: data});
        this.$el.append($(li));
      }
    },

    shutAll: function() {
      this.app.shutAllValves();
    }
    
  });

  return ActiveZones;
});
