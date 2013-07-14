var fs = require('fs')
  , util = require('util')
  , events = require('events')
  , path = require('path');
 
// 00 to 59 secs/mins
var MINS_SECS = /^([0-5]*[0-9]) +(sec|secs|min|mins)$/i;

var ConfigManager = function (fileName) {
  
  events.EventEmitter.call(this);
  this.fileName = fileName || path.join(__dirname, '../config.json');
  this.config = {};
};

util.inherits(ConfigManager, events.EventEmitter);
 
ConfigManager.prototype.init = function () {
  var self = this;

  var validateConfig = function (config) {

    if (! config.schedulerInterval)
      throw new Error('scheduler interval missing.');
    var result = config.schedulerInterval.match(MINS_SECS);

    if (! result) 
      throw new Error('invlaid scheduler interval.');
  }

  var loadConfig = function () {
     fs.readFile(self.fileName, 'utf8', function(err, data) {
       if (err) 
         throw err;
      var config = JSON.parse(data);
      validateConfig(config);
      self.config = config;
      self.emit('config_loaded', config);
     });
  }

  var configCheck = function(mtime) {
    var stats = fs.statSync(self.fileName);
    var newMtime = stats.mtime.getTime();
    if (mtime == null || mtime != newMtime) {
        loadConfig();
    }

    setTimeout(configCheck, 5000, newMtime);
  }

  configCheck();
}

ConfigManager.prototype.getScheduleInterval = function() {
   return this.config.schedulerInterval;
};
 
module.exports = ConfigManager;
 
if (! module.parent) {
  cm = new ConfigManager();
  cm.init();
  cm.on('config_loaded', function() {
    console.log(cm.getScheduleInterval());
  });
}
