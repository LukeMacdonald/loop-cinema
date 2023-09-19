// Import function from userRepository for use in verifyEditProfile
import { getUserObject } from "./userRepository";

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

// Function to check if an email already exists in the user database
function checkExistingEmails(email) {
  return getUserObject(email); // Using imported function
}

// Function to verify sign-up information
function verifySignUp(email, password, confirmPassword) {
  if (!isValidEmail(email)) {
    return "Email is Invalid!";
  }
  if (checkExistingEmails(email) !== null) {
    return "Account already exists with this email!";
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
  if (!isValidEmail(email)) {
    return "Email is Invalid";
  }
  if (name === "") {
    return "Name cannot be empty!";
  }
  if (checkExistingEmails(email) && email !== oldEmail) {
    return "Email already taken!";
  }
  return "success"; // Validation successful
}

export {
  verifyEditProfile,
  verifySignUp,
};
