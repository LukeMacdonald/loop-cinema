import data from './data.json';

// Constants
const MOVIES_KEY = "movies";
const MAX_REVIEWS_IN_TIME_PERIOD = 10; // Maximum allowed reviews in a time period
const TIME_PERIOD_IN_MINUTES = 5;      // Time period in minutes
const MAX_REVIEWS_FOR_MOVIE_IN_TIME_PERIOD = 3;

// Initialize local storage "movies" with data, if the data is already set this function returns immediately.
function initMovies() {
  // Stop if data is already initialized.
  if (localStorage.getItem(MOVIES_KEY) !== null) return;

  loadMovies();
}

// Function to get a specific movie by name
function getMovie(title) {
  const movies = getMovies();
  return movies.find(movie => movie.title === title) || null;
}

// Function to verify and prepare a review for submission
function verifyReview(email, comment, rating, title) {
  const response = {
    "message": "",
    "successful": false
  };

  if (comment.trim() === "") {
    response.message = "Comment cannot be blank!";
    return response;
  }

  const canPostReview = canUserPostReview(email, title);
  if (canPostReview) {
    response.successful = true;
    response["review"] = {
      email: email,
      comment: comment,
      rating: rating,
    };
    return response;
  } else {
    response.message = "User has exceeded the total number of reviews allowed";
    return response;
  }
}

// Function to edit a review based on ID, title, comment, and rating
function editReview(id, title, comment, rating) {
  const movies = getMovies();
  for (const movie of movies) {
    if (movie.title === title) {
      for (const review of movie.reviews) {
        if (review.id === id) {
          review.comment = comment;
          review.rating = rating;
          review.datetime = new Date().toISOString();
          localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
          return;
        }
      }
    }
  }
}

// Function to get reviews for a specific movie title
function getReviews(title) {
  const movie = getMovie(title);
  return movie.reviews;
}

// Function to get movies from local storage or load them from data
function getMovies() {
  let movies = localStorage.getItem(MOVIES_KEY);
  if (!movies) {
    movies = loadMovies();
  }
  return JSON.parse(movies);
}

// Function to load movies data into local storage
function loadMovies() {
  localStorage.setItem(MOVIES_KEY, JSON.stringify(data["movies"]));
  return JSON.parse(localStorage.getItem(MOVIES_KEY));
}

// Function to generate a random review ID
function generateRandomId() {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 10000);
  return `${timestamp}-${randomNum}`;
}

// Function to update a review for a specific movie
function updateReview(title, review) {
  const movies = getMovies();
  for (const movie of movies) {
    if (movie.title === title) {
      const currentDate = new Date();
      review["id"] = generateRandomId();
      review["datetime"] = currentDate.toISOString();
      movie.reviews.push(review);
    }
  }
  localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
}

// Function to delete user reviews based on their email
function deleteUserReviews(email) {
  const movies = getMovies();
  const updatedMovies = movies.map(movie => ({
    ...movie,
    reviews: movie.reviews.filter(review => review.email !== email),
  }));
  localStorage.setItem(MOVIES_KEY, JSON.stringify(updatedMovies));
}

// Function to delete a review by ID and movie title
function deleteReview(id, title) {
  const movies = getMovies();
  for (const movie of movies) {
    if (movie.title === title) {
      movie.reviews = movie.reviews.filter(review => review.id !== id);
      localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
      return;
    }
  }
}

function updateReviewEmail(newEmail,oldEmail){
  const movies = getMovies();
  for (const movie of movies){
    for (const review of movie.reviews){
      if (review.email === oldEmail){
        review.email = newEmail
      }
    }
  }
  localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
}

// Function to calculate the average sum of ratings for a movie
function calculateSumOfRatings(title) {
  const movie = getMovie(title);
  if (!movie || movie.reviews.length === 0) {
    return "N/A";
  }
  const sumOfRatings = movie.reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0);
  const averageRating = sumOfRatings / movie.reviews.length || 0;
  return averageRating.toFixed(1);
}

// Function to calculate the sum of ratings for a movie
function calculateSumOfRatingsValue(title) {
  const movie = getMovie(title);
  if (!movie) {
    return 0;
  }
  const sumOfRatings = movie.reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0);
  const averageRating = sumOfRatings / movie.reviews.length || 0;
  return averageRating.toFixed(1);
}


function canUserPostReview(email, title) {
  // Get the current timestamp in milliseconds
  const currentTime = new Date().getTime();

  // Convert the time threshold (defined in minutes) to milliseconds
  const timeThreshold = TIME_PERIOD_IN_MINUTES * 60 * 1000;

  // Initialize a counter to track the number of reviews for the specific movie
  let userReviewCountForMovie = 0;

  // Get the list of movies
  const movies = getMovies();

  // Loop through each movie to check the user's review activity
  for (const movie of movies) {
    // Initialize a counter to track the total number of reviews by the user
    let reviewCount = 0;

    // Loop through each review associated with the current movie
    for (const review of movie.reviews) {
      // Check if the review matches the user's email and falls within the time threshold
      if (review.email === email && currentTime - new Date(review.datetime).getTime() <= timeThreshold) {
        // Increment the total review count
        reviewCount++;

        // Check if the review is for the specific movie
        if (movie.title === title) {
          // Increment the count for reviews of the specific movie
          userReviewCountForMovie++;
        }

        // Check if the user has exceeded the review limits either overall or for the specific movie
        if (reviewCount >= MAX_REVIEWS_IN_TIME_PERIOD || userReviewCountForMovie >= MAX_REVIEWS_FOR_MOVIE_IN_TIME_PERIOD) {
          // Return false indicating the user cannot post a review
          return false;
        }
      }
    }
  }

  // If the loop completes without violations, return true indicating the user can post a review
  return true;
}


export {
    initMovies,
    getMovie,
    deleteUserReviews,
    getMovies,
    calculateSumOfRatings,
    getReviews,
    editReview,
    deleteReview,
    calculateSumOfRatingsValue,
    verifyReview,
    updateReview,
    updateReviewEmail
}