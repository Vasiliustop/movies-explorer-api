const movieRouter = require('express').Router();
const { validatoraddFilms, validatorDeleteFilms } = require('../validate/validate');
const {
  getFilms,
  addFilms,
  deleteFilm,
} = require('../controllers/movies');

movieRouter.get('/movies', getFilms);
movieRouter.post('/movies', validatoraddFilms, addFilms);
movieRouter.delete('/movies/:movieId', validatorDeleteFilms, deleteFilm);

module.exports = movieRouter;
