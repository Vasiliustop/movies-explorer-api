const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { validatorLogin, validatorCreateUser } = require('../validate/validate');

router.post('/signup', validatorCreateUser, createUser);

router.post('/signin', validatorLogin, login);

router.use(auth);

router.use(require('./users'));

router.use(require('./movies'));

router.all('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
