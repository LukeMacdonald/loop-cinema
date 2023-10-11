import React, { useState } from 'react';
import { Container, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../database/repository';
import FormInput from '../components/FormInput';
import { useAuth } from '../AuthContext';
import LandingImage from "../assets/images/landing.gif";
// "https://gifer.com/en/8V9H"  link for gif

const Login = () => {
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
      await adminLogin({ username: fields.username, password: fields.password });
  
      window.alert("Login successful");
  
      // Dispatch a LOGIN action to update the context state.
      dispatch({ type: 'LOGIN', payload: fields.username });
      navigate(`/admin`);
  
    } catch (error) {
      // Handle the error here, you might want to log it or show an appropriate message to the user.
      console.error("Error during login:", error);
      console.log(error)
  
      const temp = { ...fields };
      temp.password = "";
      setFields(temp);
      setErrorMessage(error.message);
    }
  };
  return (
    <Container className='full-width-height'>
      <Row>
          <Col md={7} className='login-image-section' >
            <img src={LandingImage} className='login-image' alt=''/>
          </Col>
          <Col md={5} className='login-form-section'>
            <Container className='login-form-container'>
              <div style={{textAlign:'center'}}>
              <h1 style={{fontSize:'3rem', fontWeight:'bold'}}>Admin Portal</h1>
              </div>
                  <div className='mt-5'>
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
                  </div>
                  <div className="mt-5">
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
                  </div>
                  <div className="text-center mt-5">
                  {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <Button
                      variant="primary"
                      className='login-button-style' 
                      onClick={handleSubmit}
                    > Sign In
                    </Button>
                    <br/>
                  </div>
                  </Container>
                </Col>
              </Row>
            </Container>
)};

export default Login;

