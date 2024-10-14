import { Article as ArticleIcon } from '@mui/icons-material'
import { List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppRoutesSidebar } from 'types/SidebarApp'

const SidebarItems = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton selected={location.pathname === AppRoutesSidebar.HOME} onClick={() => navigate(AppRoutesSidebar.HOME)}>
          <ListItemIcon><ArticleIcon /></ListItemIcon>
          <Typography fontSize={18}>INDEX</Typography>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton selected={location.pathname === AppRoutesSidebar.SALUD} onClick={() => navigate(AppRoutesSidebar.SALUD)}>
          <ListItemIcon><ArticleIcon /></ListItemIcon>
          <Typography fontSize={18}>SALUD</Typography>
        </ListItemButton>
      </ListItem>
    </List>
  )
}

export default SidebarItems