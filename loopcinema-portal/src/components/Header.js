import Logo from '../assets/images/logo.png';
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../data/userRepository';

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
        logoutUser(); // Logout the user
        props.logoutUser(); // Update app state
        navigate("/"); // Navigate to the home page
    };

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="/" style={{ marginLeft: '2rem' }}>
                <img src={Logo} width="30" height="30" class="d-inline-block align-top" alt="" />
            </a>
            <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        {/* Show "Profile" link if user is logged in */}
                        {props.isLoggedIn && <a class="nav-link" href="/profile">Profile<span class="sr-only">(current)</span></a>}
                    </li>
                    <li class="nav-item active">
                        {/* Show "Reviews" link if user is logged in */}
                        {props.isLoggedIn && <a class="nav-link" href="/movies">Reviews<span class="sr-only">(current)</span></a>}
                    </li>
                </ul>
                <div style={{ marginRight: '2rem' }}>
                    {/* Show "Sign in" and "Sign up" buttons if user is not logged in */}
                    {!props.isLoggedIn && <button class="btn btn-outline-info nav-button" onClick={handleSignin}>Sign in</button>}
                    {!props.isLoggedIn && <button class="btn btn-outline-info nav-button" onClick={handleSignup}>Sign up</button>}
                    {/* Show "Sign out" button if user is logged in */}
                    {props.isLoggedIn && <button class="btn btn-outline-info nav-button" onClick={handleLogout}>Sign out</button>}
                </div>
            </div>
        </nav>
    )
}

export default Header;
