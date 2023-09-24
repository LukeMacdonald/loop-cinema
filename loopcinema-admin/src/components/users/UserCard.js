import React from 'react';
import BlockedButton from './BlockedButton';

function UserCard({ user, toggleUserBlock }) {
  const toggleBlock = () => {
    // You can add the logic here to toggle the user's blocked status.
    // For this example, let's assume you have a function called toggleUserBlock.
    // You should replace this with your actual logic.
    toggleUserBlock(user.id);
  };

  return (
    <div style={styles.card}>
      <div className="row">
        <div className="col-md-9" style={styles.userInfo}>
          <h5 style={styles.userName}>{user.name} ({user.username})</h5>
          <p>{user.email}</p>
        </div>
        <BlockedButton blocked={user.blocked} toggleBlock={toggleBlock}/>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: '90%',
    margin: '1rem auto',
    backgroundColor: '#EEEEEE',
    padding: '1rem',
    borderRadius: '10px',
  },
  userInfo: {
    textAlign: 'left',
  },
  userName: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    textAlign: 'center',
  },
};

export default UserCard;
