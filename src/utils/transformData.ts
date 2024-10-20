// utils/transformData.ts

interface Dataset {
  [key: string]: number | string;
}

interface TransformedData {
  categories: string[];
  series: Array<{ name: string; type: 'line' | 'bar'; data: number[] }>;
}

export const transformData = (
  data: Dataset[],
  dimension: string,
  splitBy: string | null,
  metrics: string[],
  chartType: 'line' | 'bar'
): TransformedData => {
  const categories = Array.from(new Set(data.map(item => item[dimension].toString())));
  console.log('Categories:', categories); // Verificar las categorías
  let series = [];

  if (splitBy) {
    series = Array.from(new Set(data.map(item => item[splitBy].toString()))).map(splitValue => ({
      name: splitValue,
      type: chartType,
      data: categories.map(category => {
        const items = data.filter(d => d[dimension].toString() === category && d[splitBy].toString() === splitValue);
        console.log('Items for', splitValue, 'in', category, ':', items); // Verificar los ítems
        return items.length ? items.reduce((sum, item) => sum + (item[metrics[0]] as number), 0) : 0;
      })
    }));
  } else {
    series = metrics.map(metric => ({
      name: metric,
      type: chartType,
      data: categories.map(category => {
        const item = data.find(d => d[dimension].toString() === category);
        console.log('Item for', metric, 'in', category, ':', item); // Verificar el ítem
        return item ? item[metric] as number : 0;
      })
    }));
  }

  console.log('Series:', series); // Verificar las series
  return { categories, series };
};
