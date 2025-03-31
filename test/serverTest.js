process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Photos', function () {
    it('should list ALL photos on / GET', function (done) {
        this.timeout(60000);
        chai.request(server)
            .get('/')
            .end(function (err, res) {
                if (err) {
                    console.error(err);
                    done(err);
                } else {
                    res.should.have.status(200);
                    res.should.be.html;
                    res.body.should.be.a('object');
                    done();
                }
            });
    });
});

