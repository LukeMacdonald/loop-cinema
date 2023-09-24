const db = require('../database')


exports.createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      director,
      release_date,
      poster,
      duration,
      genre,
    } = req.body;

    const movie = await db.movie.create({
      title,
      description,
      director,
      release_date,
      poster,
      duration,
      genre,
    });

    res.status(201).json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while creating the movie.' });
  }
};

exports.getMovieByID = async (req, res) => {
  try {
    const movie_id = req.params.movie_id;
    const movie = await db.movie.findByPk(movie_id);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found.' });
    }

    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while fetching the movie.' });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await db.movie.findAll();
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while fetching all movies.' });
  }
};