import React, { useState } from 'react'

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Avatar, Button, ListItemIcon, Menu, MenuItem } from '@mui/material';
// import LightModeIcon from '@mui/icons-material/LightMode';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from 'styled-components/AppBar';
import { navbarBackground } from 'config/constants';

interface propTypes {
  open: boolean
  handleOpen: () => void
}

const NavBar = ({ open, handleOpen }: propTypes) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const setAnchorEl = useState<null | HTMLElement>(null)[1];
  // const [mode, setMode] = useState<boolean>(false)

  const userName = ''
  const userImg = ''

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  return (
    <AppBar position="fixed" style={navbarBackground} open={open} >
      <Toolbar variant="dense">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} />
        {/* <IconButton
          size="large"
          aria-label="light or night"
          color="inherit"
          onClick={() => setMode(!mode)}
        >
          {mode ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton> */}
        <div>

          <Button
            color='inherit'
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenMenu}
            startIcon={<Avatar src={userImg} sx={{ width: 24, height: 24 }} />}
          >
            {userName}
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            MenuListProps={{ sx: { width: 150 } }}
          >
            {/* <Box sx={{ p: 2 }}> */}
            {/* <FormGroup sx={{ pb: 1 }}>
                <FormControlLabel control={<Switch />} label="Colores pastel" />
              </FormGroup> */}
            {/* <Divider /> */}
            {/* <Box sx={{ textAlign: 'center', pt: 2 }}>
                <Button onClick={() => logoutUser()} variant='contained' startIcon={<LogoutIcon />}>Salir</Button>
              </Box> */}
            {/* </Box> */}
            <MenuItem onClick={() => console.log('adios')}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                Salir
              </Typography>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar