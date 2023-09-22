import React from 'react';
import addressData from '../../data/data.json'

function BusinessInfoCard() {
  return (
    <div className="card" style={{ width: '100%' }} bg={'light'}>
      <div className="card-body">
        <h5 className="card-title mb-2" style={{ fontSize: '1.5rem',fontWeight:'bold' }}>About Loop Cinema</h5>
        <h5 className="card-subtitle mb-2" style={{paddingTop:'1rem'}}>Locations:</h5>
        <ul>
          {addressData["addresses"].map((address, index) => (
            <li key={index} style={{padding:"10px"}}>
              <a href={`https://www.google.com/maps/search/${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer">{address}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BusinessInfoCard;