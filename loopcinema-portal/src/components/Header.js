import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Provide the correct path to your AuthContext file

import Logo from '../assets/images/logo.png';

function Header(props) {
    const navigate = useNavigate();
    const { state, dispatch } = useAuth(); // Access the state and dispatch function from the AuthContext

    // Handler for navigating to the signup page
    const handleSignup = (event) => {
        event.preventDefault();
        navigate("/signup");
    }

    // Handler for navigating to the signin page
    const handleSignin = (event) => {
        event.preventDefault();
        navigate("/signin");
    }

    // Handler for user logout
    const handleLogout = (event) => {
        event.preventDefault();
        dispatch({ type: 'LOGOUT' }); // Dispatch LOGOUT action to update context state
        navigate("/"); // Navigate to the home page
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/" style={{ marginLeft: '2rem' }}>
                <img src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" />
            </a>
            <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        {/* Show "Profile" link if user is logged in */}
                        {state.isLoggedIn && <a className="nav-link" href={`/profile/${state.username}`}>Profile<span className="sr-only">(current)</span></a>}
                    </li>
                </ul>
                <div style={{ marginRight: '2rem' }}>
                    {/* Show "Sign in" and "Sign up" buttons if user is not logged in */}
                    {!state.isLoggedIn && <button className="btn btn-outline-info nav-button" onClick={handleSignin}>Sign in</button>}
                    {!state.isLoggedIn && <button className="btn btn-outline-info nav-button" onClick={handleSignup}>Sign up</button>}
                    {/* Show "Sign out" button if user is logged in */}
                    {state.isLoggedIn && <button className="btn btn-outline-info nav-button" onClick={handleLogout}>Sign out</button>}
                </div>
            </div>
        </nav>
    )
}

export default Header;

