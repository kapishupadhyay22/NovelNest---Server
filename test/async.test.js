const asyncWrapper = require('../middleware/async');
const httpMocks = require('node-mocks-http');


// Test generated using Keploy



test('asyncWrapper calls the provided function successfully', async () => {
  const mockFn = jest.fn(async (req, res, next) => {
    res.status(200).json({ success: true });
  });

  const wrappedFn = asyncWrapper(mockFn);

  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();

  await wrappedFn(req, res, next);

  expect(mockFn).toHaveBeenCalledWith(req, res, next);
  expect(res.statusCode).toBe(200);
  expect(res._getData()).toEqual(JSON.stringify({ success: true }));
  expect(next).not.toHaveBeenCalled();
});


// Test generated using Keploy



test('asyncWrapper handles errors and calls next with the error', async () => {
  const mockError = new Error('Test error');
  const mockFn = jest.fn(async () => {
    throw mockError;
  });

  const wrappedFn = asyncWrapper(mockFn);

  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();

  await wrappedFn(req, res, next);

  expect(mockFn).toHaveBeenCalled();
  expect(next).toHaveBeenCalledWith(mockError);
});

