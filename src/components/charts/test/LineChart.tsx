import React from 'react';
import { EChart } from '@kbox-labs/react-echarts';

interface LineChartProps {
  height?: string;
  width?: string;
  data: { categories: string[], series: Array<{ name: string, type: 'line' | 'bar', data: number[] }> } | null;
}

const LineChart: React.FC<LineChartProps> = ({ height = '100%', width = '100%', data }) => {
  if (!data) {
    return <div style={{ height, width }}>No data to display</div>;
  }

  return (
    <EChart
      style={{ height, width }}
      renderer={'svg'}
      xAxis={{
        type: 'category',
        data: data.categories,
      }}
      yAxis={{
        type: 'value',
        boundaryGap: [0, '30%'],
      }}
      series={data.series}
    />
  );
};

export default LineChart;
