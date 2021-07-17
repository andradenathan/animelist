const faker = require('faker');
const Anime = require('../../models/anime');

const seedAnimes = async function(n) {
    let animes = [];
    for(let i = 0; i <= n; i++) {
        animes.push({
            "title": faker.name.firstName(),
            "description": faker.lorem.words(),
            "episodes": faker.datatype.number(100),
            "status": "Finished Airing",
            "score": faker.datatype.number(100)
        });
    }
    try {
        await Anime.bulkCreate(animes);
    } catch(err) { console.log(err) }
}

module.exports = seedAnimes;