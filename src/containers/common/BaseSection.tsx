import { Typography } from '@mui/material'
import React from 'react'

interface BaseSectionProps {
  content: string
}

const BaseSection: React.FC<BaseSectionProps> = (props) => {
  return (
    <Typography variant='h4' textTransform='uppercase'>{props.content}</Typography>
  )
}

export default BaseSection