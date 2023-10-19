import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <div>

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              My Profile
            </Link>

            <Link className="navLink" to="/addObservation">
              Add Observation
            </Link>

            <Link className="navLink" to="/search">
              Search Edibles
            </Link>
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
