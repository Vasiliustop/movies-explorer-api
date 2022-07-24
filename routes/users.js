const usersRouter = require('express').Router();
const { validatorUpdateUser } = require('../validate/validate');
const {
  getUserMe,
  updateUserInfo,
} = require('../controllers/users');

usersRouter.get('/users/me', getUserMe);
usersRouter.patch('/users/me', validatorUpdateUser, updateUserInfo);

module.exports = usersRouter;
