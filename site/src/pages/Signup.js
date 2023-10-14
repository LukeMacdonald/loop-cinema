import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { verifySignUp } from "../data/validation";
import { createUser } from "../data/repository";
import { useAuth } from '../AuthContext';

function Signup() {
  const { dispatch } = useAuth();

  const [fields, setFields] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const verified = verifySignUp(
      fields.email,
      fields.password,
      fields.confirmPassword
    );

    try {
      if (verified === "success") {
        const response = await createUser({
          username: fields.username,
          password: fields.password,
          name: fields.name,
          email: fields.email,
        });
        window.alert("Account created successfully!");
        dispatch({ type: 'LOGIN', payload: response.username });
        navigate(`/profile/details/${response.username}`);
        setErrorMessage(null);
      } else {
        const temp = { ...fields };
        temp.password = "";
        temp.confirmPassword = "";
        setFields(temp);
        setErrorMessage(verified);
      }
    } catch (error) {
      setErrorMessage(error.response.data.error); 
    }
  };
  return (
    <div className={"auth-container"}>
      <h1 className={"auth-header"}>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Username"
          name="username"
          id="username"
          type="text"
          value={fields.username}
          onChange={handleInputChange}
          placeholder="Username"
          required={true}
        />
        <FormInput
          label="Name"
          name="name"
          id="name"
          type="text"
          value={fields.name}
          onChange={handleInputChange}
          placeholder="Name"
          required={true}
        />
        <FormInput
          label="Email"
          name="email"
          id="email"
          type="text"
          value={fields.email}
          onChange={handleInputChange}
          placeholder="Email Address"
          required={true}
        />
        <FormInput
          label="Password"
          name="password"
          id="password"
          type="password"
          value={fields.password}
          onChange={handleInputChange}
          placeholder="Password"
          required={true}
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          id="confirmPassword"
          type="password" 
          value={fields.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
          required={true}
        />
        <div className="form-group auth-form-group">
          <input
            type="submit"
            className="btn btn-primary form-input"
            value="Submit"
            style={{ width: "70%" }}
          />
        </div>
        {errorMessage && (
          <div className="form-group" style={{ marginTop: "1rem" }}>
            <span className="text-danger">{errorMessage}</span>
          </div>
        )}
        <div className={"auth-signup-link"}>
          <a href="/">Already Have an Account?</a>
        </div>
      </form>
    </div>
  );
}

export default Signup;

