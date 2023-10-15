import React from "react";
import { render, screen, waitFor,fireEvent  } from "@testing-library/react";
import Signup from './pages/Signup'
import Signin from "./pages/Signin"; 
import { userLogin } from "./data/repository";


// Mock the react-router-dom useNavigate hook and AuthContext
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));
jest.mock("./AuthContext", () => ({
  useAuth: () => ({
    dispatch: jest.fn(),
  }),
}));

global.alert = jest.fn();

jest.mock('./data/repository', () => ({
  ...jest.requireActual('./data/repository'),
  createUser: jest.fn(), // Mock the createUser function
}));
jest.mock("./data/repository", () => ({
  ...jest.requireActual("./data/repository"),
  userLogin: jest.fn(),
}));

describe('Signup Component', () => {
  test('renders Signup component', () => {
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
    fireEvent.change(passwordInput, { target: { value: "Abcd@123" } });
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("Passwords Must Match!")).toBeInTheDocument();
    fireEvent.change(confirmPasswordInput, { target: { value: "Abcd@123" } });
    fireEvent.click(screen.getByText("Submit"));
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






