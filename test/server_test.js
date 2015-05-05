
'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

require('../lib/server');

describe('server', function() {
  it('should respond to a get request', function(done) {
    chai.request('localhost:3000')
      .get('/greet')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('hi everybody!');
        done();
      });
  });

  it('should greet by name for unique one name get requests', function(done) {
    chai.request('localhost:3000')
      .get('/greet/Ororo')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('Hi, Ororo!');
        done();
      });
  });

  it('should prompt for only one name when 2 or more are entered', function(done) {
    chai.request('localhost:3000')
      .get('/greet/Ororo/Munro')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('Try to put in only one name!');
        done();
      });
  });

  it('should greet by name for post requests', function(done) {
    chai.request('localhost:3000')
      .post('/greet')
      .send({name: 'Kurt'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('hello Kurt');
        done();
      });
  });

  it('should have a 404 page', function(done) {
    chai.request('localhost:3000')
      .get('/boogaooga')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(404);
        expect(res.body.msg).to.eql('could not find the page');
        done();
      });
  });

  it('should display the time', function(done) {
    var date = new Date();
    chai.request('localhost:3000')
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('It is ' + date.toLocaleTimeString() + ' server time.');
        done();
      });
  });
});
