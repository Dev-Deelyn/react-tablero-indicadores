import React from 'react';
import { Container, Typography } from '@mui/material';
import BoxComponent from "components/charts/test/BoxComponent";
import { indicadores_tasas } from "utils/exampleDatasets"; // Importamos aquí el dataset específico

const SeccionPrueba = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Gráfico con Datos Dinámicos
      </Typography>
      <BoxComponent
        dataset={indicadores_tasas}
        dimensions="AÑO"
        metrics={["TASA DE NATALIDAD", "TASA DE MORTALIDAD GENERAL", "TASA DE MORTALIDAD INFANTIL", "TASA DE MORTALIDAD MATERNA"]}
        chartType="line" // Especificar el tipo de gráfico
        text="Mi Gráfico"
        textColor="blue"
        textBold
        textItalic
        textSize="24px"
        textAlign="center"
      />
    </Container>
  );
};

export default SeccionPrueba;
