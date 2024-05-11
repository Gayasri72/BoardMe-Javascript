// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.href = `/`;
  };

  return (
    <div style={{ backgroundColor: ' rgb(51, 161, 246)', width: '100px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h1 className='font-bold text-xl'>APP</h1>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        {isLoggedIn && (
          <>
            <Link to="/bookings" style={{ color: 'white', textDecoration: 'none' }}>Bookings</Link>
            <Link to="/payments" style={{ color: 'white', textDecoration: 'none' }}>Payments</Link>
            <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
          </>
        )}
        {!isLoggedIn && (
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
