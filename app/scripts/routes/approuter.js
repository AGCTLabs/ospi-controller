define(['backbone'], function(Backbone) {

  var AppRouter = Backbone.Router.extend({

    "routes": {
      "zhs/:zoneId"  : "zoneHandler"   
    },

    initialize: function(args) {
      this.app = args.app;
    },

    zoneHandler : function(zoneId) {
      this.app.viewState.set('zone2Show',zoneId);
    }

  });

  return AppRouter;
});
