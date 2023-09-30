import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();

    return (
        <div className="col-md-3 sidebar-container">
            <h2 style={{ margin: '2rem 0 0 3rem', textAlign:'left' }} >Admin Portal</h2>
            <hr style={{ borderTop: '1px solid #fff' }} />
            <div className="sidebar-link-container">
                <ul className="nav flex-column">
                    <li className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}>
                        <Link className="nav-link" to="/admin" style={{ fontSize: '1.25rem', color: 'white' }}>
                            <i className="fa-solid fa-house" style={{ marginRight: '1rem' }}></i> Home
                        </Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/customers' ? 'active' : ''}`}>
                        <Link className={`nav-link ${location.pathname === '/admin/users' ? 'active' : ''}`} to="/admin/users" style={{ fontSize: '1.25rem', color: 'white', marginTop: '0.75rem' }}>
                            <i className="fa-solid fa-user" style={{ marginRight: '1rem' }}></i> Customers
                        </Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/movies' ? 'active' : ''}`}>
                        <Link className={`nav-link ${location.pathname === '/admin/movies' ? 'active' : ''}`} to="/admin/movies" style={{ fontSize: '1.25rem', color: 'white', marginTop: '0.75rem' }}>
                            <i className="fa-solid fa-clapperboard" style={{ marginRight: '1rem' }}></i> Movies
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;


