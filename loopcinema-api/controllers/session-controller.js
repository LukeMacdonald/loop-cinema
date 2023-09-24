const db = require('../database')

exports.createSession = async(req,res) => {
    const session = await db.session.create({
        session_time: req.body.session_time,
        movie_id: req.body.movie_id,
    });
    res.json(session);
}

exports.getSessionsByMovieID = async (req, res) => {
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