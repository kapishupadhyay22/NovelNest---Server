const { getAllBooks } = require('../controller/controllers');
const httpMocks = require('node-mocks-http');
const jwt = require('jsonwebtoken');
const { Book } = require('../models/datamodels');
const { otpverify } = require('../controller/controllers');
const redis = require('redis');
const { showAllUser } = require('../controller/controllers');


// Test generated using Keploy





jest.mock('jsonwebtoken', () => ({
  verify: jest.fn((token, secret, callback) => callback(null, { uname: 'testuser' }))
}));

jest.mock('../models/datamodels', () => ({
  Book: {
    findAll: jest.fn(() => Promise.resolve([{ id: 1, title: 'Book 1' }]))
  }
}));

test('getAllBooks should return 200 and the list of books when a valid token is provided', async () => {
  const req = httpMocks.createRequest({
    method: 'GET',
    url: '/books',
    headers: {
      authorization: 'Bearer validToken'
    }
  });
  const res = httpMocks.createResponse();

  await getAllBooks(req, res);

  expect(res.statusCode).toBe(200);
  expect(res._getJSONData()).toEqual({ book: [{ id: 1, title: 'Book 1' }] });
});


// Test generated using Keploy




jest.mock('redis', () => ({
  createClient: jest.fn(() => ({
    get: jest.fn((email, callback) => callback(null, '123456'))
  }))
}));

test('otpverify should return 400 when an incorrect OTP is provided', async () => {
  const req = httpMocks.createRequest({
    method: 'POST',
    url: '/otpverify',
    body: {
      email: 'test@example.com',
      otp: '654321'
    }
  });
  const res = httpMocks.createResponse();

  await otpverify(req, res);

  expect(res.statusCode).toBe(400);
  expect(res._getData()).toBe('Invalid OTP');
});


// Test generated using Keploy




jest.mock('jsonwebtoken', () => ({
  verify: jest.fn((token, secret, callback) => callback(null, { uname: 'testuser', role: false }))
}));

test('showAllUser should return 400 when the user is not an admin', async () => {
  const req = httpMocks.createRequest({
    method: 'GET',
    url: '/users',
    headers: {
      authorization: 'Bearer validToken'
    }
  });
  const res = httpMocks.createResponse();

  await showAllUser(req, res);

  expect(res.statusCode).toBe(400);
  expect(res._getJSONData()).toEqual({ msg: 'sorry you dont have the required permission for such operation' });
});


// Test generated using Keploy
test('getAllBooks should return 401 when no token is provided', async () => {
  const req = httpMocks.createRequest({
    method: 'GET',
    url: '/books',
    headers: {}
  });
  const res = httpMocks.createResponse();

  await getAllBooks(req, res);

  expect(res.statusCode).toBe(401);
  expect(res._getJSONData()).toEqual({ msg: 'login/signup is required' });
});

