import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertContext from '../context/alert/AlertContext';
const Navbar = () => {

    const location = useLocation();
    const authToken = localStorage.getItem('token');
    const nav = useNavigate();
    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    const logoutUser = () => {
        localStorage.removeItem('token');
        showAlert(`User logged out.`, 'success');
        nav('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname === '/') ? 'active' : ''}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname === '/about') ? 'active' : ''}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!authToken ?
                        <div className='d-flex'>
                            <Link className="btn btn-primary btn-sm mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary btn-sm mx-2" to="/signup" role="button">Sign Up</Link>
                        </div> : <button className='btn btn-primary btn-sm' onClick={logoutUser}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar