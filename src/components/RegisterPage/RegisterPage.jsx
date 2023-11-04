import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

//MUI components
import { Button } from '@mui/material';

function RegisterPage() {
  const history = useHistory();

  return (
    <div className='modal center'>
      <RegisterForm />

      <center>
      <Button
        variant="filled" style={{backgroundColor: "#E6CFC1", color: "#484E6B", margin:"10px"}}
        onClick={() => { history.push('/login');}}
      >
          Log in
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
