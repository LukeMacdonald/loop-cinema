// Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const ProfileSidebar = ({ username }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleLogout = () => {
    // Dispatch a LOGOUT action to update the context state.
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <div className="col-md-3" style={{ margin: '2% auto', textAlign: 'left' }}>
        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" style={{width:'50%'}}/>
        <h4 style={{marginTop:'2rem', marginBottom:'2rem'}}>Welcome Back</h4>
        <div className="sidebar-link-container">
            <ul className="nav flex-column">
                <li className={`nav-item custom-nav-link ${location.pathname === `/profile/details/${username}` ? 'custom-active' : ''}`}>
                    <Link className="nav-link" to={`/profile/details/${username}`} style={{ fontSize: '1.25rem', color: 'white' }}>
                    <i className="fa-solid fa-user" style={{ marginRight: '1rem' }}></i> Profile Details
                    </Link>
                </li>
                <li className={`nav-item custom-nav-link ${location.pathname === `/profile/bookings/${username}`  ? 'custom-active' : ''}` } style={{ marginTop: '0.75rem' }}>
                    <Link className={`nav-link ${location.pathname === `/profile/bookings/${username}` ? 'custom-active' : ''}`} to={`/profile/bookings/${username}`} style={{ fontSize: '1.25rem', color: 'white'}}>
                        <i className="fa-solid fa-ticket" style={{ marginRight: '1rem' }}></i> Reservations
                    </Link>
                </li>
                <li className="nav-item custom-nav-link" style={{ marginTop: '0.75rem' }}>
                    <button className="nav-link" onClick={handleLogout} style={{ fontSize: '1.25rem', color: 'white', border: 'none', background: 'none'}}>
                        <i className="fa-solid fa-sign-out" style={{ marginRight: '1rem' }}></i> Logout
                    </button>
                </li>
            </ul>
        </div>
    </div>
  );
};

export default ProfileSidebar;
