'use strict'

var chai = require('chai'),
    expect = chai.expect,
    chaiHttp = require('chai-http');
chai.use(chaiHttp);

var expect = chai.expect;

var mongoose = require('mongoose');


var should = chai.should();

describe('Houses', function() {
    it('should list Houses on /api/user GET', function(done) {
        chai.request('http://localhost:3000')
            .get('/api/houses')
            .end(function(err, res) {
              // console.log(res);
                res.should.have.status(200);
                done();
            });
    });

    it('should add a New User /api/user POST', function(done) {
        chai.request('http://localhost:3000')
            .post('/api/users')
            .send({
                "firstname": "Sahbana",
                "lastname": "Lubis",
                "phone": "081266490034",
                "email": "sahbanalo@gmail.com",
                "address": "jl. pudin patal senayan grogol utara"
                owner_id: '5805f7f724214b2eb1eda9c5',
                location: 'Jakarta Selatan',
                city: String,
                nation: String,
                lattitude: String,
                longitude: String,
                prize: Number,
                bedroomNum: Number,
                bathroomNum: Number,
                size: Number,
                mainphoto: String,
                photos: [String]
            })
            .end(function(err, res) {
                chai.request('http://localhost:3000')
                    .get('/api/users')
                    .end(function(err, res) {
                      // console.log(res);
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body[0].should.have.property('firstname');
                        res.body[0].should.have.property('lastname');
                        res.body[0].should.have.property('phone');
                        res.body[0].should.have.property('email');
                        res.body[0].should.have.property('email');
                        res.body[0].firstname.should.equal('Sahbana');
                        res.body[0].lastname.should.equal('Lubis');
                        res.body[0].phone.should.equal('081266490034');
                        res.body[0].address.should.equal('jl. pudin patal senayan grogol utara');
                        done()
                    })
            });
    });
    it('should an Update User /api/users PUT', function(done) {
        chai.request('http://localhost:3000')
            .get('/api/users')
            .end(function(err, res) {
                // console.log(res);
                chai.request('http://localhost:3000')
                    .put('/api/users/' + res.body[0]._id)
                    .send({
                      "firstname": "Sahbana",
                      "lastname": "Lubis",
                      "phone": "081266490034",
                      "email": "sahbanalo@gmail.com",
                      "address": "Jl. Pudin Patal Senayan Jakarta Selatan"
                    })
                    .end(function(err, res) {
                        chai.request('http://localhost:3000')
                            .get('/api/users')
                            .end(function(err, res) {
                                res.should.have.status(200);
                                res.should.be.json;
                                res.body[0].should.have.property('firstname');
                                res.body[0].should.have.property('lastname');
                                res.body[0].should.have.property('phone');
                                res.body[0].should.have.property('email');
                                res.body[0].should.have.property('email');
                                res.body[0].firstname.should.equal('Sahbana');
                                res.body[0].lastname.should.equal('Lubis');
                                res.body[0].phone.should.equal('081266490034');
                                res.body[0].address.should.equal('Jl. Pudin Patal Senayan Jakarta Selatan');
                                done()
                            })
                    })
            });
    });
    it('should delete a SINGLE User on /api/user/<id> DELETE', function(done) {
        chai.request('http://localhost:3000')
            .get('/api/users')
            .end(function(err, res) {
                chai.request('http://localhost:3000')
                    .delete('/api/users/' + res.body[0]._id)
                    .end(function(err, res2) {
                                expect(res2.body.message).to.equal('delete user is successful');
                                //console.log(res.body).to.have.length(0);
                                done()
                    });
            });
    });

});;
