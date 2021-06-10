const DataTypes = require('sequelize');
const sequelize = require('../config/sequelize');

const Anime = sequelize.define('Anime', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    episodes: {
        type: DataTypes.STRING
    },

    status: {
        type: DataTypes.STRING,
    },

    score: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    photo: {
        type: DataTypes.STRING
    }

});

module.exports = Anime;