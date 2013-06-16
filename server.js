
/**
 * Module dependencies.
 */

var express = require('express')
    OspiController = require('./lib/ospi_controller')
  , http = require('http')
  , path = require('path');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'app')));

var ospiController = new OspiController();

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/zones', function(req, res) {
    res.send(ospiController.getZones());
});

app.get('/activezones', function(req, res) {
    res.send(ospiController.getActiveZones());
});

var server = http.createServer(app);

ospiController.on('start', function() {
	server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
	});
});
