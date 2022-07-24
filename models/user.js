const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Это поле обязательно для заполнения'],
      minlength: [2, 'В данном поле требуется минимум 2 символа'],
      maxlength: [30, 'В данном поле требуется максимум 30 символов'],
    },
    email: {
      type: String,
      required: [true, 'Это поле обязательно для заполнения'],
      unique: true,
      validate: [validator.isEmail, 'Некорректный Email.'],
    },
    password: {
      type: String,
      required: [true, 'Это поле обязательно для заполнения'],
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function _(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильные почта или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
