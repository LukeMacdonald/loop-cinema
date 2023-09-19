const Review = require('./models/review');
const Movie = require('./models/movie');
const User = require('./models/user');

Review.hasOne(Movie);
Review.hasOne(User);