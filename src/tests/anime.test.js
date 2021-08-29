require('../config/sequelize');
require('../config/dotenv')();

const Anime = require('../repository/animeRepository');

test('Procurando por animes', async() => {
    const result = await Anime.findAll(2);
    expect(result.length).toEqual(2);
});