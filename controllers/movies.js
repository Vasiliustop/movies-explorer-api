const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getFilms = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch((err) => {
      next(err);
    });
};

module.exports.addFilms = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteFilm = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Недостаточно прав');
      } else {
        return Movie.findByIdAndRemove(req.params.movieId)
          .then(() => {
            res.send({ message: 'Фильм удалён' });
          });
      }
    })
    .catch(next);
};
