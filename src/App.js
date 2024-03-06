import React, { Fragment } from 'react';
import RegistrationForm from './components/RegistrationForm';
import { Container, AppBar,Box } from "@mui/material/";
import logo from './assets/logo.png';

const App = () => {
  return (
    <Fragment>
      <AppBar position="static">
            <Box
              component="img"
              sx={{ width: '100%',
              fit:'fill',
              height:'auto' }}
              p={0}
              alt="Logo"
              src={logo}
            />
      </AppBar>
      <Container
        sx={{
          display: 'block',
          mx: 'auto',
          my: 2
        }}
        maxWidth='sm'
      >
        <RegistrationForm />
      </Container>
    </Fragment>


  );
};

export default App;



