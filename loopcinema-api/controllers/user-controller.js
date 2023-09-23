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
  const user = await db.user.findByPk(req.body.username); 
  // Update profile fields.
  user.name = req.body.name;
  user.email = req.body.email;

  await user.save();
  
  res.json(user);
};
exports.delete = async (req,res) => {

}

exports.select = async (req,res) => {
    const username = req.params.username
    const user = await db.user.findByPk(username);
    res.json(user)
}

exports.findByEmail = async (req,res) =>{
  const email = req.params.email;
  
    try {
      // Find all sessions with the specified movie_id
      const user = await db.user.findOne({
        where: { email: email },
      });
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'An error occurred while fetching user by email.' });
    }

}

exports.login = async(req,res) =>{
  const username = req.body.username;
  const password = req.body.password;
  try {
    // Find the user by email
    const user = await db.user.findByPk(username)

    if (!user) {
        // User with the provided email doesn't exist
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        // Passwords don't match
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Passwords match, user is authenticated
    res.json({ message: 'Login successful', user: user });
} catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while logging in.' });
}
};