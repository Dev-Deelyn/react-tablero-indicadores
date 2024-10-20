// SeccionPrueba.tsx

import React from 'react';
import { Container, Grid } from '@mui/material';
import BoxComponent from 'components/charts/test/BoxComponent';
import GraphContainer from 'components/charts/test/GraphContainer';
import { indicadores_tasas } from 'utils/exampleDatasets';

const SeccionPrueba = () => {
  return (
    <Container>
      <BoxComponent>
        <Grid item xs={12} sm={6}>
          <GraphContainer
            dataset={indicadores_tasas}
            dimension="AÑO"
            metrics={['TASA DE NATALIDAD']}
            chartType="line"
            text="TASA DE NATALIDAD"
            textColor="black"
            textBold
            textSize="15px"
            textAlign="center"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <GraphContainer
            dataset={indicadores_tasas}
            dimension="AÑO"
            metrics={['TASA DE MORTALIDAD GENERAL']}
            chartType="line"
            text="TASA DE MORTALIDAD GENERAL"
            textColor="black"
            textBold
            textSize="15px"
            textAlign="center"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <GraphContainer
            dataset={indicadores_tasas}
            dimension="AÑO"
            metrics={['TASA DE MORTALIDAD INFANTIL']}
            splitBy={null}
            chartType="line"
            text="TASA DE MORTALIDAD INFANTIL"
            textColor="black"
            textBold
            textSize="15px"
            textAlign="center"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <GraphContainer
            dataset={indicadores_tasas}
            dimension="AÑO"
            metrics={['TASA DE MORTALIDAD MATERNA']}
            chartType="line"
            text="TASA DE MORTALIDAD MATERNA"
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

export default SeccionPrueba;
