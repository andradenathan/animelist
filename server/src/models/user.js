const DataTypes = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING
    },

    date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

module.exports = User;