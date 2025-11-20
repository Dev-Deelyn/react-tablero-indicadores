import React, { useState } from "react";
import axios from "axios";
import "../assets/styles/dashboards-analytics.css";
import { FileInfo } from "./SheetSelector";

interface Props {
    onUploadSuccess: (info: FileInfo) => void;
}

const FileUpload: React.FC<Props> = ({ onUploadSuccess }) => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const apiBase = import.meta.env.VITE_FASTAPI_URL || "http://localhost:8000";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setError("Seleccioná un archivo Excel antes de subirlo.");
            return;
        }

        try {
            setError(null);
            setLoading(true);

            const formData = new FormData();
            formData.append("file", file);

            const res = await axios.post(`${apiBase}/upload/`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            onUploadSuccess(res.data as FileInfo);
        } catch (err) {
            console.error("Error al subir el archivo:", err);
            setError("No se pudo subir el archivo. Verificá el formato o el servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-title">📂 Subir archivo Excel</div>

            {error && <div className="error-banner">⚠️ {error}</div>}

            <form onSubmit={handleSubmit} className="control-panel">
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <label style={{ fontWeight: 600 }}>Seleccioná un archivo:</label>
                    <input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    />
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? "Subiendo..." : "Subir"}
                </button>
            </form>

            {file && (
                <p style={{ marginTop: "10px", fontStyle: "italic", color: "#333" }}>
                    Archivo seleccionado: <strong>{file.name}</strong>
                </p>
            )}
        </div>
    );
};

export default FileUpload;
