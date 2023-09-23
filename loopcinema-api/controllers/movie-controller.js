const db = require('../database')


exports.create = async (req,res) => {
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