const { User } = require('../models/datamodels');


// Test generated using Keploy


test('User model should throw validation error for missing fields', async () => {
  await expect(User.create({
    username: 'testuser',
    email: 'testuser@example.com',
  })).rejects.toThrow();
});

