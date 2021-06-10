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

    photo: {
        type: DataTypes.STRING
    },

    date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    }
});

User.associate = function(models) {
    User.hasMany(models.Anime, {as: "animeList", foreignKey: "animeId"})
}

module.exports = User;