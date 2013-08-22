define(['models/activezone'], function(ActiveZone) {

  var ActiveZones = Backbone.Collection.extend({
    model: ActiveZone,
    url: "/ctrl/active"
  });
  
  return ActiveZones;
});