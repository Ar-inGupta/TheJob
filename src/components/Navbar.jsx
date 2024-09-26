import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const history = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    };

    const isAuthenticated = !!localStorage.getItem('token');
    const role = JSON.parse(localStorage.getItem('user'))?.role;

    return (
        <nav>
            <Link to="/">Home</Link>
            {isAuthenticated && role === 'employer' && <Link to="/jobs">My Jobs</Link>}
            {isAuthenticated && role === 'job-seeker' && <Link to="/profile">Profile</Link>}
            {isAuthenticated ? <button onClick={handleLogout}>Logout</button> : <Link to="/login">Login</Link>}
        </nav>
    );
};

export default Navbar;
