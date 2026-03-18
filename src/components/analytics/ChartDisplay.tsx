import React from "react";
import Plot from "react-plotly.js";

// Paleta de colores institucional — NO modificar
const PALETTE = [
    "#2563eb", "#e11d48", "#f97316", "#16a34a", "#9333ea",
    "#0891b2", "#ca8a04", "#be123c", "#15803d", "#7c3aed",
    "#0284c7", "#dc2626", "#ea580c", "#15803d", "#7c3aed",
];

type ChartType = "bar" | "line" | "scatter";

interface Dataset {
    label: string;
    data: (number | null)[];
}

interface MultiSeriesData {
    labels: (string | number)[];
    datasets: Dataset[];
    filtered_rows?: number;
}

interface Props {
    x?: any[];
    y?: any[];
    multiData?: MultiSeriesData;
    chartType: ChartType;
    xLabel: string;
    yLabel: string;
    title?: string;
}

// Formatea números para el tooltip: separa miles, 2 decimales si los tiene
function formatVal(v: number | null): string {
    if (v === null || v === undefined) return "—";
    const rounded = Math.round(v * 100) / 100;
    return rounded.toLocaleString("es-AR");
}

const ChartDisplay: React.FC<Props> = ({
    x,
    y,
    multiData,
    chartType,
    xLabel,
    yLabel,
    title = "Gráfico generado",
}) => {
    let traces: any[] = [];

    if (multiData && multiData.datasets.length > 0) {
        traces = multiData.datasets.map((ds, i) => {
            const color = PALETTE[i % PALETTE.length];

            const base = {
                x: multiData.labels,
                y: ds.data,
                name: ds.label,
                customdata: ds.data.map((v) => formatVal(v)),
                // Tooltip individual por serie: nombre en negrita, eje X, valor formateado
                hovertemplate: `<b>%{fullData.name}</b><br>${xLabel}: %{x}<br>${yLabel}: <b>%{customdata}</b><extra></extra>`,
            };

            if (chartType === "bar") {
                return {
                    ...base,
                    type: "bar",
                    marker: {
                        color,
                        opacity: 0.92,
                        line: { color, width: 0 },
                    },
                };
            }

            if (chartType === "line") {
                return {
                    ...base,
                    type: "scatter",
                    mode: "lines+markers",
                    line: { color, width: 2.5, shape: "linear" },
                    marker: {
                        color,
                        size: 6,
                        symbol: "circle",
                        line: { color: "#fff", width: 1.5 },
                    },
                };
            }

            // scatter
            return {
                ...base,
                type: "scatter",
                mode: "markers",
                marker: {
                    color,
                    size: 8,
                    opacity: 0.85,
                    line: { color: "#fff", width: 1 },
                },
            };
        });

    } else if (x?.length && y?.length) {
        // Modo simple retrocompatible
        const color = PALETTE[0];
        traces = [{
            x,
            y,
            customdata: y.map((v) => formatVal(v)),
            hovertemplate: `${xLabel}: <b>%{x}</b><br>${yLabel}: <b>%{customdata}</b><extra></extra>`,
            type: chartType === "scatter" ? "scatter" : chartType,
            mode: chartType === "scatter" ? "markers" : chartType === "line" ? "lines+markers" : undefined,
            marker: {
                color,
                size: chartType === "scatter" ? 8 : 6,
                line: chartType !== "bar" ? { color: "#fff", width: 1.5 } : undefined,
            },
            line: chartType === "line" ? { color, width: 2.5 } : undefined,
        }];
    }

    if (traces.length === 0) {
        return (
            <div className="error-banner">
                ⚠️ No hay datos válidos para mostrar el gráfico.
            </div>
        );
    }

    const hasMultipleSeries = traces.length > 1;

    return (
        <div className="chart-container">
            {multiData?.filtered_rows !== undefined && (
                <div className="chart-meta">
                    <span className="chip">📊 {multiData.filtered_rows} filas</span>
                    {hasMultipleSeries && (
                        <span className="chip">🗂 {traces.length} series</span>
                    )}
                </div>
            )}
            <Plot
                data={traces}
                layout={{
                    title: {
                        text: title,
                        font: { size: 17, color: "#1e293b", family: "IBM Plex Sans, sans-serif" },
                    },
                    xaxis: {
                        title: { text: xLabel, font: { size: 13, color: "#64748b" } },
                        tickfont: { size: 11, color: "#475569" },
                        gridcolor: "#f1f5f9",
                        linecolor: "#e2e8f0",
                        tickangle: -35,
                    },
                    yaxis: {
                        title: { text: yLabel, font: { size: 13, color: "#64748b" } },
                        tickfont: { size: 11, color: "#475569" },
                        gridcolor: "#f1f5f9",
                        linecolor: "#e2e8f0",
                        tickformat: ",~f",
                    },
                    legend: hasMultipleSeries
                        ? {
                            orientation: "h",
                            y: -0.22,
                            x: 0,
                            font: { size: 11, color: "#475569" },
                            bgcolor: "rgba(0,0,0,0)",
                            borderwidth: 0,
                        }
                        : undefined,
                    showlegend: hasMultipleSeries,
                    margin: { t: 60, b: hasMultipleSeries ? 110 : 70, l: 70, r: 20 },
                    plot_bgcolor: "#ffffff",
                    paper_bgcolor: "#ffffff",
                    barmode: chartType === "bar" ? "group" : undefined,
                    bargap: 0.18,
                    bargroupgap: 0.05,

                    // "x unified" agrupa todas las series en un solo tooltip por posición X
                    // igual que Looker Studio
                    hovermode: "x unified",
                    hoverlabel: {
                        bgcolor: "#1e293b",
                        bordercolor: "#334155",
                        font: {
                            family: "IBM Plex Sans, sans-serif",
                            size: 12,
                            color: "#f8fafc",
                        },
                        align: "left",
                        namelength: -1,
                    },
                }}
                config={{
                    responsive: true,
                    displaylogo: false,
                    displayModeBar: true,
                    modeBarButtonsToRemove: ["select2d", "lasso2d", "autoScale2d"],
                    toImageButtonOptions: {
                        format: "png",
                        filename: title || "grafico",
                        scale: 2,
                    },
                }}
                style={{ width: "100%", height: "500px" }}
            />
        </div>
    );
};

export default ChartDisplay;