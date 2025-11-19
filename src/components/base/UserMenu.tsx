import { Box, Avatar, Button, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userName = ''
  const userImg = ''

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const { logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();


  return (
    <Box>
      <Button
        color='inherit'
        // size="large"
        // aria-label="account of current user"
        // aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenMenu}
        startIcon={<Avatar src={userImg} />} // sx={{ width: 24, height: 24 }}
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
        <MenuItem onClick={() => {
          logoutUser();
          handleCloseMenu();
          navigate('/login');
        }}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Salir
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserMenu