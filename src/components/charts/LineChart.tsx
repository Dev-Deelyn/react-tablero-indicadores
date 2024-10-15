// components/LineChart.tsx
import React from 'react';
import { EChart } from '@kbox-labs/react-echarts';
import { EChartsOption } from 'echarts';

interface LineChartProps {
  data: number[];
  categories: string[];
  width?: string;
  height?: string;
  lineColor?: string;
  bgColor?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  categories,
  width = '100%',
  height = '400px',
  lineColor = '#5470c6',
  bgColor = '#fff',
}) => {
  const options: EChartsOption = {
    xAxis: {
      type: 'category',
      data: categories,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: data,
        type: 'line',
        itemStyle: {
          color: lineColor,
        },
      },
    ],
    backgroundColor: bgColor,
  };

  return <EChart style={{ height, width }} option={options} />;
};

export default LineChart;
