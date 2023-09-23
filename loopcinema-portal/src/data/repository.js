import axios from "axios";

// Define a constant for the API base URL
const API_BASE_URL = "http://localhost:4000";

// Create a reusable Axios instance with the base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

// User-related functions
async function createUser(user) {
  const response = await api.post("/user", user);
  return response.data;
}

async function findUserByEmail(email) {
  const response = await api.get(`/user/${email}`);
  return response.data;
}

async function getUserProfile(username) {
  const response = await api.get(`/user/profile/${username}`);
  return response.data;
}

async function removeUser(userID) {
  const response = await api.delete(`/user/${userID}`);
  return response.data;
}

async function userLogin(login) {
  const response = await api.post("/user/login", login);
  return response.data;
}

async function updateUserProfile(user) {
  const response = await api.put("/user", user);
  return response.data;
}

// Movie-related functions
async function getAllMovies() {
  const response = await api.get("/movies");
  return response.data;
}

async function findMovieByID(movieID) {
  const response = await api.get(`/movies/movie/${movieID}`);
  return response.data;
}

// Session-related functions
async function getMovieSessions(movieID) {
  const response = await api.get(`/sessions/movie/${movieID}`);
  return response.data;
}

// Review-related functions
async function getMovieReviews(movieID) {
  const response = await api.get(`/reviews/movie/${movieID}`);
  return response.data;
}

async function createReview(review) {
  const response = await api.post("/reviews", review);
  return response.data;
}

async function updateReview(review) {
  const response = await api.put("/reviews", review);
  return response.data;
}

async function deleteReview(review_id) {
  const response = await api.delete(`/reviews/${review_id}`);
  return response.data;
}

export {
  createUser,
  findUserByEmail,
  removeUser,
  updateUserProfile,
  getUserProfile,
  userLogin,
  getAllMovies,
  getMovieSessions,
  findMovieByID,
  getMovieReviews,
  createReview,
  updateReview,
  deleteReview,
};
