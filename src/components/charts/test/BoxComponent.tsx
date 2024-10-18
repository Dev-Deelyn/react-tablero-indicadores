import React, { ReactNode } from 'react';
import { Grid } from '@mui/material';

interface BoxComponentProps {
  children?: ReactNode;
}

const BoxComponent: React.FC<BoxComponentProps> = ({ children }) => {
  return (
    <Grid container spacing={2} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
      {children}
    </Grid>
  );
};

export default BoxComponent;
