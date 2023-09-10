import React from 'react';
import eventData from '../data/data.json'

function EventInfoCard() {
  return (
    <div className="card" style={{ width: '100%', marginTop:'1rem' }} bg={'light'}>
      <div className="card-body">
        <h3 className="card-title mb-2" style={{ fontSize: '1.5rem',fontWeight:'bold', paddingBottom:'1rem' }}>Upcoming Community Events</h3>
        <div>
          {eventData["events"].map((currentEvent, index) => (
            <div key={index}> {/* Wrap the elements in a div or a fragment */}
              <h5>{currentEvent.title}</h5>
              <div style={{marginLeft:'0.25rem'}}>
              <p><b>Date:</b> {currentEvent.date}</p>
              <p><b>Description:</b> {currentEvent.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventInfoCard;

