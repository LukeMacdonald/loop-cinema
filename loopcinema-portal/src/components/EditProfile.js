import React from 'react';
import { Button, Modal} from 'react-bootstrap';
import { getUserObject, editUser } from '../data/userRepository';
import { useState } from 'react';
import { verifyEditProfile } from '../data/userValidation';
import FormInput from './FormInput';

function EditProfile(props) {
  // Get user object based on the provided email
  const user = getUserObject(props.email);

  // State to manage error messages
  const [errorMessage, setErrorMessage] = useState(null);

  // State to manage form fields
  const [fields, setFields] = useState({
    name: user.name,
    email: user.email, 
  });

  // Generic change handler for form inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update state with the changed field value
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleCancel = (event) =>{
    event.preventDefault();
    setErrorMessage("");
    props.onHide();    
  }

  // Handler for submitting the form
  const handleSubmit = (event) => {
    event.preventDefault();
    const verified = verifyEditProfile(fields.email, fields.name, props.email);
    if (verified === "success") {
      // Edit user's account and show a success message
      editUser(fields.email, fields.name, props.email);
      window.alert("Account edited successfully!");
      const user = getUserObject(fields.email)
      props.setUser(user);
      props.onHide();
      setErrorMessage("");
      return 
    }
    // Set the error message, if any
    setErrorMessage(verified);

    // Reset the form fields
    const temp = { ...fields };
    setFields(temp);
  };
 
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form inputs for name and email */}
        <FormInput
          label="Name"
          name="name"
          id="name"
          type="text"
          value={fields.name}
          onChange={handleInputChange}
          placeholder={props.name}
          required={true}
        />
        <FormInput
          label="Email"
          name="email"
          id="email"
          type="text"
          value={fields.email}
          onChange={handleInputChange}
          placeholder={props.email}
          required={true}
        />
        {/* Display error message if any */}
        {errorMessage && (
          <div className="form-group" style={{marginTop:'1rem', textAlign:'center'}}>
            <span className="text-danger">{errorMessage}</span>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer style={{margin:'0 auto'}}>
        {/* Buttons to confirm or cancel the edit */}
        <Button variant={"success"} onClick={handleSubmit} style={{width:'150px'}}>Confirm</Button>
        <Button variant={"danger"} onClick={handleCancel} style={{width:'150px'}}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProfile;


