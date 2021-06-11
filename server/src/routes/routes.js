const Users = require('../controllers/users');
const Animes = require('../controllers/animes');
const Passports = require('../controllers/passports');
const { Router } = require('express');
const passport = require('passport');

const router = Router();

router.get('/auth/user', passport.authenticate('jwt', { session: false }),
            Passports.getDetails);
router.post('/auth/register', Passports.register);
router.post('/auth/login', Passports.login);

router.get('/getUserAnimes/:id', Users.getUserAnimes);
router.get('/users', Users.index);
router.get('/users/:id', Users.show);
router.put('/users/:id', Users.update);
router.post('/users', Users.create);
router.delete('/users/:id', Users.destroy);

router.get('/animes', Animes.index);
router.get('/animes/:id', Animes.show);
router.put('/animes/:id', Animes.update);
router.post('/animes', Animes.create);
router.delete('/animes/:id', Animes.destroy);

module.exports = router;