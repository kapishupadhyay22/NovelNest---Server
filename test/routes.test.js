const request = require('supertest');
const express = require('express');


// Test generated using Keploy
test('POST /signup with valid data returns 201 status', async () => {
  const addUser = jest.fn((req, res) => res.status(201).send({ message: 'User created' }));
  const controllers = {
    addUser,
    getAllBooks: jest.fn(),
    sendBook: jest.fn(),
    showAllUser: jest.fn(),
    loginUser: jest.fn(),
    getBookById: jest.fn(),
    otpverify: jest.fn(),
  };

  const app = express();
  app.use(express.json());
  app.use('/', require('../routes/routes')(controllers));

  const response = await request(app)
    .post('/signup')
    .send({ username: 'testuser', password: 'password123', email: 'test@example.com' });

  expect(response.status).toBe(201);
  expect(response.body.message).toBe('User created');
  expect(addUser).toHaveBeenCalled();
});

