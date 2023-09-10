// Import function from movieRepository for use in removeUser function
import { deleteUserReviews, updateReviewEmail } from "./movieRepository";

// Constants
const USERS_KEY = "users";
const USER_KEY = "user";

// Initialize local storage "users" with data, if the data is already set this function returns immediately.
function initUsers() {
  // Stop if data is already initialized.
  if (localStorage.getItem(USERS_KEY) !== null) return;

  // Initialize users data with an empty array.
  const users = [];

  // Set data into local storage.
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Function to get the current logged-in user
function getUser() {
  return localStorage.getItem(USER_KEY);
}

// Function to get user object based on email
function getUserObject(email) {
  const users = getUsers();
  for (const user of users) {
    if (email === user.email) {
      return user;
    }
  }
  return null;
}

// Function to verify user login based on email and password
function verifyLogin(email, password) {
  const users = getUsers();
  for (const user of users) {
    if (email === user.email && password === user.password) {
      setUser(email); // Set the logged-in user
      return "success"; // Login successful
    }
  }
  return "Username and / or password invalid, please try again.";
}

// Function to get the list of users from local storage
function getUsers() {
  // Extract user data from local storage.
  const data = localStorage.getItem(USERS_KEY);

  // Convert data to objects.
  return JSON.parse(data);
}

// Function to set the current logged-in user
function setUser(email) {
  localStorage.setItem(USER_KEY, email);
}

// Function to add a new user
function addUser(name, email, password) {
  let users = getUsers();
  if (users == null) {
    users = [];
  }

  const newUser = {
    'name': name,
    'email': email,
    'password': password,
    'joined': new Date(),
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  setUser(email); // Set the logged-in user after registration
}

// Function to log out the current user
function logoutUser() {
  localStorage.removeItem(USER_KEY);
}

// Function to remove a user
function removeUser() {
  const email = localStorage.getItem(USER_KEY);
  const users = getUsers();
  const updatedUsers = users.filter(item => item.email !== email);
  deleteUserReviews(email); // Delete user's reviews along with the user
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  localStorage.removeItem(USER_KEY); // Clear logged-in user information
}

// Function to edit user information
function editUser(newEmail, newName, oldEmail) {
  const users = getUsers();
  for (const user of users) {
    if (oldEmail === user.email) {
      user.email = newEmail;
      user.name = newName;
    }
  }
  setUser(newEmail)
  if (newEmail!== oldEmail){
    updateReviewEmail(newEmail, oldEmail)
  }
  
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Function to get the name of a user based on their email
function getName(email) {
  const user = getUserObject(email);
  return user.name;
}

export {
  initUsers,
  getUser,
  addUser,
  getUsers,
  getUserObject,
  verifyLogin,
  logoutUser,
  removeUser,
  editUser,
  getName,
};
