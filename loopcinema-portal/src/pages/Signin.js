import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { userLogin } from "../data/repository";

import '../styles/styles.css'

function Signin(props) {
  
  const [fields, setFields] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  
  // Generic change handler.
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update state.
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };
  
  // handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await userLogin({username: fields.username, password: fields.password})
    if (response.message === "Login successful"){
        // Show a pop-up message after form submission.
        window.alert(response.message);
        props.loginUser(fields.username);
        navigate(`/profile/${response.user.username}`);
    }
    // Reset password field to blank.
    const temp = { ...fields };
    temp.password = "";
    setFields(temp);
    setErrorMessage(response.message)
  };

  return (
    <div className="auth-container">
      <h1 className="auth-header">Welcome Back</h1>
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
              label="Password"
              name="password"
              id="password"
              type="password"
              value={fields.password}
              onChange={handleInputChange}
              placeholder="Password"
              required={true}
          />
          <div className="form-group" style={{textAlign:'center'}}>
              <input type="submit" className="btn btn-primary form-input" value="Submit" style={{width:'70%' ,marginTop: '5%'}} />
          </div>
          {errorMessage && (
          <div className="form-group" style={{marginTop:'1rem'}}>
              <span className="text-danger">{errorMessage}</span>
          </div>
          
          )}
          <div className={'auth-signup-link'}>
            <a href="/signup">Don't already have an Account?</a>
          </div>
      </form>
    </div>
  );
}

export default Signin;
