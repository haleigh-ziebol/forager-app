import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div>
    {user.id && <div className="nav">
        {/* If a user is logged in, show these links */}
          <>
            <Link className="navLink" to="/user">
              My Profile
            </Link>

            <Link className="navLink" to="/addObservation">
              Add Find
            </Link>

            <Link className="navLink" to="/search">
              Search Edibles
            </Link>

            <Link className="navLink" to="/about">
            About
          </Link>
          </>
    </div>
    }
  </div>
  );
}

export default Nav;
