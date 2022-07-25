const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Укажите страну производства фильма'],
  },
  director: {
    type: String,
    required: [true, 'Укажите режиссёра фильма'],
  },
  duration: {
    type: Number,
    required: [true, 'Укажите длительность фильма'],
  },
  year: {
    type: String,
    required: [true, 'Укажите год производства фильма'],
  },
  description: {
    type: String,
    required: [true, 'Укажите описание фильма'],
  },
  image: {
    type: String,
    required: [true, 'Укажите ссылку на постер фильма'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректная ссылка',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Укажите ссылку на трейлер фильма'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректная ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Укажите ссылку на минипостер фильма'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, 'Укажите название фильма на русском языке'],
  },
  nameEN: {
    type: String,
    required: [true, 'Укажите название фильма на английском языке'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
