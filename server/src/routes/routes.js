const Users = require('../controllers/users');
const Animes = require('../controllers/animes');
const Passports = require('../controllers/passports');

const { Router } = require('express');
const multer = require('multer');
const passport = require('passport');
const storage = require('../config/files');

const router = Router();
const upload = multer({ storage: storage });
const singleUpload = upload.single('photo');

router.get('/auth/user', passport.authenticate('jwt', { session: false }),
            Passports.getDetails);
router.post('/auth/register', singleUpload, Passports.register);
router.post('/auth/login', Passports.login);

router.get('/getUserAnimes/:id', Users.getUserAnimes);
router.get('/users', Users.index);
router.get('/user/:id', Users.show);
router.put('/addAnimeToList/:id', Users.addAnimeToList);
router.put('/user/:id', singleUpload, Users.update);
//router.post('/user', Users.create);
router.delete('/user', Users.destroy);

router.get('/animes', Animes.index);
router.get('/anime/:id', Animes.show);
router.put('/anime/:id', Animes.update);
router.post('/anime', Animes.create);
router.delete('/anime/:id', Animes.destroy);

module.exports = router;