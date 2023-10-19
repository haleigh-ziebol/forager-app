import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function RegisterForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRegion, setUserRegion] = useState('');

  const errors = useSelector((store) => store.errors);
  const regionList = useSelector((store) => store.plants.regionList);

  const dispatch = useDispatch();


  //fetches regions for form selector
  useEffect(() => {
    console.log('fetching region list');
    dispatch({type:'FETCH_REGIONS'})
  }, []);

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        region: userRegion
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="regions">Your Region:</label>
          <select
          id="regions"
            value={userRegion}
            onChange={(event) => setUserRegion(event.target.value)}
            required
          >
            {regionList.map((region) => {
                return <option key={region.id} value={region.id}>{region.name}</option>;
            })}
          </select>
      </div>
      <div>
        <input 
        type="radio"
        name="image"
        id="image-1"
        defaultValue={"face"}
        />
        <label htmlFor='image-1'>
          <img 
          alt="image-1-option"
          width={"100px"}
          height={"100px"}
          src={'Profile_SVG/deer-svgrepo-com.svg'}
          />
        </label>
        
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
