define(['backbone'], function(Backbone) {

	var ViewState = Backbone.Model.extend({
	  defaults: {
		"zone2Show" : -1,
		"openValves" : ''
	  },

	  openValve : function(zone) {
	  	zone += '';
	  	var openValves = this.get('openValves');
	  	var zones =  openValves && openValves.split(",") || [];
	  	if (openValves == '') {
	  		this.set('openValves',zone);
	  	} else if ( _.indexOf(zones, zone) == -1 ) {
	  		this.set('openValves',zones+','+zone);
	  	}
	  },

	  shutValve : function(zone) {
	  	zone += '';
	  	var openValves = this.get('openValves');
	  	var zones =  openValves && openValves.split(",") || [];
	  	
	  	if (zones.length && _.indexOf(zones, zone != -1)) {
	  		var nzones = _.without(zones,zone);
	  		var newval = '';
	  		for (var i = 1; i < nzones.length; i++) {
	  			newval += ',' + nzones[i];
	  		};
	  		if (nzones.length) {
	  			newval = nzones[0] + newval;
	  		}
	  		this.set('openValves',newval);
	  	}
	  },

	  shutAllValves : function() {
        this.set('openValves','');
        
	  }

	});

	return ViewState;
});