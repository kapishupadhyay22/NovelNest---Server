const { Sequelize } = require('sequelize');

const createSequelizeInstance = (database, username, password, options) => {
  return new Sequelize(database, username, password, options);
};

const sequelize = createSequelizeInstance('novelnest', 'kapishupadhyay', '', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
