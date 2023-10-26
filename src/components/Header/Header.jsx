import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Header.css';
import { useSelector } from 'react-redux';

function Header () {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <div className="header">
      <img className= "logo"
      alt="Logo"
      height={"100px"}
      width={"300px"}
      src={`Site_SVG/Logo.svg`}
      onClick={history.push('/home')}
      />
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          <div>
            <Link className="headLink" to="/login">
              Login
            </Link>
            <Link className="headLink" to="/registration">
              Register
            </Link>
          </div>
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
