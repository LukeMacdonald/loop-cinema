import React, { useReducer } from 'react';
import BlockedButton from './BlockedButton';
import { updateUserBlocking } from '../../database/repository';


const userReducer = (state, action) => {
  switch (action.type) {
    case 'BLOCK_USER':
      return { ...state, blocked: true };
    case 'UNBLOCK_USER':
      return { ...state, blocked: false };
    default:
      return state;
  }
};

function UserCard({ user, toggleBlock}) {

  const [state, dispatch] = useReducer(userReducer, user);
  
  const handleToggleBlock = () => {
    if (state.blocked) {
      dispatch({ type: 'UNBLOCK_USER' });
    } else {
      dispatch({ type: 'BLOCK_USER' });
    }
    toggleBlock(user.username, !state.blocked);
  };

  return (
    <div style={styles.card}>
      <div className="row">
        <div className="col-md-9" style={styles.userInfo}>
          <h5 style={styles.userName}>{user.name} ({user.username})</h5>
          <p>{user.email}</p>
        </div>
        <BlockedButton blocked={state.blocked} toggleBlock={handleToggleBlock} />
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
