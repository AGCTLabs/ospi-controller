var utils = require('../../lib/utils')
  , restify = require('restify')
  , assert = require('should');

var serverStart = false;
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

describe('/ctrl/active GET', function() {

  it('should return an empty array', function(done){
    client.get('/ctrl/active', function(err, req, res, obj) {
      res.should.have.status(200);
      obj.should.have.length(0);
      done();
   });
  });
});

describe('/ctrl/active GET', function() {

  var zone =  {
    "name": "Test Bed",
    "description": "This is on the left side of the house.",
    "station": 8,
    "notes": "Some notes on kinds of plants"
  };

  it('should return an empty array', function(done) {
    client.get('/ctrl/active', function(err, req, res, obj) {
      res.should.have.status(200);
      obj.should.have.length(0);
      done();
    });
  });
});