/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

xdescribe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com';
    const codysHandle = 'codyThePug';

    beforeEach(() => {
      return User.create({
        username: codysHandle,
        email: codysEmail
      });
    });

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].email).to.be.equal(codysEmail);
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
