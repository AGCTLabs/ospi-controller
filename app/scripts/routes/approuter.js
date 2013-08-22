define([],function() {

  var AppRouter = Backbone.Router.extend({

    "routes": {
      "zones/add"      : "addZone",   
      "zones/:zoneId"  : "showZoneDetails",
      "zhs/:zoneId"    : "showZoneActions",
      "/"              : "show"
    },

    initialize: function(args) {
      this.app = args.app;
    },

    addZone : function() {
      if (this.app.zonesView)
        this.app.zonesView.remove();

      this.app.addZone();
    },

    show : function() {
      console.log('show');
    },

    showZoneDetails : function(zoneId) {
      if (this.app.zones && zoneId) {
        var model = this.app.zones.get(zoneId);
        this.app.showZoneDetails(model);
      }
    },
    
    showZoneActions : function(zoneId) {
      var self = this;
      this.app.zonesLoaded.then(function() {
        var model = self.app.zones.get(zoneId);
        self.app.showZoneActions(model);
      });
    }
  });

  return AppRouter;
});
