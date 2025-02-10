const { customApiError } = require('../errors/customerrors');
const errorHandlerMiddleware = require('../middleware/errorhandler');
const httpMocks = require('node-mocks-http');


// Test generated using Keploy




test('test_errorHandlerMiddleware_customApiError_handledCorrectly', () => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();

  const error = new customApiError('Custom error message', 400);

  errorHandlerMiddleware(error, req, res, next);

  expect(res.statusCode).toBe(400);
  expect(res._getJSONData()).toEqual({ msg: 'Custom error message' });
});


// Test generated using Keploy



test('test_errorHandlerMiddleware_genericError_handledCorrectly', () => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();

  const error = new Error('Generic error');

  errorHandlerMiddleware(error, req, res, next);

  expect(res.statusCode).toBe(500);
  expect(res._getJSONData()).toEqual({ msg: 'something went wrong' });
});

