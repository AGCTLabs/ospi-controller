var _  = require('underscore');
var controller =  null;

exports.stats = function(req, res) {
    res.send({"timestamp": new Date()});
};

exports.open = function(req, res) {
    var zoneId = req.params.id;
    console.log('Open Zone: ' + zoneId);
    controller.open(zoneId);

    res.send();
};

exports.close = function(req, res) {
    var zoneId = req.params.id;
    console.log('Close Zone: ' + zoneId);
    controller.shut(zoneId);
    res.send();
};

exports.closeAll = function(req, res) {
    console.log('Close All Zones: ');
    controller.shut();
    res.send();
}

exports.active = function(req, res) {
   res.send(controller.getActiveZones());
}


exports.setup = function(options) {
    var app = options.app;
    controller = options.controller;

    app.get('/ctrl/stats', exports.stats);
    app.get('/ctrl/open/:id', exports.open);
    app.get('/ctrl/close/:id', exports.close);
    app.get('/ctrl/close', exports.closeAll);
    app.get('/ctrl/active', exports.active);
};