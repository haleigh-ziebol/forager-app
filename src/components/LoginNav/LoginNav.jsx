import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './LoginNav.css';
import { useSelector } from 'react-redux';

function LoginNav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <LogOutButton className="navLink" />
          </>
        )}

      </div>
    </div>
  );
}

export default LoginNav;