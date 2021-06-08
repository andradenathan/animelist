const Users = require('../controllers/users');
const { Router } = require('express');

const router = Router();

router.get('/users', Users.index);
router.get('/users/:id', Users.show);
router.put('/users/:id', Users.update);
router.post('/users', Users.create);
router.delete('/users/:id', Users.destroy);

module.exports = router;