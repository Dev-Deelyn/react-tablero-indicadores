// utils/transformData.ts
interface Dataset {
  [key: string]: number | string;
}

export const transformData = (data: Dataset[], dimension: string, metrics: string[]) => {
  const categories = data.map(item => item[dimension].toString());
  const series = metrics.map(metric => ({
    name: metric,
    type: 'line' as const, // Asegurar que el tipo sea siempre 'line'
    data: data.map(item => item[metric] as number),
  }));
  return { categories, series };
};
