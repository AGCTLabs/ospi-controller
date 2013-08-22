define([], function() {

	var Zone = Backbone.Model.extend({

		urlRoot: "/zones",

    idAttribute: "id",

		defaults: {
			id: null,
			name: '',
			description: '',
			station: 0,
			active: 'Yes'
		},

    validate: function(attrs, options) {
	    if (attrs.name.length <= 0) {
	      return "You must enter a name";
	    }
	    if (attrs.station < 0 || attrs.station > 15) {
	    	return "Invalid station. Valid values are between 0 and 15";
	    }
  	},
	});

	return Zone;
});