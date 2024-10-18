// LineChart.tsx

import React from 'react';
import { EChart, EChartProps } from '@kbox-labs/react-echarts';

interface LineChartProps {
  height?: string;
  width?: string;
  data: {
    categories: string[],
    series: Array<{ name: string, type: 'line' | 'bar', data: number[] }>
  } | null;
}

const LineChart: React.FC<LineChartProps> = ({ height = '100%', width = '100%', data }) => {
  if (!data) {
    return <div style={{ height, width }}>No data to display</div>;
  }

  return (
    <EChart
      style={{ height, width }}
      renderer={'canvas'}
      xAxis={{
        type: 'category',
        data: data.categories,
        axisLabel: {
          color: 'black'
        }
      }}
      yAxis={{
        type: 'value',
        boundaryGap: [0, '30%'],
      }}
      series={data.series.map(serie => ({
        ...serie,
        type: serie.type === 'line' ? 'line' : undefined,
        animation: true,
        animationDuration: 1000,
        animationEasing: 'sinusoidalOut'
      }))}
      useCoarsePointer
      legend={{
        type: 'plain',
        height: '400px',
        padding: 35
      }}
      animation={true}
      animationThreshold={2000}
      animationDuration={1000}
      tooltip={{
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: function (params: any) {
          let tooltipText = params[0].axisValueLabel + '<br/>';
          params.forEach(function (item: any) {
            tooltipText += item.marker + ' ' + item.seriesName + ': ' + item.data + '<br/>';
          });
          return tooltipText;
        }
      }}
    />
  );
};

export default LineChart;
