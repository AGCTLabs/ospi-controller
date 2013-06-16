define(['backbone', 'routes/approuter', 'models/viewstate','views/subnav', 'views/content', 'views/activezones'], 
  function(Backbone, AppRouter, ViewState, SubNavView, ContentView, ActiveZonesView) {

  var App = Backbone.View.extend({

    initialize: function() {
      var that = this;
      this.appRouter = new AppRouter({app:this});
      this.viewState = new ViewState();

      Backbone.history.start();

      $.getJSON( '/zones', function( data ) {
        that.data = data;
        if (data && data.length) {
          var zone2Show = that.viewState.get('zone2Show');
          if (zone2Show == '-1')
            zone2Show = '0'

          that.viewState.set('zone2Show', zone2Show, {silent:true});

          that.subNavView = new SubNavView({app: that});
          that.contentView = new ContentView({app:that});

          if (that.data && that.data.length >0) {
            that.activeZonesView = new ActiveZonesView({app:that});
          }
        }
      });
    },

    render: function() {
      
    },

    shutAllValves : function() {
      this.contentView.shutValve();
      for (var i = 0; i < this.data.length; i++) {
        delete this.data[i].valve_open;
      };
      this.viewState.shutAllValves();
    }

  });

  return App;
});
