import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext"; 

function Header() {
    const navigate = useNavigate();
    const { state, dispatch } = useAuth();

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
        <header className="w-full font-medium flex items-center justify-between relative z-10">
            <nav className="w-full navbar navbar-expand-lg navbar-dark z-1 bg-transparent">
            <a className="navbar-brand text-2xl ml-4" href="/">
               LOOPCINEMA 
            </a>
            <div className="navbar-collapse justify-content-end">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        {state.isLoggedIn && <a className="nav-link text-xl mr-8" href={`/profile/details/${state.username}`}><i className="fa fa-user"></i></a>}
                    </li>
                    <li className="nav-item">
                        {!state.isLoggedIn && 
                        <button className="text-xl hover:text-red-700" onClick={handleSignin}>
                             <i className="fa-solid fa-right-to-bracket mr-4"></i> Log In
                        </button>}
                        {!state.isLoggedIn && 
                        <button className="mx-8 text-xl hover:text-red-700" onClick={handleSignup}>
                            <i className="fa-solid fa-user-plus mr-4" ></i> Sign up 
                        </button>}
                        {state.isLoggedIn && 
                        <button className="text-xl hover:text-red-700" onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket mr-4"></i> Log Out
                        </button>}
                    </li>
                </ul>
            </div>
        </nav>
            

        </header>
    
    )
}

export default Header;



