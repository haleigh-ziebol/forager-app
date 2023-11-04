import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

//MUI components
import { Button } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <div className="modal center">
      <LoginForm />

      <center>
        <Button
          variant="filled" style={{backgroundColor: "#E6CFC1", color: "#484E6B", margin:"20px"}}
          onClick={() => { history.push('/registration');}}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
