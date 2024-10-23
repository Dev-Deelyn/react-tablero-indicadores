// GraphContainer.tsx
import React, { ReactNode } from 'react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import { transformData } from '../../../utils/transformData';

interface GraphContainerProps {
  children?: ReactNode;
  width?: string;
  height?: string;
  dataset: Array<{ [key: string]: number | string }>;
  dimension: string;
  splitBy?: string | null;
  metrics: string[];
  chartType: 'line' | 'bar' | 'pie';
  orderBy?: [string, 'count' | 'value' | 'alph', 'asc' | 'desc'];
  text?: string;
  textColor?: string;
  textBold?: boolean;
  textItalic?: boolean;
  textSize?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const GraphContainer: React.FC<GraphContainerProps> = ({
  children,
  width = '100%',
  height = '300px',
  dataset,
  dimension,
  splitBy = null,
  metrics,
  chartType,
  orderBy,
  text = '',
  textColor = 'black',
  textBold = false,
  textItalic = false,
  textSize = '16px',
  textAlign = 'left',
}) => {
  const data = dimension && metrics.length ? transformData(dataset, dimension, splitBy, metrics, chartType, orderBy) : null;
  console.log(data);

  return (
    <div
      style={{
        height,
        width,
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
        position: 'relative',
      }}
    >
      <div
        style={{
          color: textColor,
          fontWeight: textBold ? 'bold' : 'normal',
          fontStyle: textItalic ? 'italic' : 'normal',
          fontSize: textSize,
          textAlign: textAlign,
          position: 'absolute',
          top: '10px',
          width: '100%',
        }}
      >
        {text}
      </div>
      {chartType === 'line' && <LineChart height={height} width={width} data={data as { categories: string[], series: { name: string, type: 'line', data: number[] }[] }} orderBy={orderBy} />}
      {chartType === 'bar' && <BarChart height={height} width={width} data={data as { categories: string[], series: { name: string, type: 'bar', data: number[] }[] }} orderBy={orderBy} />}
      {chartType === 'pie' && <PieChart height={height} width={width} data={data ? data.series[0].data.map((value, index) => ({ name: data.categories[index], value })) : null} seriesName={metrics[0]} />} 
      {children}
    </div>
  );
};

export default GraphContainer;
