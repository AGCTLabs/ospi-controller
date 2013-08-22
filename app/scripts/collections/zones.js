define(['models/zone'], function(Zone) {

	var Zones = Backbone.Collection.extend({
    model: Zone,
    url: "/zones"
	});
	
	return Zones;
});