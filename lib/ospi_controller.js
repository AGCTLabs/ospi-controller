var ConfigManager = require('./config_manager');
var _      = require('underscore')
  , util   = require('util')
  , events = require('events');

var OspiController = function () {
  var self = this;
  events.EventEmitter.call(this);

  var init = function() {
   self.configManager = new ConfigManager();
   self.configManager.init();
   self.configManager.on('config_loaded', function () {
     self.reset();
     self.emit('start');
   });
  };
  
  this.zones = [];
  init();
};

util.inherits(OspiController, events.EventEmitter);

OspiController.prototype.reset = function () {
  this.zones =  _.extend(this.configManager.config.zones);
}

OspiController.prototype.getZones = function() {
  return this.zones;
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

OspiController.prototype.open = function(zoneId) {
  
  for (var i = 0; i < this.zones.length; i++) {
    if (this.zones[i].id == zoneId) {
      this.zones[i].valve_open = true;
      this.zones[i].open_time = new Date();
      return true;
    } 
  }

  return false;
}

OspiController.prototype.shut = function(zoneId) {
  var ret = false;

  for (var i = 0; i < this.zones.length; i++) {
    if (zoneId == undefined || this.zones[i].id == zoneId) {
      delete this.zones[i].valve_open;
      ret = true;
      if (zoneId)
        break;
    } 
  }

  return ret;
}

module.exports = OspiController;


if (! module.parent) {
  var controller = new OspiController();
  controller.on('start', function() {
    controller.open(1);
    controller.open(4);
    console.log(controller.getActiveZones());
    controller.shut(4);
    console.log(controller.getActiveZones());
  });
}
