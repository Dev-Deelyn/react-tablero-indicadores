// src/components/ui/DashboardLayout.tsx
import React from "react";
import { Box } from "@mui/material";

interface Props {
    columns?: number;
    gap?: number;
    width?: number;
    children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({
    columns = 12,
    gap = 16,
    width = 1200,
    children,
}) => {
    return (
        // Capa exterior: ocupa todo el espacio disponible y permite scroll
        <Box
            sx={{
                width: "100%",
                height: "100%",
                overflow: "auto",
                display: "flex",
                justifyContent: "center", // centra el canvas cuando hay espacio
            }}
        >
            {/* Canvas fijo: nunca cambia de tamaño */}
            <Box
                sx={{
                    width: `${width}px`,
                    minWidth: `${width}px`,  // nunca se achica
                    maxWidth: `${width}px`,  // nunca se agranda
                    display: "grid",
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: `${gap}px`,
                    padding: `${gap}px`,
                    boxSizing: "border-box",
                    alignContent: "start",
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default DashboardLayout;