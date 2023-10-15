import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext"; // Provide the correct path to your AuthContext file

function Header() {
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
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'rgba(0, 0, 0, 0)', margin: '1rem 0 0 2rem' }}>
            <a className="navbar-brand" href="/" style={{ fontSize: '2rem' }}>
               LOOPCINEMA 
            </a>
            <div className="navbar-collapse justify-content-end">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        {state.isLoggedIn && <a className="nav-link" href={`/profile/details/${state.username}`} style={{ fontSize: '1.25rem', marginRight:'2rem' }}><i className="fa fa-user"></i></a>}
                    </li>
                    <li className="nav-item">
                        {!state.isLoggedIn && 
                        <button className="btn nav-button" onClick={handleSignin} style={{ marginRight:'2rem', fontSize: '1.25rem' }}>
                             <i className="fa-solid fa-right-to-bracket" style={{ marginRight:'1rem' }}></i> Log In
                        </button>}
                        {!state.isLoggedIn && 
                        <button className="btn nav-button" onClick={handleSignup} style={{ marginRight:'2rem',fontSize: '1.25rem' }}>
                            <i className="fa-solid fa-user-plus" style={{ marginRight:'1rem' }}></i> Sign up 
                        </button>}
                        {state.isLoggedIn && 
                        <button className="btn nav-button" onClick={handleLogout} style={{ marginRight:'2rem',fontSize: '1.25rem' }}>
                            <i className="fa-solid fa-right-from-bracket" style={{ marginRight:'1rem' }}></i> Log Out
                        </button>}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;



