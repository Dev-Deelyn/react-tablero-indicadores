import { useContext, useEffect, useState } from 'react'
import { Box, CssBaseline } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import Main from 'styled-components/base/Main';
import NavBar from 'components/base/Navbar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from 'components/base/Sidebar';
import { NavbarContextProvider } from 'contexts/NavbarContext';
import { AuthContext, AuthContextProvider } from 'contexts/AuthContext';
import { routesKeynamesVisibles } from 'router/routes';

const Base = () => {
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { validateUser, loginUser, accessKeynames, refreshAccessKeynames } = useContext(AuthContext);

  const theme = useTheme();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  useEffect(() => {
    const user = validateUser();
    if (!user) {
      navigate('/login');
    } else {
      loginUser(user);
    }
  }, []);

  useEffect(() => {
    const user = validateUser();
    if (!user) {
      navigate('/login');
    } else {
      refreshAccessKeynames();
    }
  }, [location]);

  useEffect(() => {
    const user = validateUser();
    if (!user) return;

    const [mainPath] = location.pathname.split('/').filter(Boolean);

    if (accessKeynames.length > 0 && routesKeynamesVisibles.includes(mainPath)) {
      const isValid = accessKeynames.includes(mainPath);
      if (!isValid) navigate('/');
    }
  }, [accessKeynames]);

  return (
    <NavbarContextProvider>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CssBaseline />
        <NavBar open={open} handleOpen={handleDrawerOpen} />
        <Sidebar theme={theme} open={open} handleClose={handleDrawerClose} />
        <Main sx={{ backgroundColor: '#EEEEEE' }} open={open}>
          <Outlet />
        </Main>
      </Box>
    </NavbarContextProvider>
  )
}

export default Base