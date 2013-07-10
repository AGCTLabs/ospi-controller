var _  = require('underscore');
var controller =  null;

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving zone: ' + id);

    for (var i = 0; i < controller.zones.length; i++) {
        if (controller.zones[i].id == id) {
            res.send(controller.zones[i]);
            return;
        } 
    }

    res.status(404).send('Not found');
};

exports.findAll = function(req, res) {
    res.send(controller.getZones());
};

exports.addZone = function(req, res) {
    var zone = req.body;

    zone.id = controller.zones.length;
    console.log('Adding zone: ' + JSON.stringify(zone));
    controller.zones.push(zone);

    res.send(zone);
}

exports.updateZone = function(req, res) {
    var id = req.params.id;
    var zone = req.body;
    delete zone._id;
    console.log('Updating zone: ' + id);
    console.log(JSON.stringify(zone));

    var zone2Upd = null;

    for (var i = 0; i < controller.zones.length; i++) {
        if (controller.zones[i].id == id) {
            zone2Upd = controller.zones[i];
            if (zone.name) {
                zone2Upd.name = zone.name;
            }
            if (zone.description) {
                zone2Upd.description = zone.description;
            }
            if (zone.station) {
                zone2Upd.station = zone.station;
            }
            if (zone.notes) {
                zone2Upd.notes = zone.notes;
            }
            break;
        } 
    }
    res.send(zone2Upd);

}

exports.deleteZone = function(req, res) {
    var id = req.params.id;
    console.log('Deleting zone: ' + id);

    for (var i = 0; i < controller.zones.length; i++) {
        if (controller.zones[i].id == id) {
           controller.zones.splice(i, 1);
        } 
    }

    res.send();
}

exports.setup = function(options) {

    var app = options.app;
    controller = options.controller;

    app.get('/zones', exports.findAll);
    app.get('/zones/:id', exports.findById);

    app.post('/zones', exports.addZone);
    app.put('/zones/:id', exports.updateZone);
    app.delete('/zones/:id', exports.deleteZone);

};




