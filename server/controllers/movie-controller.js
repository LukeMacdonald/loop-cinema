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

    const reviews = await db.review.findAll({
      where: {
        movie_id: movie.movie_id
      }
    });
    // Calculate average rating from reviews
    if (reviews.length > 0) {
      // Filter out the reviews where removed is false
      const filteredReviews = reviews.filter(review => !review.removed);
    
      // Calculate total rating from filtered reviews
      const totalRating = filteredReviews.reduce((acc, review) => acc + review.rating, 0);
    
      // Calculate average rating only from non-removed reviews
      const averageRating = totalRating / filteredReviews.length;
    
      // Assign the average rating to the movie's rating attribute
      movie.dataValues.rating = averageRating;
    } else {
      // If there are no reviews, set the rating to 0 or any default value you prefer
      movie.dataValues.rating = 0;
    }


    

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

   
    const moviesWithNewAttribute = await Promise.all(movies.map(async (movie) => {
      const reviews = await db.review.findAll({
        where: {
          movie_id: movie.movie_id
        }
      });

      if (reviews.length > 0) {
      
        const filteredReviews = reviews.filter(review => !review.removed);
      
        const totalRating = filteredReviews.reduce((acc, review) => acc + review.rating, 0);
      
        const averageRating = totalRating / filteredReviews.length;
      
        movie.dataValues.rating = averageRating;
      } else {
        
        movie.dataValues.rating = 0;
      }

      return movie;
    }));
    res.json(moviesWithNewAttribute);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while fetching all movies.' });
  }
};







exports.updateMovie = async (req, res) => {
  try {
    const movie_id = req.params.movie_id;
    const {
      title,
      description,
      director,
      release_date,
      poster,
      duration,
      genre,
    } = req.body;

    const movie = await db.movie.findByPk(movie_id);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found.' });
    }

    // Update movie attributes
    movie.title = title;
    movie.description = description;
    movie.director = director;
    movie.release_date = release_date;
    movie.poster = poster;
    movie.duration = duration;
    movie.genre = genre;

    await movie.save();

    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while updating the movie.' });
  }
};

exports.updateMovieViews = async (req, res) => {
  try {
    const movie_id = req.params.movie_id;

    const movie = await db.movie.findByPk(movie_id);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found.' });
    }

    // Increment the views property of the movie directly
    movie.views += 1;
    console.log(movie.views)

    console.log(movie)

    // Save the updated movie object
    await movie.save();
    

    // Send the updated movie object as the response
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while updating the movie views.' });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie_id = req.params.movie_id;
    const movie = await db.movie.findByPk(movie_id);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found.' });
    }

    await movie.destroy();

    res.json({ message: 'Movie deleted successfully.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while deleting the movie.' });
  }
};