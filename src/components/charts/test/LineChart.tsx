import React from 'react';
import { EChart, EChartProps } from '@kbox-labs/react-echarts';

interface LineChartProps {
  height?: string;
  width?: string;
  data: {
    categories: string[],
    series: Array<{ name: string, type: 'line' | 'bar', data: number[] }>
  } | null;
  orderBy?: [string, 'count' | 'value' | 'alph', 'asc' | 'desc'];
}

const LineChart: React.FC<LineChartProps> = ({ height = '100%', width = '100%', data, orderBy }) => {
  if (!data) {
    return <div style={{ height, width }}>No data to display</div>;
  }

  const sortedData = { ...data };
  
  // Lógica para ordenar basándose en el parámetro orderBy
  if (orderBy) {
    const [orderField, orderFilter, orderType] = orderBy;
    
    if (orderFilter === 'alph') {
      sortedData.categories.sort((a, b) => orderType === 'asc' ? a.localeCompare(b) : b.localeCompare(a));
    } else if (orderFilter === 'count') {
      const categoryCounts = sortedData.categories.map(category =>
        data.series.reduce((count, serie) => count + serie.data[sortedData.categories.indexOf(category)], 0)
      );
      sortedData.categories = sortedData.categories
        .map((category, index) => ({ category, count: categoryCounts[index] }))
        .sort((a, b) => orderType === 'asc' ? a.count - b.count : b.count - a.count)
        .map(item => item.category);
    } else if (orderFilter === 'value') {
      const valueCounts = data.series.find(serie => serie.name === orderField)?.data || [];
      sortedData.categories = sortedData.categories
        .map((category, index) => ({ category, value: valueCounts[index] }))
        .sort((a, b) => orderType === 'asc' ? a.value - b.value : b.value - a.value)
        .map(item => item.category);
    }
    
    sortedData.series.forEach(serie => {
      const sortedDataArray = sortedData.categories.map(category => {
        const index = data.categories.indexOf(category);
        return index > -1 ? serie.data[index] : 0;
      });
      serie.data = sortedDataArray;
    });
  }

  return (
    <EChart
      style={{ height, width }}
      renderer={'canvas'}
      xAxis={{
        type: 'category',
        data: sortedData.categories,
        axisLabel: {
          color: 'black'
        }
      }}
      yAxis={{
        type: 'value',
        boundaryGap: [0, '30%'],
      }}
      series={sortedData.series.map(serie => ({
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
