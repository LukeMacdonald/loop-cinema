// Import your Sequelize model and any required dependencies here
const db = require('../database')
// Function to find reviews by movie ID
exports.getReviewsByMovieID = async (req, res) => {
    try {
      const movie_id = req.params.movie_id;
      const reviews = await db.review.findAll({
        where: { movie_id },
      });
  
      res.json(reviews);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'An error occurred while fetching movie reviews.' });
    }
};
  
// Function to create a new review
exports.createReview = async (req, res) => {
    try {
      const { rating, comment, username, movie_id } = req.body;
  
      // Input validation
      if (!username || !movie_id) {
        
        return res.status(400).json({ error: 'Invalid input data.' });
      }

      if (comment.length <= 0 || comment.length > 600){
        
        return res.status(400).json({ error: 'Invalid comment length' });
      }
      if (rating < 1 || rating > 5){
        return res.status(400).json({ error: 'Invalid rating value' });
      }

      existingUser = await db.user.findByPk(username)
      if (!existingUser){
        return res.status(400).json({ error: 'User doesnt exist.' });
      }

      existingMovie = await db.movie.findByPk(movie_id)
      if (!existingMovie){
        return res.status(400).json({ error: 'Movie doesnt exist.' });
      }

      const review = await db.review.create({
        rating,
        comment,
        username,
        movie_id,
      });
  
      res.status(201).json(review);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'An error occurred while creating the review.' });
    }
};
  
 // Function to update an existing review
exports.updateReview = async (req, res) => {
    try {
      const { review_id, rating, comment } = req.body;
  
      // Input validation
      if (!review_id || (!rating && !comment)) {
        return res.status(400).json({ error: 'Invalid input data.' });
      }
  
      const review = await db.review.findByPk(review_id);
  
      if (!review) {
        return res.status(404).json({ error: 'Review not found.' });
      }
  
      if (rating) {
        review.rating = rating;
      }
  
      if (comment) {
        review.comment = comment;
      }
  
      await review.save();
  
      res.json(review);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'An error occurred while updating the review.' });
    }
};

// Function to delete a review by its ID
exports.deleteReview = async (req, res) => {
    try {
      const review_id = req.params.review_id;
  
      // Check if the review exists
      const review = await db.review.findByPk(review_id);
  
      if (!review) {
        return res.status(404).json({ error: 'Review not found.' });
      }
  
      // Delete the review
      await review.destroy();
  
      res.json({ message: 'Review deleted successfully.' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'An error occurred while deleting the review.' });
    }  
};
  