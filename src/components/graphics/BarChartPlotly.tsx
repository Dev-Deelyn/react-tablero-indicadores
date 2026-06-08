import React from "react";
import Plot from "react-plotly.js";

const PALETTE = [
    "#2563eb", "#e11d48", "#f97316", "#16a34a",
    "#9333ea", "#0891b2", "#ca8a04", "#be123c",
    "#15803d", "#7c3aed", "#0284c7", "#dc2626",
];

export interface BarSeries {
    name: string;
    x: (string | number)[];
    y: (number | null)[];
}

interface Props {
    series: BarSeries[];
    xLabel?: string;
    yLabel?: string;
    title?: string;
    height?: number;
    stacked?: boolean;
}

const BarChartPlotly: React.FC<Props> = ({
    series,
    xLabel = "",
    yLabel = "",
    title = "",
    height = 400,
    stacked = false,
}) => {
    if (!series?.length) return null;

    const traces = series.map((s, i) => ({
        x: s.x,
        y: s.y,
        name: s.name,
        type: "bar" as const,
        marker: {
            color: PALETTE[i % PALETTE.length],
            opacity: 0.92,
        },
        hovertemplate: `<b>%{fullData.name}</b><br>${xLabel}: %{x}<br>${yLabel}: <b>%{y:,.2f}</b><extra></extra>`,
    }));

    const hasMultipleSeries = series.length > 1;

    return (
        <Plot
            data={traces}
            layout={{
                title: { text: title, font: { size: 16, color: "#1e293b" } },
                xaxis: {
                    title: { text: xLabel, font: { size: 13 } },
                    tickangle: -35,
                    gridcolor: "#f1f5f9",
                    linecolor: "#e2e8f0",
                },
                yaxis: {
                    title: { text: yLabel, font: { size: 13 } },
                    gridcolor: "#f1f5f9",
                    linecolor: "#e2e8f0",
                    tickformat: ",~f",
                },
                barmode: stacked ? "stack" : "group",
                bargap: 0.18,
                bargroupgap: 0.05,
                legend: hasMultipleSeries ? {
                    orientation: "h",
                    y: -0.25,
                    x: 0,
                    font: { size: 11, color: "#475569" },
                    bgcolor: "rgba(0,0,0,0)",
                } : undefined,
                showlegend: hasMultipleSeries,
                plot_bgcolor: "#ffffff",
                paper_bgcolor: "#ffffff",
                margin: { t: 60, b: hasMultipleSeries ? 110 : 70, l: 70, r: 20 },
                hovermode: "x unified",
                hoverlabel: {
                    bgcolor: "#1e293b",
                    bordercolor: "#334155",
                    font: { family: "IBM Plex Sans, sans-serif", size: 12, color: "#f8fafc" },
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
            style={{ width: "100%", height: `${height}px` }}
        />
    );
};

export default BarChartPlotly;