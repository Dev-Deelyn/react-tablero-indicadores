import React from 'react';
import { Container, Grid } from '@mui/material';
import BoxComponent from 'components/charts/test/BoxComponent';
import GraphContainer from 'components/charts/test/GraphContainer';
import { tecnicasAgrotecnicasDatasets } from './../../utils/tecnicasAgrotecnicasDatasets';

const TecnicasAgrotecnicas = () => {
  return (
    <Container>
      <BoxComponent>
        <Grid item xs={12} sm={6}>
          <GraphContainer
            dataset={tecnicasAgrotecnicasDatasets}
            dimension="ESTABLECIMIENTO"
            metrics={['DOCENTES', 'ADMINISTRATIVO', 'AUTORIDADES']}
            chartType="bar"
            text="PERSONAL POR ESTABLECIMIENTO"
            textColor="black"
            textBold
            textSize="15px"
            textAlign="center"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <GraphContainer
            dataset={tecnicasAgrotecnicasDatasets}
            dimension="ESTABLECIMIENTO"
            metrics={['MATRICULA']}
            chartType="pie"
            text="MATRÍCULA POR ESTABLECIMIENTO"
            textColor="black"
            textBold
            textSize="15px"
            textAlign="center"
          />
        </Grid>
      </BoxComponent>
    </Container>
  );
};

export default TecnicasAgrotecnicas;
