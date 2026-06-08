// src/components/graphics/LineChart.tsx
import React from "react";
import Plot from "react-plotly.js";

const PALETTE = [
    "#2563eb", "#e11d48", "#f97316", "#16a34a",
    "#9333ea", "#0891b2", "#ca8a04",
];

interface Series {
    name: string;
    x: (string | number)[];
    y: (number | null)[];
}

interface Props {
    series: Series[];
    xLabel?: string;
    yLabel?: string;
    title?: string;
    height?: number;
}

const LineChartPlotly: React.FC<Props> = ({
    series,
    xLabel = "",
    yLabel = "",
    title = "",
    height = 400,
}) => {
    if (!series?.length) return null;

    const traces = series.map((s, i) => ({
        x: s.x,
        y: s.y,
        name: s.name,
        type: "scatter" as const,
        mode: "lines+markers" as const,
        line: { color: PALETTE[i % PALETTE.length], width: 2.5 },
        marker: { color: PALETTE[i % PALETTE.length], size: 6 },
    }));

    return (
        <Plot
            data={traces}
            layout={{
                title: { text: title, font: { size: 16, color: "#1e293b" } },
                xaxis: {
                    title: { text: xLabel, font: { size: 13 } },
                    tickangle: -35,
                    gridcolor: "#f1f5f9",
                },
                yaxis: {
                    title: { text: yLabel, font: { size: 13 } },
                    gridcolor: "#f1f5f9",
                    tickformat: ",~f",
                },
                legend: {
                    orientation: "h",
                    y: -0.25,
                    x: 0,
                },
                plot_bgcolor: "#ffffff",
                paper_bgcolor: "#ffffff",
                margin: { t: 60, b: 100, l: 70, r: 20 },
                hovermode: "x unified",
            }}
            config={{
                responsive: true,
                displaylogo: false,
            }}
            style={{ width: "100%", height: `${height}px` }}
        />
    );
};

export default LineChartPlotly;