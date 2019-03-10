const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Map", function() {
    describe("GET /", function() {
        //test om de map op te halen
        it("Zou de map moeten opgehaald hebben", function(done) {
            chai.request(app)
                .get('/api/maps')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    done();
                });
        }).timeout(5000);
    });
});
