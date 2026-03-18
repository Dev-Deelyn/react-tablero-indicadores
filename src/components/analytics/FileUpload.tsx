import React, { useState, useRef } from "react";
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
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const apiBase = import.meta.env.VITE_FASTAPI_URL || "http://localhost:8000";

    const handleFile = (f: File | null) => {
        if (!f) return;
        if (!f.name.endsWith(".xlsx") && !f.name.endsWith(".xls")) {
            setError("Solo se aceptan archivos .xlsx o .xls");
            return;
        }
        setError(null);
        setFile(f);
    };

    const handleSubmit = async () => {
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

            {/* Drop zone */}
            <div
                className={`drop-zone ${dragOver ? "drag-over" : ""} ${file ? "has-file" : ""}`}
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    handleFile(e.dataTransfer.files?.[0] ?? null);
                }}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    style={{ display: "none" }}
                    onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                />
                {file ? (
                    <div className="drop-zone-content">
                        <span className="drop-icon">✅</span>
                        <strong>{file.name}</strong>
                        <span className="drop-hint">{(file.size / 1024).toFixed(1)} KB — clic para cambiar</span>
                    </div>
                ) : (
                    <div className="drop-zone-content">
                        <span className="drop-icon">📥</span>
                        <strong>Arrastrá tu archivo acá</strong>
                        <span className="drop-hint">o hacé clic para seleccionar (.xlsx, .xls)</span>
                    </div>
                )}
            </div>

            <button
                className="btn-primary"
                onClick={handleSubmit}
                disabled={loading || !file}
                style={{ marginTop: "16px", width: "100%" }}
            >
                {loading ? "⏳ Subiendo..." : "Subir archivo"}
            </button>
        </div>
    );
};

export default FileUpload;