const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_HOST + process.env.DB_DATABASE
  });
  
module.exports = sequelize;

require('../models/user');
require('../models/anime');

for (mod in sequelize.models) {
  if (sequelize.models[mod].associate instanceof Function) {
    sequelize.models[mod].associate(sequelize.models);
  }
}
    