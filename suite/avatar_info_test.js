const request = require('supertest');
const expect = require('chai').expect;
require('mocha');
const avatarInfo = require('../data/avatar_info.json');
const avatarSearchInfo = require('../data/avatar_search_info.json');

const domain = 'http://www.omdbapi.com';

describe('Data tests', function () {

    describe('Tests against avatar_info.json', function () {

        it('Should verify retrieved info keys include Title, Year, imdbID, Type, and Poster', function (done) {
            let keys = Object.keys(avatarInfo);
            expect(keys).to.include('Title');
            expect(keys).to.include('Year');
            expect(keys).to.include('imdbID');
            expect(keys).to.include('Type');
            expect(keys).to.include('Poster');
            done();
        });

        it('Should verify retrieved info title is a match', function (done) {
            expect(avatarInfo.Title).to.include('Avatar')
            done();
        });

        it('Should verify all retrieved values are strings', function (done) {
            let keys = Object.keys(avatarInfo);
            keys.forEach(key => {
                if (key === 'Ratings') {
                    avatarInfo.Ratings.forEach(rating => {
                        expect(typeof rating).to.equal('object');
                        expect(typeof rating.Source).to.equal('string');
                        expect(typeof rating.Value).to.equal('string');
                    });
                }
                else {
                    expect(typeof avatarInfo[key]).to.equal('string');
                }
            });
            done();
        });

        it('Should verify the value of the year equals 2009', function (done) {
            expect(avatarInfo.Year).to.equal('2009')
            done();
        })

        it('Should verify the poster link isn\'t broken', function (done) {
            let posterLink = avatarInfo.Poster;
            request(posterLink.slice(0, posterLink.indexOf('.com/') + 4))
                .get(posterLink.slice(posterLink.indexOf('.com/') + 4))
                .then(res => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.type).to.equal('image/jpeg');
                    done();
                })
                .catch(error => {
                    console.log(`Error ${error}`);
                    done(error);
                });
        })

    })

    describe('Tests against avatar_search_info.json', function () {

        it('Should verify retrieved info keys include Title, Year, imdbID, Type, and Poster', function (done) {
            avatarSearchInfo.Search.forEach(entry => {
                let keys = Object.keys(entry);
                expect(keys).to.include('Title');
                expect(keys).to.include('Year');
                expect(keys).to.include('imdbID');
                expect(keys).to.include('Type');
                expect(keys).to.include('Poster');
            });
            done();
        });

        it('Should verify retrieved info title is a match', function (done) {
            avatarSearchInfo.Search.forEach(entry => {
                expect(entry.Title.toLowerCase()).to.include('avatar')
            });
            done();
        });

        it('Should verify all retrieved values are strings', function (done) {
            avatarSearchInfo.Search.forEach(entry => {
                expect(typeof entry.Title).to.equal('string');
                expect(typeof entry.Year).to.equal('string');
                expect(typeof entry.imdbID).to.equal('string');
                expect(typeof entry.Type).to.equal('string');
                expect(typeof entry.Poster).to.equal('string');
            });
            done();
        });

        it('Should verify the format of each year', function (done) {
            avatarSearchInfo.Search.forEach(entry => {
                expect(entry.Year.length).to.be.oneOf([4, 5, 9]);
            });
            done();
        })

        avatarSearchInfo.Search.forEach(entry => {
            if (entry.Poster !== 'N/A') {
                it(`Should verify the poster link isn\'t broken for ${entry.Type} ${entry.Title}`, function (done) {
                    let posterLink = entry.Poster;
                    request(posterLink.slice(0, posterLink.indexOf('.com/') + 4))
                        .get(posterLink.slice(posterLink.indexOf('.com/') + 4))
                        .then(res => {
                            expect(res.statusCode).to.equal(200);
                            expect(res.type).to.equal('image/jpeg');
                            done();
                        })
                        .catch(error => {
                            console.log(`Error ${error}`);
                            done(error);
                        });
                })
            }
        });

    })

});