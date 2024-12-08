import { Divider, List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppRoutesSidebar } from 'types/SidebarApp'
import { indexerRoutes } from 'router/routes'
import SectionNavItem from 'components/common/SectionNavItem'
import { Icon } from '@iconify/react'
import { useContext, useEffect, useState } from 'react'
import AuthContext from 'contexts/AuthContext'
import IndicatorRoute from 'types/IndicatorRoutes.types'

const SidebarItems = () => {
  const [listRoutes, setListRoutes] = useState<IndicatorRoute[]>([])
  const { authUser } = useContext(AuthContext);

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (authUser) {
      const dashboardsPublics = authUser.dashboards;
      const list = indexerRoutes.filter(route => route.show).filter(route => dashboardsPublics?.includes(route.keyname ?? ''))
      setListRoutes(list)
    }
  }, [indexerRoutes, authUser])

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
      {listRoutes.map((route, index) => <SectionNavItem key={`navitemsection-${route.title}-${index}`} {...route} location={location} navigate={navigate} />)}
    </List>
  )
}

export default SidebarItems