require('../../config/dotenv')();


const sequelize = require('../../config/sequelize');
const seedAnimes = require('./seedAnimes');

(async () => {
  try {
    await sequelize.sync({ force: true });
    await seedAnimes(10);

  } catch(err) { console.log(err) }
})();
