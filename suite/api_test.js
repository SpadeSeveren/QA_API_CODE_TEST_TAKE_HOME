const request = require('supertest');
const expect = require('chai').expect;
require('mocha');
const avatarInfo = require('../data/avatar_info.json');

const domain = 'http://www.omdbapi.com';

// .query('i=tt0499549&apikey=93d3d44e')

describe('OMDb API tests', function() {

    describe('Tests with a valid apikey', function() {

        it('Should verify a 200 with i parameter and valid apikey', function(done) {
            let query = 'i=tt0499549&apikey=93d3d44e'
            request(domain)
                .get('/')
                .query(query)
                .then(res => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.eql(avatarInfo);
                    done();
                })
                .catch(error => {
                    console.log(`Request ${domain}/${query} returned error ${error}`);
                    done(error);
                });
        });

        it('Should verify a 200 with t parameter and valid apikey', function(done) {
            let query = 't=avatar&apikey=93d3d44e'
            request(domain)
                .get('/')
                .query(query)
                .then(res => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.eql(avatarInfo);
                    done();
                })
                .catch(error => {
                    console.log(`Request ${domain}/${query} returned error ${error}`);
                    done(error);
                });
        });

        it('Should verify a 200 with both i and t parameters and valid apikey', function(done) {
            let query = 'i=tt0499549&t=avatar&apikey=93d3d44e'
            request(domain)
                .get('/')
                .query(query)
                .then(res => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.eql(avatarInfo);
                    done();
                })
                .catch(error => {
                    console.log(`Request ${domain}/${query} returned error ${error}`);
                    done(error);
                });
        });

        it('Should verify a 200 with neither i nor t parameters and valid apikey', function(done) {
            let query = 'apikey=93d3d44e'
            request(domain)
                .get('/')
                .query(query)
                .then(res => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.eql({Error: "Something went wrong.", Response: "False"});
                    done();
                })
                .catch(error => {
                    console.log(`Request ${domain}/${query} returned error ${error}`);
                    done(error);
                });
        });

        it('Should verify a 200 with i parameter, valid apikey, and type set to movie', function(done) {
            let query = 'i=tt0499549&apikey=93d3d44e&type=movie'
            request(domain)
                .get('/')
                .query(query)
                .then(res => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.eql(avatarInfo);
                    done();
                })
                .catch(error => {
                    console.log(`Request ${domain}/${query} returned error ${error}`);
                    done(error);
                });
        });
        
    })

    describe('Tests with an invalid apikey', function() {

        it('Should verify a 401 with i parameter and invalid apikey', function(done) {
            let query = 'i=tt0499549&apikey=7'
            request(domain)
                .get('/')
                .query(query)
                .then(res => {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body).to.eql({ Response: 'False', Error: 'Invalid API key!' });
                    done();
                })
                .catch(error => {
                    console.log(`Request ${domain}/${query} returned error ${error}`);
                    done(error);
                });
        });

        it('Should verify a 401 with t parameter and invalid apikey', function(done) {
            let query = 't=avatar&apikey=7'
            request(domain)
                .get('/')
                .query(query)
                .then(res => {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body).to.eql({ Response: 'False', Error: 'Invalid API key!' });
                    done();
                })
                .catch(error => {
                    console.log(`Request ${domain}/${query} returned error ${error}`);
                    done(error);
                });
        });

        it('Should verify a 401 with both i and t parameters and invalid apikey', function(done) {
            let query = 'i=tt0499549&t=avatar&apikey=7'
            request(domain)
                .get('/')
                .query(query)
                .then(res => {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body).to.eql({ Response: 'False', Error: 'Invalid API key!' });
                    done();
                })
                .catch(error => {
                    console.log(`Request ${domain}/${query} returned error ${error}`);
                    done(error);
                });
        });

        it('Should verify a 401 with neither i nor t parameters and invalid apikey', function(done) {
            let query = 'apikey=7'
            request(domain)
                .get('/')
                .query(query)
                .then(res => {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body).to.eql({ Response: 'False', Error: 'Invalid API key!' });
                    done();
                })
                .catch(error => {
                    console.log(`Request ${domain}/${query} returned error ${error}`);
                    done(error);
                });
        });
        
    })

    describe('Tests with no apikey', function() {

        it('Should verify a 401 with i parameter and no apikey', function(done) {
            let query = 'i=tt0499549'
            request(domain)
                .get('/')
                .query(query)
                .then(res => {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body).to.eql({ Response: 'False', Error: 'No API key provided.' });
                    done();
                })
                .catch(error => {
                    console.log(`Request ${domain}/${query} returned error ${error}`);
                    done(error);
                });
        });

        it('Should verify a 401 with t parameter and no apikey', function(done) {
            let query = 't=avatar'
            request(domain)
                .get('/')
                .query(query)
                .then(res => {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body).to.eql({ Response: 'False', Error: 'No API key provided.' });
                    done();
                })
                .catch(error => {
                    console.log(`Request ${domain}/${query} returned error ${error}`);
                    done(error);
                });
        });

        it('Should verify a 401 with both i and t parameters but no apikey', function(done) {
            let query = 'i=tt0499549'
            request(domain)
                .get('/')
                .query(query)
                .then(res => {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body).to.eql({ Response: 'False', Error: 'No API key provided.' });
                    done();
                })
                .catch(error => {
                    console.log(`Request ${domain}/${query} returned error ${error}`);
                    done(error);
                });
        });

        // passing in no i, t, or apikey will simply call the http://www.omdbapi.com/, which is the landing page for OMDb Api
        
    })

})