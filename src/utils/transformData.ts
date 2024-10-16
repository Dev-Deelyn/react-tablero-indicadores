// utils/transformData.ts
interface Dataset {
  [key: string]: number | string;
}

export const transformData = (data: Dataset[], dimension: string, metrics: string[], chartType: 'line' | 'bar') => {
  const categories = data.map(item => item[dimension].toString());
  const series = metrics.map(metric => ({
    name: metric,
    type: chartType, // Usar el tipo de gráfico pasado como parámetro
    data: data.map(item => item[metric] as number),
  }));
  return { categories, series };
};
