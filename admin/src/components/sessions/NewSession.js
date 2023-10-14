import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { createSession } from '../../database/repository';

function NewSession(props) {
    const [sessionDetails, setSessionDetails] = useState({
        date: '',
        availableSeats: 10, // Default value set to 10
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSessionDetails({ ...sessionDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the API function to create a new session
      await createSession({
        session_time: sessionDetails.date,
        movie_id: props.movieID,
        available_seats: sessionDetails.availableSeats
      });

      // Close the modal after successful submission
      props.onHide();
    } catch (error) {
      console.error('Error creating session:', error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered style={{height:'50%'}}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Create New Session</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
    
          <Form.Group controlId="datetime">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date"
              value={sessionDetails.date}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="availableSeats">
            <Form.Label>Available Seats</Form.Label>
            <Form.Control
              type="number"
              name="availableSeats"
              value={sessionDetails.availableSeats}
              onChange={handleInputChange}
              min="1" // Set a minimum value for available seats
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Session
        </Button>
         
        </Form>
      </Modal.Body>
      
      <Modal.Footer>
      
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewSession;