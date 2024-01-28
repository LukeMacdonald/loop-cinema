import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import FormInput from "../FormInput";
import { updateUserProfile } from "../../data/repository";
import { verifyEditProfile } from "../../data/validation";

function EditProfileModal(props) {
  const { user } = props;
  const [errorMessage, setErrorMessage] = useState(null);

  const [fields, setFields] = useState({
    name: user.name,
    email: user.email,
  });

  useEffect(() => {
    setFields({
      name: user.name,
      email: user.email,
    });
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setErrorMessage(null);
    props.onHide();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const verification = verifyEditProfile(
        fields.email,
        fields.name,
        user.email,
      );

      if (!verification.success) {
        setErrorMessage(verification.message);
        return;
      }

      const editedUser = await updateUserProfile({
        username: user.username,
        email: fields.email,
        name: fields.name,
      });

      props.setUser(editedUser);
      window.alert(verification.message);
      props.onHide();
      setErrorMessage(null);
    } catch (error) {
      console.error("Error occurred:", error);
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-dark"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormInput
          label="Name"
          name="name"
          id="name"
          type="text"
          value={fields.name}
          onChange={handleInputChange}
          placeholder={user.name}
          required={true}
        />
        <FormInput
          label="Email"
          name="email"
          id="email"
          type="text"
          value={fields.email}
          onChange={handleInputChange}
          placeholder={user.email}
          required={true}
        />
        {errorMessage && (
          <div
            className="form-group"
            style={{ marginTop: "1rem", textAlign: "center" }}
          >
            <span className="text-danger">{errorMessage}</span>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer style={{ margin: "0 auto" }}>
        <button
          className="bg-green-700 py-2 rounded-md text-light hover:bg-green-500"
          onClick={handleSubmit}
          style={{ width: "150px" }}
        >
          Confirm
        </button>
        <button
          className="bg-red-700 py-2 rounded-md text-light hover:bg-red-500"
          onClick={handleCancel}
          style={{ width: "150px" }}
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProfileModal;
