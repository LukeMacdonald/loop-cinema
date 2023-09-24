
const db = require('../database')
const {validateLogin} = require('../utils')

exports.loginAdmin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(password)
  
    try {
      const admin = await db.admin.findByPk(username);
      if (!admin || !(await validateLogin(password, admin.password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      res.json({ message: 'Login successful', admin: admin });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'An error occurred while logging in.' });
    }
  }