import { Icon } from '@iconify/react'
import { Card, CardContent, Link, Typography, Zoom } from '@mui/material'
import React from 'react'
import IndicatorRoutes from 'types/IndicatorRoutes.types'
import { Link as RouterLink } from 'react-router-dom'

interface SectionCardProps extends IndicatorRoutes {
  transitionDelay?: number
}

const baseIcon = 'ri:table-fill'

const SectionCard: React.FC<SectionCardProps> = (props) => {
  return (
    <Link underline='none' component={RouterLink} to={props.path ?? '/'}>
      <Zoom in={true} style={{ transitionDelay: `${props.transitionDelay ?? 0}ms` }}>
        <Card sx={{ height: 180 }}>
          <CardContent sx={{ height: '100%', flex: 1, textAlign: 'center', alignContent: 'center' }}>
            <Icon icon={props.icon ?? baseIcon} width={64} />
            <Typography textTransform='uppercase' fontWeight='bold' component="div">
              {props.shortTitle ?? props.title}
            </Typography>
          </CardContent>
        </Card >
      </Zoom>
    </Link>
  )
}

export default SectionCard