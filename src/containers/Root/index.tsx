import { useState } from 'react'
import { Box, CssBaseline } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import Main from 'styled-components/Main';
import NavBar from 'components/Root/Navbar';
import { Outlet } from 'react-router-dom'
import Sidebar from 'components/Root/Sidebar';

const Root = () => {
  const [open, setOpen] = useState<boolean>(false);

  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar open={open} handleOpen={handleDrawerOpen} />
      <Sidebar theme={theme} open={open} handleClose={handleDrawerClose} />
      <Main open={open}>
        <Outlet />
      </Main>
    </Box>
  )
}

export default Root