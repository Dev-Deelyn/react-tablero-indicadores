import { useState, useEffect } from "react";
import axios from "axios";

interface ColumnMeta {
    type: string;
    unique_values: (string | number)[];
}

export interface ExcelSheetData {
    columns: string[];
    column_meta: Record<string, ColumnMeta>;
    data: Record<string, any>[];
}

export const useExcelSheet = (filename: string, sheetName: string) => {
    const [data, setData] = useState<ExcelSheetData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Usa automáticamente localhost o IP LAN
    const apiBase =
        import.meta.env.VITE_FASTAPI_URL ||
        `${window.location.protocol}//${window.location.hostname}:${
            import.meta.env.VITE_FASTAPI_PORT || 8000
        }`;

    useEffect(() => {
        if (!filename || !sheetName) return;

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("filename", filename);
        formData.append("sheet_name", sheetName);

        axios.post(`${apiBase}/system-data/read-columns/`, formData)
            .then(res => setData(res.data))
            .catch(err => {
                const msg =
                    err?.response?.data?.detail ||
                    "Error al cargar los datos";

                setError(msg);
            })
            .finally(() => setLoading(false));

    }, [filename, sheetName, apiBase]);

    return { data, loading, error };
};