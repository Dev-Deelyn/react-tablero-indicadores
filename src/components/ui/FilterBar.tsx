import React from "react";
import { Box, Button } from "@mui/material";
import Dropdown, { DropdownOption } from "./Dropdown";

export interface FilterConfig {
    key: string;
    label: string;
    multiple?: boolean;
    searchable?: boolean;
    width?: number;
}

interface Props {
    filters: FilterConfig[];
    values: Record<string, any>;
    availableOptions: Record<string, DropdownOption[]>;
    onFilterChange: (key: string, value: any) => void;
    onClear: () => void;
    hideClear?: boolean;  // ← nuevo
}

const FilterBar: React.FC<Props> = ({
    filters,
    values,
    availableOptions,
    onFilterChange,
    onClear,
    hideClear
}) => {
    return (
        <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end" }}>
            {filters.map(filter => (
                <Dropdown
                    key={filter.key}
                    label={filter.label}
                    options={availableOptions[filter.key] ?? []}
                    value={values[filter.key] ?? (filter.multiple ? [] : "")}
                    onChange={(val: any) => onFilterChange(filter.key, val)}
                    multiple={filter.multiple}
                    searchable={filter.searchable}
                    width={filter.width}
                />
            ))}
            {!hideClear && (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={onClear}
                    sx={{ height: "36px" }}
                >
                    Limpiar filtros
                </Button>
            )}
        </Box>
    );
};

export default FilterBar;