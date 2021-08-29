const Anime = require('../models/anime');

async function findAll(limit) {
  return Anime.findAll({limit});
}

module.exports = {findAll};