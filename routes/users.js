const usersRouter = require('express').Router();
const {
  getUserMe,
  updateUserInfo,
} = require('../controllers/users');

usersRouter.get('/users/me', getUserMe); // получить свой профиль
usersRouter.patch('/users/me', updateUserInfo); // обновить свой профиль

module.exports = usersRouter;
