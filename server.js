
/**
 * Module dependencies.
 */
var express = require('express')
    OspiController = require('./lib/ospi_controller')
  , http = require('http')
  , zoneRoutes = require('./routes/zones.js')
  , ctrlRoutes = require('./routes/ctrl.js')
  , fs = require('fs')
  , mkdirp = require('mkdirp')
  , path = require('path');

var app = express();

// all environment
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'app')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

defaultLogFile = function() {
  var p = path.join(__dirname,'logs');
  mkdirp(p);
  var fpath = path.join(p,'ospic-server.log');

  var logStream = fs.createWriteStream(fpath, {flags: 'a'});

  return logStream;
}

exports.start = function(options) {
	options = options || {};

	var logStream = options.logStream || defaultLogFile();

	app.set('port', options.port || process.env.PORT || 8000);
	app.use(express.logger({stream: logStream}));

	var ospiController = new OspiController(options);
	zoneRoutes.setup({"app" : app, "controller" : ospiController});
	ctrlRoutes.setup({"app" : app, "controller" : ospiController});

	var server = http.createServer(app);

	ospiController.on('start', function() {
		server.listen(app.get('port'), function(){
			console.log('Express server listening on port ' + app.get('port'));
		});
	});
};

if (! module.parent) {
  exports.start();
}

