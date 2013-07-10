var _  = require('underscore');
var controller =  null;

exports.open = function(req, res) {
   res.send();
};

exports.close = function(req, res) {
    res.send();
};

exports.closeAll = function(req, res) {
    res.send();
}

exports.active = function(req, res) {
   res.send([]);

}
exports.setup = function(options) {

    var app = options.app;

    app.get('/ctrl/open/:id', exports.open);
    app.get('/ctrl/close/:id', exports.close);
    app.get('/ctrl/close', exports.closeAll);
    app.get('/ctrl/active', exports.active);
};