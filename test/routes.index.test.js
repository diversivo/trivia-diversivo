process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const server = require('../server/index');

describe('routes:index',()=>{
    describe('GET /check',()=>{
        it('Should return html',(done)=>{
            chai.request(server)
                .get('/')
                .end((err,res)=>{
                    should.not.exist(err);
                    res.status.should.eql(200);
                    res.type.should.eql('text/html');
                    done();
                });
        });
    });
});