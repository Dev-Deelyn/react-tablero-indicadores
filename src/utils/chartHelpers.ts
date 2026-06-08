export interface ChartSeries {
    name: string;
    x: (string | number)[];
    y: (number | null)[];
}

/**
 * Agrupa datos por una columna categórica, los ordena por una columna numérica
 * y suma los valores de una columna numérica por cada punto del eje X.
 *
 * @param data        Filas filtradas del Excel
 * @param categoryCol Columna que define las series (ej: "CATEGORIA")
 * @param orderCol    Columna numérica para ordenar (ej: "ORDEN")
 * @param labelCol    Columna de etiquetas para el eje X (ej: "MES")
 * @param valueCol    Columna numérica a sumar (ej: "TOTAL")
 * @param totalPoints Cantidad de puntos del eje X (ej: 12 para meses)
 */
export const buildSeriesByCategory = (
    data: Record<string, any>[],
    categoryCol: string,
    orderCol: string,
    labelCol: string,
    valueCol: string,
    totalPoints: number = 13,
): ChartSeries[] => {
    const categories = [...new Set(data.map(row => String(row[categoryCol])))];

    return categories.map(cat => {
        const filas = data.filter(row => String(row[categoryCol]) === cat);

        const porPunto = Array.from({ length: totalPoints }, (_, i) => i + 1).map(orden => {
            const filasOrden = filas.filter(
                row => Math.round(Number(row[orderCol])) === orden
            );
            const label = filasOrden[0]?.[labelCol] ?? null;
            const total = filasOrden.reduce(
                (acc, row) => acc + (Number(row[valueCol]) || 0), 0
            );
            return { label, total };
        }).filter(r => r.label !== null);

        return {
            name: cat,
            x: porPunto.map(r => r.label as string | number),
            y: porPunto.map(r => r.total),
        };
    });
};