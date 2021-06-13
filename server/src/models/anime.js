const DataTypes = require('sequelize');
const sequelize = require('../config/sequelize');

const Anime = sequelize.define('Anime', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
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

Anime.associate = function(models) {
    Anime.belongsToMany(models.User, {as: "users", foreignKey: "animeId", 
        through: 'List'});
}

module.exports = Anime;