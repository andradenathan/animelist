require('../../config/sequelize');
require('../../config/dotenv')();

const User = require('../../repository/userRepository');

test('Criando um novo usuário', async() => {
  const data = {
    id: 1,
    username: 'andradenathan',
    email: 'nathan@teste',
    salt: 'A111000020220',
    hash: 'B222000040440',
    date_of_birth: '2021-03-14'
  }

  const result = await User.create(data);
  expect(result.id).toEqual(data.id);
});

test('Procurando por usuários', async() => {
  const result = await User.findAll(1);
  expect(result.length).toEqual(1);
});