const User = require('../models/user');

async function create(data) {
  return User.create(data);
}

async function findAll(limit) {
  return User.findAll({limit});
}

module.exports = {
  create,
  findAll
}