var ConfigManager = require('./config_manager');
var _      = require('underscore')
  , util   = require('util')
  , ospi = require('ospi')
  , events = require('events');

var OspiController = function (options) {
  var self = this;
  events.EventEmitter.call(this);

  var init = function(options) {
   self.configManager = new ConfigManager(options.configFile);
   self.configManager.init();
   self.configManager.on('config_loaded', function () {
     self.reset();
     self.emit('start');
   });
  };
  
  this.zones = [];
  init(options || {});
};

util.inherits(OspiController, events.EventEmitter);

OspiController.prototype.reset = function () {
  this.zones =  _.extend(this.configManager.config.zones);
  this.state = 0;
}

OspiController.prototype.getZones = function() {
  return this.zones;
}

OspiController.prototype.getNextId = function() {
  var id = 0; 
  for (var i = 0; i < this.zones.length; i++) {
      if (this.zones[i].id >= id)
        id = this.zones[i].id  + 1;
  }

  return id;
}

OspiController.prototype.getActiveZones = function() {
  var activeZones = [];
  for (var i = 0; i < this.zones.length; i++) {
    if (this.zones[i].valve_open) {
      activeZones.push(this.zones[i]);
    }
  }
  return activeZones;
}

OspiController.prototype.save = function() {
  var zones = _.extend(this.zones);
  _.each(zones, function(item) {
    delete item.valve_open;
  });

  var config = {"zones": zones};
  this.configManager.save(config);
}

OspiController.prototype.open = function(zoneId) {
  for (var i = 0; i < this.zones.length; i++) {
    if (this.zones[i].id == zoneId) {
      this.zones[i].valve_open = true;
      this.zones[i].open_time = new Date();

      ospi.on(this.zones[i].station);

      var mask = 1 << (this.zones[i].station);
      this.state |= mask; // Set the bit
      break;
    } 
  }
}

OspiController.prototype.shut = function(zoneId) {

  if (typeof zoneId === 'undefined') {
    ospi.off();
    for (var i = 0; i < this.zones.length; i++) {
      delete this.zones[i].valve_open;
    }
    return;
  }

  for (var i = 0; i < this.zones.length; i++) {
    if (this.zones[i].id == zoneId) {
      delete this.zones[i].valve_open;

      ospi.off(this.zones[i].station);

      var mask = 1 << (this.zones[i].station); // unset the bit
      this.state &= ~mask;
      break;
    } 
  }
}

module.exports = OspiController;

if (! module.parent) {
  var controller = new OspiController();
  controller.on('start', function() {
    controller.open(1);
    controller.open(4);
    controller.shut(1);
  });
}
