import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { getMovieSessions } from '../../data/repository';
import { getDayOfWeek, formatTime, formatDate } from '../../utils/dates';

function SessionTimes(props) {
  const [showings, setSessions] = useState([]);
  useEffect(() => {
    async function fetchMovies() {
      const sessions = await getMovieSessions(props.movieID);
      setSessions(sessions); // Update movies state with the fetched data
    }
    fetchMovies(); // Call the async function to fetch movies
  }, [props.movieID]); // Empty dependency array to run the effect once

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
                <td>{getDayOfWeek(showing.session_time)}</td>
                <td>{formatDate(showing.session_time)}</td>
                <td>{formatTime(showing.session_time)}</td>
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
