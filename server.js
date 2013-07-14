
/**
 * Module dependencies.
 */
var express = require('express')
    OspiController = require('./lib/ospi_controller')
  , http = require('http')
  , zoneRoutes = require('./routes/zones.js')
  , ctrlRoutes = require('./routes/ctrl.js')
  , fs = require('fs')
  , path = require('path');



var logFile = fs.createWriteStream('./logs/server.log', {flags: 'a'});


var app = express();

// all environments



app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'app')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

exports.start = function(options) {
	options = options || {};

	var logtream = options.logStream || logFile;

	app.set('port', options.port || process.env.PORT || 3000);
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

