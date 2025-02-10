const httpMocks = require('node-mocks-http');
const notFound = require('../middleware/notfound');


// Test generated using Keploy



test('should return 404 status and error message for non-existent route', () => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();

  notFound(req, res);

  expect(res.statusCode).toBe(404);
  expect(res._getData()).toBe('Route does not exists');
});

