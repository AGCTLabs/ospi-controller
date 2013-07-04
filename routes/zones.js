var OspiController = require('./lib/ospi_controller')

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving zone: ' + id);
    db.collection('zones', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('zones', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addZone = function(req, res) {
    var zone = req.body;
    console.log('Adding zone: ' + JSON.stringify(zone));
    db.collection('zones', function(err, collection) {
        collection.insert(zone, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateZone = function(req, res) {
    var id = req.params.id;
    var zone = req.body;
    delete zone._id;
    console.log('Updating zone: ' + id);
    console.log(JSON.stringify(zone));
    db.collection('zones', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, zone, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating zone: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(zone);
            }
        });
    });
}

exports.deleteZone = function(req, res) {
    var id = req.params.id;
    console.log('Deleting zone: ' + id);
    db.collection('zones', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

