// src/components/ui/SummaryTree.tsx
import React from "react";
import { Box } from "@mui/material";
import SummaryCard, { SummaryCardProps } from "./SummaryCard";

export interface SummaryTreeNode {
  /** Identificador único del nodo (key de React). */
  id: string;
  /** Título del nodo (ej: "TOTAL DERIVACIONES"). */
  title?: string;
  /** Valor numérico del nodo. */
  value: number;
  /**
   * Props puntuales de SummaryCard para este nodo (formato, estilo, tamaños).
   * Sobrescriben a defaultCardProps.
   */
  cardProps?: Omit<SummaryCardProps, "title" | "value">;
  /** Nodos hijos (desglose). Si se omite o está vacío, el nodo es una hoja. */
  children?: SummaryTreeNode[];
}

export interface SummaryTreeProps {
  /** Nodo raíz del árbol. */
  data: SummaryTreeNode;
  /** Props de SummaryCard aplicadas a todos los nodos, salvo que cada nodo las sobrescriba en cardProps. */
  defaultCardProps?: Omit<SummaryCardProps, "title" | "value">;
  /** Color de las líneas conectoras. Default: "#cbd5e1" */
  connectorColor?: string;
  /** Grosor de las líneas conectoras en px. Default: 1 */
  connectorWidth?: number;
  /** Estilo de línea. Default: "dashed" */
  connectorStyle?: "dashed" | "solid" | "dotted";
  /** Separación vertical entre niveles en px. Default: 24 */
  levelGap?: number;
  /** Separación horizontal entre hermanos en px. Default: 24 */
  siblingGap?: number;
}

interface NodeRendererProps {
  node: SummaryTreeNode;
  defaultCardProps?: Omit<SummaryCardProps, "title" | "value">;
  border: string;
  levelGap: number;
  siblingGap: number;
}

const NodeRenderer: React.FC<NodeRendererProps> = ({
  node,
  defaultCardProps,
  border,
  levelGap,
  siblingGap,
}) => {
  const hasChildren = Boolean(node.children && node.children.length > 0);

  return (
    <Box
      component="li"
      sx={{
        listStyle: "none",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${levelGap}px ${siblingGap / 2}px 0 ${siblingGap / 2}px`,

        // Media línea horizontal (izquierda) que conecta con el hermano anterior
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: "50%",
          width: "50%",
          height: `${levelGap}px`,
          borderTop: border,
        },
        // Media línea horizontal (derecha) que conecta con el hermano siguiente
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "50%",
          width: "50%",
          height: `${levelGap}px`,
          borderTop: border,
        },

        // Nodo único (sin hermanos): no necesita líneas horizontales ni espacio superior
        "&:only-child": { paddingTop: 0 },
        "&:only-child::before, &:only-child::after": { display: "none" },

        // Primer y último hijo: recortan la línea horizontal que sobra hacia afuera
        "&:first-child::before": { borderColor: "transparent" },
        "&:last-child::after": { borderColor: "transparent" },
      }}
    >
      <SummaryCard
        title={node.title}
        value={node.value}
        {...defaultCardProps}
        {...node.cardProps}
      />

      {hasChildren && (
        <Box
          component="ul"
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 0,
            margin: 0,
            position: "relative",
            paddingTop: `${levelGap}px`,

            // Línea vertical que baja desde el nodo padre hacia esta fila de hijos
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "50%",
              height: `${levelGap}px`,
              borderLeft: border,
            },
          }}
        >
          {node.children!.map((child) => (
            <NodeRenderer
              key={child.id}
              node={child}
              defaultCardProps={defaultCardProps}
              border={border}
              levelGap={levelGap}
              siblingGap={siblingGap}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

const SummaryTree: React.FC<SummaryTreeProps> = ({
  data,
  defaultCardProps,
  connectorColor = "#cbd5e1",
  connectorWidth = 1,
  connectorStyle = "dashed",
  levelGap = 24,
  siblingGap = 24,
}) => {
  const border = `${connectorWidth}px ${connectorStyle} ${connectorColor}`;

  return (
    <Box
      component="ul"
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 0,
        margin: 0,
        width: "100%",
      }}
    >
      <NodeRenderer
        node={data}
        defaultCardProps={defaultCardProps}
        border={border}
        levelGap={levelGap}
        siblingGap={siblingGap}
      />
    </Box>
  );
};

export default SummaryTree;