import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

//MUI components
import { Button } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <div className="center" style={{marginTop: "20px", width:"50%"}}>
      <div>
      <LoginForm />
      </div>

      <center>
        <Button
          variant="text" sx={{color: "#484E6B", margin:"10px"}}
          onClick={() => { history.push('/registration');}}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;