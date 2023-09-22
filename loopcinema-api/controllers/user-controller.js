const db = require('../database')
const bcrypt = require("bcrypt")
const saltRounds = 10


exports.insert = async (req, res) => {
    const password = req.body.password;
  
    try {
      const hash = await bcrypt.hash(password, saltRounds); 
      console.log('Hash ', hash); 
  
      const user = await db.user.create({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        name: req.body.name,
      });
  
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
  };

exports.update = async (req,res) => {

}

exports.delete = async (req,res) => {

}

exports.select = async (req,res) => {
    const id = req.params.id
    const user = await db.user.findByPk(id);
    res.json(user)
}

exports.findByEmail = async (req,res) =>{
  const email = req.params.email;
  
    try {
      // Find all sessions with the specified movie_id
      const user = await db.user.findAll({
        where: { email: email },
      });
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'An error occurred while fetching user by email.' });
    }

}