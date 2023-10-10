
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
exports.getAllUsers = async (req,res) =>{
    try {
        const users = await db.user.findAll();
        res.json(users);
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'An error occurred while fetching all users.' });
      }
}

exports.updateBlock = async (req, res) => {
  const username = req.body.username;
  try {
    const user = await db.user.findByPk(username);
    user.blocked = req.body.block;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
}

exports.deleteReview = async (req,res)=>{
  try{
    const review_id = req.params.review_id;
    console.log(review_id)
    const review = await db.review.findByPk(review_id);
    console.log(review)
    review.removed = true
    await review.save()
    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while updating the review.' });
  }
}