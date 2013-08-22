define([
  'views/plugins',
  'routes/approuter',
  'models/zone',
  'collections/zones', 
  'views/zone', 
  'views/zones', 
  'views/zoneaction', 
  'collections/activezones',
  'views/activezones'], 
  function(
    Plugins,
    AppRouter, 
    Zone,
    Zones, 
    ZoneView,
    ZonesView, 
    ZoneActionView, 
    ActiveZones,
    ActiveZonesView) {

  var App = Backbone.View.extend({

    initialize: function() {
      this.zonesLoaded = $.Deferred();
      
      this.appRouter = new AppRouter({app:this});
      Backbone.history.start();

      this.initActiveZones();
      this.initZoneActions();
    },

    initActiveZones: function() {
      this.activeZonesLoaded = $.Deferred();
      var self = this;

      this.activeZones = new ActiveZones();      
      this.activeZones.fetch({success: function() {
        self.activeZonesLoaded.resolve();
      }});
      
      this.activeZonesLoaded.then(function() {
        self.showActiveZones();
      });
    },

    initZoneActions: function() {
      var self = this;
      this.zones = new Zones();      
      this.zones.fetch({success: function() {
        self.zonesLoaded.resolve();
      }});

      this.zonesLoaded.then(function(){
        if (!self.curView) {
          self.showZoneActions(self.zones.models[0]);
        }
      });
    },

    render: function() {
      
    },

    reloadZones : function() {
      var self = this;
      var curZone;
      if (this.zoneActionView) {
        curZone = this.zoneActionView.model;
      }
      this.zonesLoaded = $.Deferred();
      this.zones = new Zones();      
      this.zones.fetch({success: function() {
        self.zonesLoaded.resolve();
      }});
      this.zonesLoaded.then(function() {
        var zone = self.getZone(curZone.get('id'),self.zones.models[0]);
        self.showZoneActions(zone);
      });
    },

    getZone: function(zoneId, defaultVal) {
      for (var i =0; i < this.zones.models.length; i++) {
        if (zoneId == this.zones.models[i].get('id')) {
          return this.zones.models[i];
        }
      }

      return defaultVal;
    },

    addZone: function() {
      var zone = new Zone();
      var addZoneView = new ZoneView({app : this, model:zone});
      this.curView  = addZoneView;
    },

    showZoneDetails: function(zone) {
      var zoneView = new ZoneView({app : this, model:zone});
      this.curView  = zoneView;
    },

    showZoneActions: function(zone) {
      if (this.zonesView) {
        this.zonesView.remove();
      }

      this.zonesView = new ZonesView({app: this});
      this.curView  = this.zonesView;

      if (this.zones.models.length > 0) {
        this.zonesView.selectNav(zone.get('id'));

        if (this.zoneActionView) {
          this.zoneActionView.remove();
        }
        this.zoneActionView = new ZoneActionView({app: this, model:zone});
      }
    },

    showActiveZones : function() {
      this.activeZonesView = new ActiveZonesView({app:this});
    },

    shutAllValves : function() {
      var self = this;
      $.ajax({
        url: "/ctrl/close"
      }).done(function() {
        self.activeZonesView.remove();
        self.reloadZones();
        self.initActiveZones();

      }).fail(function() {
        // show error
      });
    },

    openValve : function(zoneId) {
      var self = this;
      $.ajax({
        url: "/ctrl/open/"+zoneId
      }).done(function() {
        self.activeZonesView.remove();
        self.reloadZones();
        self.initActiveZones();
      }).fail(function() {
        // show error
      })
    },

    shutValve : function(zoneId) {
      var self = this;
      $.ajax({
        url: "/ctrl/close/"+zoneId
      }).done(function() {
        self.activeZonesView.remove();
        self.reloadZones();
        self.initActiveZones();
      }).fail(function() {
        // show error
      })
    }
  });

  return App;
});
