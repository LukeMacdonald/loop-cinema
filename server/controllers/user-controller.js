const db = require('../database')
const {hashedPassword,validateLogin, validateEmail} = require('../utils')
exports.createUser = async (req, res) => {
  try {
    // Validate request fields
    const trimmedUsername = req.body.username.trim();
    const trimmedPassword = req.body.password.trim();
    const trimmedEmail = req.body.email.trim();
    const trimmedName = req.body.name.trim();

    if (!trimmedUsername || !trimmedPassword || !trimmedEmail || !trimmedName) {
      return res.status(400).json({ error: 'All fields are required and cannot be empty.' });
    }

    if (!validateEmail(trimmedEmail)){
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Check if username or email already exists in the database
    const checkUsername = await db.user.findByPk(trimmedUsername)

    if (checkUsername) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    const checkEmail = await db.user.findOne({
      where: { email: trimmedEmail },
    });

    if (checkEmail){
      return res.status(400).json({ error: 'Email already exists.' });
    }

    // Hash the password
    const hash = await hashedPassword(trimmedPassword);
 
    // Create the user in the database
    const user = await db.user.create({
      username: trimmedUsername,
      password: hash,
      email: trimmedEmail,
      name: trimmedName,
    });

    // Return the created user
    res.status(201).json(user); // 201 Created status for successful resource creation
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
};

exports.updateUser = async (req, res) =>  {
  const username = req.body.username;
  const trimmedName = req.body.name ? req.body.name.trim() : null;
  const trimmedEmail = req.body.email ? req.body.email.trim() : null;

  try {
    // Validate request fields
    if (!trimmedName && !trimmedEmail) {
      return res.status(400).json({ error: 'At least one field (name or email) is required.' });
    }

    const user = await db.user.findByPk(username);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Update profile fields.
    if (trimmedName) {
      user.name = trimmedName;
    }

    if (trimmedEmail) {
      if (!validateEmail(trimmedEmail)){
        return res.status(400).json({ error: 'Invalid email format.' });
      }

      // Check if the email already exists in the database
      const checkEmail = await db.user.findOne({
        where: { email: trimmedEmail },
      });

      if (checkEmail && trimmedEmail !== user.email){
        return res.status(400).json({ error: 'Email already exists.' });
      }

      user.email = trimmedEmail;
    }

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
  try {
    const username = req.params.username;
    const user = await db.user.findByPk(username);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ user });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
};

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

    if (username.trim() == ""){
      return res.status(401).json({ error: 'Username cannot be empty' }); 
    }
    if (password.trim() == ""){
      return res.status(401).json({ error: 'Password cannot be empty' }); 
    }

    if (!user){
      return res.status(401).json({ error: 'Username not found' }); 
    }

    if (!(await validateLogin(password, user.password))) {
      return res.status(401).json({ error: 'Password Incorrect' });
    }

    res.json({ message: 'Login successful', user: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while logging in.' });
  }
}

