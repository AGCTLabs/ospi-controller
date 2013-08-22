var fs = require('fs')
  , util = require('util')
  , events = require('events')
  , mkdirp = require('mkdirp')
  , path = require('path');
 
// 00 to 59 secs/mins
var MINS_SECS = /^([0-5]*[0-9]) +(sec|secs|min|mins)$/i;

var ConfigManager = function (fileName) {
  events.EventEmitter.call(this);
  
  if (fileName ==='' || typeof fileName === 'undefined') {
    fileName = path.join(__dirname, '../config.json');
  }
  this.fileName = fileName;
  var dir = path.dirname(this.fileName);
  mkdirp.sync(dir);

  try {
    stats = fs.lstatSync(this.fileName);
    if (!stats.isFile()) {
      throw Error('invalid config filename');
    }
  } catch(e) {
    fs.openSync(this.fileName, 'w');
  }

  this.config = {};
};

util.inherits(ConfigManager, events.EventEmitter);
 
ConfigManager.prototype.init = function () {
  var self = this;

  var validateConfig = function (config) {

  }

  var loadConfig = function () {
     fs.readFile(self.fileName, 'utf8', function(err, data) {
       if (err) 
         throw err;

       var config;
       if (data === '') {
        config = {"zones":[]};
       } else {
        config = JSON.parse(data);
       }
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

ConfigManager.prototype.save = function(config) {

  fs.writeFile(this.fileName, JSON.stringify(config, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to ");
    }
  });
   
};
 
module.exports = ConfigManager;
 
if (! module.parent) {
  cm = new ConfigManager();
  cm.init();
  cm.on('config_loaded', function() {
  });
}
