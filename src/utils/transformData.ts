// transformData.ts

interface Dataset {
  [key: string]: number | string;
}

interface TransformedData {
  categories: string[];
  series: Array<{ name: string; type: 'line' | 'bar' | 'pie'; data: number[] }>;
}

export const transformData = (
  data: Dataset[],
  dimension: string,
  splitBy: string | null,
  metrics: string[],
  chartType: 'line' | 'bar' | 'pie',
  orderBy?: [string, 'count' | 'value' | 'alph', 'asc' | 'desc']
): TransformedData => {
  let categories = Array.from(new Set(data.map(item => item[dimension].toString())));
  let series = [];

  if (chartType === 'pie') {
    series = metrics.map(metric => ({
      name: metric,
      type: chartType,
      data: categories.map(category => {
        const items = data.filter(d => d[dimension].toString() === category);
        return items.length ? items.reduce((sum, item) => sum + (item[metric] as number), 0) : 0;
      })
    }));
  } else {
    if (splitBy) {
      series = Array.from(new Set(data.map(item => item[splitBy].toString()))).map(splitValue => ({
        name: splitValue,
        type: chartType,
        data: categories.map(category => {
          const items = data.filter(d => d[dimension].toString() === category && d[splitBy].toString() === splitValue);
          return items.length ? items.reduce((sum, item) => sum + (item[metrics[0]] as number), 0) : 0;
        })
      }));
    } else {
      series = metrics.map(metric => ({
        name: metric,
        type: chartType,
        data: categories.map(category => {
          const item = data.find(d => d[dimension].toString() === category);
          return item ? item[metric] as number : 0;
        })
      }));
    }
  }

  // Ordenar los datos si orderBy está definido
  if (orderBy) {
    const [orderField, orderFilter, orderType] = orderBy;
    const sortOrder = (a: number | string, b: number | string) => (orderType === 'asc' ? (a > b ? 1 : -1) : (a < b ? 1 : -1));
    if (orderFilter === 'alph') {
      categories.sort((a, b) => sortOrder(a, b));
    } else if (orderFilter === 'count') {
      const categoryCounts = categories.map(category =>
        data.filter(item => item[dimension].toString() === category).length
      );
      categories = categories
        .map((category, index) => ({ category, count: categoryCounts[index] }))
        .sort((a, b) => sortOrder(a.count, b.count))
        .map(item => item.category);
    } else if (orderFilter === 'value') {
      const valueIndex = metrics.indexOf(orderField);
      const valueCounts = series[valueIndex]?.data || [];
      categories = categories
        .map((category, index) => ({ category, value: valueCounts[index] }))
        .sort((a, b) => sortOrder(a.value, b.value))
        .map(item => item.category);
    }
    series.forEach(serie => {
      const sortedDataArray = categories.map(category => {
        const index = data.findIndex(item => item[dimension].toString() === category);
        return index > -1 ? serie.data[index] : 0;
      });
      serie.data = sortedDataArray;
    });
  }

  return { categories, series };
};
