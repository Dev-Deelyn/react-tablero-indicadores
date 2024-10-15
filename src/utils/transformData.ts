// utils/transformData.ts
interface Dataset {
    [key: string]: number | string;
  }
  
  export const transformData = (
    data: Dataset[],
    dimension: string | null,
    metrics: string[]
  ) => {
    if (!dimension || metrics.length === 0) return { categories: [], series: [] };
  
    const categories = data.map(item => item[dimension].toString());
  
    const series = metrics.map(key => ({
      name: key,
      data: data.map(item => item[key] as number),
    }));
  
    return {
      categories,
      series,
    };
  };
  
  export default transformData;
  