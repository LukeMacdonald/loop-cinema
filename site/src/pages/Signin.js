import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { userLogin } from "../data/repository";
import { useAuth } from '../AuthContext';
import '../styles/styles.css';

function Signin() {
  const { dispatch } = useAuth();

  const [fields, setFields] = useState({
    username: "",
    password: "",
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
  
    try {
      const response = await userLogin({ username: fields.username, password: fields.password });
  
      if (response.message === "Login successful") {
        window.alert(response.message);
        dispatch({ type: 'LOGIN', payload: fields.username }); // Dispatch a LOGIN action to update the context state.
        navigate(`/profile/details/${response.user.username}`);
      }
  
      const temp = { ...fields };
      temp.password = "";
      setFields(temp);
      setErrorMessage(response.message);
    } catch (error) { 
      // Handle the error, for example, show an error message to the user
      setErrorMessage(error.response.data.error); 
    }
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
