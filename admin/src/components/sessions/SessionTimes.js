import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { getMovieSessions } from '../../database/repository';
import { getDayOfWeek, formatTime, formatDate } from '../../utils/dates';
import NewSession from './NewSession';

function SessionTimes(props) {
  const [showings, setSessions] = useState([]);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const movie_id = props.movie_id

  useEffect(() => {
    async function fetchMovies() {
      const sessions = await getMovieSessions(movie_id);
      setSessions(sessions); // Update movies state with the fetched data
    }
    fetchMovies(); // Call the async function to fetch movies
  }, [movie_id, showNewSessionModal]); // Empty dependency array to run the effect once

  return (
    <>
      {!showNewSessionModal && (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show} // Control the visibility of SessionTimes modal using props.show
        onHide={props.onHide} // Close SessionTimes modal using props.onHide
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
          <Button variant="primary" onClick={() => setShowNewSessionModal(true)}>
            Add New Session
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        <NewSession show={showNewSessionModal} onHide={() => setShowNewSessionModal(false)} movieID={movie_id} />
      </Modal>
      )}

      <NewSession
        show={showNewSessionModal}
        onHide={() => setShowNewSessionModal(false)}
        movie_id={movie_id}
      />
    </>
  );
}

export default SessionTimes;
