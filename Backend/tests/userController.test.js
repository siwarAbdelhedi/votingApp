// const assert = require('assert');
// const supertest = require('supertest');
// const app = require('../index');
// const request = supertest(app);

// describe('User Controller', () => {
//   // Connect to MongoDB before running tests
//   before(async function () {
//     this.timeout(5000);
//     await new Promise(resolve => setTimeout(resolve, 2000));
//   });

//   it('should register a new user', async () => {
//     const res = await request
//       .post('/api/users/register')
//       .send({
//         email: 'test@example.com',
//         password: 'testpassword',
//         role: 1, // Assuming '1' represents a user role
//       });

//     assert.strictEqual(res.status, 200);
//     assert(res.body._id);
//     assert.strictEqual(res.body.email, 'test@example.com');
//   });

//   it('should login an existing user', async () => {
//     const res = await request
//       .post('/api/users/login')
//       .send({
//         email: 'test@example.com',
//         password: 'testpassword',
//       });

//     assert.strictEqual(res.status, 200);
//     assert(res.body.token);
//   });

//   after(() => {
//     app.close();
//   })

// });

const supertest = require('supertest');
const {app} = require('../index');
// const chai = require('chai');
//const expect = chai.expect;


describe('Authentication API tests', () => {
  it('should register a new user successfully from POST /api/users/register', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'testpassword',
      role: 1,
    };


    const response = await supertest(app)
      .post('/api/users/register')
      .send(userData);


      console.log(response);
      //expect(response.status).to.equal(200);
    // expect(response.body.user.email).toBe('test@example.com');
  });
});