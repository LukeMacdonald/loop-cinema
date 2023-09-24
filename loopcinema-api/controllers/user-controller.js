const db = require('../database')
const bcrypt = require("bcrypt")
const saltRounds = 10


exports.createUser = async (req, res) => {
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
}

exports.updateUser = async (req, res) =>  {
  const username = req.body.username;

  try {
    const user = await db.user.findByPk(username);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Update profile fields.
    user.name = req.body.name;
    user.email = req.body.email;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
}

exports.deleteUser = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await db.user.findByPk(username);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Delete the user
    await user.destroy();

    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
}

exports.getUserByUsername = async (req, res) => {
  const username = req.params.username;
  const user = await db.user.findByPk(username);
  res.json(user);
}

exports.getUserByEmail = async (req, res) => {
  const email = req.params.email;

  try {
    const user = await db.user.findOne({
      where: { email: email },
    });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while fetching user by email.' });
  }
}

exports.loginUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await db.user.findByPk(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', user: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while logging in.' });
  }
}