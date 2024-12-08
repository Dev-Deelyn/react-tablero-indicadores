import { Box, Button, TextField, Typography, Container, CssBaseline, Alert, Collapse } from '@mui/material';
import AuthContext from 'contexts/AuthContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendAuthLogin } from 'services/AuthServices';

const LoginPage = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendLogin = async () => {
    if (!!username && !!password) {
      setError(undefined)
      const { error, data } = await sendAuthLogin(username, password)
      if (data) {
        loginUser(data)
        navigate('/')
      } else {
        setError(error)
      }
    }
  }

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
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Collapse in={!!error}>
          <Alert severity="error">{error || ''}</Alert>
        </Collapse>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '1rem' }}
          onClick={handleSendLogin}
        >
          Ingresar
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage