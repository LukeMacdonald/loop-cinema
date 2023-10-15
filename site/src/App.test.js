import React from "react";
import { render, screen, waitFor,fireEvent  } from "@testing-library/react";
import Signup from './pages/Signup'
import Signin from "./pages/Signin"; 
import EditProfileModal from './components/profile/EditProfileModal'
import Profile from "./pages/Profile";
import DeleteAccountButton from './components/profile/DeleteProfileButton'
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { userLogin, removeUser, createUser, getUserProfile} from "./data/repository";


// Mock the react-router-dom useNavigate hook and AuthContext
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(), // Mock useNavigate only for this test suite
}));

// Mock the AuthContext
jest.mock("./AuthContext", () => ({
  useAuth: () => ({
    dispatch: jest.fn(),
    state: {
      username: 'testuser',
      isLoggedIn: true,
    },
  }),
}));

// Mock window.alert and window.confirm
global.alert = jest.fn();
global.confirm = jest.fn()

// Mock calls to backend server
jest.mock("./data/repository", () => ({
  ...jest.requireActual("./data/repository"),
  userLogin: jest.fn(),
  removeUser: jest.fn(),
  createUser: jest.fn(),
  getUserProfile: jest.fn(),
}));

describe('Signup Component', () => {
  test('renders Signup component', async () => {
    render(<Signup />);
    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");
    const confirmPasswordInput = screen.getByTestId("confirmPassword");
    const nameInput = screen.getByTestId("name");
    const emailInput = screen.getByTestId("email")
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("Username cannot be empty")).toBeInTheDocument();
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("Email cannot be empty")).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: "testusergmail.com" } });
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("Email is Invalid!")).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: "testuser@gmail.com" } });
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("Name cannot be empty")).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("Password cannot be empty")).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: "abc123" } });
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("Password must be at least 8 characters long and contain at least 1 Uppercase & Lowercase Letter, 1 Number and 1 Special Character!")).toBeInTheDocument();
    fireEvent.change(passwordInput,  { target: { value: "Abcd@1239" } });
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("Passwords Must Match!")).toBeInTheDocument();
    fireEvent.change(confirmPasswordInput, { target: { value: "Abcd@1239" } });
    fireEvent.change(passwordInput,  { target: { value: "Abcd@1239" } });
    
    createUser.mockResolvedValueOnce({
      username: "testuser"
    });
    
    fireEvent.click(screen.getByText("Submit"));
     
    const data =  {username: usernameInput.value,password: passwordInput.value, name: nameInput.value, email: emailInput.value}
    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith(data);
    })
    
  });
});

describe("Signin Component", () => {
  test("form input changes", async () => {
    render(<Signin />);
    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("Username cannot be empty")).toBeInTheDocument();
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("Password cannot be empty")).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: "Password@123" } });
    userLogin.mockResolvedValueOnce({
      message: "Login successful",
      user: { username: "testuser" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(userLogin).toHaveBeenCalledWith({
        username: "testuser",
        password: "Password@123",
      });
      expect(window.alert).toHaveBeenCalledWith("Login successful");
    });
  })
});

describe('Profile Component', () => {
  it('fetches and displays user profile data', async () => {
    const mockUser = {
      username: 'testuser',
      name: 'John Doe',
      email: 'testuser@example.com',
      // ...other user properties
    };

    getUserProfile.mockResolvedValueOnce(mockUser);

    // Render the component with a route parameter
    render(
      <MemoryRouter initialEntries={['/profile/testuser']}>
        <Routes>
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the profile data to be fetched and displayed
    await waitFor(() => {
      expect(getUserProfile).toHaveBeenCalledWith('testuser');
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('testuser@example.com')).toBeInTheDocument();
      // ...assert other user data if available in the component
    });
  });
});

describe("EditProfileModal Component", () => {
  const user = {
    username: "testuser",
    name: "John Doe",
    email: "testuser@gmail.com"
  };

  test("renders EditProfileModal component", () => {
    render(<EditProfileModal show={true} user={user} onHide={jest.fn()} setUser={jest.fn()} />);
    expect(screen.getByText("Edit Profile")).toBeInTheDocument();
    const nameInput = screen.getByTestId("name");
    const emailInput = screen.getByTestId("email");
    expect(nameInput).toHaveValue(user.name);
    expect(emailInput).toHaveValue(user.email);
    fireEvent.change(emailInput, { target: { value: "lukemacdonaldgmail.com" } });
    fireEvent.click(screen.getByText("Confirm"));
    expect(screen.getByText("Email is Invalid!")).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: "lukemacdonald@gmail.com" } });
    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.click(screen.getByText("Confirm"));
    expect(screen.getByText("Name cannot be blank")).toBeInTheDocument();
  });
});

describe('DeleteAccountButton Component', () => {
  test('handles account deletion on button click', async () => {
    const username = 'testuser';

    // Mock the dispatch function from useAuth
    const dispatch = jest.fn();

    // Mock the removeUser function to resolve successfully
    removeUser.mockResolvedValueOnce();
    
    jest.spyOn(window, 'confirm').mockImplementation(() => true);

    // Render the component
    render(<DeleteAccountButton username={username} />);

    // Click the "Delete Account" button
    fireEvent.click(screen.getByText('Delete Account'));

    // Check if confirmation dialog appears
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete your account?');

    // Check if removeUser function was called with the correct username
    expect(removeUser).toHaveBeenCalledWith(username);

    // Wait for the asynchronous code to complete
    await waitFor(() => {

      // Check if alert message appears
      expect(window.alert).toHaveBeenCalledWith('User Deleted!');
    });
  });
});

describe("Add Review", () =>{})




