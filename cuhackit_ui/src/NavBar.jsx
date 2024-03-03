import { Link } from 'react-router-dom';
import React from 'react';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mw-100">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Your Brand</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link className="nav-link" to="/">Dashboard</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/add-class">Add Class</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/display-classes">Display Classes</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
            </div>
        </div>
    </nav>
  );
}

export default NavBar;
