const movieRouter = require('express').Router();
const {
  getFilms,
  addFilms,
  deleteFilm,
} = require('../controllers/movies');

movieRouter.get('/movies', getFilms); // получить фильмы!
movieRouter.post('/movies', addFilms); // Создать фильм!
movieRouter.delete('/movies/_id', deleteFilm); // удалить фильм!

module.exports = movieRouter;
