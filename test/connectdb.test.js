const sequelize = require('../connectdb');


// Test generated using Keploy


test('should create a Sequelize instance with the correct configuration', () => {
  expect(sequelize.options.host).toBe('localhost');
  expect(sequelize.options.dialect).toBe('postgres');
  expect(sequelize.config.database).toBe('novelnest');
  expect(sequelize.config.username).toBe('kapishupadhyay');
});

