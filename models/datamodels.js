const { DataTypes } = require('sequelize');
const sequelize = require('../connectdb');
const User = sequelize.define('User', {
    // Define user attributes
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    genere: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});


const Book = sequelize.define('Book', {
    bookid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    views: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
// sequelize.sync()
//     .then(() => {
//         console.log('Database synced');
//     })
//     .catch(err => {
//         console.error('Error syncing database:', err);
//     });


module.exports = { User, Book };
