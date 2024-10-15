// components/PreloadedBarChart.tsx
import React from 'react';
import GraphContainer from './GraphContainer';
import { indicadores_tasas } from '../../utils/exampleDatasets';

const PreloadedBarChart: React.FC = () => {
  return (
    <div style={{ width: 500, height: 500 }}>
      <GraphContainer
        dataset={indicadores_tasas}
        dimension="AÑO"
        metric="TASA DE NATALIDAD"
        borderRadius={10}
        shadow={true}
        echart={{
          renderer: 'canvas',
          legend: {},
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          grid: { left: '5%', right: '5%', bottom: '5%', containLabel: true },
          xAxis: { type: 'category' },
          yAxis: {},
          series: [{ type: 'bar' }],
        }}
      />
    </div>
  );
};

export default PreloadedBarChart;
