import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartDisplay from "./ChartDisplay";
import "../assets/styles/dashboards-analytics.css";

export interface FileInfo {
    filename: string;
    sheets: string[];
}

type ChartType = "bar" | "line" | "scatter";

interface Props {
    fileInfo: FileInfo;
}

const SheetSelector: React.FC<Props> = ({ fileInfo }) => {
    const [sheetName, setSheetName] = useState<string>(fileInfo.sheets[0]);
    const [columns, setColumns] = useState<string[]>([]);
    const [xCol, setXCol] = useState<string>("");
    const [yCol, setYCol] = useState<string>("");
    const [chartType, setChartType] = useState<ChartType>("bar");
    const [chartData, setChartData] = useState<{ x: any[]; y: any[] } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const apiBase = import.meta.env.VITE_FASTAPI_URL || "http://localhost:8000";

    // obtener columnas
    useEffect(() => {
        async function fetchColumns() {
            try {
                setError(null);
                const formData = new FormData();
                formData.append("filename", fileInfo.filename);
                formData.append("sheet_name", sheetName);

                const response = await axios.post(`${apiBase}/read-columns/`, formData);
                if (!response.data.columns?.length) {
                    setError("La hoja seleccionada no tiene columnas válidas.");
                    return;
                }

                setColumns(response.data.columns);
                setXCol(response.data.columns[0]);
                setYCol(response.data.columns[1]);
            } catch (err) {
                console.error("Error al obtener columnas:", err);
                setError("No se pudieron obtener las columnas. Verificá el archivo o la hoja seleccionada.");
            }
        }

        fetchColumns();
    }, [sheetName, fileInfo.filename, apiBase]);

    const handleGenerateChart = async () => {
        if (!xCol || !yCol) {
            setError("Seleccioná columnas válidas para los ejes antes de generar el gráfico.");
            return;
        }

        try {
            setError(null);
            setLoading(true);

            const formData = new FormData();
            formData.append("filename", fileInfo.filename);
            formData.append("sheet_name", sheetName);

            const response = await axios.post(`${apiBase}/read-columns/`, formData);
            const df = response.data.data;

            if (!df || df.length === 0) {
                setError("La hoja seleccionada no contiene datos.");
                return;
            }

            const xData = df.map((row: any) => row[xCol]);
            const yData = df.map((row: any) => row[yCol]);

            setChartData({ x: xData, y: yData });
        } catch (err) {
            console.error("Error al generar gráfico:", err);
            setError("Hubo un problema al generar el gráfico.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-title">Dashboard interactivo</div>

            {error && <div className="error-banner">⚠️ {error}</div>}

            <div className="control-panel">
                <div>
                    <label>📄 Hoja</label>
                    <select value={sheetName} onChange={(e) => setSheetName(e.target.value)}>
                        {fileInfo.sheets.map((sheet) => (
                            <option key={sheet} value={sheet}>
                                {sheet}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{ color: "#0059ff" }}>🟦 Eje X</label>
                    <select value={xCol} onChange={(e) => setXCol(e.target.value)}>
                        {columns.map((col) => (
                            <option key={col} value={col}>
                                {col}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{ color: "#d61b1b" }}>🟥 Eje Y</label>
                    <select value={yCol} onChange={(e) => setYCol(e.target.value)}>
                        {columns.map((col) => (
                            <option key={col} value={col}>
                                {col}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>📊 Tipo</label>
                    <select value={chartType} onChange={(e) => setChartType(e.target.value as ChartType)}>
                        <option value="bar">Barras</option>
                        <option value="line">Líneas</option>
                        <option value="scatter">Puntos</option>
                    </select>
                </div>

                <button className="btn-primary" onClick={handleGenerateChart} disabled={loading}>
                    {loading ? "Generando..." : "Generar gráfico"}
                </button>
            </div>

            {chartData && (
                <div className="chart-container">
                    <p style={{ fontStyle: "italic", marginBottom: "10px" }}>
                        Eje X: <strong>{xCol}</strong> | Eje Y: <strong>{yCol}</strong>
                    </p>
                    <ChartDisplay x={chartData.x} y={chartData.y} chartType={chartType} xLabel={xCol} yLabel={yCol} />
                </div>
            )}
        </div>
    );
};

export default SheetSelector;
