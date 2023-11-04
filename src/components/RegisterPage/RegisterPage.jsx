import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

//MUI components
import { Button } from '@mui/material';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />

      <center>
      <Button
          variant="filled" style={{backgroundColor: "#E6CFC1", color: "#484E6B"}}
          onClick={() => { history.push('/login');}}
        >
          Log in
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
