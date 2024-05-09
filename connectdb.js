const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('novelnest', 'kapishupadhyay', '', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;