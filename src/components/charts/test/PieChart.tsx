// PieChart.tsx
import React from 'react';
import { EChart } from '@kbox-labs/react-echarts';

interface PieChartProps {
  height?: string;
  width?: string;
  data: { name: string; value: number }[] | null;
  seriesName?: string; // Añadimos la propiedad seriesName
}

const PieChart: React.FC<PieChartProps> = ({ height = '100%', width = '100%', data, seriesName }) => {
  if (!data) {
    return <div style={{ height, width }}>No data to display</div>;
  }

  const pieData = data.map(item => ({ name: item.name, value: item.value }));

  return (
    <EChart
      style={{ height, width }}
      renderer={'canvas'}
      series={[
        {
          name: seriesName, // Usamos el nombre de la serie
          type: 'pie',
          data: pieData,
          radius: '70%',
          animation: true,
          animationDuration: 1000,
          animationEasing: 'sinusoidalOut',
          label: {
            formatter: '{b}: {c} ({d}%)',
          },
        },
      ]}
      legend={{
        type: 'plain',
        orient: 'vertical',
        left: 'left',
        data: pieData.map(item => item.name),
      }}
      tooltip={{
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      }}
    />
  );
};

export default PieChart;
