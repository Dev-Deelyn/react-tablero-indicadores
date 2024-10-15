// components/Box.tsx
import React, { useState } from 'react';
import LineChart from './LineChart';
import ColumnSelector from './ColumnSelector';
import transformData from '../../utils/transformData';
import { indicadores_tasas } from '../../utils/exampleDatasets';

interface BoxProps {
  data: typeof indicadores_tasas;
}

const BoxComponent: React.FC<BoxProps> = ({ data }) => {
  const [dimension, setDimension] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<string[]>([]);

  const handleDimensionChange = (selected: string) => setDimension(selected);
  const handleMetricChange = (selected: string) => setMetrics(prev => [...prev, selected]);

  const columns = Object.keys(data[0]);

  const transformedData = transformData(data, dimension, metrics);

  return (
    <div>
      <ColumnSelector columns={columns} onDimensionChange={handleDimensionChange} onMetricChange={handleMetricChange} />
      {transformedData.series.length > 0 && (
        <div>
          {transformedData.series.map((serie, index) => (
            <LineChart
              key={index}
              data={serie.data}
              categories={transformedData.categories}
              lineColor={index % 2 === 0 ? '#5470c6' : '#91cc75'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BoxComponent;
