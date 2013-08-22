define([], function() {

  var ActiveZone = Backbone.Model.extend({

    urlRoot: "/ctrl/active",
    idAttribute: "id"
  });

  return ActiveZone;
});