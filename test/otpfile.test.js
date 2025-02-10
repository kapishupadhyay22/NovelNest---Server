const { generateOTP } = require('../controller/otpfile');


// Test generated using Keploy


test('generateOTP should return a 6-digit string', () => {
  const otp = generateOTP();
  expect(typeof otp).toBe('string');
  expect(otp).toMatch(/^\d{6}$/);
});

