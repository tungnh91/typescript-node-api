import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/heroes', () => {

  it('responds with JSON array', async () => {
    const res = await chai.request(app).get('/api/v1/heroes');
    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length(5);
  });

  it('should include Wolverine', async () => {
    const res = await chai.request(app).get('/api/v1/heroes');

    let Wolverine = res.body.find(hero => hero.name === 'Wolverine');
    expect(Wolverine).to.exist;

    let keys = ['id', 'name', 'aliases', 'occupation', 'gender', 'height', 'hair', 'eyes', 'powers'];
    expect(Wolverine).to.have.all.keys( keys );
  });

  describe('GET api/v1/heroes/:id', () => {

    it('responds with single JSON object', async () => {
        const res = await chai.request(app).get('/api/v1/heroes/1');
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
    });

    it('should return Luke Cage', async () => {
        const res = await chai.request(app).get('/api/v1/heroes/1');
        expect(res.body.hero.name).to.equal('Luke Cage');
    });

  });

});