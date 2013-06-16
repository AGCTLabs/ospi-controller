#!/usr/bin/env node

var config = require("../config");
var fs = require("fs");
var util = require("util");

var configCheck = function(mtime) {

  var stats = fs.statSync("../config.json");
  var newMtime = stats.mtime.getTime();

  if (mtime != null && mtime != newMtime) {
    loadSchedule();
  } else {
    console.log("No Change");
  }
  
  setTimeout(configCheck, 5000, newMtime);
}

var loadSchedule = function() {
  console.log("Reload Schedule ");
}

console.log("Scheduler Type : " + config.schedulerType);
console.log("Scheduler Interval : " + config.schedulerInterval);

setTimeout(configCheck, 100);
