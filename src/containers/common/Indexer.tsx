import { Box } from '@mui/material'
import Grid from '@mui/material/Grid2'
import SectionCard from 'components/common/SectionCard'
import NavbarContext from 'contexts/NavbarContext';
import { useContext, useEffect } from 'react';
import IndicatorRoutes from 'types/IndicatorRoutes.types'

interface IndexerProps {
  title?: string;
  routes: IndicatorRoutes[];
}

const headTitle = 'indice tablero de'
const cardTransitionDelay = 60;

const Indexer: React.FC<IndexerProps> = (props) => {
  const { changeNavTitle } = useContext(NavbarContext);

  useEffect(() => {
    changeNavTitle(props.title ? `${headTitle} ${props.title}` : '')
  }, [props.title])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={5}>
        {
          props.routes.map((route, index) => (
            <Grid size={2}>
              <SectionCard key={`sectioncard-${route.title}-${index}`} {...route} transitionDelay={(index + 1) * cardTransitionDelay} />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}

export default Indexer