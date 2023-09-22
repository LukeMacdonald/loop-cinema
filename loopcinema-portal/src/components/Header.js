import Logo from '../assets/images/logo.png';
import { useNavigate } from "react-router-dom";

function Header(props) {
    const navigate = useNavigate();

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
        props.logoutUser(); // Update app state
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
                        {props.isLoggedIn && <a className="nav-link" href="/profile">Profile<span className="sr-only">(current)</span></a>}
                    </li>
                    <li className="nav-item active">
                        {/* Show "Reviews" link if user is logged in */}
                        {props.isLoggedIn && <a className="nav-link" href="/movies">Reviews<span className="sr-only">(current)</span></a>}
                    </li>
                </ul>
                <div style={{ marginRight: '2rem' }}>
                    {/* Show "Sign in" and "Sign up" buttons if user is not logged in */}
                    {!props.isLoggedIn && <button className="btn btn-outline-info nav-button" onClick={handleSignin}>Sign in</button>}
                    {!props.isLoggedIn && <button className="btn btn-outline-info nav-button" onClick={handleSignup}>Sign up</button>}
                    {/* Show "Sign out" button if user is logged in */}
                    {props.isLoggedIn && <button className="btn btn-outline-info nav-button" onClick={handleLogout}>Sign out</button>}
                </div>
            </div>
        </nav>
    )
}

export default Header;
