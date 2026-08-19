// src/components/ui/SummaryCard.tsx
import React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { NumberFormatProps, buildFormatter } from "../../utils/charts/numberFormat";

export interface SummaryCardStyle {
  /** Color de relleno del cuadro. Default: "#ffffff" */
  backgroundColor?: string;
  /** Color del borde. Default: "#e2e8f0" */
  borderColor?: string;
  /** Grosor del borde en px. Default: 1 */
  borderWidth?: number;
  /** Radio de borde en px. Default: 10 */
  borderRadius?: number;
  /** Sombra del cuadro (CSS box-shadow). Default: sombra sutil */
  boxShadow?: string;
  /** Padding interno. Default: "16px 20px" */
  padding?: number | string;
  /** Ancho mínimo del cuadro. Default: 160 */
  minWidth?: number | string;
  /** Alto mínimo del cuadro. */
  minHeight?: number | string;
}

export interface SummaryCardProps extends NumberFormatProps {
  /** Texto del título. */
  title?: string;
  /** Muestra u oculta el título. Default: true si hay título. */
  showTitle?: boolean;
  /** Tamaño de fuente del título en px. Default: 13 */
  titleFontSize?: number;
  /** Negrita en el título. Default: false */
  titleBold?: boolean;
  /** Color del texto del título. Default: "#64748b" */
  titleColor?: string;

  /** Valor numérico a mostrar. */
  value: number;
  /** Tamaño de fuente del valor en px. Default: 26 */
  valueFontSize?: number;
  /** Negrita en el valor. Default: true */
  valueBold?: boolean;
  /** Color del texto del valor. Default: "#0f172a" */
  valueColor?: string;

  /** Estilo del cuadro contenedor (fondo, borde, sombra, tamaño). */
  style?: SummaryCardStyle;

  /** sx adicional para overrides puntuales del contenedor raíz. */
  sx?: SxProps<Theme>;
}

const DEFAULT_STYLE: Required<SummaryCardStyle> = {
  backgroundColor: "#ffffff",
  borderColor: "#e2e8f0",
  borderWidth: 1,
  borderRadius: 10,
  boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)",
  padding: "16px 20px",
  minWidth: 160,
  minHeight: 0,
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  showTitle,
  titleFontSize = 13,
  titleBold = false,
  titleColor = "#64748b",
  value,
  valueFontSize = 26,
  valueBold = true,
  valueColor = "#0f172a",
  style,
  sx,
  ...formatProps
}) => {
  const resolvedStyle = { ...DEFAULT_STYLE, ...style };
  const shouldShowTitle = showTitle ?? Boolean(title);
  const formatter = buildFormatter(formatProps);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "6px",
        backgroundColor: resolvedStyle.backgroundColor,
        border: `${resolvedStyle.borderWidth}px solid ${resolvedStyle.borderColor}`,
        borderRadius: `${resolvedStyle.borderRadius}px`,
        boxShadow: resolvedStyle.boxShadow,
        padding: resolvedStyle.padding,
        minWidth: resolvedStyle.minWidth,
        minHeight: resolvedStyle.minHeight,
        boxSizing: "border-box",
        ...sx,
      }}
    >
      {shouldShowTitle && (
        <Box
          component="span"
          sx={{
            fontSize: `${titleFontSize}px`,
            fontWeight: titleBold ? 700 : 400,
            color: titleColor,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Box>
      )}
      <Box
        component="span"
        sx={{
          fontSize: `${valueFontSize}px`,
          fontWeight: valueBold ? 700 : 400,
          color: valueColor,
          lineHeight: 1.2,
        }}
      >
        {formatter(value)}
      </Box>
    </Box>
  );
};

export default SummaryCard;