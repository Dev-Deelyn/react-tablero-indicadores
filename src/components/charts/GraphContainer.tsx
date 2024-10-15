// components/GraphContainer.tsx
import React, { useEffect, useId, useRef, useState } from 'react';
import { EChart, EChartProps } from '@kbox-labs/react-echarts';

interface GraphContainerProps {
  shadow?: boolean;
  borderRadius?: number;
  dataset?: any[];
  dimension?: string;
  metric?: string;
  echart?: EChartProps;
  echartStyle?: React.CSSProperties;
}

const GraphContainer: React.FC<GraphContainerProps> = (props) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(100);

  useEffect(() => {
    if (chartRef.current) {
      const height = chartRef.current.getBoundingClientRect().height;
      setHeight(height);
    }
  }, [chartRef]);

  const options = {
    renderer: 'svg',
    legend: {},
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '5%', right: '5%', bottom: '5%', containLabel: true },
    dataset: {
      dimensions: props.dimension ? [props.dimension, props.metric] : undefined,
      source: props.dataset,
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: 'line' }],
  };

  return (
    <div style={{ height: '95%', boxShadow: props.shadow ? '0px 0px 10px rgba(0,0,0,0.1)' : 'none', borderRadius: props.borderRadius || 0 }}>
      <div ref={chartRef} style={{ height: '95%' }}>
        <EChart
          {...props.echart}
          key={chartRef.current?.id}
          style={{ ...props.echartStyle, height: height || 100 }}
          option={options}
        />
      </div>
    </div>
  );
};

export default GraphContainer;
