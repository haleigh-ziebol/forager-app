import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Header.css';
import { useSelector } from 'react-redux';

function Header () {
  const user = useSelector((store) => store.user);

  return (
    <div className="header">
      <img className= "logo"
      alt="Logo"
      height={"100px"}
      width={"300px"}
      src={`Site_SVG/Logo.svg`}
      />
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="headLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <LogOutButton className="headLink" />
          </>
        )}

      </div>
    </div>
  );
}

export default Header;
