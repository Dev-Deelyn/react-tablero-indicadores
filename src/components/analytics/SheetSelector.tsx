import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ChartDisplay from "./ChartDisplay";
import "../assets/styles/dashboards-analytics.css";

export interface FileInfo {
    filename: string;
    sheets: string[];
}

interface ColumnMeta {
    type: string;
    unique_values: (string | number)[];
}

interface MultiSeriesData {
    labels: (string | number)[];
    datasets: { label: string; data: (number | null)[] }[];
    filtered_rows: number;
}

type ChartType = "bar" | "line" | "scatter";

interface ChartConfig {
    id: number;
    xCol: string;
    yCol: string;
    groupCol: string;
    chartType: ChartType;
    data: MultiSeriesData | null;
    loading: boolean;
    error: string | null;
}

interface Props {
    fileInfo: FileInfo;
}

const CHART_ID = { current: 1 };

const SheetSelector: React.FC<Props> = ({ fileInfo }) => {
    const apiBase = import.meta.env.VITE_FASTAPI_URL || "http://localhost:8000";

    // --- Estado principal ---
    const [sheetName, setSheetName] = useState<string>(fileInfo.sheets[0]);
    const [columns, setColumns] = useState<string[]>([]);
    const [columnMeta, setColumnMeta] = useState<Record<string, ColumnMeta>>({});
    const [loadingCols, setLoadingCols] = useState(false);
    const [colError, setColError] = useState<string | null>(null);

    // Filtros activos: { COLUMNA: [val1, val2, ...] }
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

    // Múltiples gráficos
    const [charts, setCharts] = useState<ChartConfig[]>([
        { id: 1, xCol: "", yCol: "", groupCol: "", chartType: "bar", data: null, loading: false, error: null },
    ]);

    // Columnas candidatas a filtro (las que tienen pocos valores únicos = categóricas)
    const filterableCols = columns.filter((col) => {
        const meta = columnMeta[col];
        if (!meta) return false;
        return meta.unique_values.length <= 100;
    });

    // --- Cargar columnas al cambiar hoja ---
    useEffect(() => {
        async function fetchColumns() {
            try {
                setLoadingCols(true);
                setColError(null);
                setActiveFilters({});
                setCharts([{ id: 1, xCol: "", yCol: "", groupCol: "", chartType: "bar", data: null, loading: false, error: null }]);

                const formData = new FormData();
                formData.append("filename", fileInfo.filename);
                formData.append("sheet_name", sheetName);

                const response = await axios.post(`${apiBase}/read-columns/`, formData);

                if (!response.data.columns?.length) {
                    setColError("La hoja seleccionada no tiene columnas válidas.");
                    return;
                }

                const cols: string[] = response.data.columns;
                const meta: Record<string, ColumnMeta> = response.data.column_meta || {};

                setColumns(cols);
                setColumnMeta(meta);

                // Inicializar primer gráfico con primeras columnas
                setCharts([{
                    id: 1,
                    xCol: cols[0] || "",
                    yCol: cols[1] || "",
                    groupCol: "",
                    chartType: "bar",
                    data: null,
                    loading: false,
                    error: null,
                }]);
            } catch (err) {
                console.error("Error al obtener columnas:", err);
                setColError("No se pudieron obtener las columnas. Verificá el archivo o la hoja.");
            } finally {
                setLoadingCols(false);
            }
        }
        fetchColumns();
    }, [sheetName, fileInfo.filename, apiBase]);

    // --- Actualizar un gráfico específico ---
    const updateChart = useCallback((id: number, patch: Partial<ChartConfig>) => {
        setCharts((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
    }, []);

    // --- Generar gráfico ---
    const generateChart = useCallback(async (chartId: number) => {
        const chart = charts.find((c) => c.id === chartId);
        if (!chart || !chart.xCol || !chart.yCol) return;

        updateChart(chartId, { loading: true, error: null });

        try {
            const formData = new FormData();
            formData.append("filename", fileInfo.filename);
            formData.append("sheet_name", sheetName);
            formData.append("x_col", chart.xCol);
            formData.append("y_col", chart.yCol);
            if (chart.groupCol) formData.append("group_col", chart.groupCol);
            formData.append("filters", JSON.stringify(activeFilters));

            const { data } = await axios.post<MultiSeriesData>(`${apiBase}/filter-data/`, formData);
            updateChart(chartId, { data, loading: false });
        } catch (err: any) {
            const msg = err?.response?.data?.detail || "Error al generar el gráfico.";
            updateChart(chartId, { loading: false, error: msg });
        }
    }, [charts, fileInfo.filename, sheetName, activeFilters, apiBase, updateChart]);

    // --- Agregar nuevo gráfico ---
    const addChart = () => {
        CHART_ID.current += 1;
        setCharts((prev) => [
            ...prev,
            {
                id: CHART_ID.current,
                xCol: columns[0] || "",
                yCol: columns[1] || "",
                groupCol: "",
                chartType: "bar",
                data: null,
                loading: false,
                error: null,
            },
        ]);
    };

    // --- Eliminar gráfico ---
    const removeChart = (id: number) => {
        setCharts((prev) => prev.filter((c) => c.id !== id));
    };

    // --- Manejar filtros ---
    const toggleFilterValue = (col: string, value: string) => {
        setActiveFilters((prev) => {
            const current = prev[col] || [];
            const updated = current.includes(value)
                ? current.filter((v) => v !== value)
                : [...current, value];
            if (updated.length === 0) {
                const { [col]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [col]: updated };
        });
    };

    const clearAllFilters = () => setActiveFilters({});

    const activeFilterCount = Object.values(activeFilters).flat().length;

    return (
        <div className="dashboard-container">
            <div className="dashboard-title">📊 Dashboard interactivo</div>

            {colError && <div className="error-banner">⚠️ {colError}</div>}

            {/* ── Selector de hoja ── */}
            <div className="control-panel" style={{ marginBottom: "8px" }}>
                <div>
                    <label>📄 Hoja</label>
                    <select value={sheetName} onChange={(e) => setSheetName(e.target.value)} disabled={loadingCols}>
                        {fileInfo.sheets.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
                {loadingCols && <span className="chip">⏳ Cargando columnas...</span>}
                {columns.length > 0 && (
                    <span className="chip">
                        {columns.length} columnas · {filterableCols.length} filtrables
                    </span>
                )}
            </div>

            {/* ── Panel de filtros dinámicos ── */}
            {filterableCols.length > 0 && (
                <div className="filters-panel">
                    <div className="filters-header">
                        <span className="filters-title">🔽 Filtros</span>
                        {activeFilterCount > 0 && (
                            <button className="btn-clear-filters" onClick={clearAllFilters}>
                                ✕ Limpiar filtros ({activeFilterCount})
                            </button>
                        )}
                    </div>
                    <div className="filters-grid">
                        {filterableCols.map((col) => {
                            const meta = columnMeta[col];
                            const selectedValues = activeFilters[col] || [];
                            return (
                                <div key={col} className="filter-group">
                                    <div className="filter-label">
                                        {col}
                                        {selectedValues.length > 0 && (
                                            <span className="filter-count">{selectedValues.length}</span>
                                        )}
                                    </div>
                                    <div className="filter-options">
                                        {meta.unique_values.map((val) => {
                                            const strVal = String(val);
                                            const active = selectedValues.includes(strVal);
                                            return (
                                                <button
                                                    key={strVal}
                                                    className={`filter-chip ${active ? "active" : ""}`}
                                                    onClick={() => toggleFilterValue(col, strVal)}
                                                    title={strVal}
                                                >
                                                    {strVal}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── Gráficos ── */}
            {charts.map((chart, idx) => (
                <div key={chart.id} className="chart-panel">
                    <div className="chart-panel-header">
                        <span className="chart-panel-title">Gráfico {idx + 1}</span>
                        {charts.length > 1 && (
                            <button className="btn-remove-chart" onClick={() => removeChart(chart.id)}>✕</button>
                        )}
                    </div>

                    {/* Controles del gráfico */}
                    <div className="control-panel">
                        <div>
                            <label style={{ color: "#2563eb" }}>🟦 Eje X</label>
                            <select
                                value={chart.xCol}
                                onChange={(e) => updateChart(chart.id, { xCol: e.target.value, data: null })}
                            >
                                {columns.map((col) => <option key={col} value={col}>{col}</option>)}
                            </select>
                        </div>

                        <div>
                            <label style={{ color: "#e11d48" }}>🟥 Eje Y</label>
                            <select
                                value={chart.yCol}
                                onChange={(e) => updateChart(chart.id, { yCol: e.target.value, data: null })}
                            >
                                {columns.map((col) => <option key={col} value={col}>{col}</option>)}
                            </select>
                        </div>

                        <div>
                            <label>🗂 Agrupar por</label>
                            <select
                                value={chart.groupCol}
                                onChange={(e) => updateChart(chart.id, { groupCol: e.target.value, data: null })}
                            >
                                <option value="">— Sin agrupación —</option>
                                {filterableCols.map((col) => <option key={col} value={col}>{col}</option>)}
                            </select>
                        </div>

                        <div>
                            <label>📊 Tipo</label>
                            <select
                                value={chart.chartType}
                                onChange={(e) => updateChart(chart.id, { chartType: e.target.value as ChartType, data: null })}
                            >
                                <option value="bar">Barras</option>
                                <option value="line">Líneas</option>
                                <option value="scatter">Puntos</option>
                            </select>
                        </div>

                        <button
                            className="btn-primary"
                            onClick={() => generateChart(chart.id)}
                            disabled={chart.loading || !chart.xCol || !chart.yCol}
                        >
                            {chart.loading ? "⏳ Generando..." : "Generar gráfico"}
                        </button>
                    </div>

                    {/* Error del gráfico */}
                    {chart.error && <div className="error-banner">⚠️ {chart.error}</div>}

                    {/* Resultado */}
                    {chart.data && (
                        <div style={{ marginTop: "12px" }}>
                            <p className="chart-subtitle">
                                Eje X: <strong>{chart.xCol}</strong> · Eje Y: <strong>{chart.yCol}</strong>
                                {chart.groupCol && <> · Agrupado por: <strong>{chart.groupCol}</strong></>}
                                {activeFilterCount > 0 && <> · <span className="chip">🔽 {activeFilterCount} filtros activos</span></>}
                            </p>
                            <ChartDisplay
                                multiData={chart.data}
                                chartType={chart.chartType}
                                xLabel={chart.xCol}
                                yLabel={chart.yCol}
                                title={`${chart.yCol} por ${chart.xCol}${chart.groupCol ? ` (por ${chart.groupCol})` : ""}`}
                            />
                        </div>
                    )}
                </div>
            ))}

            {/* Botón agregar gráfico */}
            {columns.length > 0 && (
                <button className="btn-add-chart" onClick={addChart}>
                    ＋ Agregar otro gráfico
                </button>
            )}
        </div>
    );
};

export default SheetSelector;