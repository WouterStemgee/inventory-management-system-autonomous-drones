const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Map", function() {
    describe("GET /", function() {
        //test om de map op te halen
        it("Zou alle mappen moeten opgehaald hebben", function(done) {
            chai.request(app)
                .get('/api/maps')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    done();
                });
        }).timeout(5000);

        it("Zou 1 enkele map moeten ophalen met een specifiek ID", function(done) {
            //zelfde id als de map waarop getest wordt in dijkstra
            const id = "5c851e1c392e923b60fff836";
            chai.request(app)
                .get(`api/maps/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                })
        })
    });
});
