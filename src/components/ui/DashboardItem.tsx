// src/components/ui/DashboardItem.tsx
import React from "react";
import { Box } from "@mui/material";

interface Props {
    colSpan?: number;
    rowSpan?: number;
    minHeight?: number;
    children: React.ReactNode;
}

const DashboardItem: React.FC<Props> = ({
    colSpan = 12,
    rowSpan = 1,
    minHeight,
    children,
}) => {
    return (
        <Box
            sx={{
                gridColumn: `span ${colSpan}`,
                gridRow: `span ${rowSpan}`,
                minHeight: minHeight ? `${minHeight}px` : undefined,
                width: "100%",
                boxSizing: "border-box",
            }}
        >
            {children}
        </Box>
    );
};

export default DashboardItem;