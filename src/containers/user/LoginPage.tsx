import { Box, Button, TextField, Typography, Container, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate()

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100dvh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Ingresar al tablero
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '1rem' }}
          onClick={() => navigate('/')}
        >
          Ingresar
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage