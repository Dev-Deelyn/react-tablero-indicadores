// components/ColumnSelector.tsx
import React from 'react';

interface ColumnSelectorProps {
  columns: string[];
  onDimensionChange: (selected: string) => void;
  onMetricChange: (selected: string) => void;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({ columns, onDimensionChange, onMetricChange }) => {
  return (
    <div>
      <h3>Seleccione Dimensiones y Métricas</h3>
      <div>
        <label>Dimensión:</label>
        <select onChange={(e) => onDimensionChange(e.target.value)}>
          <option value="">Seleccione...</option>
          {columns.map((col) => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Métricas:</label>
        <select onChange={(e) => onMetricChange(e.target.value)}>
          <option value="">Seleccione...</option>
          {columns.map((col) => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ColumnSelector;
