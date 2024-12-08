import { useContext, useEffect, useState } from 'react'
import { Box, CssBaseline } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import Main from 'styled-components/base/Main';
import NavBar from 'components/base/Navbar';
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from 'components/base/Sidebar';
import { NavbarContextProvider } from 'contexts/NavbarContext';
import AuthContext from 'contexts/AuthContext';

const Base = () => {
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const { authUser, validateUser, loginUser } = useContext(AuthContext);

  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const user = validateUser()
    if (!user) {
      navigate('/login');
    } else {
      loginUser(user)
    }
  }, [])

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