import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import {Container} from "@mui/material/";

const App = () => {
  return (
    <Container
      sx={{
        display: 'block',
        mx:'auto',
        my:'auto'
      }}
      maxWidth='sm'
    >
<RegistrationForm />
   </Container>
      
  );
};

export default App;
