const assert = require('assert');
const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);

describe('User Controller', () => {
  // Connect to MongoDB before running tests
  before(async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  it('should register a new user', async () => {
    const res = await request
      .post('/api/users/register')
      .send({
        email: 'test@example.com',
        password: 'testpassword',
        role: 1, // Assuming '1' represents a user role
      });

    assert.strictEqual(res.status, 200);
    assert(res.body._id);
    assert.strictEqual(res.body.email, 'test@example.com');
  });

  it('should login an existing user', async () => {
    const res = await request
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'testpassword',
      });

    assert.strictEqual(res.status, 200);
    assert(res.body.token);
  });

});
