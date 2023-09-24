import React, { useState } from 'react';
import { Container, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../database/repository';
import LandingImage from "../assets/images/landing.gif"
// "https://gifer.com/en/8V9H"  link for gif
import FormInput from '../components/FormInput';
import '../assets/styles/pages.css'

const Login = (props) => {
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
    console.log(fields.password)
    const response = await adminLogin({username: fields.username, password: fields.password})
    if (response.message === "Login successful"){
        // Show a pop-up message after form submission.
        window.alert(response.message);
        props.loginUser(fields.username);
        navigate(`/admin`);
    }
    // Reset password field to blank.
    const temp = { ...fields };
    temp.password = "";
    setFields(temp);
    setErrorMessage(response.message)
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

