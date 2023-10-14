
// Function to check if an email is in valid format
function isValidEmail(email) {
  // Regular expression pattern to check email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the pattern
  return emailPattern.test(email);
}

// Function to check if a password meets the strong password criteria
function isStrongPassword(password) {
  // Define the criteria for a strong password
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  // Check if the password meets all the criteria
  const isStrong =
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar;

  return isStrong;
}

// Function to check if two passwords match
function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

// Function to verify sign-up information
function verifySignUp(email, password, confirmPassword) {
  if (!isValidEmail(email)) {
    return "Email is Invalid!";
  }
  if (!isStrongPassword(password)) {
    return "Password must be at least 8 characters long and contain at least 1 Uppercase & Lowercase Letter," +
      " 1 Number and 1 Special Character!";
  }
  if (!passwordsMatch(password, confirmPassword)) {
    return "Passwords Must Match!";
  }

  return "success"; // Validation successful
}

// Function to verify edit profile information
function verifyEditProfile(email, name, oldEmail) {
  console.log(email, name)
  const response = {
    message: "Edit Profile Successful!",
    success:true

  }
  if (!isValidEmail(email)) {
    response.message = "Email is Invalid!"
    response.success = false
    return response;
  }
  if (name.trim() === "") {
    response.message = "Name cannot be blank"
    response.success = false
    return response;
  }
  return response; // Validation successful
}

// Function to verify and prepare a review for submission
function verifyReview(username, comment, rating, movie_id) {
  const response = {
    "message": "",
    "successful": false
  };

  if (comment.trim() === "") {
    response.message = "Comment cannot be blank!";
    return response;
  }
  response.successful = true;

  response["review"] = {
    username: username,
    comment: comment,
    rating: rating,
    movie_id: movie_id
  };
  console.log(response.review)

  return response
}


export {
  verifyEditProfile,
  verifySignUp,
  verifyReview
};