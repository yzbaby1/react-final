// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <span>|</span>
        <Link to="/books">Books</Link>
        <span>|</span>
        <Link to="/add">Add Book</Link>
        <span>|</span>
        <Link to="/cart">Cart</Link>
        <span>|</span>
        <Link to="/orders">Orders</Link>
      </div>
      <div className="nav-user">
        {user ? (
          <>
            <span>Hi, {user.name}</span> 
            <button className="logout-btn" onClick={handleLogout}>登出</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
