var server = require('../../server');
var fs = require('fs');

var logFile = fs.createWriteStream('./logs/test-server.log', {flags: 'w'});
server.start({"port": 3444,"configFile" : "./test/config.json", logStream: logFile});