import React from "react";
import Plot from "react-plotly.js";
import "../../components/assets/styles/dashboards-analytics.css";

type Props = {
    x: any[];
    y: any[];
    chartType: "bar" | "line" | "scatter";
    xLabel: string;
    yLabel: string;
};

const ChartDisplay: React.FC<Props> = ({ x, y, chartType, xLabel, yLabel }) => {
    if (!x?.length || !y?.length) {
        return <div className="error-banner"> No hay datos válidos para mostrar el gráfico.</div>;
    }

    return (
        <div className="chart-container">
            <Plot
                data={[
                    {
                        x,
                        y,
                        type: chartType === "scatter" ? "scatter" : chartType,
                        mode: chartType === "scatter" ? "markers" : undefined,
                        marker: { color: "steelblue" },
                    },
                ]}
                layout={{
                    title: {
                        text: "Gráfico generado",
                        font: { size: 20, color: "#333333" },
                    },
                    xaxis: { title: { text: xLabel, font: { size: 14 } } },
                    yaxis: { title: { text: yLabel, font: { size: 14 } } },
                    margin: { t: 60, b: 60, l: 60, r: 20 },
                    plot_bgcolor: "#ffffff",
                    paper_bgcolor: "#ffffff",
                }}
                config={{ responsive: true, displaylogo: false }}
                style={{ width: "100%", height: "600px" }}
            />
        </div>
    );
};

export default ChartDisplay;
