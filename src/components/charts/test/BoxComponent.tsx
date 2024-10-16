import React from 'react';
import GraphContainer from './GraphContainer';

interface BoxComponentProps {
  dataset: Array<{ [key: string]: number | string }>;
  dimensions: string;
  metrics: string[];
  text?: string;
  textColor?: string;
  textBold?: boolean;
  textItalic?: boolean;
  textSize?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const BoxComponent: React.FC<BoxComponentProps> = ({
  dataset,
  dimensions,
  metrics,
  text = '',
  textColor = 'black',
  textBold = false,
  textItalic = false,
  textSize = '16px',
  textAlign = 'left',
}) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
      <GraphContainer
        dataset={dataset}
        dimensions={dimensions}
        metrics={metrics}
        text={text}
        textColor={textColor}
        textBold={textBold}
        textItalic={textItalic}
        textSize={textSize}
        textAlign={textAlign}
      />
    </div>
  );
};

export default BoxComponent;
