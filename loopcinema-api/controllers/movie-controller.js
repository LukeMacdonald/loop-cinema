
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