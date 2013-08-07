var ConfigManager = require('./config_manager');
var _      = require('underscore')
  , util   = require('util')
  , events = require('events');

var OspiController = function (options) {
  var self = this;
  events.EventEmitter.call(this);

  var init = function(options) {
  
   self.configManager = new ConfigManager(options.fileName);
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

  console.log(this.state);
  
  for (var i = 0; i < this.zones.length; i++) {
    if (this.zones[i].id == zoneId) {
      this.zones[i].valve_open = true;
      this.zones[i].open_time = new Date();

      var mask = 1 << (this.zones[i].station - 1);
      this.state |= mask; // Set the bit
      break;
    } 
  }
  console.log(this.state);
}

OspiController.prototype.shut = function(zoneId) {

  for (var i = 0; i < this.zones.length; i++) {
    if (zoneId == undefined || this.zones[i].id == zoneId) {
      delete this.zones[i].valve_open;
      console.log('------------------');
      console.log(this.state);
      var mask = 1 << (this.zones[i].station - 1); // unset the bit
      this.state &= ~mask;
      console.log(this.state);
      console.log('------------------');

      if (zoneId)
        break;

    } 
  }
}

module.exports = OspiController;

if (! module.parent) {
  var controller = new OspiController();
  controller.on('start', function() {
    console.log(controller.state);
    controller.open(1);
    console.log(controller.state);
    controller.open(4);
    console.log(controller.state);
    console.log(controller.getActiveZones());
    controller.shut(1);
    console.log(controller.state);
    console.log(controller.getActiveZones());
    console.log(controller.state);
  });
}
