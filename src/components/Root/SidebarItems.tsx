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
        <ListItemButton selected={location.pathname === AppRoutesSidebar.CLIPPING} onClick={() => navigate(AppRoutesSidebar.CLIPPING)}>
          <ListItemIcon><ArticleIcon /></ListItemIcon>
          <Typography fontSize={18}>SALUD</Typography>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton selected={location.pathname === AppRoutesSidebar.CLIPPING} onClick={() => navigate(AppRoutesSidebar.CLIPPING)}>
          <ListItemIcon><ArticleIcon /></ListItemIcon>
          <Typography fontSize={18}>EDUCACION</Typography>
        </ListItemButton>
      </ListItem>
    </List>
  )
}

export default SidebarItems