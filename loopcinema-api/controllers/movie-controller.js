const db = require('../database')
exports.insert = async (req,res) => {
    const movie = await db.movie.create({
        title: req.body.title,
        description: req.body.description,
        director: req.body.director,
        release_date: req.body.release_date,
        poster: req.body.poster,
        duration: req.body.duration,
        genre: req.body.genre
    })
    res.json(movie);
}

exports.select = async (req,res) =>{
    const movie_id = req.params.movie_id;
    console.log(movie_id)
    const movie = await db.movie.findByPk(movie_id);
    res.json(movie);
};

exports.all = async (req,res) =>{
  const movies = await db.movie.findAll();
  return res.json(movies);
}

exports.reviewInsert = async (req,res) => {
    const review = await db.review.create({
        rating: req.body.rating,
        comment: req.body.comment,
        user_id: req.body.user_id,
        movie_id: req.body.movie_id,
    })
    res.json(review);
};

exports.sessionInsert = async(req,res) => {
    const session = await db.session.create({
        session_time: req.body.session_time,
        movie_id: req.body.movie_id,
    });
    res.json(session);
}

exports.movieSessions = async (req, res) => {
    const movie_id = req.params.movie_id;
  
    try {
      // Find all sessions with the specified movie_id
      const sessions = await db.session.findAll({
        where: { movie_id: movie_id },
      });
  
      res.json(sessions);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'An error occurred while fetching movie sessions.' });
    }
};

exports.movieReviews = async (req, res) => {
    const movie_id = req.params.movie_id;
  
    try {
      // Find all sessions with the specified movie_id
      const reviews = await db.review.findAll({
        where: { movie_id: movie_id },
      });
  
      res.json(reviews);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'An error occurred while fetching movie reviews.' });
    }
};