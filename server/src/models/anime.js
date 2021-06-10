const DataTypes = require('sequelize');
const sequelize = require('../config/sequelize');

const Anime = sequelize.define('Anime', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});