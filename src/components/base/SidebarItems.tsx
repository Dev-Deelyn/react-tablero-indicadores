import { Divider, List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppRoutesSidebar } from 'types/SidebarApp'
import SectionNavItem from 'components/common/SectionNavItem'
import { Icon } from '@iconify/react'
import { useContext } from 'react'
import { AuthContext } from 'contexts/AuthContext'

const SidebarItems = () => {
  const { accessDashboards } = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton selected={location.pathname === AppRoutesSidebar.USUARIOS} onClick={() => navigate(AppRoutesSidebar.USUARIOS)}>
          <ListItemIcon><Icon icon='tabler:category-filled' fontSize={24} /></ListItemIcon>
          <Typography fontSize={18}>USUARIOS</Typography>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton selected={location.pathname === AppRoutesSidebar.TABLEROS} onClick={() => navigate(AppRoutesSidebar.TABLEROS)}>
          <ListItemIcon><Icon icon='tabler:category-filled' fontSize={24} /></ListItemIcon>
          <Typography fontSize={18}>TABLEROS</Typography>
        </ListItemButton>
      </ListItem>
      <Divider sx={{ p: 1 }} />
      <ListItem disablePadding>
        <ListItemButton selected={location.pathname === AppRoutesSidebar.HOME} onClick={() => navigate(AppRoutesSidebar.HOME)}>
          <ListItemIcon><Icon icon='tabler:category-filled' fontSize={24} /></ListItemIcon>
          <Typography fontSize={18}>INDICE</Typography>
        </ListItemButton>
      </ListItem>
      {accessDashboards.map((dashboard, index) => (
        <SectionNavItem
          key={`navitemsection-${dashboard.keyname}-${index}`}
          path={`/${dashboard.keyname}`}
          title={dashboard.name || dashboard.keyname}
          icon={dashboard.icon}
          location={location}
          navigate={navigate}
        />
      ))}
    </List>
  )
}

export default SidebarItems