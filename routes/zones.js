var _  = require('underscore');
var controller =  null;


var ValidationException = function(opt) {
    this.opt = opt;
}

ValidationException.prototype = new Error();

ValidationException.prototype.getMessage = function() {
    return this.opt.message || '';
}

ValidationException.prototype.getHttpCode = function() {
    return this.opt.httpCode || '400';
}

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

validateAndSanitizeZone = function(zone) {

  if (zone.station == null || zone.station === '') {
    throw new ValidationException(
        {message: "Station for zone cannot be null or empty. It must be a valid value between 0 and 15.",
        httpCode: 400});
  }

  if (typeof zone.active === 'undefined'  
                || zone.active == null) {
    zone.active = 'Yes';
  }

  console.log('Before one: ' + JSON.stringify(zone));
  zone.station = parseInt(zone.station);
  console.log('After zone: ' + JSON.stringify(zone));

  for (var i = 0; i < controller.zones.length; i++) {
    if (zone.station == controller.zones[i].station
        &&
        zone.id != controller.zones[i].id) {
        throw new ValidationException(
        {message: 
            "Zone station "+zone.station +" already assigned and used by "
            +controller.zones[i].name,
        httpCode: 400});
    }
  }
  
}

exports.addZone = function(req, res) {
    var zone = req.body;
    delete zone.id;

    try {
        validateAndSanitizeZone(zone);
    } catch(ex) {
        if (ex instanceof ValidationException) {
            res.status(ex.getHttpCode()).send(ex.getMessage());
            return;
        }
    }

    zone.id = controller.getNextId();
    console.log('Adding zone: ' + JSON.stringify(zone));
    controller.zones.push(zone);
    controller.save();
    res.send(zone);
}

exports.updateZone = function(req, res) {
    var id = req.params.id;
    var zone = req.body;

    try {
        validateAndSanitizeZone(zone);
    } catch(ex) {
        if (ex instanceof ValidationException) {
            res.status(ex.getHttpCode()).send(ex.getMessage());
            return;
        }
    }

    var zone2Upd = null;
    console.log('Updating zone: ' + id);
    console.log(JSON.stringify(zone));

    for (var i = 0; i < controller.zones.length; i++) {
        if (controller.zones[i].id == id) {
            zone2Upd = controller.zones[i];
            console.log(JSON.stringify(zone2Upd));
            if (zone.name) {
                zone2Upd.name = zone.name;
            }
            zone2Upd.description = zone.description;
            zone2Upd.active = zone.active;
            res.send(zone2Upd);
            controller.save();
            return;
        } 
    }
    res.status(404).send('Not found');    
}

exports.deleteZone = function(req, res) {
    var id = req.params.id;
    console.log('Deleting zone: ' + id);
    var zone2Del = null;
    for (var i = 0; i < controller.zones.length; i++) {
        zone2Del = controller.zones[i];
        if (controller.zones[i].id == id) {

           controller.zones.splice(i, 1);
           res.send(zone2Del);
           controller.save();
           return;
        } 
    }

    res.status(404).send('Not found');
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




