const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Map", () => {
    describe("GET /", () => {
        //test om de map op te halen
        it("Zou de map moeten opgehaald hebben", (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });

        });
    });
});
