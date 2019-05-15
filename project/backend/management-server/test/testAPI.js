const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

// Configure chai
chai.use(chaiHttp);
chai.should();

let mapId;
let productId;
let droneId;
let aantal;
let aantalProducten;
let aantalDrones;

describe("Map", function() {
    describe("GET ALL/", function() {
        //test om de map op te halen
        it("Zou alle mappen moeten opgehaald hebben", function (done) {
            chai.request(app)
                .get('/api/maps')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    aantal = res.body.length;
                    done();
                });
        }).timeout(5000);
    });
    describe("POST testMap", function () {
        it("Zou een nieuwe map moeten pushen genaamd Test en de graaf voor A* aanmaken", function (done) {
            chai.request(app)
                .post('/api/maps')
                .set('Content-Type', 'application/json')
                .send({
                    "name":"IIoT Lab",
                    "size":{
                        "width": 30190,
                        "height": 10901.9444
                    },
                    "obstacles":[
                        {
                            "_id":"5cb1e810d659913c8867b0cd",
                            "positions": [
                                {
                                    "x":2144,
                                    "y":1688
                                },
                                {
                                    "x":16384,
                                    "y":2464
                                }]
                        },
                        {
                            "_id":"5cb1e810d659913c8867b0ce",
                            "positions":[
                                {
                                    "x":2144,
                                    "y":4544
                                },
                                {
                                    "x":16384,
                                    "y":5328
                                }]
                        },
                        {
                            "_id":"5cb1e810d659913c8867b0cf",
                            "positions":[
                                {
                                    "x":2144,
                                    "y":7296
                                },
                                {
                                    "x":16384,
                                    "y":8112
                                }]
                        }],
                    "scanzones":[
                        {"_id":"5cb1e810d659913c8867b0c8",
                            "orientation":0,
                            "range":293.1397400017539,
                            "position":
                                {
                                    "x":28648.606135,
                                    "y":807.294921,
                                    "z":1500
                                },
                            "name":"346"
                        },
                        {
                            "_id":"5cb1e810d659913c8867b0c9",
                            "orientation":0,
                            "range":270.7043804120688,
                            "position":
                                {
                                    "x":8278.3713,
                                    "y":3506.723627,
                                    "z":1500
                                },
                            "name":"1879"
                        },
                        {
                            "_id":"5cb1e810d659913c8867b0ca",
                            "orientation":0,
                            "range":284.4020705387338,
                            "position":
                                {
                                    "x":8776.072971,
                                    "y":6383.745865,
                                    "z":1500
                                },
                            "name":"1886"
                        },
                        {
                            "_id":"5cb1e810d659913c8867b0cb",
                            "orientation":0,
                            "range":251.37302937196517,
                            "position":
                                {
                                    "x":670.639347,
                                    "y":10219.774539,
                                    "z":1500
                                },
                            "name":"1894"
                        },
                        {
                            "_id":"5cb1e810d659913c8867b0cc",
                            "orientation":0,
                            "range":715.3068086356103,
                            "position":
                                {
                                    "x":26835.551723,
                                    "y":8621.429827,
                                    "z":1500
                                },
                            "name":"1951"
                        }],
                    "products":[],
                    "__v":0
                })
                .end(function(error, response){
                    response.should.have.status(200);
                    response.body.should.have.property('_id');
                    mapId = response.body._id;
                    done();
                });
        }).timeout(5000);
    });
    describe("GET ALL/", function() {
        //test om de map op te halen
        it("Zou 1 extra map moeten vinden", function (done) {
            chai.request(app)
                .get('/api/maps')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    console.log(res.body.length);
                    chai.expect(aantal + 1).to.be.equal(res.body.length);
                    done();
                });
        }).timeout(5000);
    });
    describe("GET 1 Map/", function() {
        it("Zou de Test map moeten ophalen", function(done) {
            //zelfde id als de map waarop getest wordt in dijkstra
            chai.request(app)
                .get(`/api/maps/${mapId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    done();
                });
        }).timeout(5000);
    });
    describe("PUT /", function () {
        it("Zou de Test map moeten updaten", function (done) {
            chai.request(app)
                .put(`/api/maps/${mapId}`)
                .set('Content-Type', 'application/json')
                .send({
                    "_id": `${mapId}`,
                    "name": "IIoT Lab",
                    "products": [],
                    "obstacles": [
                        {
                            "positions": [
                                {
                                    "x": 2144,
                                    "y": 1688
                                },
                                {
                                    "x": 16384,
                                    "y": 2464
                                }
                            ]
                        },
                        {
                            "positions": [
                                {
                                    "x": 2144,
                                    "y": 4544
                                },
                                {
                                    "x": 16384,
                                    "y": 5328
                                }
                            ]
                        },
                        {
                            "positions": [
                                {
                                    "x": 2144,
                                    "y": 7296
                                },
                                {
                                    "x": 16384,
                                    "y": 8112
                                }
                            ]
                        }
                    ],
                    "scanzones": [
                        {
                            "name": "346",
                            "range": 293.1397400017539,
                            "orientation": 0,
                            "position": {
                                "x": 28648.606135,
                                "y": 807.294921,
                                "z": 1500
                            }
                        },
                        {
                            "name": "1879",
                            "range": 270.7043804120688,
                            "orientation": 0,
                            "position": {
                                "x": 8278.3713,
                                "y": 3506.723627,
                                "z": 1500
                            }
                        },
                        {
                            "name": "1886",
                            "range": 284.4020705387338,
                            "orientation": 0,
                            "position": {
                                "x": 8776.072971,
                                "y": 6383.745865,
                                "z": 1500
                            }
                        },
                        {
                            "name": "1894",
                            "range": 251.37302937196517,
                            "orientation": 0,
                            "position": {
                                "x": 670.639347,
                                "y": 10219.774539,
                                "z": 1500
                            }
                        },
                        {
                            "name": "1951",
                            "range": 715.3068086356103,
                            "orientation": 0,
                            "position": {
                                "x": 26835.551723,
                                "y": 8621.429827,
                                "z": 1500
                            }
                        }
                    ]
                })
                .end(function(error, response){
                    response.should.have.status(200);
                    response.body.should.deep.equal({"n":1,"nModified":1,"ok":1});
                    done();
                });
        }).timeout(5000);
    });
    describe("Drone", function() {
        describe("GET ALL/", function(){
            it("Zou alle drones moeten ophalen", function (done){
                chai.request(app)
                    .get(`/api/drones`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.an('array');
                        aantalDrones = res.body.length;
                        done();
                    });
            }).timeout(5000);
        });
        describe("POST Drone", function () {
            it("Zou een nieuwe drone moeten pushen", function (done) {
                chai.request(app)
                    .post(`/api/drones`)
                    .set('Content-Type', 'application/json')
                    .send({
                        "properties":
                            {
                                "radius": 500
                            },
                        "name": "drone",
                        "__v": 0
                    })
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    });
            }).timeout(5000);
        });
        describe("GET ALL/", function(){
            it("Zou alle drones van de map moeten ophalen", function (done){
                chai.request(app)
                    .get(`/api/drones`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.an('array');
                        droneId = res.body[0]._id;
                        chai.expect(aantalDrones).to.be.equal(res.body.length - 1);
                        done();
                    });
            }).timeout(5000);
        });
        describe("GET 1/", function(){
            it("Zou het product van de map moeten ophalen", function (done){
                chai.request(app)
                    .get(`/api/drones/${droneId}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.an('object');
                        done();
                    });
            }).timeout(5000);
        });
        describe("DELETE/", function(){
            it("Zou de drone van de map moeten ophalen, dus 1 meer dan ervoor", function (done){
                chai.request(app)
                    .delete(`/api/drones/${droneId}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            }).timeout(5000);
        });
        describe("GET ALL/", function(){
            it("Zou alle drones moeten ophalen, dus evenveel als in het begin", function (done){
                chai.request(app)
                    .get(`/api/drones`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.an('array');
                        chai.expect(aantalDrones).to.be.equal( res.body.length);
                        done();
                    });
            }).timeout(5000);
        });
    });
    describe("DELETE de Test map/", function() {
        it("Zou de Test map moeten deleten", function(done) {
            //zelfde id als de map waarop getest wordt in dijkstra
            chai.request(app)
                .delete(`/api/maps/${mapId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.deep.equal({
                        "n": 1,
                        "ok": 1,
                        "deletedCount": 1
                    });
                    done();
                });
        }).timeout(5000);
    });
    describe("GET 1 Map/", function() {
        it("Zou de Test map niet mogen vinden", function(done) {
            //zelfde id als de map waarop getest wordt in dijkstra
            chai.request(app)
                .get(`/api/maps/${mapId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.deep.equal({});
                    done();
                });
        }).timeout(5000);
    });
    describe("GET ALL/", function() {
        //test om de map op te halen
        it("Zou het originele aantal mappen moeten vinden", function (done) {
            chai.request(app)
                .get('/api/maps')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    chai.expect(aantal).to.be.equal(res.body.length);
                    done();
                });
        }).timeout(5000);
    });
});

