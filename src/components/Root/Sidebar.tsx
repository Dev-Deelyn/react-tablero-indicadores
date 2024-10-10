
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Drawer from '@mui/material/Drawer';
import DrawerHeader from 'styled-components/DrawerHeader';
import { drawerWidth } from 'config/constants';
import { Theme } from '@mui/material';
import SidebarItems from './SidebarItems';
// import ListMinistries from 'layouts/ListMinistries';
// import ListOptions from 'root/layouts/ListOptions';
// import { useAppSelector } from 'hooks/ReduxHooks';

interface propTypes {
  theme: Theme
  open: boolean
  handleClose: () => void
}

const Sidebar = ({ theme, open, handleClose }: propTypes) => {
  // const { ministries } = useAppSelector(state => state.ui)

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <SidebarItems />
      <Divider />
    </Drawer>
  )
}

export default Sidebar