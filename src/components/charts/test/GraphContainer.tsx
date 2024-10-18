// GraphContainer.tsx

import React, { ReactNode } from 'react';
import LineChart from './LineChart';
import { transformData } from '../../../utils/transformData';

interface GraphContainerProps {
  children?: ReactNode;
  width?: string;
  height?: string;
  dataset: Array<{ [key: string]: number | string }>;
  dimension: string;
  splitBy?: string | null;
  metrics: string[];
  chartType: 'line' | 'bar';
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
  text = '',
  textColor = 'black',
  textBold = false,
  textItalic = false,
  textSize = '16px',
  textAlign = 'left',
}) => {
  const data = dimension && metrics.length ? transformData(dataset, dimension, splitBy, metrics, chartType) : null;
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
      <LineChart height={height} width={width} data={data} />
      {children}
    </div>
  );
};

export default GraphContainer;
