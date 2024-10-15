import { List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppRoutesSidebar } from 'types/SidebarApp'
import { indexerRoutes } from 'router/routes'
import SectionNavItem from 'components/common/SectionNavItem'
import { Icon } from '@iconify/react'

const SidebarItems = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton selected={location.pathname === AppRoutesSidebar.HOME} onClick={() => navigate(AppRoutesSidebar.HOME)}>
          <ListItemIcon><Icon icon='tabler:category-filled' fontSize={24} /></ListItemIcon>
          <Typography fontSize={18}>INDICE</Typography>
        </ListItemButton>
      </ListItem>
      {indexerRoutes.map((route, index) => <SectionNavItem key={`navitemsection-${route.title}-${index}`} {...route} location={location} navigate={navigate} />)}
    </List>
  )
}

export default SidebarItems