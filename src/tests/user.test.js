require('../config/sequelize');
require('../config/dotenv')();

const User = require('./models/user');

test('Procurando por usuários', async() => {
    const result = await User.findAll(2);
    expect(result.length).toEqual(2);
});