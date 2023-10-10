import axios from "axios";

// Define a constant for the API base URL
const API_BASE_URL = "http://localhost:4000";

// Create a reusable Axios instance with the base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

async function getAllUsers(){
  const response = await api.get("/admin/users")
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

async function updateUserBlocking(username, block){
  const data = {"username": username, "block": block}
  const response = await api.put("/admin/user/block", data)
  return response.data
}

async function adminLogin(login) {
  console.log(login)
  const response = await api.post("/admin/login", login);
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

async function createMovie(movieData){
  const response = await api.post('/movies', movieData)
  return response.data;
}
async function updateMovie(id, movieData){
  const response = await api.put(`/movies/${id}`,movieData)
  return response.data
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

async function deleteReview(review_id) {
  const response = await api.put(`admin/review/delete/${review_id}`);
  return response.data;
}

export {
  getAllUsers,
  removeUser,
  adminLogin,
  getUserProfile,
  updateUserBlocking,
  getAllMovies,
  getMovieSessions,
  updateMovie,
  createMovie,
  findMovieByID,
  getMovieReviews,
  deleteReview,
};
