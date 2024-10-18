// GuardiasLiquidadas.tsx

import React from 'react';
import { Container, Grid } from '@mui/material';
import BoxComponent from 'components/charts/test/BoxComponent';
import GraphContainer from 'components/charts/test/GraphContainer';
import { guardiasDataset } from './../../utils/guardiasDataset';

const GuardiasLiquidadas = () => {
  return (
    <Container>
      <BoxComponent>
        <Grid item xs={12} sm={6}>
          <GraphContainer
            dataset={guardiasDataset}
            dimension="MES"
            splitBy="ORGANISMO" // Puedes quitar esto si no deseas desglosar por organismo
            metrics={['CANT_HORAS']}
            chartType="line"
            text="CANTIDAD DE HORAS POR MES Y ORGANISMO"
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

export default GuardiasLiquidadas;
