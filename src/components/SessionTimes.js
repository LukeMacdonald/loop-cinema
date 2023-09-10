import React from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

function SessionTimes(props) {
  const showings = props.times;

  // Array to map numeric month to month names
  const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Upcoming Showings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Day</th>
              <th>Date</th>
              <th>Session Times</th>
            </tr>
          </thead>
          <tbody>
            {showings.map((showing, index) => (
              <tr key={index}>
                <td>{showing.day}</td>
                <td>{`${new Date(showing.date).getDate()} ${monthNames[new Date(showing.date).getMonth()]}`}</td>
                <td>{showing.times.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SessionTimes;

