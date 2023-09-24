import React from 'react';

function BlockedButton({ blocked, toggleBlock }) {
  const buttonText = blocked ? 'Unblock' : 'Block';
  const buttonClass = blocked ? 'btn btn-primary' : 'btn btn-danger';

  return (
    <div className="col-md-3 d-flex align-items-center">
      <button className={buttonClass} onClick={toggleBlock} style={{ width: '90%' }}>
        {buttonText}
      </button>
    </div>
  );
}

export default BlockedButton;
