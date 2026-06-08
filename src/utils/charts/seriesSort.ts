export type SeriesSortBy  = "asc-value" | "desc-value" | "asc-name" | "desc-name";
export type SeriesSortAgg = "sum" | "avg" | "max" | "min";

interface SortableSeries {
    name: string;
    y: (number | null)[];
}

/**
 * Calcula el valor agregado de una serie para usarlo como criterio de orden.
 *
 * @param y      Array de valores de la serie
 * @param agg    Tipo de agregación: sum, avg, max, min
 */
const aggregate = (y: (number | null)[], agg: SeriesSortAgg): number => {
    const valid = y.filter((v): v is number => v !== null);
    if (valid.length === 0) return 0;

    switch (agg) {
        case "sum": return valid.reduce((acc, v) => acc + v, 0);
        case "avg": return valid.reduce((acc, v) => acc + v, 0) / valid.length;
        case "max": return Math.max(...valid);
        case "min": return Math.min(...valid);
    }
};

/**
 * Ordena un array de series según el criterio y agregación indicados.
 *
 * @param series    Array de series a ordenar
 * @param sortBy    Criterio de orden
 * @param sortAgg   Agregación para orden por valor. Default: "sum"
 */
export const sortSeries = <T extends SortableSeries>(
    series: T[],
    sortBy?: SeriesSortBy,
    sortAgg: SeriesSortAgg = "sum",
): T[] => {
    if (!sortBy) return series;

    return [...series].sort((a, b) => {
        if (sortBy === "asc-name")  return a.name.localeCompare(b.name);
        if (sortBy === "desc-name") return b.name.localeCompare(a.name);

        const aVal = aggregate(a.y, sortAgg);
        const bVal = aggregate(b.y, sortAgg);

        return sortBy === "asc-value" ? aVal - bVal : bVal - aVal;
    });
};