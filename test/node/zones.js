var utils = require('../../lib/utils')
  , restify = require('restify')
  , server = require('../../server')
  , assert = require('should');

/*
* Start the server with these parameters
*/
var serverStart = false;
var logFile = fs.createWriteStream('./logs/test-zones-server.log', {flags: 'w'});
server.start({"port": 3444,"fileName" : "./test/config.json", logStream: logFile});

var client = restify.createJsonClient({
    url: 'http://localhost:3444',
    version: '*'
});

client.get('/ctrl/stats', function(err, req, res, obj) {
    serverStart = true;
    assert.ifError(err);
    res.should.have.status(200);
});

var check = function(done) {
  if (serverStart) 
    done();
  else 
    setTimeout( function(){ check(done) }, 1000 );
}

before(function( done ){
  check( done );
});

describe('/zones GET', function() {
  
  it('should return an empty array', function(done){
    client.get('/zones', function(err, req, res, obj) {
      res.should.have.status(200);
      obj.should.have.length(0);
      done();
   });
  });
});

describe('/zones POST', function(){
  it('should add a new zone', function(done){
    var zone =  {
        "name": "Test Bed",
        "description": "This is on the left side of the house.",
        "station": 8,
        "notes": "Some notes on kinds of plants"
    }

    client.post('/zones', zone , function(err, req, res, obj) {
        assert.ifError(err);
        res.should.have.status(200);
        obj.should.have.property('id',0);
        obj.should.have.property('name','Test Bed');
        obj.should.have.property('description','This is on the left side of the house.');
        obj.should.have.property('station',8);
        obj.should.have.property('notes','Some notes on kinds of plants');
        done();
    });
  })
})

describe('/zones GET', function() {
  
  it('should return an array of one element', function(done){
    client.get('/zones', function(err, req, res, obj) {
      res.should.have.status(200);
      obj.should.have.length(1);
      done();
   });
  });
});

describe('/zones PUT', function(){
  it('should update zone', function(done){
    var zone =  {
        "id": 4,
        "name": "Test Bed - Updated",
        "description": "This is on the left side of the house. - Updated",
        "station": 3
    }

    client.put('/zones/0', zone , function(err, req, res, obj) {
        assert.ifError(err);
        res.should.have.status(200);
        obj.should.have.property('id',0);
        obj.should.have.property('name','Test Bed - Updated');
        obj.should.have.property('description','This is on the left side of the house. - Updated');
        obj.should.have.property('station',3);
        obj.should.have.property('notes','Some notes on kinds of plants');
        done();
    });
  })
})

describe('/zones PUT', function(){
  it('should update zone', function(done){
    var zone =  {
        "id": 4,
        "name": "Test Bed - Updated",
        "description": "This is on the left side of the house. - Updated",
        "station": 3
    }

    client.put('/zones/4', zone , function(err, req, res, obj) {
        res.should.have.status(404);
        done();
    });
  })
})

describe('/zones/0 GET ', function() {
  
  it('should return zone looked up by id', function(done){
    client.get('/zones/0', function(err, req, res, obj) {
        assert.ifError(err);
        res.should.have.status(200);
        obj.should.have.property('id',0);
        obj.should.have.property('name','Test Bed - Updated');
        obj.should.have.property('description','This is on the left side of the house. - Updated');
        obj.should.have.property('station',3);
        obj.should.have.property('notes','Some notes on kinds of plants');
        done();
    });
  });
});

describe('/zones/1 GET ', function() {
  
  it('should return not found when looked up by unknown id', function(done){
    client.get('/zones/1', function(err, req, res, obj) {
        res.should.have.status(404);
        done();
    });
  });
});

describe('/zones/0 DELETE', function() {
  it('should delete zone', function(done) {
    client.del('/zones/0', function(err, req, res, obj) {
        res.should.have.status(200);
        done();
    });
  });

  it('should should have no zones', function(done) {
    client.get('/zones', function(err, req, res, obj) {
      res.should.have.status(200);
      obj.should.have.length(0);
      done();
   });
  });
});

describe('/zones/1 DELETE', function() {
  it('should delete zone', function(done) {
    client.del('/zones/1', function(err, req, res, obj) {
        res.should.have.status(404);
        done();
    });
  });
})