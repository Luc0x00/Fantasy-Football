import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarStyle.css'

const Navbar = ({ isAuthenticated, onLogout }) => {
    return (
        <nav className="navbar">
            {isAuthenticated && (
                <ul className="navbar-links">
                    <li><Link to="/home" className="navbar-link">Home</Link></li>
                    <li><Link to="/team" className="navbar-link">Team</Link></li>
                    <li><Link to="/transfers" className="navbar-link">Transfers</Link></li>
                    <li><button onClick={onLogout} className="navbar-link">Logout</button></li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
